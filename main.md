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