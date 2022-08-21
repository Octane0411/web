# 读React源码之Diff算法

Diff的过程发生在render阶段，主要的代码在`packages/react-reconciler/src/ReactChildFiber.new.js`里面，想要看懂里面的代码需要对react的几个基本概念如Fiber，Fiber的处理顺序有所了解。这里不在赘述。

### 先大致用例子看一下React的Diff算法

1. **首先对比两棵树的根节点**

   1. 如果根节点的类型改变了，比如 div 变成了 p，那么直接认为整棵树都变了，不再对比子节点。此时直接删除对应的真实 DOM 树，创建新的真实 DOM 树。

   1. 如果根节点的类型没变，就看看属性变了没有

      1. 如果没变，就保留对应的真实节点

      1. 如果变了，就只更新该节点的属性，不重新创建节点。
         1. 更新 style 时，如果多个 css 属性只有一个改变了，那么 React 只更新改变的。

1. **然后同时遍历两棵树的子节点，每个节点的对比过程同上。**

   1. 情况一

      ```jsx
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>
      
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
      ```

      React 依次对比 A-A、B-B、空-C，发现 C 是新增的，最终会创建真实 C 节点插入页面。

   1. 情况二

      ```jsx
      <ul>
        <li>B</li>
        <li>C</li>
      </ul>
      
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
      ```

      React 对比 B-A，会删除 B 文本新建 A 文本；对比 C-B，会删除 C 文本，新建 B 文本；（注意，并不是边对比边删除新建，而是把操作汇总到 patch 里再进行 DOM 操作。）对比空-C，会新建 C 文本。

      你会发现其实只需要创建 A 文本，保留 B 和 C 即可

      在 React 里需要加 key 才能做到：

      ```jsx
      <ul>
        <li key="b">B</li>
        <li key="c">C</li>
      </ul>
      
      <ul>
        <li key="a">A</li>
        <li key="b">B</li>
        <li key="c">C</li>
      </ul>
      ```

      React 先对比 key 发现 key 只新增了一个，于是保留 b 和 c，新建 a。

### **下面我们去文件中看一下他是怎么写的**

代码中核心就是`ChildReconciler`这个函数它里面创建了一堆函数，和Diff算法相关的就是这几个

<img src="http://octane.oss-cn-beijing.aliyuncs.com/img/image-20220821170057661.png" alt="image-20220821170057661" style="zoom:50%;" />

最后返回了reconcileChildFibers

可以看到这几个函数都接受一样的参数

- returnFiber 处理之后需要返回到的Fiber，可以理解为父亲节点
- currentFirstChild 可以理解为旧Dom节点
- newChild 可以理解为新Dom节点
- lanes（涉及到scheduler的概念，和理解Diff算法关系不大，可以暂时不管他）

这个reconcileChildFibers可以把他理解为一个入口方法，他会判断newChild的类型进入不同的处理分支，主要类型有以下几个

- string&number 会进入`reconcileSingleTextNode`
- Object 会进入`reconcileSingleElement`
- Array & Iterator 他们的处理函数不同，但大致思路是一样的，这里我们就看`reconcileChildrenArray`就好了

### 文本节点reconcileSingleTextNode

文本节点基本上都是叶子节点了，这里的处理非常简单，旧Fiber树里有就尝试复用，没有就创建新的

### 单个节点 reconcileSingleElement

我就把过程当做注释写在代码里了

```js
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement,
  lanes: Lanes,
): Fiber {
  const key = element.key; // 新的key
  let child = currentFirstChild; // 旧的节点
  while (child !== null) {
    // 下面这句的意思是：如果我的节点自始至终就没有key，那么这就只应用到list的第一个节点
    // 我的理解是：相当于只有一个节点的list来处理
    // TODO: If key === null and child.key === null, then this only applies to
    // the first item in the list.
    if (child.key === key) { // 如果key相同
      switch (child.tag) {
          //这里根据tag的不同有三个分支
          //我们的tag一般都不是Fragment或Block，直接看下面的default
        case Fragment: 
					...
        case Block:
          ...
        default: {
          // (一个节点的elementType大部分时候同type，某些情况不同
          // 比如FunctionComponent使用React.memo包裹)
          if (child.elementType === element.type || ...) {// 如果节点没有改变 
            // 这句代码是假的，我不知道为什么要这么做
            // 因为只有是单个元素时会进入这个函数，单个元素是没有兄弟节点的
            // 这句相当于删除兄弟节点，删了个寂寞，点进去看也确实直接return了
            deleteRemainingChildren(returnFiber, child.sibling);
            // 尝试复用旧节点，existing就变成了新的节点
            const existing = useFiber(child, element.props);//传递旧节点和新的props
            existing.ref = coerceRef(returnFiber, child, element);
            existing.return = returnFiber;
            return existing; // 返回新的节点
          }
          break;
        }
      }
      // Didn't match. key不同（或一个有key一个没key）说明这个节点被删了
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }
	...
}
```

### 多个节点 reconcileChildrenArray

这个函数应该是Diff算法中经常被说起的部分了

开幕雷击

```js
  // This algorithm can't optimize by searching from both ends since we
  // don't have backpointers on fibers. I'm trying to see how far we can get
  // with that model. If it ends up not being worth the tradeoffs, we can
  // add it later.

  // Even with a two ended optimization, we'd want to optimize for the case
  // where there are few changes and brute force the comparison instead of
  // going for the Map. It'd like to explore hitting that path first in
  // forward-only mode and only go for the Map once we notice that we need
  // lots of look ahead. This doesn't handle reversal as well as two ended
  // search but that's unusual. Besides, for the two ended optimization to
  // work on Iterables, we'd need to copy the whole set.

  // In this first iteration, we'll just live with hitting the bad case
  // (adding everything to a Map) in for every insert/move.

  // If you change this code, also update reconcileChildrenIterator() which
  // uses the same algorithm.
```

大致意思就是，这个算法不可以用某种方法优化，**I'm trying to see how far we can get with that model.**

```js
function reconcileChildrenArray(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChildren: Array<*>,
  lanes: Lanes,
): Fiber | null {
    // 可以看到这个函数的传参是 旧的第一个child-新的children数组
    // 这是因为我们可以使用child.sibling走到他的下一个兄弟节点
	...

  let resultingFirstChild: Fiber | null = null;
  let previousNewFiber: Fiber | null = null;

  let oldFiber = currentFirstChild; // 当前旧节点
  let lastPlacedIndex = 0;
  let newIdx = 0; //新节点
  let nextOldFiber = null; //下一个旧节点
  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    // 相当于指针往后走，走到旧数组结束或新数组结束停下
    if (oldFiber.index > newIdx) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      // 移动到当前节点的兄弟节点
      nextOldFiber = oldFiber.sibling;
    }
    // updateSlot传了一个旧节点和新节点，相当于是对比两个节点
    const newFiber = updateSlot(
      returnFiber,
      oldFiber,
      newChildren[newIdx],
      lanes,
    );
    ...
  return resultingFirstChild;
}
```

#### 这里我们先停下来看一下`updateSlot`做了什么：

```js
function updateSlot(
  returnFiber: Fiber,
  oldFiber: Fiber | null,
  newChild: any,
  lanes: Lanes,
): Fiber | null {
  // Update the fiber if the keys match, otherwise return null.
	// 如果key一样则更新节点，key不一样返回空
  const key = oldFiber !== null ? oldFiber.key : null;

  if (typeof newChild === 'string' || typeof newChild === 'number') {
    ...
  }
	// 如果新节点是object，并且type和key都与旧节点一样，就更新这个节点
  if (typeof newChild === 'object' && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE: {
        if (newChild.key === key) {
          // 新旧节点key相同或者都为null
          if (newChild.type === REACT_FRAGMENT_TYPE) {
            return updateFragment(...);
          }
          // 更新节点，如果type变了会直接创建新节点，
          // 如果type和key都没变，里面会调用useFiber尝试复用这个节点，
          return updateElement(returnFiber, oldFiber, newChild, lanes);
        } else {
          // 如果key不相等，当前就直接认为后面的节点都变了，等后面要重新创建新节点时，再尝试复用，所以它不是在diff的过程中复用的
          return null
        }
      }
      case REACT_PORTAL_TYPE: {
        ...
      }
      case REACT_LAZY_TYPE: {
        ...
      }
    }
		...
}
```

#### 接下来我们回到reconcileChildrenArray

```js
	...
		for ...{
  		const newFiber = updateSlot(
      	returnFiber,
      	oldFiber,
      	newChildren[newIdx],
      	lanes,
    	);
		if (newFiber === null) {
      	// 根据我们上面的updateSlot可以发现，如果新旧节点都有key，且key不同，
      	// newFiber才会为空，此时直接break了，不再看后面的节点了
      
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        ...
        break;
      }
      ...
		}
		if (newIdx === newChildren.length) {
  		// 如果newIndex走到了这里，说明for循环是正常结束，没有break，也就说明没有发生key不同
  
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      ...
    }

    // Add all children to a key map for quick lookups.
    //把节点的key属性作为map的key存起来
    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    // 再接着遍历新的Fiber数组，如果Map中有相同key的节点就复用
    for (; newIdx < newChildren.length; newIdx++) {
      // 这里的newIdx是之前break的位置
      // 从Map里创建节点
      const newFiber = updateFromMap(
        existingChildren, //把旧节点的Map传过去
        returnFiber,
        newIdx,
        newChildren[newIdx],
        lanes,
      );
      ...
    }

    ...

    return resultingFirstChild;
```

#### 再看一下`updateFromMap`

这里的代码展示起来太乱了，我直接截图了

![image-20220821181504369](http://octane.oss-cn-beijing.aliyuncs.com/img/image-20220821181504369.png)

和我们想的一样，他会去map里尝试找同样key的节点，然后`updateElement`

回忆一下`updateElement`

- 更新节点，如果type变了会直接创建新节点
- 如果type没变，里面会调用useFiber尝试复用这个节点

## 总结

场景0：单个节点，会运行到 reconcileSingleElement。接下来看多个节点的情况。

场景1：没 key，标签名变了，最终会走到 createFiberFromElement（存疑）

场景2：没 key，标签名没变，但是属性变了，最终走到 updateElement 里的 useFiber

场景3：有 key，key 的顺序没变，最终走到 updateElement

场景4：有 key，key 的顺序变了，updateSlot 返回 null，最终走到 mapRemainingChildren、updateFromMap 和 updateElement(matchedFiber)，整个过程较长，效率较低