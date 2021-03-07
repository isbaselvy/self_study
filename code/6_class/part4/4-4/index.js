/**
 * ES5继承的实现
 * JAVASCRIPT中的继承，不是真正意义上的面向对象继承，而是JS中特有的，和面向对象继承有点区别的，就是js的原型
 */

/**
 * 1.利用构造函数
 * -缺陷：无法继承原型上的方法
 */
{
	function P() {
		this.name = 'parent';
		this.gender = 2;
		this.say = function () {
			// console.log('好的好的！我一定到！！咕咕咕');
		}
	}
	P.prototype.test = function () {
		console.log('我是一个test方法');
	}

	function C() {
		P.call(this); // 不能继承父类原型上的方法
		this.name = 'child';
		this.age = 11;
	}
	var child = new C();
	console.log('构造函数继承', child)
	child.say();
	// child.test(); // child.test is not a function
}

/**
 * 2.prototype-组合继承
 * 父构造函数的执行一定要放到子构造函数属性定义之前，这样可以避免父构造函数上的属性覆盖子构造函数的属性。
 * -缺陷：设置 Child 的原型时，需要实例化一次 Parent 构造函数，导致了 Parent 构造函数被调用了两次。
 */
{
	function P() {
		this.name = 'parent';
		this.gender = 2;
		this.say = function () {
			console.log('好的好的！我一定到！！咕咕咕');
		}
	}
	P.prototype.test = function () {
		console.log('我是一个test方法');
	}

	function C() {
		P.call(this); // 父构造函数的执行一定要放到子构造函数属性定义之前
		this.name = 'child';
		this.age = 11;
	}
	C.prototype.beforeChangeP = function () {} // 改变后不存在
	let pPro = new P()
	C.prototype = pPro; // 若是直接赋值protoTtype = P.prototype，则子类修改原型上的会影响父类，且子类不是由子类的构造函数创建的，instanceof无法盘点
	C.prototype.afterChangeP = function () {} // 挂在在new出来的p对象上
	var child = new C();
	console.log('原型链继承', child)
	console.log('child.__proto__ === pPro: true', child.__proto__ === pPro) // true
	console.log('child instanceof C:', child instanceof C, 'child instanceof P:', child instanceof P) // true true
	console.log(pPro.constructor) // P
	console.log('组合式继承：', C.prototype === P.prototype) // false
}


/**
 * 寄生式继承
 * 寄生式继承的思路和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数内部以某种方式来增强对象，最后返回这个对象。
 * 寄生式继承更像是将对象与对象衔接起来，形成一条原型链。
 * 注意：Object.create 接收一个对象 origin ，以这个对象为原型（ prototype ），创建一个新的对象，这个新对象的[[Prototype]]指向 origin 对象
 */
{
	function createAnother(origin) {
		const clone = Object.create(origin);
		clone.say = function () {
			console.log(this.name);
		};
		return clone;
	}
	const person = {
		name: 'tom',
		age: 23
	}
	const anotherPerson = createAnother(person);
	anotherPerson.say(); // 'tom'
	console.log('寄生式继承：', anotherPerson) // say方法是挂在对象本身，属性在原型链上
	console.log('寄生式继承：', anotherPerson.constructor) //  Object
	console.log(anotherPerson.__proto__ === person) // true
}

/**
 * 寄生组合式继承
 * 寄生组合式继承是将寄生式继承与组合继承结合起来的一种继承方式，
 * 主要是用 Object.create 来代替原来实例化父构造函数，
 * 它解决了组合继承中调用两次父构造函数的弊端，也是最理想的继承范式
 */

 {
	function Parent(name, age) {
		this.name = name;
		this.age = age;
	}
	Parent.prototype.getName = function() {
		console.log('parent', this.name);
	}
	Parent.prototype.getAge = function() {
		console.log('parent', this.age);
	}

	function Child(name, age) {
		Parent.call(this, name, age);
		this.name = name;
		this.age = age;
	}
	Child.prototype = Object.create(Parent.prototype);

	Child.prototype.getName = function() {
		console.log('child', this.name);
	}
	const child = new Child('tom', 23);
	console.log('寄生组合式继承：', child)
	console.log(P.prototype === C.prototype) // false
	/*
	子类属性挂在子类自生,子类原型方法挂在以父类的prototype创建的新对象上（这个创建出来的新对象是C.prototype），父类的原型就挂在父类自身的原型上
	Child {name: "tom", age: 23}
		age: 23
		name: "tom"
		__proto__: Parent
		getName: ƒ ()
		__proto__:
		getAge: ƒ ()
		getName: ƒ ()
		constructor: ƒ Parent(name, age)
		__proto__: Object
	*/
 }

 /**
  * 多重继承
  * 多重继承是指一个子类同时继承多个父类，拥有这多个类的属性和方法。
  * 由于 JavaScript 的继承是基于原型链的，原型链一般只有一条链，无法同时指向多个不同的对象，
  * 因此 JavaScript 中是无法实现传统的多重继承。
  * 注意：原型链的一般实现是单链表，以 [[prototype]] 指针指向下一个对象，直到最终指向 null。
  * 但是可以让父类分别互相继承，子类继承最后那个父类来实现多重继承。这种实现方式的缺点就是要在每个父类定义的时候继承另一个父类。
  * 
  */
 {
	// class Parent1 extends Parent2 {}
	// class Parent2 extends Parent3 {}
	// class Child extends Parent1 {}

	// 另一种实现方式，就是我们前面提到过的 mixin ，mixin 不仅在各大框架中被广泛使用，也可以将多个父类进行混合，从而实现多重继承的效果。
	// Reflect.ownKeys 是获取对象自身的属性，和 Object.keys 不同点在于还会返回不可枚举属性。
	function mixin(...mixins) {
		class Mixin {
			constructor(...args) {
				mixins.forEach(
					mixin => copyProperties(this, new mixin(...args)) // 拷贝实例属性
					) 
			}
		}
		mixins.forEach(
			mixin => {
				copyProperties(Mixin, mixin); // 拷贝静态属性
				copyProperties(Mixin.prototype, mixin.prototype); // 拷贝原型属性
			}
		)
	
		return Mixin;
	}
	
	function copyProperties(target, source) {
		for (let key of Reflect.ownKeys(source)) {
			  if (['constructor', 'prototype', 'name'].indexOf(key) < 0) {
				   let desc = Object.getOwnPropertyDescriptor(source, key);
				Object.defineProperty(target, key, desc);
			}
		}
	}
 }

 
