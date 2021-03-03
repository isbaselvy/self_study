// super

// 1. 作为父类构造函数调用
// 2. 作为对象的方式调用
// 1. 非静态方法中访问super -> 父类原型
// 2. 在静态方法中访问super -> 父类的对象
// 在调用super 父类的this 始终是子类的this

class Human {
	constructor(name, age, sex, hobby) {
		this.name = name;
		this.age = age;
		this.sex = sex;
		this.hobby = hobby;
	}
	desc() {
		const { name, age, sex, hobby } = this;
		console.log(super.eat) // 子类调用父类的desc方法，此处undefined
		console.log(`我叫${ name }, 性别${ sex }, 爱好${ hobby }, 今年${ age }岁`);
	}
	eat() {
		console.log('吧唧吧唧');
	}
	checkThis(_this) {
		console.log(_this === this);
	}
}

Human.total = 899999999;

class FEEngineer extends Human {
	constructor(name, age, sex, hobby, skill, salary) {
		super(name, age, sex, hobby);
		this.skill = skill;
		this.salary = salary;
	}
	say() {
		// 非静态方法中访问super -> 父类原型
		console.log(super.checkThis(this)); // true,在调用super 父类的this 始终是子类的this
		// console.log('子类非静态方法访问父类的spuer：', super); // 'super' keyword unexpected here,super不能单独访问
		console.log('子类非静态方法访问父类的spuer：', super.eat); // 输出原父类定义的eat方法，子类有eat方法时，输出的仍是父类
		// console.log('子类非静态方法访问父类的spuer的属性：', super.etotalat); // undefined
	}
	eat() {
		console.log('子类eat')
	}
	static test() {
		console.log('子类在静态方法访问父类的spuer：', super.total); // 899999999，此时的super指父类对象
		console.log('子类在静态方法访问父类的spuer：', super.eat); // undefined
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
// feer.desc()
feer.say();
FEEngineer.test();
