/**
 * 枚举————火柴棍等式
 * 现在小哼有n根火柴棍，希望拼出形如 A + B = C 的等式。等式中的A、B、C均是用火柴棍拼出来的整数（若该数非零，则最高位不能是0）
 * 例如现在小哼手上有14根火柴棍，则可以拼出两种不同的等式 0 + 1 = 1 和 1 + 0 = 1
 * 注意:
 * 1.加号与等号各自需要两根火柴棍
 * 2.如果A!==B，则 A + B = C 与 B + A = C 视为不同的等式
 * 3.所有火柴棍必须全部用上
 */

// 用来计算一个数所需要用火柴棍的总数
function fun(x) {
    let num = 0 // 用来计数的变量
    const arr = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6] // 用一个数组来记录0~9每个数字需要用到多少根火柴棍
    while (x.toString().split('').length > 1) { // 如果x的长度大于1，说明这个数至少有两位
        const splited = x.toString().split('')
        const len = splited.length
        num += arr[splited.slice(-1)[0]] // 获得x的末尾数字并将此数所需要用到的火柴棍根数累加到num中
        x = splited.slice(0, len - 1).join('') // 去掉x的末尾数字
    }
    num += arr[x] // 最后加上此时x所需用到的火柴棍的根数（此时x一定是一位数）
    return num
}

function matchstickEquation(m) {
    let a, b, c, sum = 0
    console.log('读入火柴棍的个数:', m)

    // 开始枚举a和b
    for (a = 0; a <= 1111; a++) {
        for (b = 0; b <= 1111; b++) {
            c = a + b // 计算出c
            // 当a使用的火柴棍根数 + b使用的火柴棍根数 + c使用的火柴棍根数之和恰好等于m-4时，则成功地找出了一组解
            if (fun(a) + fun(b) + fun(c) === m - 4) {
                console.log(`${a} + ${b} = ${c}`)
                sum++
            }
        }
    }
    console.log(`一共可以拼出${sum}个不同的等式`)
}

matchstickEquation(18)
