/**
 * 桶排序(简化版)
 * created by yilujun on 2020-12-16
 */
// 输入数据为：5 3 5 2 8 输出结果为：2 3 5 5 8
// 该算法的时间复杂度是O(2*(m+n))。我们在说时间复杂度的时候可以忽略较小的常数，最终桶排序的时间复杂度为O(m+n)。还有一点，在表示时间复杂度的时候，n和m通常用大写字母即O(M+N)
// 缺点：非常浪费空间
function sort(arr) {
    const result = []
    // 初始化一个长度为11的数组，数组每项初始值为0，下标对应分数
    const book = new Array(1001).fill(0)
    // 处理每一个人的分数
    let i, j, t
    for (i = 0; i < arr.length; i++) {
        t = arr[i]
        book[t]++
    }
    for (i = 0; i <= 1000; i++) { // 依次判断a[0]~a[10]
        for (j = 1; j <= book[i]; j++) { // 出现了几次就打印几次
            result.push(i)
        }
    }
    return result
}
console.time('sort')
console.log(sort([8, 100, 50, 22, 15, 6, 1, 1000, 999, 0]))
console.timeEnd('sort')