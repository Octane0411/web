# CSS居中的几种方法

假设有如下结构

```css
<div class="parent">
	<div class="child">
		demo
	</div>
</div>
```

## 水平居中

### text-align + inline-block

```css
.parent {
  /* text-align会对inline的子级生效，设置为center就会水平居中 */
    text-align: center;
}

.child {
  /* display设置为inline-block子级就不会撑满父级，而是自适应内容 */
    display: inline-block;
  /* text-align会继承，child的子级也会水平居中，如果我们想恢复默认，手动写为左对齐就行了 */
  text-align: left;
}
```

### flex + justify-content

经典

```css
.parent {
    display: flex;
    justify-content: center;
}

.child {
}
```

### flex + margin auto

flex元素也可以支持margin auto, 所以可以这样写

```css
.parent {
    display: flex;
}

.child {
    margin: 0 auto;
}
```

### absoluate + transform

```css
.parent {
  /* 父级设置relative好让子级absolute相对于父级定位 */
    position: relative;
}

.child {
    position: absolute;
  /* left 50%会让子级在正中稍微靠右一点 */
    left: 50%;
  /* translateX百分比相对的是自身，因为前面靠右了，往左挪一点 */
  /* 挪的位置刚好是自身宽的一半*/
    transform: translateX(-50%);
}
```

## 垂直居中

###  flex + align-items

这个应该是最简单的了，直接在父级设置flex和`align-items: center;`

```css
.parent {
    display: flex;
    align-items: center;
}

.child {
}
```

### absoluate + transform

与水平居中类似，父级设置为relative，子级设置为absolute，top设置为50%，这样会让位置稍微偏下一点，用transform往上挪一点。

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 50%;
  /* translateY百分比也是相对于元素自身计算的 */
    transform: translateY(-50%);
}
```

### absolute + margin auto

```css
.parent{
  position: relative
}

.child{
  position: absolute;
  margin: auto;
  /* 把margin撑起来 */
  top: 0;
  bottom: 0;
}
```

### table-cell + vertical-align

vertical-align在table-cell里面生效，所以在给父级设置table-cell，然后vertical-align设置为middle就行了。

```css
.parent6 {
    display: table-cell;
    vertical-align: middle;
}

.child6 {
}
```

## 水平垂直居中

### flex

```css
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

.child {
}
```

### absoluate + transform

前面水平居中，垂直居中都有absoluate + transform方案，结合起来就可以水平垂直居中了：

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### text-align + inline-block + table-cell + vertical-align

```css
.parent {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}

.child {
    display: inline-block;
}
```