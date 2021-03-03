/**
 * 继承-可以让子类获得父类的方法、属性，子类可以扩充 增加新的方法 属性等
 * 父类（基类） - 被继承的类
 * 子类 - 继承后的类
 * 继承关键字：extends
 * super关键字： 调用父类的构造方法，只能在子类中执行，
 * 必须在类中的构造函数constructor中使用super(参数)且必须在this前
 * 注意：super的不仅可以用来访问对象的原型，还可以作为父类的构造函数来调用，
 * 所以在继承的时候，在子类的constructor中，调用super方法，可以让子类把父类的属性和方法继承过来，
 * 这样子类才会拥有父类的属性和方法（走一遍父类的属性，就是为了继承它们）。
 * 在class的继承中，只能使用super，不能使用“Object.setPrototypeOf（）”，这是es6规定好的语法
 */

class Human {
	constructor(name, age, sex, hobby) {
		this.name = name;
		this.age = age;
		this.sex = sex;
		this.hobby = hobby;
	}
	desc() {
		const { name, age, sex, hobby } = this;
		console.log(`我叫${ name }, 性别${ sex }, 爱好${ hobby }, 今年${ age }岁`);
	}
	eat() {
		console.log('吧唧吧唧');
	}
}

class FEEngineer extends Human {
	constructor(name, age, sex, hobby, skill, salary) {
		super(name, age, sex, hobby); // 在this之前调用
		this.skill = skill;
		this.salary = salary;
	}
	say() {
		console.log(this.skill.join(','));
	}
}
const feer = new FEEngineer(
	'张四',
	12,
	'女',
	'洗澡',
	['es6', 'vue', 'react', 'webgl'],
	'1k'
);

feer.eat();
feer.say()
