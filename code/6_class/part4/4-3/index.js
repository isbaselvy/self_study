/**
 * 多态
 * -同一个接口,在不同情况下做不一样的事情;相同的接口,不同的表现
 * -接口本身只是一组定义,实现都是在类里面,需要子类去实现的方法
 * 	（子类只需重写与父类同名的方法，即可达到覆盖的效果），若子类有跟父类同名的方法，则会直接走子类的方法，不会走父类的；
 * -非静态方法中，仍然子类可通过super.方法名（ ）（举例：super.say（ ） ），来调用父类的方法（supe指向的事父类的原型）
 * 多态的优点，1、提高类的扩充性与灵活性, 2,暴露接口
 */

class Human {
	say() {
		console.log('我是人');
	}
}
class Man extends Human {
	say() {
		// super.say(); // /有的时候子类自己实现的内容,还是依赖父类中的一些操作,可以通过super.xxx的方式去进行访问,调用父类的say方法
		console.log('我是小哥哥');
	}
}
class Woman extends Human {
	say() { // say会覆盖父类的方法
		// super.say();
		console.log('我是小姐姐');
	}
}
new Man().say(); // 我是小哥哥
new Woman().say(); // 我是小姐姐

/**以Animal类为例，理清几个概念
 * 类的原型对象：指Animal.prototype，原型对象prototype上可以保存父类的一些方法，
 * 	console.log(Animal.prototype) // {constructor: ƒ, walk: ƒ}
 * 类的原型对象的方法: 是在constructor外面定义的方法，如walk
 * 父类自身的方法:则是直接在类身上定义的方法，如静态方法staticMethod
 * 父类原型上的方法：在constructor外面定义的
 * 父类构造函数上的方法：则是指在constructor里面定义的，在实例化后会挂在到实例本身
 * es6的构造函数constructor相当于es5的构造函数本身，它俩的作用都是给实例添加属性，与es5的构造函数的原型对象prototype上的constructor不是一个东西。
 * super方法，用来继承父类，所以super里的参数，是实例的属性，在class外面，可以被实例直接访问
 */
class Animal {
	constructor(type) {
		this.type = type
		this.eat = function () {

		}
	}
	walk() {
		console.log(`I am walking`)
	}

	static staticMethod() {

	}
}
console.log(typeof Animal) // function
console.dir(Animal)
console.log(Animal.prototype) // {constructor: ƒ, walk: ƒ}
let dog = new Animal('dog')
console.log(dog) // Animal {type: "dog", eat: ƒ}

// 
// 重载，根据参数类型做不同的操作
class SimpleCalc {
	addCalc(...args) {
		if (args.length === 0) {
			return this.zero();
		}
		if (args.length === 1) {
			return this.onlyOneArgument(args);
		}
		return this.add(args);
	}
	zero() {
		return 0;
	}
	onlyOneArgument() {
		return args[0];
	}
	add(args) {
		return args.reduce((a, b) => a + b, 0);
	}
}
// 重载的其他场景:比如一个Ajax的封装,写函数的时候非常常见
function post(url, header, params) {
	if (!params) {
		params = header;
		header = null; // undefined
	}
}
post('https://imooc.com', {
	a: 1,
	b: 2
});

// 预留接口
//一个非常实用的场景,利用重写的特性,达到预留接口的效果
//比如有方法必须要用子类去实现,如果没有就报错

//模型的映射表
const ModelMap = {
	'红眼僵尸':1,
	'南瓜精':2,
	'独眼蝠':3,
	'绿眼僵尸':4
}
class Monster {
	constructor(name, level, model) {
		this.name = name
		this.level = level
		this.model = model
	}

	//
	attack() {
		throw Error('必须有子类实现attack方法')
	}
}

class RedEyeZombie extends Monster {
	constructor() {
		super('红眼僵尸', 10, ModelMap['红眼僵尸'])
	}
}

class GreenEyeZombie extends Monster {
	constructor() {
		super('绿眼僵尸', 10, ModelMap['红眼僵尸'])
	}

	attack() {
		console.log('绿眼僵尸attack')
	}
}

// 调用attack，红眼会抛错
const gez = new GreenEyeZombie();
//覆盖了父类的attack方法
gez.attack();

const rez = new RedEyeZombie();
//子类没有attack,所以去调用父类的,报错
rez.attack();