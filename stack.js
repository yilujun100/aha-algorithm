// 数组实现栈：遵循后进先出原则
// 存在问题：items、count属性是暴露的，我们可以在外部直接去修改这两个属性值，比如从中间删除或添加元素。但我们操作的是栈，不应该出现这种行为
// 解决方案：
// 1.下划线命名约定：就是在属性名称之前加上一个下划线（_）。不过这种方式只是一种约定，并不能保护数据，而且只能依赖于使用我们代码的开发者所具备的常识。
// 2.用es6的限定作用域Symbol实现类
/* const _items = Symbol('stackItems') // 声明Symbol类型的变量_items
class Stack {
    constructor() {
        this[_items] = [] // 在类的constructor函数中初始化它的值。要访问_items，只需要把所有的this.items都换成this[_items]
    }
} */
// 这种方法创建了一个假的私有属性，因为es6新增的 Object.getOwnPropertySymbols 方法能够获取到类里面声明所有 Symbols 属性。
// 3.用es6的 WeakMap 实现类：有一种数据类型可以确保属性是私有的，这就是 WeakMap。WeakMap 可以存储键值对，其中键是对象，值可以是任意数据类型。
/* const items = new WeakMap() // 声明一个 WeakMap 类型的变量 items
class Stack {
    constructor() {
        items.set(this, []) // 在 constructor 中，以 this(Stack类自己的引用)为键，把代表栈的数组存入 items
    }
    push(item) {
        const s = items.get(this) // 从WeakMap中取出值，即以 this 为键从 items 中取值
        s.push(item)
    }
    pop() {
        const s = items.get(this)
        const r = s.pop()
        return r
    }
    // 其他方法
} */
// items 在 Stack 类中是真正的私有属性。采用这种方法，代码的可读性不强，而且在扩展该类时无法继承私有属性。
// 4.ECMAScript类属性提案：TypeScript 提供了一个给类属性和方法使用的 private 修饰符。然而，该修饰符只在编译时有用。在代码被转移完成后，属性同样是公开的。
// 有一个关于在 JavaScript 类中增加私有属性的提案，我们可以通过在属性前添加井号(#)作为前缀来声明私有属性。
class Stack {
    constructor() {
        this.items = []
        this.count = 0
    }
    // 压栈：添加一个（或几个）新元素到栈顶
    push(item) {
        this.items.push(item)
        this.count = this.count + 1
    }
    // 弹栈：移除栈顶的元素，同时返回被移除的元素
    pop() {
        if (this.count > 0) {
            this.count = this.count - 1
        }
        return this.items.pop()
    }
    // 返回栈顶元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
    peek() {
        return this.items.slice(-1)[0]
    }
    // 判断是否为空栈：如果栈里没有任何元素就返回true，否则返回false
    isEmpty() {
        return this.count === 0
    }
    // 移除栈里的所有元素
    clear() {
        this.items = []
        this.count = 0
    }
    // 返回栈里的元素个数
    size() {
        return this.count
    }
}

export default Stack
