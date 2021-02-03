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


/**
 * 正则表达式扩展
 */
// console.log(/^\ud83d/.test('\ud83d\udc36')) // true '\ud83d\udc36'为"🐶"，不加u修饰符会识别成两个字符 \ud83d \udc36
// console.log(/^\ud83d/u.test('\ud83d\udc36')) // false

// y粘连修饰符
// const r1 = /imooc/g // g 全局匹配，会匹配出3个imooc，上下两次的匹配索引不必相连
// const r2 = /imooc/y // y 匹配前两个immoc，下一次的开始索引必须紧接上一次

// const str = 'imoocimooc-imooc'
// console.log(r1.exec(str)) // imooc 
// console.log(r1.exec(str)) // imooc
// console.log(r1.exec(str)) // imooc
// console.log(r1.exec(str)) // null

// console.log(r2.exec(str)) // imooc
// console.log(r2.exec(str)) // imooc
// console.log(r2.exec(str)) // null

/**
 * 数值的扩展你
 */
// 新的进制表示法 0o 0O 十六进制必须以此开头 0b 0B 二进制

// 新的安全数 将parseInt parseFloat  isNaN  isFinite 挂在对象从window变到Number
// Number.parseInt()
// Number.parseFloat()
// Number.isNaN()
// Number.isFinite()

// console.log(NaN == NaN) // false
// 利用以上特性，写一个NaN
// function isNaN(value) {
//     return value !== value
// }
// console.log(isNaN(1.2)) // false
// console.log(isNaN(-NaN)) // true
// console.log(isNaN('str' + 1)) // false

/**
 * isFinite() 函数用于检测指定参数是否为无穷大。
提示： 如果 number 是 NaN（非数字），或者是正、负无穷大的数，则返回 false。
Number.isFinite() 与全局的 isFinite() 函数不同，全局的 isFinite() 会先把检测值转换为 Number ，然后在检测。
Number.isFinite() 不会将检测值转换为 Number对象，如果检测值不是 Number 类型，则返回 false。
 */
// console.log(Number.isFinite(Infinity)) // false
// console.log(Number.isFinite(2/0)) // false
// console.log(Number.isFinite(1/3)) // true
// console.log(Number.isFinite('1234')) // false
// console.log(isFinite('1234')) // false
// console.log(Number.isFinite(1234)) // true

// Number.isSafeInteger判断一个数是否在js能精确表示的范围内，及2**53 - 1和 -(2**53 - 1)之间
// console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER - 1)) // true
// console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)) // false

// 幂运算：注意 是右结合的运算
// console.log( 2 ** 10) // 1024
// console.log( 2 ** 10 ** 0) // 2 先算10的0次方
// console.log( (2**10) ** 0) // 1

/**
 * 函数的扩展
 */
// 默认参数
// function add(x, y = 99 + x, z) { // 默认参数不能出现之后的参数
//     console.log(x, y, z) // 1 100 undefined
// }

// add(1)

// // 结合结构赋值
// function People({name, age = 19} = {name: 1}) {
//     console.log(name, age) // 1 19
// }
// People()

// 2.结合扩展运算符(剩余参数...)，剩余参数做聚合

// function sum(...args) {
// 	// let args = Array.prototype.slice.call(arguments);
// 	// let args = [...arguments];
// 	// let [...args] = arguments;
// 	console.log(args);
// }

// sum(1, 2, 321, 4354, 'fdafsd');


// function op(type, b, ...nums) {
// 	console.log(type);
// 	console.log(nums);
// }

// op('sum', 1, 23, 454, 3, 67, 234);

function sum(...numbers) {
	return numbers.reduce(function(a, b) {
		return a + b;
	}, 0);
}

console.log(sum(1, 2, 3, 4));

// 箭头函数

// const add1 = (a, b) => {
// 	a += 1;
// 	return a + b;
// };

// const add2 = function(a, b) {
// 	a += 1;
// 	return a + b;
// }

// console.log(add1(2, 2));
// console.log(add2(2, 2));

// const pop = arr => void arr.pop();

// console.log(pop([1, 2, 3]));

// const log = () => {
// 	console.log(arguments);
// };

// log(1, 2, 3);

// 区别： this指向
{
	const xiaoming = {
		name: '小明',
		say1: function() {
			console.log(this);
		},
		say2: () => {
			console.log(this);
		}
	}
	
	xiaoming.say1(); // xiaoming
	xiaoming.say2(); // window
}

 


// const xiaoming = {
// 	name: 'xiaoming',
// 	age: null,
// 	getAge: function() {
// 		let _this = this;
// 		// ...ajax
// 		setTimeout(function() {
// 			_this.age = 14;
// 			console.log(_this);
// 		}, 1000);

// 	}
// }; 

// xiaoming.getAge();
  
{
	const xiaoming = {
		name: 'xiaoming',
		age: null,
		getAge: function() {
	
	
			// ...ajax
			setTimeout(() => {
				this.age = 14;
				console.log(this);
			}, 1000);
	
		},
		getNameNew: () => {
			setTimeout(() => {
				this.newName = 'xiaomingNew';
				console.log(this);
			}, 1000);
		}
	};
	
	xiaoming.getAge(); // xiaoming
	xiaoming.getNameNew() // window
}
