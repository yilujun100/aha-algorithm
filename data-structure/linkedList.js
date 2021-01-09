/**
 * 链表：链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。
 * 相对于传统的数组，链表的一个好处在于，添加和移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。在数组中我们可以直接访问任何位置
 * 的任何元素，而要想访问链表中间的一个元素，则需要从起点（表头）开始迭代链表直到所需元素。
 * 现实中也有一些链表的例子，比如火车。一列火车是由一系列车厢组成的。每节车厢或车皮都相互连接。你很容易分离一节车皮，改变它的位置、添加或移除它。
 */

import { defaultEquals } from './../util.js'
import { Node } from './../linked-list-models.js'

class LinkedList {
    constructor(equalsFn = defaultEquals) { // equalsFn用来比较链表中的元素是否相等。使用LinkedList类的开发者可以自行传入用于比较两个JavaScript对象或值是否相等的自定义函数。
        this.count = 0 // count属性用来存储链表中的元素数量
        this.head = null // head属性用来保存第一个元素的引用
        this.equalsFn = equalsFn
    }
    // 向链表尾部添加一个元素
    push(element) {
        const node = new Node(element) // 创建Node项
        let current // 要向链表的尾部添加一个元素，首先需要找到最后一个元素。记住，我们只有第一个元素的引用，因此需要循环访问列表，直到找到最后一项。为此我们需要一个指向链表中current项的变量
        if (this.head === null) { // head元素为undefined或null(列表为空)，就意味着在向链表添加第一个元素
            this.head = node
        } else {
            current = this.head
            while (current.next !== null) { // 获取最后一项
                current = current.next
            }
            // 将其next赋为新元素，建立链接
            current.next = node
        }
        this.count = this.count + 1
    }
    // 向链表特定位置插入一个新元素
    insert(element, index) {
        if (index >= 0 && index < this.count) {
            const node = new Node(element)
            if (index === 0) { // 在链表的起点添加一个元素，也就是第一个位置
                const current = this.head
                node.next = current
                this.head = node
            } else { // 在链表中间或尾部添加一个元素
                const previous = this.getElementAt(index - 1)
                const current = previous.next
                node.next = current
                previous.next = node
            }
            this.count = this.count + 1
            return true
        }
        return false // 如果index越界了，就返回false值，表示没有添加元素到链表中
    }
    // 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined
    getElementAt(index) {
        if (index >= 0 && index < this.count) {
            let node = this.head
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next
            }
            return node
        }
        return undefined
    }
    // 从链表中移除一个元素
    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }
    // 返回元素在链表中的索引。如果链表中没有该元素则返回-1
    indexOf(element) {
        let current = this.head
        for (let i = 0; i < this.count && current !== null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }
    // 从链表的特定位置移除一个元素
    removeAt(index) {
        // 检查越界值
        if (index >= 0 && index < this.count) {
            let current = this.head

            // 移除第一项
            if (index === 0) {
                this.head = current.next
            } else {
                /* let previous // 当前元素的前一个元素的引用
                for (let i = 0; i < index; i++) {
                    previous = current
                    current = current.next
                    // console.log('遍历查找元素:', previous, current)
                } */
                const previous = this.getElementAt(index - 1)
                current = previous.next
                // 将previous与current的下一项链接起来；跳过current，从而移除它
                previous.next = current.next
            }
            this.count = this.count - 1
            return current.element
        }
        return undefined
    }
    // 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false
    isEmpty() {
        return this.size() === 0
    }
    // 返回链表包含的元素个数
    size() {
        return this.count
    }
    // 返回链表的第一个元素
    getHead() {
        return this.head
    }
    // 返回表示整个链表的字符串
    toString() {
        if (this.head === null) { // 这里也可以使用this.isEmpty()来进行判断
            return ''
        }
        let objString = `${this.head.element}`
        let current = this.head.next
        for (let i = 1; i < this.size() && current !== null; i++) {
            objString = `${objString},${current.element}`
            current = current.next
        }
        return objString
    }
}

export default LinkedList
