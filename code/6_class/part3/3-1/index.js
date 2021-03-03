/**
 * 静态属性与静态方法
 * 1. 不会被类实例所拥有的属性与方法 只是类自身拥有
 * 2. 只能通过类调用
 * 3. 静态方法和普通方法重名，不冲突
 * 4. static 关键字（静态方法）-只适用于方法
 * 5. 静态属性的声明：Car.属性名 = 属性值; -属性的镜头声明
 */
// class Car {
// 	static totalCar = 0;
// 	constructor() {
// 		Car.totalCar += 1;
// 		this.speed = 0;
// 		this.errors = 0;
// 	}
// 	speedUp() {
// 		this.speed += 1;
// 	}
// 	// 自检程序
// 	checker() {
// 		console.log('开始自检');
// 		if (this.errors === 0) {
// 			console.log('检测完毕 一切正常');
// 		}
// 	}
// 	// 工厂检察员
// 	static checker() {
// 		console.log('我市检察员 我要开始检查了');
// 	}
// 	static repair(car) {
// 		if (!car.speed) {
// 			car.speed = 0;
// 		}
// 		console.log(car);
// 	}
// }
// const car = new Car();
// console.log(Car.totalCar)
// car.checker()
// Car.checker()

// Car.属性名 = 属性值; -属性的静态声明
// Car.totalCar = 0;
// Car.config = {
// 	wheel: 4,
// 	color: '#000'
// }

// const car = new Car();

// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();
// new Car();

// car.checker();
// Car.checker();

// console.log(Car.totalCar);

// Car.repair('1号车');

// const car = new Car();
// ...fdsa.fd.saf
// { color: '#f00' }

// Car.repair({
// 	color: '#f00'
// });

/**
 * 静态属性的两种写法
 */
// 1.写在类外，这种可以不用实例化对象就能输出
// class Car{
// 	constructor(){
// 	}
// }

// Car.tool=4
// console.log(Car.tool);//4

// 2、写在构造函数：必须实例化后才能输出。但他们都是挂在类上的静态属性。
// class Car{
// 	constructor(){
// 		Car.speed=0;
// 	}
// }

// console.log(Car.speed); //undefined;
// new Car();
// console.log(Car.speed);//0

/**
 * 静态属性经常这样使用,把各个类相关的内容全部挂到静态属性上面,方便取值，
 * 如：计算类被调用多少次，比如职业等
 */
// class Character {
// 	constructor(pfs) {
// 		this.pfs = pfs;
// 	}
// }
// // 以下配置项也可用类来代替
// // class Profession {
// // }
// Character.config = {
// 	profession: {
// 		'咒术师': 1,
// 		'弓箭手': 2
// 	}
// }

// new Character(Character.config.profession['咒术师']);

/**
 * 静态方法的应用：一般会提供一个公共的类相关的方法
 * 比如把一个程序员类转换成一个普通人的类
 */
class Person {
	static format(programmer) {
		programmer.haveGirlFriend = true;
		programmer.hair = true;
	}
}
class Programmer {
	constructor() {
		this.haveGirlFriend = false;
		this.hair = false;
	}
}

const programmer = new Programmer();
console.log(programmer);
Person.format(programmer);
console.log(programmer);