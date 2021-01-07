/**
 * 栈、队列应用————纸牌游戏"小猫钓鱼"
 * 游戏规则：将一副扑克牌平均分成两份，每人拿一份。玩家U1先拿出手中的第一张扑克牌放在桌上，然后玩家U2也拿出手中的第一张扑克牌，并放在玩家U1刚打出的扑克牌上面，
 * 就像这样两个玩家交替出牌。出牌时，如果某人打出的牌与桌上某张牌的牌面相同，即可将两张相同的牌及其中间所夹的牌全部取走，并依次放到自己手中牌的末尾。
 * 当任意一个人手中的牌全部出完时，游戏结束，对手获胜。
 * 现在要求写一个算法来模拟这场游戏，并判断出谁最后获胜，获胜的同时打印出获胜者手中的牌以及桌上可能剩余的牌。
 * 在写程序开始前，我们暂且先做一个约定，玩家U1和U2手中牌的牌面值只有1~9
 */

// 解法思路：
// 我们可以先分析一下这个游戏存在哪几种操作。玩家U1有两种操作，分别是出牌和赢牌，出牌时将手中的牌打出去，赢牌的时候将桌上的牌放到手中牌的末尾，这恰好对应了队列的两个操作，
// 出牌就是队列出队，赢牌就是队列入队。玩家U1和玩家U2的操作是一样的。而桌子很明显就可以看作是一个栈，玩家每打出一张牌就放到桌上，相当于入栈，因为顺序是往后的，当有人赢牌
// 的时候，依次将牌从桌上拿走，这就相当于出栈。那如何判断是否赢牌呢？赢牌的判断就是：如果某人打出的牌与桌上的某张牌相同，即可将两张牌及其中间的所夹的牌全部取走。那如何知道
// 桌上现在有哪些牌呢，很容易想到的就是每次打出牌之后遍历一遍桌上已有的牌然后比对，存在相同的牌则算赢牌。这是简单而且粗暴一点的方法，其实有更好的方法，那就是用桶来解决这个
// 问题，牌面值只有1-9，我们可以设置一个大小为10的数组作为桶，每打出一张牌，就以此牌的牌面值作为下标找到数组对应的位置，如果该位置存在值，则说明桌上有存在的牌，如果没有值，
// 则说明桌上没有相同的牌，同时在桶上做标记，即数组该下标位置设置为1。那如果赢牌了，桌上的牌拿走了桶应该怎么办呢？也很简单，出栈的时候依次按照牌面值清空桶就行了。最终怎么
// 判断哪个玩家获得最终胜利呢，获得最终胜利的标准就是对手手上已经没牌了，如果从队列角度看，那就是头指针和尾指针相等了。
// 从上面的思路分析可以看出，为了模拟这场游戏，我们需要准备两个队列、一个栈和一个桶，分别表示玩家U1U2手中的牌、桌上的牌以及桌上牌的牌面值。

import Stack from './stack.js'
import Queue from './queue.js'

function catFishingGame() {
    // Step 1.初始化队列和栈

    // 两人手中都没有牌，初始化两个空的队列
    const q1 = new Queue()
    const q2 = new Queue()

    // 初始情况下桌上也没有牌，初始化一个空的栈
    const desktop = new Stack()

    // 依次读入两人最初手中的牌，假设两人有相同张数，每张牌的大小为1~9
    const u1 = [2, 4, 1, 2, 5, 6]
    const u2 = [3, 1, 3, 5, 6, 4]
    const len = u1.length

    // 同时插入两个用户数据，队列尾指针往后移动
    for (let i = 0; i < len; i++) {
        q1.enqueue(u1[i])
        q2.enqueue(u2[i])
    }

    // Step 2.初始化一个桶，用来记录栈中数据

    // 判断桌上是否存在相同的牌，可以往栈里面遍历，也可以巧妙地使用桶的方式来处理
    // 用牌面值作为数组下标找到桶的位置，出牌入栈时就设置为1，如果下次出牌遇到桶里这个位置存在值，
    // 则说明牌值重复，可以赢得之前这张牌之间的所有牌，桶用完之后，出栈时需要把桶同步清理
    const book = new Array(10).fill(0)

    // Step 3.开始游戏，双方发牌并判断是否赢牌

    // 准备工作完成，游戏开始，u1先出牌
    // 当两个人手上都有牌时，继续游戏，即当队列不为空时，继续循环
    while (!q1.isEmpty() && !q2.isEmpty()) {
        // u1出牌
        play(q1, desktop, book)
        if (q1.isEmpty()) {
            break
        }

        // u1出牌结束后，轮到u2开始出牌，逻辑步骤和u1是一样的
        play(q2, desktop, book)
    }

    // Step 4.游戏结束，看谁手上没牌，没牌则对方获胜

    // 谁手上先没牌，则表示对方赢牌，没牌的标准就是队列首尾指针相等
    if (q1.isEmpty()) {
        win('u2', q2, desktop)
    } else {
        win('u1', q1, desktop)
    }
}

/**
 * 赢得胜利的打印输出方法
 * @param {string} user 打牌的用户
 * @param {Queue} q 打牌用户手中的牌，即表示手中牌的队列
 * @param {Stack} desktop 打牌放牌的桌子，即栈
 */
function win(user, q, desktop) {
    console.log(`${user} win. the cards in the ${user}'s hand is: `)
    for (let k = q.lowestCount; k < q.count; k++) {
        console.log(q.items[k] + ' ')
    }
    // 桌上是否还有牌，有牌则打印出来
    if (!desktop.isEmpty()) {
        console.log('\nThe cards on the desktop is: ')
        for (let k = 0; k < desktop.count; k++) {
            console.log(desktop.items[k] + ' ')
        }
    }
}

/**
 * 开始打牌的方法，谁打牌，谁就会调用这个方法
 * @param {Queue} q 打牌用户手中的牌，即表示手中牌的队列，谁打牌就是谁的队列
 * @param {Stack} desktop 打牌放牌的桌子，即栈
 * @param {Array<number>} book 记录桌子上已有牌的记录本，即数据桶
 */
function play(q, desktop, book) {
    // u1出一张牌，从q队列中出队一个值
    const t = q.peek()

    // 判断当前打出的牌能否赢牌，即看桶中是否存在相同的值
    // 如果桶中不存在，则表示桌上没有相同的牌，u1没有赢，出队的牌入栈
    if (book[t] === 0) {
        // 出队
        q.dequeue()
        // 入栈
        desktop.push(t)
        // 桶记录
        book[t] = 1
    } else {
        // 桶中存在相同值，u1赢牌
        // u1出牌，所以出队
        q.dequeue()
        // 将u1出的牌放到自己末尾，同时能够拿桌上剩下的牌
        q.enqueue(t)
        // 桌上出栈的临时值
        let n
        // 逐步拿起桌上的牌进行比对，比对到和刚刚放下去的那张牌相同为止，拿牌之后放在自己牌的末尾
        // 逐步将出栈的值与刚刚出队的值比对，出栈的同时下移指针，两个值不相同则继续循环
        do {
            n = desktop.pop()
            q.enqueue(n)
            // 因为栈中的牌拿走了，所以将桶清理干净
            book[n] = 0
        } while (n !== t)
    }
}

console.log(catFishingGame())
