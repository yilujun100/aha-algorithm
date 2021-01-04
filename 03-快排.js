/**
 * 快速排序
 * created by yilujun on 2020-12-16
 */

// 实现方式一:
// 1.在数据集中选择一个元素作为基准
// 2.所有小于基准的元素，都移到基准的左边；所有大于基准的元素都移到基准的右边
// 3.对基准左边和右边两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止
// 时间复杂度：O(NlogN)
// 优点：更容易理解
// 缺点：空间占用太多
function quickSort(arr) {
    if (arr.length <= 1) { return arr }
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}
// console.log(quickSort([6, 1, 2, 7, 9, 3, 4, 5, 10, 8]))

// 实现方式二：
// 分别从初始序列两端开始"探测"，先从右往左找一个比基准数小的数，在从左往右找一个比基准数大的数，然后交换它们
// 当i,j相遇时，此时"探测"结束，交换基准数，那么此时基准数就已经归位，然后对以基准数为分界点拆分的两个序列执行相同的操作即可
function quickSort1(arr) {
    if (arr.length <= 1) {
        return arr
    }
    let i, j, temp, pivot
    i = 0
    j = arr.length - 1
    pivot = arr[0] // 基准数
    while (i !== j) {
        // 注意这里顺序很重要，要先从右往左找
        while (arr[j] >= pivot && i < j) {
            j--
        }
        // 再从左往右找
        while (arr[i] <= pivot && i < j) {
            i++
        }
        // 交换两个数在数组中的位置
        if (i < j) { // 当i和j没有相遇时
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    let left = arr.slice(1, i + 1)
    let right = arr.slice(i + 1)
    return [...quickSort1(left), pivot, ...quickSort1(right)]
}
const items = [6, 1, 2, 7, 9]
console.log(quickSort1(items))