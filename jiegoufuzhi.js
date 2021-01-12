// 数组的解构赋值
// let arr = ['a', 'b', ['c', 'd', ['e', 'f', 'g']]]
// let [a] = arr
// console.log(a) // 'a'

// let [,, [,, [, , g]]] = arr
// console.log(g) // g

// 扩展运算符
// const arr1 = [1,2]
// const arr2 = ['a', 'b']
// let arr3 = [...arr1, ...arr2]
// console.log(arr3) // [1, 2, "a", "b"]
// let [a,b,...c, ...d] = [1, 2, "a", "b"] // c: ["a", "b"] 扩展运算符在解构赋值时只能位于最后一个且只能有一个
// 默认值：解构赋值的若没匹配到，会给一个默认值undefined
// const [a, b,c,d] = [1, undefined, 2] // a 1, b undefined, c 2, d undefined const必须赋值,未报错

// const [a, b = 3, c, d='aaa'] = [1, undefined, 2] // 可用等号给变量赋初值

// 交换变量
// let a = 20;
// let b = 1; // 需加分号，否则报错b未初始化

// [a, b] = [b, a] // b 20, a 1

// function getRes(id) {
//     return [
//         true,
//         {name: 'xiaoming'},
//         id
//     ]    
// }

// const [code, obj, id] = getRes(1)
// console.log(code, obj, id) // true {name: "xiaoming"} 1

// 对象的结构赋值
// const {name, age} = {name:'xiaoming', age:18}
// console.log(name, age) // xiaoming 18

// 对象的结构赋值是根据属性来匹配的，变量名需和key保持一致
// const {name, age2} = {name:'xiaoming', age:18}
// console.log(name, age2) // xiaoming undefined 

// 如需将变量换一个名称，则在key后加冒号，冒号后跟新的变量名，取出的结构赋值将会赋值给新变量
// const {name, age:age2} = {name:'xiaoming', age:18}
// console.log(name, age2) // xiaoming 18

let obj = {
    key1: { name: '1'},
    key2: { name: '2'},
    key3: [{skillName: 'js'}, {skillName: 'java'}]
}
// const {key1, key2, key3: [skill]} = obj // 获取不到key3
const {key1, key2, key3: [{skillName}, {skillName:skillName2}]} = obj // skillName "js", skillName2 "java"

// 对象的解构赋值
// 结合扩展运算符 
// 取值
// const obj = {
//     name: 'xiaoming',
//     age: 19,
//     gender: 'male',
//     love: ['dad', 'mom']
// }

// const {name, ...oth} = obj
// // console.log(name, oth) // xiaoming {age: 19, gender: "male"}

// // 合并对象
// let obj2 = {interest: 'fottball', ...obj}
// console.log(obj2) // {interest: "fottball", name: "xiaoming", age: 19, gender: "male"}
// obj.name = 'xiaofang'
// console.log(obj2) // name不变 {interest: "fottball", name: "xiaoming", age: 19, gender: "male"}

// obj.love[0] = ['hhh']
// console.log(obj2) // love改变， ...合并对象，对元素非引用类型时是深拷贝，反正浅拷贝

// 如何向已声明的变量进行解构赋值
// let age;
// const obj = {
//     name: 'xiaoming',
//     age: 19,
//     gender: 'male'
// };
// // { age } = obj // 报错,此时{}被当作的块级作用域
// ({ age } = obj) // 不推荐，作为了解
// console.log(age) // 19

// // 默认值
// const {name, hobby = '学习', gf = undefined } = obj
// console.log(name, hobby, gf) // xiaoming 学习 undefined

// 常用场景
// 1.提取对象属性
// const obj = {
//     name: 'xiaoming',
//     age: 19,
//     gender: 'male',
//     love: ['dad', 'mom']
// }
// const {name, love : hobby, love: [dad] } = obj
// console.log(name, hobby, dad) // xiaoming (2) ["dad", "mom"] dad

// 2.传入乱序的函数参数
// function AJAX({
//     url,
//     param,
//     type = 'get'
// }) {
//     console.log(type) // get
// }

// AJAX({
//     param: {id: 1},
//     url:'/getInfo'
// })

// 3.获取多个函数返回值
// function getInfo(id) {
//     return {
//         name: 'xiaoming',
//         data: {id},
//         msg:'succeess'
//     }
// }

// const {name, data, msg:message} = getInfo(1)
// console.log(name, data, message) // xiaoming {id: 1} succeess

// 字符串的解构赋值
// let str = 'i am jack'
// const [a, b, ...oth] = str
// console.log(a, b, oth) // i b是个空  (7) ["a", "m", " ", "j", "a", "c", "k"]

// // str1, str2, str3等价 ["i", " ", "a", "m", " ", "j", "a", "c", "k"]
// const str1 = [...str]
// const str2 = str.split("")
// const [...str3] = str

// // 提取属性
// const {length, split} = str
// let test = split.call('1,2,3', '')
// console.log(test)

// 数值与布尔值的结构赋值
// const { valueOf } = 1 
// // valueOf输出是一个函数，1本身没有valueOf方法，调用会报错，此处 可解析出来是结构赋值时会先将数值转成一个包装对象 number
// // Number(1).valueOf() 1, 1.valueOf 报错
// const { toString } = false
// let str = 'jack'
// console.log(str.length) // 4
// str.a = '1'
// console.log(str.a) // undefined

// 函数参数的解构赋值
// function swap([x, y]) {
//     return [y, x]
// }
// const [a, b] = swap([3, 4])  // a 4, b 3
// 以下这种同上，因args是一个类数组，所以自动结构赋值？
// function swap(x, y) {
//     return [y, x]
// }
// const [a, b] = swap(3, 4)  // a 4, b 3