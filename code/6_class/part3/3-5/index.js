/**
 * 在es5中模拟类
一个函数只有通过new实例化之后，才叫做构造函数。
若构造函数中没有返回值或返回值是基本类型（Number、String、Boolean）的值，则返回新实例对象；若返回值是引用类型的值，则实际返回值为这个引用类型。
 * 
 */


/**
 * 1.ES5模拟下面一个类
 */
// class Car {
// 	constructor(color) {
// 	  this.color = color
// 	}
// }

// function Car(color) {
// 	this.color = color
// }
// const c = new Car(); //使用new关键字调用一个函数,这个函数就会被当做构造函数进行调用
// console.log('c.__proto__ === Car.prototype:', c.__proto__ === Car.prototype)

/**
 * 2.当用new关键字调用函数的时候 发生了什么 为什么会获得一个新的对象
 * 1. 创建一个空的对象
 * 2. 把构造函数的prototype属性 作为空对象的原型
 * 3. this赋值为这个空对象
 * 4. 执行函数
 * 5. 如果函数没有返回值 则返回this[返回之前那个空对象]
 */
// 模拟实现一个new
function Constructor(fn, args) {
	// fn的prototype属性内容作为新对象的原型内容
	var _this = Object.create(fn.prototype);
	var res = fn.apply(_this, args);
	return res ? res : _this;
}

function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.say = function () {
	console.log('我叫' + this.name);
}
var person = Constructor(Person, ['张三', 12]);
console.log('person:', person);
console.log('person.__proto__ === Person.prototype:', person.__proto__ === Person.prototype) // true

function Car(color) {
	this.color = color
}
const c = new Car(); //使用new关键字调用一个函数,这个函数就会被当做构造函数进行调用
console.log('c.__proto__ === Car.prototype:', c.__proto__ === Car.prototype) // true

/**
 * 3.进阶： Object.create 和 new的区别
 * create创建出来的对象a，a.__proto__指向了Foo，而new 出来的对象b, b.proto 指向的是prototype。
 */
function Foo() {
	console.log(2)
}
var a = Object.create(Foo)
console.log('a.__proto__ === Foo:', a.__proto__ === Foo) // true
var b = new Foo()
console.log('b.__proto__ === Foo.prototype:', b.__proto__ === Foo.prototype) // true
// 调用自定义得new
var d = Constructor(Foo)
console.log('d.__proto__ === Foo.prototype:', d.__proto__ === Foo.prototype) // true
// Object.create的polyfill代码：
if (!Object.create) { 
Object.create = function(o) {
		function F(){}
		F.prototype = o;
	return new F(); 
};
}