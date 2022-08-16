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

#### CSS选择器优先级如何确定

> 写博客总结，面试甩链接

这是css2的http://www.ayqy.net/doc/css2-1/cascade.html#specificity

如果记不住，可以记下这三句话：

1. 选择器越具体，其优先级越高

1. 相同优先级，出现在后面的，覆盖前面的

1. 属性后面加 !important 的优先级最高，但是要少用

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

## JS

### 基础

#### JS的数据类型有哪些

纯记忆题

字符串，数字，布尔，null，undefined，object，symbol，bigint

string, number, boolean ...

>  为什么需要bigint：js的number是64位的双精度浮点数，精度有限，bigint是无限的
>
> bigint用法（数字后面加个n）

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

|          | 缓存（强缓存）                                               | 内容协商缓存（弱缓存）                                       |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| HTTP 1.1 | **Cache-Control**: max-age=3600 **Etag**: ABC                | **If-None-Match**: ABC **响应状态码**：304 或 200            |
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
