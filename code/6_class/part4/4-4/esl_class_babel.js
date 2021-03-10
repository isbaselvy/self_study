/**
 * 1. class 实现
 * 先从最简单的 class 开始看，下面这段代码涵盖了使用 class 时所有会出现的情况（静态属性、构造函数、箭头函数）。
 */
{
class Person {
    static instance = null;
    static getInstance() {
        return super.instance;
    }
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // 不直接使用 = 来定义的方法，最终都会被挂载到原型上
    sayHi() {
        console.log('hi');
    }
    // 使用 = 定义的属性和方法，最终都会被放到构造函数中
    sayHello = () => {
        console.log('hello');
    }
    sayBye = function () {
        console.log('bye');
    }
}

/**
 * 转换成ES5
 * 最外层的 Person 变量被赋值给了一个立即执行函数，立即执行函数里面返回的是里面的 Person 构造函数，
 * 实际上最外层的 Person 就是里面的 Person 构造函数。
 * 在 Person 类上用 static 设置的静态属性instance，在这里也被直接挂载到了 Person 构造函数上。
 * 你是不是很好奇，为什么在 Person 类上面设置的 sayHi 和 sayHello、sayBye 三个方法，编译后被放到了不同的地方处理？
 * 从编译后的代码中可以看到 sayHello 和 sayBye 被放到了 Person 构造函数中定义，
 * 而 sayHi 用 _createClass 来处理（_createClass 将 sayHi 添加到了 Person 的原型上面）。
 * 曾经我也以为是 sayHello 使用了箭头函数的缘故才让它最终被绑定到了构造函数里面，后来我看到 sayBye 这种用法才知道这和箭头函数无关。
 * 实际上 class 中定义属性还有一种写法，这种写法和 sayBye 如出一辙，在 babel 编译后会将其属性放到构造函数中，而非原型上面。 
 */
'use strict';

/**
 * _createClass
 * @param Constructor 构造函数
 * @param protoProps 需要挂载到原型上的方法
 * @param staticProps 需要挂载到类上的静态方法
 * 这个函数在 Person 原型上面添加了 sayHi 方法。
 */
var _createClass = function () {
    function defineProperties(target, props) {
        // 设置了传入的各属性的 enumerable（是否可枚举） 和 configurable（是否可配置）、writable（是否可修改）等数据属性
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            // todo 疑问 enumerable的属性不可被遍历到
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            // 有value属性则可写
            if ("value" in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        // 如果有 protoProps ，那么挂载到 Constructor 原型上面。
        if (protoProps) {
            defineProperties(Constructor.prototype, protoProps);
        }

        // 如果有 staticProps，则挂载到 Constructor 构造函数上
        if (staticProps) {
            defineProperties(Constructor, staticProps);
        }

        return Constructor;
    };
}();

/**
 * Person 构造函数中调用了 _classCallCheck 函数，并将 this 和自身传入进去。
 * 在 _classCallCheck 中通过 instanceof 来进行判断，instance 是否在 Constructor 的原型链上面，
 * 如果不在上面则抛出错误。
 * 这一步主要是为了避免直接将 Person 类当做函数来调用。
 * 因此，在 ES5 中构造函数是可以当做普通函数来调用的，但在 ES6 中的类是无法直接当普通函数来调用的
 */
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function () {
    function Person(name, age) {
        // 检查是Person类是否被当初构造函数调用，不是则不执行
        _classCallCheck(this, Person);
        // 使用 = 定义的属性和方法，最终都会被放到构造函数中
        this.sayHello = function () {
            console.log('hello');
        };

        this.sayBye = function () {
            console.log('bye');
        };

        this.name = name;
        this.age = age;
    }

    _createClass(Person, [{
        key: 'sayHi',
        value: function sayHi() {
            console.log('hi');
        }
    }]);

    return Person;
}();

Person.instance = null;

{
    /**
     * 如果我们将 name 后面的 'tom' 换成函数呢？甚至箭头函数呢？这不就是 sayBye 和 sayHello 了吗？
    因此，在 class 中不直接使用 = 来定义的方法，最终都会被挂载到原型上，使用 = 定义的属性和方法，最终都会被放到构造函数中。
     */
    class Person {
        name = 'tom';
        age = 23;
    }
    // 等价于
    class Person {
        constructor() {
            this.name = 'tom';
            this.age = 23;
        }
    }
}
}

/**
 * 2. extends 实现
 * 以下面的 ES6 代码为例：
 */
{
    class Parent {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        getName() {
            return this.name;
        }
        getAge() {
            return this.age;
        }
    }
    class Child extends Parent {
        constructor(name, age) {
            super(name, age);
            this.name = name;
            this.age = age;
        }
        getName() {
            return this.name;
        }
    }

    

    /**
     * babel 后的代码则是这样的：
     */
    "use strict";

    // 省略 _createClass
    // 省略 _classCallCheck
    // 省略Person

    /**
     * 调用父类的构造函数
     * @param {*} self 构造函数的 this
     * @param {*} call :Object.getPrototypeOf(Child).call(this, name, age)),
     * 在 _inherits 中设置了 Child 的 [[Prototype]] 指向了 Parent，
     * 因此可以将后面这串代码简化为 Parent.call(this, name, age)。
     * @returns ：正常情况下，应该会返回 undefined，但不排除 Parent 构造函数中直接返回一个对象或者函数的可能性。
     */
    function _possibleConstructorReturn(self, call) {
        // 如果没有 self，这里就会直接抛出错误，提示 super 函数还没有被调用。
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        // 最后会对 call 进行判断，如果 call 为引用类型，那么返回 call，否则返回 self。
        // call 就是 Parent.call(this, name, age) 执行后返回的结果。
        return call &&
            (typeof call === "object" || typeof call === "function") ? call : self;
    }

    /**
     * 类似寄生组合是继承
     * 1.设置 subClass.prototype 的 [[Prototype]]指向 superClass.prototype 的 [[Prototype]]
     * 2.设置 subClass 的 [[Prototype]] 指向 superClass
     * @param {*} subClass 子构造函数
     * @param {*} superClass 父构造函数
     */
    function _inherits(subClass, superClass) {
        // 父类必须是个function，不是则抛出报错
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        // 类似寄生组合式继承，将 subClass.prototype 设置为 superClass.prototype 的实例
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        // 将 子类 设置为 父类 的实例（优先使用 Object.setPrototypeOf）,访问父类的静态方法和静态属性
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Child = function (_Parent) {
        _inherits(Child, _Parent);

        function Child(name, age) {
            // 判断当前实例是否是调用constructor生成
            _classCallCheck(this, Child);

            // 在 Child 方法中，最终拿到 _possibleConstructorReturn 执行后的结果作为新的 this 来设置构造函数里面的属性P
            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Child).call(this, name, age));
            //todo  如果直接用 this，而不是 _this，会出现什么问题？
            _this.name = name;
            _this.age = age;
            return _this;
        }

        // 将getName方法挂在Child的原型上
        _createClass(Child, [{
            key: "getName",
            value: function getName() {
                return this.name;
            }
        }]);

        return Child;
    }(Parent);


    /**
     * 小课堂：构造函数的饿返回
     * 在构造函数中，如果什么也没有返回或者返回了原始值，那么默认会返回当前的 this；
     * 而如果返回的是引用类型，那么最终实例化后的实例依然是这个引用类型（仅相当于对这个引用类型进行了扩展）。
     */
    {
        const obj = {};
        function Parent(name) {
            this.name = name;
            return obj;
        }
        const p = new Parent('tom');
        obj.name; // 'tom'
        p === obj; // true
    }
}