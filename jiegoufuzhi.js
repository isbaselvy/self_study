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