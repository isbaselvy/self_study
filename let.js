// let mokey = 'monkey'
// {
//     // console.log(mokey) // Cannot access 'mokey' before initialization
//     // let mokey = 'i am mokey too'
// }
// console.log(monkey) //  monkey is not defined

// for (let index = 0; index < 10; index++) {
//     setTimeout(function (params) {
//         console.log(index) // 0,1,...,9
//     })
// }

// for (var index = 0; index < 10; index++) {
//     setTimeout(function (params) {
//         console.log(index) // 10 (10次)
//     })
// }

// const xiaoming = {age: 11}
// console.log(xiaoming) // let.js:21 {age: 11}
// xiaoming.sex='male'
// console.log(xiaoming) // {age: 11, sex: "male"}
// Object.freeze(xiaoming)
// xiaoming.age=13
// console.log(xiaoming) // {age: 11, sex: "male"}

// ES6前如何定义常量
var CST = {}
Object.defineProperty(CST, 'A', {
    value: 1,
    writeble: false
})
CST.A =2
console.log(CST) // {A: 1} 以上保证A不能被修改，但CST仍可扩展

Object.seal(CST)
CST.B = 2
console.log(CST) // {A: 1} seal:保CST不能被扩展，但CST属性仍可修改