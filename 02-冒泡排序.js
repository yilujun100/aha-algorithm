/**
 * 冒泡排序
 * created by yilujun on 2020-12-16
 */
// 冒泡排序的时间复杂度是O(N^2)
function bubbleSort(arr) {
    let i, j, temp, n
    n = arr.length
    // 冒泡排序的核心部分：双重嵌套循环
    for (i = 0; i < n - 1; i++) { // n个数排序，只用进行n-1趟
        for (j = 0; j < n - i; j++) { // 从第1位开始比较直到最后一个尚未归位的数，这里为什么是n-i? 因为已经归位的数无需再进行比较
            if (arr[j] < arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

console.log(bubbleSort([8, 100, 50, 22, 15, 6, 1, 1000, 999, 0]))