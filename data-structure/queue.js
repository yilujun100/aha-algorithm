// 实现队列：遵循先进先出原则
class Queue {
    constructor() {
        this.count = 0 // count属性用来控制队列的大小
        this.lowestCount = 0 // 追踪队列第一个元素
        this.items = {} // 为了更高效的获取元素，我们使用一个对象来存储我们的元素
    }
    // 入队：向队列尾部添加一个（或多个）新的项
    enqueue(item) {
        this.items[this.count] = item
        this.count = this.count + 1
    }
    // 出队：移除队列的第一项（即排在队列最前面的项）并返回被移除的元素
    dequeue() {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this.items[this.lowestCount]
        delete this.items[this.lowestCount]
        this.lowestCount = this.lowestCount + 1
        return result
    }
    // 返回队列中第一个元素————最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）。该方法在其他语言中也可以叫作front方法
    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.lowestCount]
    }
    // 判断是否为空队列：如果队列中不包含任何元素，返回true，否则返回false
    isEmpty() {
        return this.size() === 0
    }
    // 返回队列包含的元素个数
    size() {
        return this.count - this.lowestCount
    }
    // 清空队列
    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }
}

export default Queue
