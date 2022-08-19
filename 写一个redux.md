假设我们有如下代码

```jsx
const appContext = React.createContext(null)
export const App = () => {
  const [appState, setAppState] = useState({
    user: {name: 'frank', age: 18}
  })
  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={contextValue}>
      <FirstChild/>
      <SecondChild/>
      <ThirdChild/>
    </appContext.Provider>
  )
}
const FirstChild = () => <section>FirstChild<User/></section>
const SecondChild = () => <section>SecondChild<UserModifier/></section>
const ThirdChild = () => <section>ThirdChild</section>
const User = () => {
  const contextValue = useContext(appContext)
  return <div>User:{contextValue.appState.user.name}</div>

}
const UserModifier = () => {
  const {appState, setAppState} = useContext(appContext)
  const onChange = (e) => {
    appState.user.name = e.target.value
    setAppState({...contextValue.appState})
  }
  return <div>
    <input value={contextValue.appState.user.name}
      onChange={onChange}/>
  </div>
```

## 第一阶段 统一管理state

现在我们直接在子组件里修改副组件传过来的state，如果代码很多，那十分难以排查问题

我们来规范一下state的提交

```jsx
// 写一个函数，这个函数接受老的state，和要改动的数据，生成新的state
const reducer = (state, {type, payload}) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}
```

现在我们用这种方式来改变state

```js
  const onChange = (e) => {
    const newState = reducer(appState, {type: 'updateUser', payload: {name: e.target.value}})
    setAppState(newState)
  }
```

现在舒服了一些，但还有一个问题，我每次改变state都需要写一模一样的代码，调用这个reducer，还需要调用副组件的setState，好麻烦啊

ok，那我们再把这两行封装一下

```js
const dispatch = (action) => {
  setAppState(reducer(appState, action))
}
```

这样我只需要关心action就可以了，我在原来的代码里直接`dispatch(action)`就无敌了，可惜没有办法这么做，因为`serState`只能在组件中使用。之所以会陷入如此境地，都是因为我们的`appState`和`setAppState`是从`Context`里传过来的，那我们直接把`dispatch`包到一个组件里不就好了

```js
const Wrapper = () => {
  const {appState, setAppState} = useContext(appContext)
  const dispatch = (action) => {
    setAppState(reducer(appState, action))
  }
  return <UserModifier dispatch={dispatch} state={appState}/>
}
```

我们把状态都放到Wrapper里，这个Wrapper就替代了原来UserModifier的位置，然后再把dispatch和appState作为props传递进去。这样UserModifier内部就简单多了

- 修改状态，就调用dispatch
- 读取状态，就读appState

好耶，至此我们已经封装好了UserModifier，我们再也不用担心和state有关的一切东西了

但这实际上和redux没有什么关系，这是react-redux做的事情

可是我们的代码仍然十分愚蠢，对每一个组件都需要封装一个这样的Wrapper才行，所以我们创建一个创建Wrapper的函数

```js
const createWrapper = (Component) => {
  const Wrapper = () => {
    const {appState, setAppState} = useContext(appContext)
    const dispatch = (action) => {
      setAppState(reducer(appState, action))
    }
    return <Component dispatch={dispatch} state={appState}/>
  }
  return Wrapper
}
const Wrapper = createWrapper(Component)
```

我们接受一个组件，为组件套上那些重复的代码，这十分合理。我们创建一个组件作为参数，调用一个函数，就得到了一个与全局状态关联起来的组件，这听起来不就是`react-redux`里的`connect`吗

我们再优化一下代码，把Component的props透传一下

现在的代码长这样

```jsx
const connect = (Component) => {
  return (props) => {
    const {appState, setAppState} = useContext(appContext)
    const dispatch = (action) => {
      setAppState(reducer(appState, action))
    }
    return <Component dispatch={dispatch} state={appState} {...props}/>
  }
}
const UserModifier = connect(({dispatch, state}) => {
  const onChange = (e) => {
     dispatch({type: 'updateUser', payload: {name: e.target.value}})
  }
  return <div>
    <input value={state.user.name}
      onChange={onChange}/>
  </div>
})
```

然后我们直接使用这个UserModifier就可以啦，至于我们的connect还只接受一次参数，这个以后再说，因为目前还有一个更紧急的事情！！我们从目前开始一直调用的是`setAppState`，我们每次调用`App`都会重新执行一次...那么App的子组件也会重新执行，即使FirstChild和ThirdChild没有变化

要想阻止多余的执行，办法也是有的，我们可以使用`useMemo`

```js
const x = useMemo(() => {
  return <ThirdChild/>
}, []);
```

我们直接用`{x}`代替`<ThirdChild>`就可以了，但这样也太麻烦了 : - (

那我们干脆把state和setState都放到外面好了

```jsx
const store = {
  state: {
    user: {name: 'octane', age: 1}
  },
  setState(newState) {
    store.state = newState
  }
}

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <FirstChild/>
      <SecondChild/>
      <ThirdChild/>
    </appContext.Provider>
  )
}
```

然后我们直接把store传递进去就行了。但这样还不够，因为我们修改store里的值，并不能触发**组件的`setState`**，所以react根本不知道组件的状态更新了，也就不会去渲染页面，所以我们需要告诉react，state更新了，我们可以这样做：

```jsx
const connect = (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    // *** 初始化一个空的对象作为state，我们只需要他的第二个参数
    const [_, update] = useState({})
    const dispatch = (action) => {
      setState(reducer(state, action))
      // *** 调用之，这样react会才知道状态有改变
      update({})
    }
    return <Component dispatch={dispatch} state={state} {...props}/>
  }
}
```

但这样做还不够，因为每一个组件都有自己的dispatch，所以每个组件只能更新自己，只有wrapper调用了`setState`，那其他同级的组件如果也读取了state，它们也不会更新，为此，这样`update`是不行的，我们需要订阅state的变化

```js
const store = {
  state: {
    user: {name: 'octane', age: 1}
  },
  setState(newState) {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  }
}
```

我们让组件来订阅state的变化，每次setState被调用时，我们就调用组件们给的回调函数，并且把state传给他们（虽然组件也可以自己来取，这样我们所有connect了store的组件都能在store里的状态改变时更新啦

Wrapper组件：

```jsx
const connect = (Component) => {
  return (props) => {
    const {state, setState} = useContext(appContext)
    const [_, update] = useState({})
    useEffect(() => {
      store.subscribe(() => {
        update({}) // 因为空对象不等于空对象，所以我们可以这样做
      })
    }, []) // 我们只想订阅一次

    const dispatch = (action) => {
      setState(reducer(state, action))// 这样就能通知所有订阅的组件state更新了
      // update({})
    }
    return <Component dispatch={dispatch} state={state} {...props}/>
  }
}
```

至此，我们有了store，reducer，connect，我们可以把它移入我们名叫redux的文件了！因为我们仍然使用Context给子组件传递数据，所以appContext也要移过去，这样我们就拥有了一个redux！（？？？

接下来，我们来写那些react-redux/redux有，我们却没有的东西

## 第二阶段 connect()()

第一步，别人的connect都接受两次参数，为什么我的只接受一个，首先我们来实现一个**selector**，让每个组件里只获得局部的state，而不是store里全部的state

```jsx
export const connect = (selector) => (Component) => {
    return (props) => {
        const {state, setState} = useContext(appContext)
        const [_, update] = useState({})
        const data = selector? selector(state): {state: state}// 如果不传selector，我们就把state传递给props
        useEffect(() => {
            store.subscribe(() => {
                update({}) // 因为空对象不等于空对象，所以我们可以这样做
            })
        }, []) // 我们只想订阅一次
        const dispatch = (action) => {
            setState(reducer(state, action))
            // update({})
        }
        return <Component dispatch={dispatch} {...data} {...props}/>
    }
}
```

```jsx
const User = connect(state => {
  return {user: state.user}
})(({user}) => {
  return <div>User:{user.name}</div>
})
```

这样User组件就只使用state里的user，不会乱拿数据啦

第二步，selector实现了每个组件和自己依赖的状态的对应，接下来我们来实现**精准渲染**，即一个组件只在自己的状态改变时更新，我们实现的selector就相当于**mapStateToProps**

```jsx
export const connect = (selector) => (Component) => {
    return (props) => {
        const {state, setState} = useContext(appContext)
        const [_, update] = useState({})
        const data = selector? selector(state): {state: state}// 如果不传selector，我们就把state传递给props
        useEffect(() => {
            const unsubscribe = store.subscribe(() => {
                const newData = selector? selector(store.state) : {state: store.state}
                if (changed(data, newData)) {
                    console.log('update')
                    update({}) // 因为空对象不等于空对象，所以我们可以这样做
                }
            })
            // 这里最好加一个取消订阅，否则selector变化的时候会出现重复订阅，虽然正常情况下他不会变
            return unsubscribe
        }, [selector]) // 我们依赖的外部属性都要加到这里面
        const dispatch = (action) => {
            setState(reducer(state, action))
            // update({})
        }
        return <Component dispatch={dispatch} {...data} {...props}/>
    }
}
```

实现很简单，我们在每次要调用update前判断一下组件使用的状态有没有更新即可，`changed`为判断两个对象是否一致的函数，这里不再赘述。

第三步，我们来实现**mapDispatcherToProps**

```jsx
export const connect = (selector, dispatchSelector) => (Component) => {
    return (props) => {
        const dispatch = (action) => {
            setState(reducer(state, action))
            // update({})
        }
        const {state, setState} = useContext(appContext)
        const [_, update] = useState({})
        const data = selector? selector(state): {state: state}// 如果不传selector，我们就把state传递给props
        const dispatchers = dispatchSelector? dispatchSelector(dispatch): {dispatch}
        useEffect(() => {
            const unsubscribe = store.subscribe(() => {
                const newData = selector? selector(store.state) : {state: store.state}
                if (changed(data, newData)) {
                    console.log('update')
                    update({}) // 因为空对象不等于空对象，所以我们可以这样做
                }
            })
            // 这里最好加一个取消订阅，否则selector变化的时候会出现重复订阅，虽然正常情况下他不会变
            return unsubscribe
        }, [selector]) // 我们依赖的外部属性都要加到这里面
        return <Component {...dispatchers} {...data} {...props}/>
    }
}
```

和selector很相似。

现在使用者的方法可以长这样了，太美丽啦redux

```jsx
const userSelector = (state) => {
  return {user: state.user}
}

const userDispatcher = (dispatch) => {
  return {
    updateUser: (arg) => {
      dispatch({type: 'updateUser', payload: arg})
    }
  }
}

const User = connect(userSelector)(({user}) => {
  return <div>User:{user.name}</div>
})

const UserModifier = connect(userSelector, userDispatcher)(({updateUser, state, children}) => {
  const onChange = (e) => {
     updateUser({name: e.target.value})
  }
  return <div>
    {children}
    <input value={state.user.name}
      onChange={onChange}/>
  </div>
})
```

但这样写还体现不出connect接受两个参数的逼格，我们可以再把selector和dispatcher封装一下

```js
const connectToUser = connect(userSelector, userDispatcher)
```

这下，我们可以写一堆的connecter，然后直接调用connectToXXX(组件)就行了

第四步，现在我们的store还是写死的，是时候写出**createStore**了

```js
export const createStore = (reducer, initState) => {
    store.state = initState
    store.reducer = reducer
  	return store
}
```

我们在store里初始化state和reducer为空，等待用户传入，然后导出createStore给用户使用

```js
const reducer = (state, {type, payload}) => {
    if (type === 'updateUser') {
        return {
            ...state,
            user: {
                ...state.user,
                ...payload
            }
        }
    } else {
        return state
    }
}
const initState = {
    user: {name: 'octane', age: 1},
    group: {name: '前端组'}
}
const store = createStore(reducer, initState)
```

怎么样，是不是已经很像了

第五步，还记得吗，我们的App还包着一层AppContext呢，我们把他封装一下

```jsx
const Provider = ({store, children}) => {
    return (
        <appContext.Provider value={store}>
            {children}
        </appContext.Provider>
    )
}
```

## 第三阶段 封装！重构！

redux的store只暴露了四个方法，常用的只有三个：getState,dispatch(action),subscribe(listener)，还有一个replaceReducer（我都没用过)

我们暴露了太多的东西，因此我们重构一下代码，如下

```jsx
import React, {useContext, useEffect, useState} from "react";

let state = undefined
let reducer = undefined
let listeners = []

const setState = (newState) => {
    state = newState
    listeners.map(fn => fn(state))
}

const store = {
    getState(){
        return state
    },
    dispatch: (action) => {
        setState(reducer(state, action))
    },
    subscribe(fn) {
        listeners.push(fn)
        return () => {
            const index = listeners.indexOf(fn)
            listeners.splice(index, 1)
        }
    },
}
const dispatch = store.dispatch
export const createStore = (_reducer, initState) => {
    state = initState
    reducer = _reducer
    return store
}

const changed = (oldState, newState) => {
    let changed = false
    for (const key in oldState) {
        if (oldState[key] !== newState[key]) {
            changed = true
        }
    }
    return changed
}

export const connect = (selector, dispatchSelector) => (Component) => {
    return (props) => {

        const [_, update] = useState({})
        const data = selector? selector(state): {state: state}// 如果不传selector，我们就把state传递给props
        const dispatchers = dispatchSelector? dispatchSelector(dispatch): {dispatch}
        useEffect(() => {
            const unsubscribe = store.subscribe(() => {
                const newData = selector? selector(state) : {state: state}
                if (changed(data, newData)) {
                    console.log('update')
                    update({}) // 因为空对象不等于空对象，所以我们可以这样做
                }
            })
            // 这里最好加一个取消订阅，否则selector变化的时候会出现重复订阅，虽然正常情况下他不会变
            return unsubscribe
        }, [selector]) // 我们依赖的外部属性都要加到这里面
        return <Component {...dispatchers} {...data} {...props}/>
    }
}
```

## 第四阶段 函数！！异步！！

第一步，让dispatch**支持函数**，把函数action作为异步action

我们想这样调用

```js
dispatch(fetchUser)
```



```js
let dispatch = store.dispatch
const prevDispatch = dispatch
dispatch = (action) => {
    if (action instanceof Function) {
        action(dispatch)// action里接受的dispatch可能还会传一个函数
    } else {
        prevDispatch(action)
    }
}
```

如果action是一个函数，我们就递归的调用action()，直到他返回了一个{type, payload}，此时我们再dispatch这个最终的真action

我们可以如此使用

```jsx
const ajax = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({data: {name: '3秒后的我'}})
        }, 3000)
    })
}

const fetchUser = (dispatch) => {
    ajax('/user').then((resp) => {
        dispatch({type: 'updateUser', payload: resp.data})
    })
}

const UserModifier = connect(null, null)(({state, dispatch}) => {
    const onClick = (e) => {
        dispatch(fetchUser)
    }
    return <div>
        <div>User: {state.user.name}</div>
        <button onClick={onClick}>异步获取 user</button>
    </div>
})
```

第二步，让dispatch**支持Promise**！

我们想这样调用

```js
dispatch({type: 'updateUser', payload: ajax('/user').then(resp => resp.data)})
```

再加入如下代码

```js
const prevDispatch2 = dispatch
dispatch = (action) => {
    if (action.payload instanceof Promise) {
        action.payload.then((data) => {
            dispatch({...action, payload: data}) // payload接受的可能还是一个promise
        })
    } else {
        prevDispatch2(action)
    }
}
```

现在我们的代码已经十分美丽了

## 思考

我们的代码已经支持了函数和异步的action，这是原生redux所不支持的，redux将这种东西称为中间件。但是，我们的中间件没有任何新东西，仅仅只是改变了代码的组织方式。再结合redux的数据流模型，我越来越觉得redux并不是一个库，而是一种编程范式，用这种方式来写出好看的，易于管理和debug的代码。或者说是一种状态管理的思想，所以redux和框架没有任何关系，这种思想可以用在任何地方。另外再看一下中间件的源码，又看见了熟悉的next，这亲切的名字立马让我感觉我又行了，似乎很多框架对于中间件的管理都会采用类似的思想，就是每个中间件都看作一个handler，接受上一个handler返回的结果，返回的值交给下一个handler调用。redux身上有很多值得借鉴的封装思路，可以在以后的项目中多多参考

