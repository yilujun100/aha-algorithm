/**
 * 解密回文————栈
 * 栈是一种后进先出的数据结构。栈限定为只能在一端进行插入和删除操作。
 * 生活中也有很多这样的例子，比如我们在吃桶装薯片的时候，要想吃掉最后一片，就必须把前面的全部吃完；再比如浏览网页的时候需要退回到之前的某个网页，我们需要一步步地点击后退键。
 * 还有手枪的弹夹，在装子弹的时候，最后装入的那发子弹，是被第一个打出去的。
 * 栈的实现也很简单，只需要一个一维数组和一个指向栈顶的变量top就可以了。我们通过top来对栈进行插入和删除操作
 * 回文字符串：所谓回文字符串就是指正读反读都是相同的字符序列，如"席主席"、"记书记"、"aha"和"ahaha"均是回文，但"ahah"不是回文。
 */

function validPalindrome(str) {
    const s = []
    const a = str.split('')
    let i, len, mid, next, top
    len = str.length
    mid = len % 2 === 0 ? len / 2 : (len - 1) / 2 // 如果一个字符串是回文的话，那么它必须是中间对称的，我们需要求中点
    top = 0 // 栈的初始化
    // 将mid之前的字符全部入栈
    for (i = 0; i < mid; i++) {
        s[++top] = a[i]
    }
    // 判断字符串的长度是奇数还是偶数，并找出需要进行字符匹配的起始下标
    if (len % 2 === 0) {
        next = mid
    } else {
        next = mid + 1
    }
    // 开始匹配
    for (i = next; i < len; i++) {
        if (a[i] !== s[top]) {
            break
        }
        top--
    }
    // 如果top的值为0，则说明栈内所有的字符都被一一匹配到了
    if (top === 0) {
        return true
    } else {
        return false
    }
}
console.log(validPalindrome('ahaha'))