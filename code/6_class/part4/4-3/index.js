// 多态

// 同一个接口 在不同情况下做不一样的事情
// 相同的接口 不同的表现

// 接口本身只是一组定义 实现都是在类里面
// 需要子类去实现的方法

class Human {
	say() {
		console.log('我是人');
	}
}

class Man extends Human {
	say() {
		super.say();
		console.log('我是小哥哥');
	}
}

class Woman extends Human {
	say() { // say会覆盖父类的方法
		super.say();
		console.log('我是小姐姐');
	}
}

new Man().say(); // 我是小哥哥

new Woman().say(); // 我是小姐姐

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
d
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