/**
 * getter setter
 * 类似于给属性提供钩子
 * 在获取属性值和设置属性值的时候做一些额外的事情
 */

/**
 * ES5 getter/setter
 * 1. 在对象字面量中书写get/set方法
 * 2. Object.defineProperty
 */

// const obj = {
// 	name: '',
// 	get name() {
// 		console.log('123');
// 		return this.name;
// 	},
// 	set name(val) {
// 		this.name = val;
// 	}
// }
// obj.name = 222; // 此处调用set方法, 报错Maximum call stack size exceeded，obj.name调用get name，get name又返回this.name，再次调用get name，循环
// console.log(obj);

// 此种情况，给属性换一个名称
// const obj = {
// 	_name: '',
// 	get name() {
// 		console.log('123');
// 		return this._name;
// 	},
// 	set name(val) {
// 		this._name = val;
// 	}
// }
// obj.name = 222; // 此处调用set方法
// console.log(obj);

// 2. Object.defineProperty 

// var obj = {
// 	_name: ''
// };

// Object.defineProperty(obj, 'name', {
// 	get: function() {
// 		console.log('正在访问name');
// 		return this._name;
// 	},
// 	set: function(val) {
// 		console.log('正在修改name');
// 		this._name = val;
// 	}
// });
// console.log(obj.name); //
// obj.name = 10;
// console.log(obj.name); // 10

// var obj = {
// 	_name: ''
// };
// Object.defineProperty(obj, 'age', {
// 	value: 19,
// 	// enumerable: true // 不加这个 定义的属性是不能被for in遍历的
// });

// var i;
// for (i in obj) {
// 	console.log(i);
// }

// console.log(obj);

/**
 * 类的getter setter
 */
// class Person {
// 	constructor() {
// 		this._name = '';
// 	}
// 	get name() {
// 		console.log('正在访问name');
// 		return `我的名字是${ this._name }`;
// 	}
// 	set name(val) {
// 		console.log('正在修改name');
// 		this._name = val;
// 	}
// }

// const person = new Person();
// person.name = '鸽王';
// console.log(person.name);


// - 暂停
// - 播放中
// - 加载中

// class AudioPlayer {
// 	constructor() {
// 		// 0 - 暂停 | 1 - 播放 | 2 - 加载中
// 		this._status = 0;
// 		this.status = 0;
// 		this.init();
// 	}
// 	init() {
// 		const audio = new Audio();
// 		audio.src = '....';

// 		audio.oncanplay = () => {
// 			audio.play();
// 			this.status = 1; // 设置即在调用set 函数
// 		}
// 	}
// 	get status() {
// 		return this._status;
// 	}
// 	set status(val) {
// 		const STATUS_MAP = {
// 			0: '暂停',
// 			1: '播放',
// 			2: '加载中'
// 		};
// 		document.querySelector('#app .play-btn').innerText = STATUS_MAP[val];
// 		this._status = val;
// 	}
// }
// const audio = new AudioPlayer();
// audio.status = 1
