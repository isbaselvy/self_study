/**
 * 1. class 实现
先从最简单的 class 开始看，下面这段代码涵盖了使用 class 时所有会出现的情况（静态属性、构造函数、箭头函数）。
 */
class Person {
    static instance = null;
    static getInstance() {
        return super.instance;
    }
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHi() {
        console.log('hi');
    }
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

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function () {
    function Person(name, age) {
        _classCallCheck(this, Person);

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

/**
 * 1.2 _classCallCheck
Person 构造函数中调用了 _classCallCheck 函数，并将 this 和自身传入进去。
在 _classCallCheck 中通过 instanceof 来进行判断，instance 是否在 Constructor 的原型链上面，如果不在上面则抛出错误。
这一步主要是为了避免直接将 Person 类当做函数来调用。
因此，在 ES5 中构造函数是可以当做普通函数来调用的，但在 ES6 中的类是无法直接当普通函数来调用的。
注意：为什么通过 instanceof 可以判断是否将 Person 类当函数来调用呢？
因为如果使用 new 操作符实例化 Person 的时候，那么 instance 就是当前的实例，
指向 Person.prototype，instance instanceof Constructor 必然为true。反之，直接调用 Person 构造函数，那么 instance 就不会指向 Person.prototype。
 */
{
    /**
     * 1.3 _createClass
我们再来看 _createClass 函数，这个函数在 Person 原型上面添加了 sayHi 方法。
_createClass 函数接收三个参数，分别是 Constructor （构造函数）、protoProps（需要挂载到原型上的方法）、staticProps（需要挂载到类上的静态方法）。
在接收到参数之后，_createClass 会进行判断如果有 staticProps，则挂载到 Constructor 构造函数上；如果有 protoProps ，那么挂载到 Constructor 原型上面。
这里的挂载函数 defineProperties 是关键，它对传入的 props 进行了遍历，并设置了其 enumerable（是否可枚举） 和 configurable（是否可配置）、writable（是否可修改）等数据属性。
最后使用了 Object.defineProperty 函数来给设置当前对象的属性描述符。
     */
    // 创建原型方法
    _createClass(Person, [{
        key: 'sayHi',
        value: function sayHi() {
            console.log('hi');
        }
    }]);

    // _createClass也是一个立即执行函数
    var _createClass = function () {
        // 将props属性挂载到目标target上面
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor)
                    descriptor.writable = true;
                // 通过defineProperty来挂载属性
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        // 这个才是“真正的”_createClass
        return function (Constructor, protoProps, staticProps) {
            // 如果传入了需要挂载的原型方法
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            // 如果传入了需要挂载的静态方法
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
}

{
    /**
     * 2. extends 实现
通过上文对 Person 的分析，相信你已经知道了 ES6 中类的实现，这与ES5中的实现大同小异，接下来我们来具体看一下 extends 的实现。
以下面的 ES6 代码为例：
     */
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

    /**
     * babel 后的代码则是这样的：
     */
    "use strict";

    // 省略 _createClass
    // 省略 _classCallCheck

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call &&
            (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Child = function (_Parent) {
        _inherits(Child, _Parent);

        function Child(name, age) {
            _classCallCheck(this, Child);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Child).call(this, name, age));

            _this.name = name;
            _this.age = age;
            return _this;
        }

        _createClass(Child, [{
            key: "getName",
            value: function getName() {
                return this.name;
            }
        }]);

        return Child;
    }(Parent);

    // 省略 Parent（类似上面的 Person 代码）
    /**
     * 我们可以清楚地看到，继承是通过_inherits实现的。
    为了方便理解，我这里整理了一下原型链的关系：
     */
    // 除去一些无关紧要的代码，最终的核心实现代码就只有这么多：
    var Child = function (_Parent) {

        _inherits(Child, _Parent);

        function Child(name, age) {

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Child).call(this, name, age));

            _this.name = name;
            _this.age = age;
            return _this;
        }

        return Child;
    }(Parent);

    /**
   * 和前面的 Person 类实现有所不同的地方是，在 Child 方法中增加调用了 _inherits，还有在设置 name 和 age 属性的时候，
   * 使用的是执行 _possibleConstructorReturn 后返回的 _this，而非自身的 this，我们就重点分析这两步。
   * 2.1 _inherits
先来看_inherits函数的实现代码：
_inherits 函数接收两个参数，分别是 subClass （子构造函数）和 superClass （父构造函数），将这个函数做的事情稍微做一下梳理。

设置 subClass.prototype 的 [[Prototype]]指向 superClass.prototype 的 [[Prototype]]
设置 subClass 的 [[Prototype]] 指向 superClass
在《深入理解类和继承》一文中，曾经提到过 ES5 中的寄生组合式继承，extends 的实现与寄生组合式继承实则大同小异，仅仅只增加了第二步操作。
   */
    function _inherits(subClass, superClass) {
        // 如果有一个不是函数，则抛出报错
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        // 将 subClass.prototype 设置为 superClass.prototype 的实例
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        // 将 subClass 设置为 superClass 的实例（优先使用 Object.setPrototypeOf）
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    /**
     * 2.2 _possibleConstructorReturn
    在 Child 中调用了 _possibleConstructorReturn 函数，将 this 和 Object.getPrototypeOf(Child).call(this, name, age)) 传了进去。
    这个 this 我们很容易理解，就是构造函数的 this，但后面这么长的一串又是什么意思呢？
    刚刚在 _inherits 中设置了 Child 的 [[Prototype]] 指向了 Parent，因此可以将后面这串代码简化为 Parent.call(this, name, age)。
    这样你是不是就很熟悉了？这不就是组合继承中的执行一遍父构造函数吗？
    那么 Parent.call(this, name, age) 执行后返回了什么呢？
    正常情况下，应该会返回 undefined，但不排除 Parent 构造函数中直接返回一个对象或者函数的可能性。
    小课堂：
    在构造函数中，如果什么也没有返回或者返回了原始值，那么默认会返回当前的 this；而如果返回的是引用类型，那么最终实例化后的实例依然是这个引用类型（仅相当于对这个引用类型进行了扩展）。
     */

    const obj = {};

    function Parent(name) {
        this.name = name;
        return obj;
    }
    const p = new Parent('tom');
    obj.name; // 'tom'
    p === obj; // true

    /**
     * 如果没有 self，这里就会直接抛出错误，提示 super 函数还没有被调用。
    最后会对 call 进行判断，如果 call 为引用类型，那么返回 call，否则返回 self。

    注意：call 就是 Parent.call(this, name, age) 执行后返回的结果。
     */
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call &&
            (typeof call === "object" || typeof call === "function") ? call : self;
    }

    /**
     * 在 Child 方法中，最终拿到 _possibleConstructorReturn 执行后的结果作为新的 this 来设置构造函数里面的属性。

    思考题：如果直接用 this，而不是 _this，会出现什么问题？
     */
}