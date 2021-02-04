/**
 * 暂存性死区是相对于某一个变量来说的，就是在定义该变量之前的区域就是暂存性死区
 * let是在编译的时候才会初始化，因此当使用let声明变量时，
 * 在声明所在块中，作用域会先将let声明的变量创建出来，
 * 但没有进行初始化，也就是语法绑定，所以从块顶部到初始化处理中调用let声明的变量就会报错，
 * 这就是"暂存死区"。
 */

let mokey = 'monkey'
{
  // 死区开始
  console.log(mokey) // 此处的mokey有这个变量了，但是没初始化，既拿不到下面的，也拿不到块外面的mokey。
  //  Cannot access 'mokey' before initialization
  // 死区结束
  let mokey = 'i am mokey too'
}
console.log(monkey) //  monkey is not defined


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
// var CST = {}
// Object.defineProperty(CST, 'A', {
//     value: 1,
//     writeble: false
// })
// CST.A =2
// console.log(CST) // {A: 1} 以上保证A不能被修改，但CST仍可扩展

// Object.seal(CST)
// CST.B = 2
// console.log(CST) // {A: 1} seal:保CST不能被扩展，但CST属性仍可修改

// 扩展，es5实现一个常量方法
// 1. 遍历属性和方法
// 2. 修改遍历到的属性的描述
// 3. Object.seal()

// Object.defineProperty(Object, 'freezePolyfill', {
//     value: function(obj) {
//       var i;
//       for (i in obj) {
//         if (obj.hasOwnProperty(i)) {
//           Object.defineProperty(obj, i, {
//             writable: false
//           });
//         }
//       }
//       Object.seal(obj);
//     }
//   });
  
//   const xiaoming = {
//     age: 14,
//     name: '小明',
//     obj: {
//       a: 1
//     }
//   };
  
//   Object.freezePolyfill(xiaoming);