# 题

## HTML

#### HTML语义化标签

1. 是什么：语义化标签是一种写 HTML 标签的**方法论**/方式。

2. 怎么做：实现方法是遇到标题就用 h1 到 h6，遇到段落用 p，遇到文章用 article，主要内容用 main，边栏用 aside，导航用 nav……（就是找到中文对应的英文）

3. 解决了什么问题：明确了 HTML 的书写规范

4. 优点是：一、适合搜索引擎检索；二、适合人类阅读，利于团队维护。

5. 缺点是：没有。

6. 怎么解决缺点：无需解决。

#### HTML新标签

> 随便说说，不要详细说

文章相关：header main footer nav section article figure mark

多媒体相关：video audio svg canvas

#### Canvas和SVG的区别

> 写博客，而不是记忆

1. Canvas 主要是用笔刷来绘制 2D 图形的。

2. SVG 主要是用标签来绘制不规则矢量图的。
3. 相同点：都是主要用来画 2D 图形的。

4. 不同点：Canvas 画的是**位图**，SVG 画的是矢量图。

5. 不同点：SVG 节点过多时**渲染慢**，Canvas 性能更好一点，但写起来更复杂。

6. 不同点：SVG 支持分层和事件，Canvas 不支持，但是可以用库实现。

#### async和defer

##### defer

`defer` 特性告诉浏览器不要等待脚本。相反，浏览器将继续处理 HTML，构建 DOM。脚本会“在后台”下载，然后等 DOM 构建完成后，脚本才会执行。

- 具有 `defer` 特性的脚本不会阻塞页面。
- 具有 `defer` 特性的脚本总是要等到 DOM 解析完毕，但在 `DOMContentLoaded` 事件之前执行。

**具有 `defer` 特性的脚本保持其相对顺序，就像常规脚本一样。**

##### async

`async` 特性与 `defer` 有些类似。它也能够让脚本不阻塞页面。但是，在行为上二者有着重要的区别。

`async` 特性意味着脚本是完全独立的：

- 浏览器不会因 `async` 脚本而阻塞（与 `defer` 类似）。
- 其他脚本不会等待 `async` 脚本加载完成，同样，`async` 脚本也不会等待其他脚本。
- `DOMContentLoaded`和异步脚本不会彼此等待

- 页面内容立刻显示出来：加载写有 `async` 的脚本不会阻塞页面渲染。
- `DOMContentLoaded` 可能在 `async` 之前或之后触发，不能保证谁先谁后。
- 较小的脚本 `small.js` 排在第二位，但可能会比 `long.js` 这个长脚本先加载完成，所以 `small.js` 会先执行。虽然，可能是 `long.js` 先加载完成，如果它被缓存了的话，那么它就会先执行。换句话说，异步脚本以“加载优先”的顺序执行。

![](https://image-static.segmentfault.com/144/351/1443517782-57c6928b20b56_fix732)

## CSS

#### BFC是什么

概念题

答题思路还是「是什么、怎么做、解决了什么问题、优点是、缺点是、怎么解决缺点」

是什么：避免回答，直接翻译成“块级格式化上下文”（Block Formatting Context）

怎么做：BFC触发条件

- 浮动元素（元素的float不是none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）

- 行内块元素
- overflow 值不为 visble 的块元素
- 弹性元素（display 为 flex 或 inline-flex元素的直接子元素）

解决了什么问题：

1. 清除浮动（为什么不用.clearfix 呢）
2. 防止垂直方向 margin 合并
3. 某些古老的布局方式会用到

#### 如何实现垂直居中

> 写博客总结，面试直接甩链接

http://dennisgo.cn/Articles/Layout/Centered.html

https://www.yuque.com/docs/share/708bd899-0c46-47ea-a94c-d7a189c0f7dc

#### CSS选择器优先级

> 写博客总结，面试甩链接

这是css2的http://www.ayqy.net/doc/css2-1/cascade.html#specificity

如果记不住，可以记下这三句话：

1. 选择器越具体，其优先级越高

1. 相同优先级，出现在后面的，覆盖前面的

1. 属性后面加 !important 的优先级最高，但是要少用

**选择器**

- id选择器(#myid)
- 类选择器(.myclass)
- 属性选择器(a[rel="external"])
- 伪类选择器(a:hover, li:nth-child)
- 标签选择器(div, h1,p)
- 相邻选择器（h1 + p）
- 子选择器(ul > li)
- 后代选择器(li a)
- 通配符选择器(*)

**优先级：**

- `!important`
- 内联样式（1000）
- ID选择器（0100）
- 类选择器/属性选择器/伪类选择器（0010）
- 元素选择器/伪元素选择器（0001）
- 关系选择器/通配符选择器（0000）

带!important 标记的样式属性优先级最高； 样式表的来源相同时： `!important > 行内样式>ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性`

#### 如何清除浮动

> 写博客总结

方法一，给父元素加上.clearfix

```css
.clearfix:after{
    content:'';
    display:block;
    clear: both;
}
```

方法二，给父元素加上overflow:hidden

#### 两种盒模型`box-sizing`的区别

区分题：先说一，再说二，再说相同点，最后说不同点

第一种盒模型是content-box，即width指定的是content区域宽度，而不是实际宽度

> 实际宽度=width+padding+border

第二种盒模型是border-box，即width指定的是左右边框外侧的距离

> 实际宽度=width

border-box更好，符合直觉

#### 画三角形

```html
<svg width="100" height="100">
  <polygon points="50,0 100,100 0,100" style="fill: red;"/>
</svg>
```

## JS

#### JS的数据类型有哪些

纯记忆题

字符串，数字，布尔，null，undefined，object，symbol，bigint

string, number, boolean ...

>  为什么需要bigint：js的number是64位的双精度浮点数，精度有限，bigint是无限的
>
>  bigint用法（数字后面加个n）

数组，函数，日期，这些是class，不是类型type

#### 原型链

> https://www.zhihu.com/question/56770432/answer/315342130

**大概念题**，答题思路为大概念化成小概念（分割），抽象化成具体（举例）。

我的答题思路如下：

哦，原型链涉及到的概念挺多的，**我举例说明一下吧**。

假设我们有一个**普通**对象 `x={}`，这个 `x` 会有一个隐藏属性，叫做 `__?????__` ，这个属性会指向 `Object.prototype` ，即

```
x.__?????__ === Object.prototype // 原型
```

此时，我们说 `x 的原型` 是 Object.prototype，或者说 Object.prototype 是 x 的原型。

而这个 `__?????__` 属性的唯一作用就是用来指向 x 的原型的。

如果没有 `__?????__` 属性，x 就不知道自己的原型是谁了。

> 为什么我用问号来表示？因为这样你不容易晕。

接下来我来说说原型链，我还是举例说明吧。

假设我们有一个数组对象 `a=[]` ，这个 `a` 也会有一个隐藏属性，叫做 `__?????__` ，这个属性会指向 `Array.prototype` ，即

```
a.__?????__ === Array.prototype
```

此时，我们说 a 的原型是 `Array.prototype`，跟上面的 x 一样。但又有一点不一样，那就是 Array.prototype 也有一个隐藏属性 `__?????__` ，指向 `Object.prototype` ，即

```
// 用 x 表示 Array.prototype
x.__?????__ === Object.prototype
```

这样一来，a 就有两层原型：

1. a 的原型是 Array.prototype

1. a 的原型的原型是 Object.prototype

于是就通过隐藏属性 `__?????__` 形成了一个链条：

```
a ===> Array.prototype ===> Object.prototype 
```

这就是原型链。

以上我对「原型链是什么」的回答。

**怎么做：**

看起来只要改写 x 的隐藏属性 `__?????__` 就可以改变 x 的原型（链）

```js
x.__?????__ = 原型
```

但是这不是标准推荐的写法，为了设置 `x.__?????___`，推荐的写法是

```js
const x = Object.create(原型)
// 或
const x = new 构造函数() // 会导致 x.__?????__ === 构造函数.prototype
```

> 没错，JS 就是这么别扭。

**解决了什么问题：**

在没有 Class 的情况下实现「继承」。以 `a ===> Array.prototype ===> Object.prototype`  为例，我们说：

1. a 是 Array 的实例，a 拥有 Array.prototype 里的属性

1. Array 继承了 Object（注意专业术语的使用）

1. a 是 Object 的间接实例，a 拥有 Object.prototype 里的属性

这样一来，a 就既拥有 Array.prototype 里的属性，又拥有 Object.prototype 里的属性。

**优点：**

简单、优雅。

**缺点：**

跟 class 相比，不支持私有属性。

**怎么解决缺点：**

使用 class 呗。但 class 是 ES6 引入的，不被旧 IE 浏览器支持。

#### 代码中的this是什么

```js
var length = 4;
function callback() {
  console.log(this.length); // => 打印出什么？
}

const obj = {
  length: 5,
  method(callback) {
    callback();
  }
};

obj.method(callback, 1, 2);
```

https://zhuanlan.zhihu.com/p/23804247

#### new做了什么

1. 创建临时对象
2. 绑定原型
3. 指定this=临时对象
4. 执行构造函数
5. 返回临时对象

https://zhuanlan.zhihu.com/p/23987456

#### 立即执行函数

概念题，「是什么、怎么做、解决了什么问题、优点是、缺点是、怎么解决缺点」

**是什么：**

声明一个匿名函数，然后立即执行它。这种做法就是立即执行函数。

**怎么做：**

```js
(function(){alert('我是匿名函数')} ())  // 用括号把整个表达式包起来
(function(){alert('我是匿名函数')}) ()  // 用括号把函数包起来
!function(){alert('我是匿名函数')}()    // 求反，我们不在意值是多少，只想通过语法检查。
+function(){alert('我是匿名函数')}()
-function(){alert('我是匿名函数')}()
~function(){alert('我是匿名函数')}()
void function(){alert('我是匿名函数')}()
new function(){alert('我是匿名函数')}()
var x = function(){return '我是匿名函数'}()
```

上面每一行代码都是一个立即执行函数。（举例法）

```js
for (var i = 0; i < 5; i++) {
    (function (i){
        setTimeout(() => {
            console.log(i)
        })
    })(i)
}
```

**解决了什么问题：**

**在 ES6 之前**，只能通过它来「创建局部作用域」。

**优点：**

兼容性好。

**缺点：**

丑。为什么这么丑？看视频分析。

**怎么解决缺点：**

使用 ES6 的 block + let 语法，即

```js
{
  let a = '我是局部变量啦'
  console.log(a) // 能读取 a
}
console.log(a) // 找不到 
```

#### 闭包

概念题，「是什么、怎么做、解决了什么问题、优点是、缺点是、怎么解决缺点」

**是什么**

闭包是 JS 的一种**语法特性**。

> 闭包 = 函数 + 自由变量

对于一个函数来说，变量分为：全局变量、本地变量、自由变量

**怎么做**

```js
  let count
  function add (){ // 访问了外部变量的函数
    count += 1
  }
```

把上面代码放在「非全局环境」里，就是闭包。

> 注意，闭包不是 count，闭包也不是 add，闭包是 count + add 组成的整体。

怎么制造一个「非全局环境」呢？答案是立即执行函数：

```js
const x = function (){
	var count
	function add (){ // 访问了外部变量的函数
	  count += 1
	}
}()
```

但是这个代码什么用也没有，所以我们需要 `return add` ，即：

```js
const add2 = function (){
	var count
	return function add (){ // 访问了外部变量的函数
	  count += 1
	}
}()
```

此时 add2 其实就是 add，我们可以调用 add2

```js
add2()
// 相当于
add()
// 相当于
count += 1
```

至此，我们就实现了一个完整的「闭包的应用」。

> 注意：闭包 ≠ 闭包的应用，但面试官问你「闭包」的时候，你一定要答「闭包的应用」，这是规矩。

**解决了什么问题：**

1. 避免污染全局环境。（因为用的是局部变量）

1. 提供对局部变量的间接访问。（因为只能 count += 1 不能 count -= 1）

1. 维持变量，使其不被垃圾回收。

优点：

简单，好用。

缺点：

闭包**使用不当**可能造成内存泄露。

注意，重点是「使用不当」，不是闭包。

「闭包造成内存泄露」这句话以讹传讹很多年了，曾经旧版本 IE 的 bug 导致的问题，居然被传成这样了。

举例说明：

```js
function test() {
  var x = {name: 'x'};
  var y = {name: 'y', content: "-----这里很长，有一万三千五百个字符那么长----" }
  return function fn() {
    return x;
  };
}

const myFn = test() // myFn 就是 fn 了
const myX = myFn() // myX 就是 x 了
// 请问，y 会消失吗？
```

对于一个正常的浏览器来说，y 会在**一段时间**后自动消失（被垃圾回收器给回收掉）。

但旧版本的 IE 并不是正常的浏览器，所以是 IE 的问题。

#### 如何实现类

##### 方法一：使用原型

```js
function Dog(name){ 
  this.name = name
  this.legsNumber = 4
}
Dog.prototype.kind = '狗'
Dog.prototype.say = function(){
  console.log(`汪汪汪~ 我是${this.name}，我有${this.legsNumber}条腿。`)
}
Dog.prototype.run = function(){
  console.log(`${this.legsNumber}条腿跑起来。`)
}
const d1 = new Dog('啸天') // Dog 函数就是一个类
d1.say()
```

请试着实现一个 Chicken 类，没 name 会 say 会 fly。

##### 方法二：使用 class

```js
class Dog {
  kind = '狗' // 等价于在 constructor 里写 this.kind = '狗'
  constructor(name) {
    this.name = name
    this.legsNumber = 4
    // 思考：kind 放在哪，放在哪都无法实现上面的一样的效果
  }
  say(){
    console.log(`汪汪汪~ 我是${this.name}，我有${this.legsNumber}条腿。`)
  }
  run(){
    console.log(`${this.legsNumber}条腿跑起来。`)
  }
}
const d1 = new Dog('啸天')
d1.say() 
```

#### 如何实现继承

##### 方法一：使用原型链

```js
function Animal(legsNumber){
  this.legsNumber = legsNumber
}
Animal.prototype.kind = '动物'

function Dog(name){ 
  this.name = name
  Animal.call(this, 4) // 关键代码1
}
Dog.prototype.__proto__ = Animal.prototype // 关键代码2，但这句代码被禁用了，怎么办

Dog.prototype.kind = '狗'
Dog.prototype.say = function(){
  console.log(`汪汪汪~ 我是${this.name}，我有${this.legsNumber}条腿。`)
}

const d1 = new Dog('啸天') // Dog 函数就是一个类
console.dir(d1)
```

如果面试官问被 ban 的代码如何替换，就说下面三句：

```js
var f = function(){ }
f.prototype = Animal.prototype//这两行相当于是删掉Animal的函数体，只保留原型上的属性
Dog.prototype = new f()// 不能new Animal()，那样就把Animal构造函数也跑了，我们已经跑了一次
```

##### 方法二：使用 class

```js
class Animal{
  constructor(legsNumber){
    this.legsNumber = legsNumber
  }
  run(){}
}
class Dog extends Animal{
  constructor(name) {
    super(4) // super必须先被调用
    this.name = name
  }
  say(){
    console.log(`汪汪汪~ 我是${this.name}，我有${this.legsNumber}条腿。`)
  }
}
```

#### 深拷贝

##### 方法一，用 JSON：

```js
const b = JSON.parse(JSON.stringify(a))
```

答题要点是指出这个方法有如下缺点：

1. 不支持 Date、正则、undefined、函数等数据

2. 不支持引用（即环状结构）

3. 必须说自己还会方法二

##### 方法二，用递归：

要点：

1. 递归

2. 判断类型

3. 检查环

4. 不拷贝原型上的属性

```js
const deepClone = (a, cache) => {
  if(!cache){
    cache = new Map() // 缓存不能全局，最好临时创建并递归传递
  }
  if(a instanceof Object) { // 不考虑跨 iframe
    if(cache.get(a)) { return cache.get(a) }
    let result 
    if(a instanceof Function) {
      if(a.prototype) { // 有 prototype 就是普通函数
        result = function(){ return a.apply(result, arguments) }
      } else {
        result = (...args) => { return a.call(undefined, ...args) }
      }
    } else if(a instanceof Array) {
      result = []
    } else if(a instanceof Date) {
      result = new Date(a - 0)
    } else if(a instanceof RegExp) {
      result = new RegExp(a.source, a.flags)
    } else {
      result = {}
    }
    cache.set(a, result)
    for(let key in a) { 
      if(a.hasOwnProperty(key)){
        result[key] = deepClone(a[key], cache) 
      }
    }
    return result
  } else {
    return a
  }
}

const a = { 
  number:1, bool:false, str: 'hi', empty1: undefined, empty2: null, 
  array: [
    {name: 'frank', age: 18},
    {name: 'jacky', age: 19}
  ],
  date: new Date(2000,0,1,20,30,0),
  regex: /\.(j|t)sx/i,
  obj: { name:'frank', age: 18},
  f1: (a, b) => a + b,
  f2: function(a, b) { return a + b }
}
a.self = a

const b = deepClone(a)

b.self === b // true
b.self = 'hi'
a.self !== 'hi' //true
```

#### xhr

| 值   | 状态               | 描述                                                |
| :--- | :----------------- | :-------------------------------------------------- |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                |
| `1`  | `OPENED`           | `open()` 方法已经被调用。                           |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
| `3`  | `LOADING`          | 下载中；`responseText` 属性已经包含部分数据。       |
| `4`  | `DONE`             | 下载操作已完成。                                    |


## DOM

#### 简述DOM事件模型

每个事件先经历从上到下的捕获阶段，再经历从下到上的冒泡阶段。

addEventListener(’click’,fn,true/false) 第三个参数可以选择阶段。

可以使用 `event.stopPropagation()` 来阻止捕获或冒泡。

#### 手写事件委托

##### 错误版（但是可能能通过面试）

```js
 ul.addEventListener('click', function(e){
   // e.currentTarget是绑定的对象，即ul
   // e.target是用户触发的对象，可能是ul里面的li里面的span
     if(e.target.tagName.toLowerCase() === 'li'){
         fn()// 执行某个函数
     }
 })
```

bug 在于，如果用户点击的是 li 里面的 span，就没法触发 fn，这显然不对。

**事件委托的好处**

1. 节省监听器

2. 实现动态监听

**坏处**

调试比较复杂，不容易确定监听者。

**解决方案**

解决不了

##### 高级版（不用背）

思路是点击 span 后，递归遍历 span 的祖先元素看其中有没有 ul 里面的 li。

```js
function delegate(element, eventType, selector, fn) {
	element.addEventListener(eventType, e => {
	  let el = e.target
	  while (!el.matches(selector)) {
	    if (element === el) {
	      el = null
	      break
	    }
	    el = el.parentNode
	  }
    // 没找到ul，什么都不做/找到了，执行fn
	  el && fn.call(el, e, el)
	})
	return element
}

delegate(ul, 'click', 'li', f1)
```

#### 手写拖拽div

参考代码：https://jsbin.com/munuzureya/edit?html,js,output

要点：

1. 注意监听范围，不能只监听 div，否则一下就拖出去了

2. 不要使用 drag 事件，很难用。

3. 使用 transform 会比 top / left 性能更好，因为可以避免 reflow 和 repaint

## HTTP

#### GET 和 POST 的区别有哪些？

##### 区别一：幂等性

1. 由于 GET 是读，POST 是写，所以 GET 是幂等的，POST 不是幂等的。

2. 由于 GET 是读，POST 是写，所以用浏览器打开网页会发送 GET 请求，想要 POST 打开网页要用 form 标签。

3. 由于 GET 是读，POST 是写，所以 GET 打开的页面刷新是无害的，POST 打开的页面刷新需要确认。

4. 由于 GET 是读，POST 是写，所以 GET 结果会被缓存，POST 结果不会被缓存。

5. 由于 GET 是读，POST 是写，所以 GET 打开的页面可被书签收藏，POST 打开的不行。

##### 区别二：请求参数

1. 通常，GET 请求参数放在 url 里，POST 请求数据放在 body（消息体）里。（这里注意老师的讲解）

2. ❌GET 比 POST 更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。（xjb扯）

3. ❌GET 请求参数放在 url 里是有长度限制的，而 POST 放在 body 里没有长度限制。url长度是浏览器的限制或服务器的限制（414状态码），http没有规定长度限制（xjb扯）

##### 区别三：TCP packet

1. GET 产生一个 TCP 数据包；POST 产生两个或以上 TCP 数据包。

> 根据技术规格文档，GET 和 POST 最大的区别是语义；但面试官一般问的是实践过程中二者的区别，因此你需要了解服务器和浏览器对 GET 和 POST 的常见实现方法。

#### HTTP缓存方案

强缓存：直接使用

协商缓存：过期了，协商一下

|          | 缓存（强缓存）(服务器发过来的)                               | 内容协商缓存（弱缓存）（发给服务器的）                       |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| HTTP 1.1 | **Cache-Control**: max-age=3600 **Etag**: ABC                | **If-None-Match**: ABC             **响应状态码**：304 或 200 |
| HTTP 1.0 | **Expires(用户时间错乱):** Wed, 21 Oct 2015 02:30:00 GMT **Last-Modified**(一秒内文件改了多次): Wed, 21 Oct 2015 01:00:00 GMT | **If-Modified-Since**: Wed, 21 Oct 2015 01:00:00 GMT **响应状态码**：304 或 200 |

Etag：每个文件一个特征值（哈希值）

面试官可能还会提到 `Pragma` ，但 MDN 已经明确不推荐使用它。

更详细的内容可以看我的课程《[全面攻克 Web 性能优化](https://xiedaimala.com/courses/b65a6488-4038-4676-932e-ae125613ad69)》中的《[缓存与内容协商](https://xiedaimala.com/tasks/9d8708a7-7a70-4ae1-a4e9-207f59df15be)》视频。

#### HTTP和HTTPS的区别

HTTPS = HTTP + SSL/TLS（安全层）

##### 区别列表

1. HTTP 是明文传输的，不安全；HTTPS 是加密传输的，非常安全。

2. HTTP 使用 80 端口，HTTPS 使用 443 端口。

3. HTTP 较快，HTTPS 较慢。（RTT）

4. HTTPS 的证书一般需要购买（但也有免费的），HTTP 不需要证书。

HTTPS 的细节可以看网上的博客，比较复杂，难以记忆，建议写博客总结一下。

[图解SSL/TLS协议 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html) 

[HTTPS原理以及握手阶段](https://juejin.cn/post/6844903892765900814)

1. 客户端向服务器发送支持的SSL/TSL的协议版本号，以及客户端支持的加密方法，和一个客户端生成的随机数

2. 服务器确认协议版本和加密方法，向客户端发送一个由服务器生成的随机数，以及数字证书

3. 客户端验证证书是否有效，有效则从证书中取出公钥，生成一个随机数，然后用公钥加密这个随机数，发给服务器

4. 服务器用私钥解密，获取发来的随机数

5. 客户端和服务器根据约定好的加密方法，使用前面生成的三个随机数，生成对话密钥，用来加密接下来的整个对话过程

#### 三次握手四次挥手

##### 建立 TCP 连接时 server 与 client 会经历三次握手

1. 浏览器向服务器发送 TCP 数据：SYN(seq=x)

2. 服务器向浏览器发送 TCP 数据：ACK(seq=x+1) SYN(y)

3. 浏览器向服务器发送 TCP 数据：ACK(seq=y+1)

##### 关闭 TCP 连接时 server 与 client 会经历四次挥手

1. 浏览器向服务器发送 TCP 数据：FIN(seq=x)

2. 服务器向浏览器发送 TCP 数据：ACK(seq=x+1)

3. 服务器向浏览器发送 TCP 数据：FIN(seq=y)

4. 浏览器向服务器发送 TCP 数据：ACK(seq=y+1)

为什么 2、3 步骤不合并起来呢？

答案：2、3 中间服务器很可能还有数据要发送，不能提前发送 FIN。

#### 同源策略和跨域

##### 同源策略是什么？

如果两个 URL 的协议、端口和域名都完全一致的话，则这两个 URL 是同源的。

`
http://www.baidu.com/s 
http://www.baidu.com:80/ssdasdsadad`

##### 同源策略怎么做？

只要在**浏览器**里打开页面，就默认遵守同源策略。 

##### 优点

保证用户的隐私安全和数据安全。

##### 缺点

很多时候，前端需要访问另一个域名的后端接口，会被浏览器阻止其获取响应。

比如甲站点通过 AJAX 访问乙站点的 /money 查询余额接口，请求会发出，但是响应会被浏览器屏蔽。

##### 怎么解决缺点

使用跨域手段。


1. JSONP（前端体系课有完整且详细的介绍）


      1.  甲站点利用 script 标签可以跨域的特性，向乙站点发送 get 请求。



      1.  乙站点**后端改造** JS 文件的内容，将数据传进回调函数。



      1.  甲站点通过回调函数拿到乙站点的数据。


   优点：改动少，缺点：只能发get/没有用户认证的功能

2. CORS（前端体系课有完整且详细的介绍）

   a. 对于简单请求，乙站点在响应头里添加 `Access-Control-Allow-Origin: http://甲站点` 即可。
   
   b. 对于复杂请求，如 PATCH，乙站点需要：
   

   ​	i.响应 OPTIONS 请求，在响应中添加如下的响应头

   
   ```js
   Access-Control-Allow-Origin: https://甲站点
   Access-Control-Allow-Methods: POST, GET, OPTIONS, PATCH
   Access-Control-Allow-Headers: Content-Type
   ```

   
   ​	ii.响应 POST 请求，在响应中添加 `Access-Control-Allow-Origin` 头。

   
   c. 如果需要附带身份信息，JS 中需要在 AJAX 里设置 `xhr.withCredentials = true` 。
   
1.  Nginx 代理 / Node.js 代理

        1.  前端 ⇒ 后端 ⇒ 另一个域名的后端

详情参考 [MDN CORS 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)。

#### HTTP2

1. HTTP/2 使用了**二进制传输**，将数据包拆成帧，而且将 head 和 body 分成**帧**来传输；HTTP/1.1 是字符串传输。

2. HTTP/2 支持**多路复用**，HTTP/1.1 不支持。多路复用简单来说就是一个 TCP 连接从单车道（不是单行道）变成了几百个双向通行的车道。HTTP/2 通过让所有数据流共用同一个连接，可以更有效地使用 TCP 连接，让高带宽也能真正的服务于 HTTP 的性能提升。

3. HTTP/2 可以**压缩 head**，但是 HTTP/1.1 不行。

4. HTTP/2 支持**服务器推送**，但 HTTP/1.1 不支持。（实际上没多少人用）

#### Session、Cookie、LocalStorage、SessionStorage 的区别

- Cookie V.S. LocalStorage

  1. 主要区别是 Cookie 会被发送到服务器，而 LocalStorage 不会

  2. Cookie 一般最大 4k，LocalStorage 可以用 5Mb 甚至 10Mb（各浏览器不同）

- LocalStorage V.S. SessionStorage

  1. LocalStorage 一般不会自动过期（除非用户手动清除）

  2. SessionStorage 在回话结束时过期（如关闭浏览器之后，具体由浏览器自行决定）

- Cookie V.S. Session

  1. Cookie 存在浏览器的文件里，Session 存在服务器的文件里

  2. Session 是基于 Cookie 实现的，具体做法就是把 SessionID 存在 Cookie 里

#### HTTP 状态码

| 100  | Continue                        | 继续。客户端应继续其请求                                     |
| ---- | ------------------------------- | ------------------------------------------------------------ |
| 101  | Switching Protocols             | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议 |
|      |                                 |                                                              |
| 200  | OK                              | 请求成功。一般用于GET与POST请求                              |
| 201  | Created                         | 已创建。成功请求并创建了新的资源                             |
| 202  | Accepted                        | 已接受。已经接受请求，但未处理完成                           |
| 203  | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| 204  | No Content                      | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 205  | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 206  | Partial Content                 | 部分内容。服务器成功处理了部分GET请求                        |
|      |                                 |                                                              |
| 300  | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 301  | Moved Permanently               | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302  | Found                           | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 303  | See Other                       | 查看其它地址。与301类似。使用GET和POST请求查看               |
| 304  | Not Modified                    | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305  | Use Proxy                       | 使用代理。所请求的资源必须通过代理访问                       |
| 306  | Unused                          | 已经被废弃的HTTP状态码                                       |
| 307  | Temporary Redirect              | 临时重定向。与302类似。使用GET请求重定向                     |
|      |                                 |                                                              |
| 400  | Bad Request                     | 客户端请求的语法错误，服务器无法理解                         |
| 401  | Unauthorized                    | 请求要求用户的身份认证                                       |
| 402  | Payment Required                | 保留，将来使用                                               |
| 403  | Forbidden                       | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
| 404  | Not Found                       | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 405  | Method Not Allowed              | 客户端请求中的方法被禁止                                     |
| 406  | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                   |
| 407  | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
| 408  | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                     |
| 409  | Conflict                        | 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突 |
| 410  | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 411  | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息       |
| 412  | Precondition Failed             | 客户端请求信息的先决条件错误                                 |
| 413  | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
| 414  | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理               |
| 415  | Unsupported Media Type          | 服务器无法处理请求附带的媒体格式                             |
| 416  | Requested range not satisfiable | 客户端请求的范围无效                                         |
| 417  | Expectation Failed              | 服务器无法满足Expect的请求头信息                             |
|      |                                 |                                                              |
| 500  | Internal Server Error           | 服务器内部错误，无法完成请求                                 |
| 501  | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                         |
| 502  | Bad Gateway                     | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
| 503  | Service Unavailable             | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| 504  | Gateway Time-out                | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
| 505  | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理               |

#### xss和csrf



## TS

#### TS 和 JS 的区别是什么？有什么优势？

1. 语法层面：TypeScript = JavaScript + Type（TS 是 JS 的超集）

2. 执行环境层面：浏览器、Node.js 可以直接执行 JS，但不能执行 TS（Deno 可以执行 TS）

3. 编译层面：TS 有编译阶段，JS 没有编译阶段（只有转译阶段和 lint 阶段）

4. 编写层面：TS 更难写一点，但是**类型更安全**

5. 文档层面：TS 的代码写出来就是文档，IDE 可以完美**提示**。JS 的提示主要靠 TS

其他……自己搜一下博客

#### any、unknown、never 的区别是什么？

##### any V.S. unknown

二者都是顶级类型（top type），任何类型的值都可以赋值给顶级类型变量：

```js
let foo: any = 123; // 不报错
let bar: unknown = 123; // 不报错
```

但是 unknown 比 any 的类型检查更严格，any 什么检查都不做，unknown 要求先收窄类型：

```js
const value: unknown = "Hello World";
const someString: string = value; 
// 报错：Type 'unknown' is not assignable to type 'string'.(2322)
const value: any = "Hello World";
const someString: string = value; 
// 那么unknown该怎么用呢
const value: unknown = "Hello World";
const someString: string = value as string; // 不报错
```

如果改成 any，基本在哪都不报错。所以能用 unknown 就优先用 unknown，类型更安全一点。

##### never

never 是底类型，表示不应该出现的类型，这里有一个[尤雨溪给出的例子](https://www.zhihu.com/question/354601204/answer/888551021)：

```js
interface A {
  type: 'a'
}

interface B {
  type: 'b'
}

type All = A | B

function handleValue(val: All) {
  switch (val.type) {
    case 'a':
      // 这里 val 被收窄为 A
      break
    case 'b':
      // val 在这里是 B
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```

现在你应该理解什么是「不应该出现的类型」了吧。

#### type和interface的区别

官方给出的[文档说明](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)：

1. 组合方式：interface 使用 extends 来实现继承，type 使用 & 来实现联合类型。

2. 扩展方式：interface 可以重复声明用来扩展，type 一个类型只能声明一次

3. 范围不同：type 适用于基本类型，interface 一般不行。

4. 命名方式：interface 会创建新的类型名，type 只是创建类型别名，并没有新创建类型。

#### TS 工具类型 Partial、Required、Readonly、Exclude、Extract、Omit、ReturnType 的作用和实现？

1. 将英文翻译为中文。

   a. Partial 部分类型

   b. Required 必填类型

   c. Readonly 只读类型

   d. Exclude 排除类型

   e. Extract 提取类型

   f. Pick/Omit 排除 key 类型

   g. ReturnType 返回值类型

2. 举例说明每个工具类型的用法。

## 工程化

<img src="/Users/octane/Library/Application Support/typora-user-images/image-20220822152133138.png" alt="image-20220822152133138" style="zoom:200%;" />

#### webpack打包过程

1. 初始化
2. 编译
3. 

#### 常见 loader 和 plugin 有哪些？二者的区别是什么？

##### 常见 loader

在 webpack 文档里写了：

(https://webpack.js.org/loaders/)

你可以记住：

1. `babel-loader` 把 JS/TS 变成  JS

1. `ts-loader` 把 TS 变成 JS，**并提示类型错误**

1. `markdown-loader` 把 markdown 变成 html

1. `html-loader` 把 html 变成 JS 字符串

1. `sass-loader` 把 SASS/SCSS 变成 CSS

1. `css-loader` 把 CSS 变成 JS 字符串

1. `style-loader` 把 JS 字符串变成 style 标签

1. `postcss-loader` 把 CSS 变成更优化的 CSS

1. `vue-loader` 把单文件组件（SFC）变成 JS 模块

1. `thread-loader` 用于多进程打包

##### 常见 plugin

也在 webpack 文档里写了：

(https://webpack.js.org/plugins/)

你可以记住这些：

1. `html-webpack-plugin` 用于创建 HTML 页面并自动引入 JS 和 CSS

1. `clean-webpack-plugin` 用于清理之前打包的残余文件

1. `mini-css-extract-plugin` 用于将 JS 中的 CSS 抽离成单独的 CSS 文件

1. `SplitChunksPlugin` 用于代码分包（Code Split）

1. `DllPlugin`+`DllReferencePlugin`用于避免大依赖被频繁重新打包，大幅降低打包时间

plugin博客 (https://segmentfault.com/a/1190000016567986)

1. `eslint-webpack-plugin` 用于检查代码中的错误

1. `DefinePlugin` 用于在 webpack config 里添加全局变量

1. `copy-webpack-plugin` 用于拷贝静态文件到 dist

##### 二者的区别

- loader 是文件加载器（这句废话很重要）

    - 功能：能够对文件进行编译、优化、混淆（压缩）等，比如 babel-loader / vue-loader

    - 运行时机：在创建最终产物之前运行

- plugin 是 webpack 插件（这句废话也很重要）

    - 功能：能实现更多功能，比如定义全局变量、Code Split、加速编译等

    - 运行时机：在整个打包过程（以及前后）都能运行

#### webpack 如何解决开发时的跨域问题？

可以在 webpack.config.js 中添加如下配置：

```js
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xiedaimala.com',
        changeOrigin: true,
      },
    },
  },
};
```

此时，在 JS 中请求 `/api/users` 就会自动被代理到 `http://xiedaimala.com/api/users` 。

如果希望请求中的 Origin 从 8080 修改为 xiedaimala.com，可以添加 `changeOrigin: true` 。

如果要访问的是 HTTPS API，那么就需要配置 HTTPS 证书，否则会报错。

不过，如果在 target 下面添加 `secure: false` ，就可以不配置证书且忽略 HTTPS 报错。

总之，记住常用选项就行了。

#### 如何实现 tree-shaking？

这题属于拿着文档问面试者，欺负那些背不下文档的人。

(https://webpack.js.org/guides/tree-shaking/#conclusion)

(https://webpack.docschina.org/guides/tree-shaking/#conclusion)

##### 是什么

tree-shaking 就是让没有用到的 JS 代码不打包，以减小包的体积。

##### 怎么做

背下文档说的这几点：

1. 怎么删

   a. 使用 ES Modules 语法（即 ES6 的 import 和 export 关键字）

   b. CommonJS 语法无法 tree-shaking（即 require 和 exports 语法）

   c. 引入的时候只引用需要的模块

   ​	i. 要写 `import {cloneDeep} from 'lodash-es'` 因为方便 tree-shaking

   ​	ii. 不要写 `import _ from 'lodash'` 因为会导致无法 tree-shaking 无用模块

2. 怎么不删：在 package.json 中配置 sideEffects，防止某些文件被删掉

​	   a. 比如我 import 了 x.js，而 x.js 只是添加了 window.x 属性，那么 x.js 就要放到 sideEffects 里

​		b. 比如所有被 import 的 CSS 都要放在 sideEffects 里

3. 怎么开启：在 webpack config 中将 mode 设置为 production（开发环境没必要 tree-shaking）

​		a.`mode: production` 给 webpack 加了非常多[优化](https://github.com/webpack/webpack/blob/f43047c4c2aa4b0a315328e4c34a319dc2662254/lib/config/defaults.js#L1125)。

#### 如何提高 webpack 构建速度？

webpack 文档写着呢：

(https://webpack.docschina.org/guides/build-performance/)

1. 使用 DllPlugin 将不常变化的代码提前打包，并复用，如 vue、react

2. 使用 thread-loader 或 HappyPack（过时）进行多线程打包

3. 处于开发环境时，在 webpack config 中将 cache 设为 true，也可用 cache-loader（过时）

4. 处于生产环境时，关闭不必要的环节，比如可以关闭 source map

5. 网传的 HardSourceWebpackPlugin 已经一年多没更新了，谨慎使用

#### webpack 与 vite 的区别是什么？

1. 开发环境区别（vite不打包，webpack打包）

   1. vite 自己实现 server，不对代码打包，充分利用浏览器对 `<script type=module>`的支持

      1. 假设 main.js 引入了 vue

      2. 该 server 会把 `import { createApp } from 'vue'` 改为 `import { createApp } from "/node_modules/.vite/vue.js"` 这样浏览器就知道去哪里找 vue.js 了

   2. webpack-dev-server 常使用 babel-loader 基于内存打包，比 vite 慢很多很多很多
      1. 该 server 会把 vue.js 的代码（递归地）打包进 main.js
   
2. 生产环境区别

   1. vite 使用 rollup + esbuild 来打包 JS 代码

   2. webpack使用 babel 来打包 JS 代码，比 esbuild 慢很多很多很多

​				-- webpack 能使用 esbuild 吗？可以，你要自己配置（很麻烦）

3. 文件处理时机

   1. vite 只会在你请求某个文件的时候处理该文件

   2. webpack 会提前打包好 main.js，等你请求的时候直接输出打包好的 JS 给你

目前已知 vite 的缺点有：

1. 热更新常常失败，原因不清楚

2. 有些功能 rollup 不支持，需要自己写 rollup 插件

3. 不支持非现代浏览器

#### webpack 怎么配置多页应用？

这是对应的 webpack config：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      chunks: ['admin']
    })
  ],
};
```

但是，这样配置会有一个「**重复打包**」的问题：假设 app.js 和 admin.js 都引入了 vue.js，那么 vue.js 的代码既会打包进 app.js，也会打包进 admin.js。我们需要使用 `optimization.splitChunks` 将共同依赖单独打包成 common.js（HtmlWebpackPlugin 会自动引入 common.js）。

##### 如何支持无限多页面呢？

写点 Node.js 代码不就实现了么？

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')
const path = require('path')

const filenames = fs.readdirSync('./src/pages')
  .filter(file => file.endsWith('.js'))
  .map(file => path.basename(file, '.js'))

const entries = filenames.reduce((result, name) => (
  { ...result, [name]: `./src/pages/${name}.js` }
), {})
const plugins = filenames.map((name) =>
  new HtmlWebpackPlugin({
    filename: name + '.html',
    chunks: [name]
  })
)

module.exports = {
  entry: {
    ...entries
  },
  plugins: [
    ...plugins
  ],
};
```

#### swc、esbuild 是什么？

##### swc

实现语言：Rust

功能：编译 JS/TS、打包 JS/TS

优势：比 babel 快很多很多很多（20倍以上）

能否集成进 webpack：能

使用者：Next.js、Parcel、Deno、Vercel

做不到：

1. 对 TS 代码进行类型检查（用 tsc 可以）

2. 打包 CSS、SVG

##### esbuild

实现语言：Go

功能：同上

优势：比 babel 快很多很多很多很多很多很多（10~100倍）

能否集成进 webpack：能

使用者：vite、vuepress、snowpack、umijs、blitz.js 等

做不到：

1. 对 TS 代码进行类型检查

2. 打包 CSS、SVG

## 浏览器

#### Event Loop

##### **背景知识**

(https://juejin.cn/post/6844903582538399752)

Node.js 将各种函数（也叫任务或回调）分成至少 6 类，按先后顺序调用，因此将时间分为六个阶段：

1. timers 阶段（setTimeout）

1. I/O callbacks 该阶段不用管

1. idle, prepare 该阶段不用管

1. poll 轮询阶段，停留时间最长，可以随时离开。

   1. 主要用来处理 I/O 事件，该阶段中 Node 会不停询问操作系统有没有文件数据、网络数据等

   1. 如果 Node 发现有 timer 快到时间了或者有 setImmediate 任务，就会主动离开 poll 阶段

1. check 阶段，主要处理 setImmediate 任务

1. close callback 该阶段不用管

Node.js 会不停的从 1 ~ 6 循环处理各种事件，这个过程叫做事件循环（Event Loop）。

##### **nextTick**

process.nextTick(fn) 的 fn 会在什么时候执行呢？

在 Node.js 11 之前，会在每个阶段的末尾集中执行（俗称队尾执行）。

在 Node.js 11 之后，会在每个阶段的任务间隙执行（俗称插队执行）。

浏览器跟 Node.js 11 之后的情况类似。可以用 window.queueMicrotask 模拟 nextTick。

##### Promise

Promise.resolve(1).then(fn) 的 fn 会在什么时候执行？

这要看 Promise 源码是如何实现的，一般都是用 process.nextTick(fn) 实现的，所以直接参考 nextTick。

##### async / await 

这是 Promise 的语法糖，所以直接转为 Promise 写法即可。

面试题1：

```js
setTimeout(() => {
  console.log('setTimeout')
})

setImmediate(() => {
  console.log('setImmediate')
})
// 在 Node.js 运行会输出什么？
// A setT setIm
// B setIm setT
// C 出错
// D A 或 B
// 在浏览器执行会怎样？
```

面试题2：

```js
async function async1(){
    console.log('1')                   // 2
    async2().then(()=>{
      console.log('2')
    })
    
}
async function async2(){
    console.log('3')                   // 3
}
console.log('4')                        // 1
setTimeout(function(){
    console.log('5') 
},0)  
async1();
new Promise(function(resolve){
    console.log('6')                    // 4
    resolve();
}).then(function(){
    console.log('7')
})
console.log('8')                           // 5  
//4 1 3 6 8 2 7 5 
```

#### 宏任务微任务

浏览器中并不存在宏任务，宏任务（Macrotask）是 Node.js 发明的术语。

浏览器中只有任务（Task）和微任务（Microtask）。

1. 使用 script 标签、setTimeout 可以创建任务。

1. 使用 Promise#then、window.queueMicrotask、MutationObserver、Proxy 可以创建微任务。

执行顺序是怎样的呢？

微任务会在任务间隙执行（俗称插队执行）。

注意，微任务不能插微任务的队，微任务只能插任务的队。

面试题：(https://www.zhihu.com/question/495934384)

```js
// next = [0, 4x, 1, 2, 3, 5, 6]
Promise.resolve()
	.then(() => {
	    console.log(0);
	    return Promise.resolve('4x');
	})
	
	.then((res) => {console.log(res)})
	
Promise.resolve().then(() => {console.log(1);})
                 .then(() => {console.log(2);}, ()=>{console.log(2.1)})
                 .then(() => {console.log(3);})
                 .then(() => {console.log(5);})
                 .then(() => {console.log(6);})
```

#### 浏览器渲染

1. 处理HTML 标记并构建DOM 树。
2. 处理CSS 标记并构建CSSOM 树。
3. 将DOM 与CSSOM 合并成一个**渲染**树。
4. 根据**渲染**树来布局，计算每个节点的几何信息。
5. 将各个节点绘制到屏幕上。

#### 浏览器进程线程

浏览器至少有四个进程：

- 浏览器主进程
- GPU进程
- 网络进程
- 渲染进程

其中渲染进程又有五个线程：

- 主线程（js引擎线程）
- GUI渲染线程
- 事件触发线程
- 定时器触发线程
- http请求线程

## React

#### 虚拟 DOM 的原理是什么？

1. 是什么

   虚拟 DOM 就是虚拟节点（这句汉化很重要）。React 用 JS 对象来**模拟** DOM 节点，然后将其渲染成真实的 DOM 节点。

1. 怎么做

   **第一步是模拟**

   用 JSX 语法写出来的 div 其实就是一个虚拟节点：

   ```jsx
   <div id="x">
     <span class="red">hi</span>
   </div>
   ```

   这代码会得到这样一个对象：

   ```js
   {
     tag: 'div',
     props: {
       id: 'x'
     },
     children: [
       {
         tag: 'span',
         props: {
           className: 'red'
         },
         children: [
           'hi'
         ]
       }
     ]
   }
   ```

   能做到这一点是因为 JSX 语法会被转译为 createElement 函数调用（也叫 h 函数），如下：

   ```js
   React.createElement("div", { id: "x"}, 
     React.createElement("span", { class: "red" }, "hi")
   )
   ```

   **第二步是将虚拟节点渲染为真实节点**

   ```js
   function render(vdom) {
     // 如果是字符串或者数字，创建一个文本节点
     if (typeof vdom === 'string' || typeof vdom === 'number') {
       return document.createTextNode(vdom)
     }
     const { tag, props, children } = vdom
     // 创建真实DOM
     const element = document.createElement(tag)
     // 设置属性
     setProps(element, props)
     // 遍历子节点，并获取创建真实DOM，插入到当前节点
     children
       .map(render)
       .forEach(element.appendChild.bind(element))
   
     // 虚拟 DOM 中缓存真实 DOM 节点
     vdom.dom = element
     
     // 返回 DOM 节点
     return element
   }
   
   function setProps // 略
   function setProp // 略
   
   // 作者：Shenfq
   // 链接：https://juejin.cn/post/6844903870229905422
   ```

   注意，如果节点发生变化，并不会直接把新虚拟节点渲染到真实节点，而是先经过 diff 算法得到一个 patch 再更新到真实节点上。

1. 解决了什么问题

   1. DOM 操作性能问题。通过虚拟 DOM 和 diff 算法减少不必要的 DOM 操作，保证性能不太差

   2. DOM 操作不方便问题。以前各种 DOM API 要记，现在只有 setState

2. 优点

   1. 为 React 带来了跨平台能力，因为虚拟节点除了渲染为真实节点，还可以渲染为其他东西。

   2. 让 DOM 操作的整体性能更好，能（通过 diff）减少不必要的 DOM 操作。

3. 缺点

   1. 性能要求极高的地方，还是得用真实 DOM 操作（目前没遇到这种需求）

   2. React 为虚拟 DOM 创造了合成事件，跟原生 DOM 事件不太一样，工作中要额外注意
      1. 所有 React 事件都绑定到根元素，自动实现事件委托
      2. 如果混用合成事件和原生 DOM 事件，有可能会出 bug

4. 如何解决缺点

​	不用 React，用 Vue 3（笑）

#### React 或 Vue 的 DOM diff 算法是怎样的？

1. 是什么

   DOM diff 就是对比两棵虚拟 DOM 树的算法（废话很重要）。当组件变化时，会 render 出一个新的虚拟 DOM，diff 算法对比新旧虚拟 DOM 之后，得到一个 patch，然后 React 用 patch 来更新真实 DOM。

1. 怎么做

   1. 首先对比两棵树的根节点

      1. 如果根节点的类型改变了，比如 div 变成了 p，那么直接认为整棵树都变了，不再对比子节点。此时直接删除对应的真实 DOM 树，创建新的真实 DOM 树。

      1. 如果根节点的类型没变，就看看属性变了没有

         1. 如果没变，就保留对应的真实节点

         1. 如果变了，就只更新该节点的属性，不重新创建节点。
            1. 更新 style 时，如果多个 css 属性只有一个改变了，那么 React 只更新改变的。

   1. 然后同时遍历两棵树的子节点，每个节点的对比过程同上。

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

         你会发现其实只需要创建 A 文本，保留 B 和 C 即可，为什么 React 做不到呢？

         因为 React 需要你加 key 才能做到：

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
   
   1. 根据 React 文档中给出的场景反复在大脑中运行代码
   
      1. 场景0：单个节点，会运行到 reconcileSingleElement。接下来看多个节点的情况。
   
      1. 场景1：没 key，标签名变了，最终会走到 createFiberFromElement（存疑）
   
      1. 场景2：没 key，标签名没变，但是属性变了，最终走到 updateElement 里的 useFiber
   
      1. 场景3：有 key，key 的顺序没变，最终走到 updateElement
   
      1. 场景4：有 key，key 的顺序变了，updateSlot 返回 null，最终走到 mapRemainingChildren、updateFromMap 和 updateElement(matchedFiber)，整个过程较长，效率较低

#### React 有哪些生命周期钩子函数？数据请求放在哪个钩子里？

https://reactjs.org/docs/react-component.html#the-component-lifecycle官方文档

https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/图

<img src="http://octane.oss-cn-beijing.aliyuncs.com/img/image-20220817201536017.png" alt="image-20220817201536017" style="zoom:100%;" />

总得来说：

1. 挂载时调用 constructor，更新时不调用

2. 更新时调用 shouldComponentUpdate 和 getSnapshotBeforeUpdate，挂载时不调用

3. should... 在 render 前调用，getSnapshot... 在 render 后调用

4. 请求放在 componentDidMount 里，如果是SSR，在render及render之前的都会在服务端执行，最好写博客，容易忘。

#### React 如何实现组件间通信

1. 父子组件通信：props + 函数

2. 爷孙组件通信：两层父子通信或者使用 Context.Provider 和 Context.Consumer

3. 任意组件通信：其实就变成了状态管理了

   1. Redux 

   2. Mobx

   3. Recoil

#### 你如何理解 Redux？

1. 文档第一句话背下来：Redux 是一个状态管理库/状态容器。 

2. 把 Redux 的核心概念说一下：

   1. State

   2. Action = type + payload 荷载

   3. Reducer 

   4. Dispatch 派发

   5. Middleware

3. 把 ReactRedux 的核心概念说一下：

   1. connect()(Component)，把component和store关联

   3. mapStateToProps

   3. mapDispatchToProps

4. 说两个常见的中间件 redux-thunk redux-promise redux-saga

https://www.bilibili.com/video/BV1dm4y1R7RK?from=search&seid=8579266903295629745&spm_id_from=333.337.0.0

#### 什么是高阶组件 HOC？

参数是组件，返回值也是组件的函数。什么都能做，所以抽象问题就具体回答。

举例说明即可：

1. React.forwardRef

2. ReactRedux 的 connect

3. ReactRouter 的 withRouter

参考阅读：[「react进阶」一文吃透React高阶组件(HOC) - 掘金 (juejin.cn)](https://juejin.cn/post/6940422320427106335#heading-0)

#### React Hooks 如何模拟组件生命周期？

1. 模拟 componentDidMount

2. 模拟 componentDidUpdate

3. 模拟 componentWillUnmount

代码示例如下：

```jsx
import { useEffect,useState,useRef } from "react";
import "./styles.css";

export default function App() {
  const [visible, setNextVisible] = useState(true)
  const onClick = ()=>{
    setNextVisible(!visible)
  }
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {visible ? <Frank/> : null}
      <div>
        <button onClick={onClick}>toggle</button>
        </div>
     
    </div>
  );
}
// useEffect的第二个参数就是监听谁的变化
function Frank(props){
  const [n, setNextN] = useState(0)
  const first = useRef(true)
  useEffect(()=>{
    // 如果是第一次render，那就不触发did update
    if(first.current === true ){
      return
    }
    console.log('did update')
  })
  useEffect(()=>{
    console.log('did mount')
    first.current = false
    return ()=>{
      console.log('did unmount')
    }
  }, [])
  
  const onClick = ()=>{
    setNextN(n+1)
  }
  return (
    <div>Frank
      <button onClick={onClick}>+1</button>
    </div>
  )
}
```

完。
