/**
 * 模板字符串：以反引号包裹，可在其中使用${}包裹变量。
 * 模板字符串内可嵌套使用模板字符串
 * ${}中的变量可以调用函数
 */
// const user = {
//     name: 'xiaoming',
//     age: 18,
//     say: function () {
//         console.log(`i am ${`Mr.${this.name.toUpperCase()}`}, i am ${this.age} years old.`)
//     }
// }
// user.say() // i am Mr.XIAOMING, i am 18 years old.

/**
 * 字符串扩展方法
 * padStart: 在前面补全
 * padEnd： 在后面补全
 * repeat: 重复
 */
// {
//     let str = 'i'
//     let str1 = str.padStart(9, 'mooc')
//     console.log(str1) // moocmooci,如果补的位置本身有，则保持不变，没有则以补位的字符补足
//     let str2 = str.padEnd(5, 'moox')
//     console.log(str2) // imoox
// }

// {
//     // repeat：重复
//     let str = 'i'
//     console.log(str.repeat(10)) // iiiiiiiiii
//     console.log(str.repeat(1.22)) // 会取整
//     console.log(str.repeat(-0.1)) // 取整成0，无输出
//     // console.log(str.repeat(-1.1)) // 报错

//     // 自己实现一个repeat
//     function repeat(str, num) {
//         return new Array(num + 1).join(str)
//     }
//     console.log(repeat('imooc', 3)) // imoocimoocimooc,再完善判断正负，整数
// }

// {
//     // startsWith：以'xx'开头，是返回true，否则false
//     // endsWith: 判断以'xx'结尾，是返回true，否则false
//     let str = 'A promise is a promise'
//     console.log(str.startsWith('A')) // true
//     console.log(str.startsWith('B')) // false

//     console.log(str.endsWith('e')) // true
//     console.log(str.endsWith('E')) // false
// }

// {
//     // includes: 字符串的包含方法，包含返回true，反之false
//     let str = 'A promise is a promise'
//     // if (str.indexOf('promise') !== -1) { // >= -1, = -1的情况可取反来简化
//     if (~str.indexOf('promise')) { // ~x = -(x+1)
//         console.log('存在1')
//     }

//     if (str.includes('promise')) {
//         console.log('存在2')
//     }
// }

/**
 * for...of...遍历字符串
 */
// {
//     let str = 'promise'
//     // =======es6之前===========
//     for(var i = 0, len = str.length; i < len; i++) {
//         console.log(str[i],'---', str.charAt(i))
//     }
//     // ======转成数组后采用数组的遍历方法：forEach,every,some========
//     // let ostr = Array.prototype.slice.call(str)
//     // let ostr = str.split('') // split()不会分割成单个，是['promise']
//     // let ostr = [...str]
//     let [...ostr] = str
//     console.log(ostr)

//     // ======使用for of遍历=============
//     for (let word of str) {
//         console.log(word)
//     }
// }

/**
 * Unicode表示法
 * 是一项标准，包括字符集，编码方案等
 * 为了解决传统的字符编码方案局限而产生，为每种语言的每个字符设定统一且唯一的二进制编码，以满足跨语言，跨平台的文本转换处理要求
 */
// {
//     // js一般只能识别0x0000 - 0xffff之间的字符
//     // \u1f436 是个小狗emoji，浏览器会识别为两个， 1f43为一个字符，6为一个字符，要使识别Unicode，可使用 \u{1f436}
//     console.log('\u1f436') // ὃ6
//     console.log('\u{1f436}') // 🐶
//     // 方法1： codePointAt 获取字符串中对应字符的码点
//     console.log('🐶'.codePointAt(0)) // 128054  
//     console.log('🐶'.codePointAt(0).toString(16)) // 1f436
//     // 方法2： at 取下标字符
//     // console.log('🐶abc'.at(2)) // 兼容性不好，谷歌不支持。便于经工具转译兼容
// }
