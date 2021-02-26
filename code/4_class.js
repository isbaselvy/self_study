
/**
 * Class
 */
// es5声明
{
    let Animal = function (type) {
        this.type = type
        this.walk = function () {
          console.log(`I am walking`)
        }
      }
      
      let dog = new Animal('dog')
      let monkey = new Animal('monkey')
}

// 采用原型链的方式去设置方法，此方式不会为每个实例去生成方法，减少内存使用
{
    let Animal = function (type) {
        this.type = type
      }
      
      Animal.prototype.walk = function () {
        console.log(`I am walking`)
      }
      
      let dog = new Animal('dog')
      let monkey = new Animal('monkey')
}

// 在 ES6 中把类的声明专业化了，不在用 function 的方式,增加了新的数据类型 class ：
{
    class Animal {
        constructor (type) {
          this.type = type
        }
        walk () {
          console.log(`I am walking`)
        }
      }
      let dog = new Animal('dog')
      let monkey = new Animal('monkey')
      console.log(typeof Animal); //function
      /**
       可以发现 class 的类型还是 function，和 ES5 貌似并没有什么区别，那么 class 中定义的方法在哪呢？
       只要是函数，就会有 prototype 对象。那么类的方法和 prototype 对象有什么关系呢？
            console.log(Animal.prototype);
            // {constructor: ƒ, walk: ƒ}
            //   constructor: class Animal
            //   walk: ƒ walk()
            //   __proto__:
            //   constructor: ƒ Object()
            //   hasOwnProperty: ƒ hasOwnProperty()
            //   isPrototypeOf: ƒ isPrototypeOf()
            //   propertyIsEnumerable: ƒ propertyIsEnumerable()
            //   toLocaleString: ƒ toLocaleString()
            //   toString: ƒ toString()
            //   valueOf: ƒ valueOf()
            //   __defineGetter__: ƒ __defineGetter__()
            //   __defineSetter__: ƒ __defineSetter__()
            //   __lookupGetter__: ƒ __lookupGetter__()
            //   __lookupSetter__: ƒ __lookupSetter__()
            //   get __proto__: ƒ __proto__()
            //   set __proto__: ƒ __proto__()
            可以看出在 Animal.prototype 对象上有两个方法，一个是构造函数（constructor）、一个是自定义的方法（walk）。
            这是不是和 ES5 的第二种写法一模一样？我们再来看下属性，在 ES5 中有个 API 用来判断对象的自有属性（hasOwnProperty）。

            console.log(dog.hasOwnProperty('type')); //true
            这个表现也和 ES5 中直接使用 function 定义类的方式相同，所以得出一个结论：class 的方式是 function 方式的语法糖。
       */
}

/**
    Setters & Getters
    对于类中的属性，可以直接在 constructor 中通过 this 直接定义，还可以直接在类的顶层来定义：
    以下代码演示了，通过 get/set 来给类定一个属性，不过貌似没有说服力。
    因为 age 和 _age 都是类的属性，而且是相同的含义这样做感觉没有实际用途。但是如果一个属性是个只读的呢？
 */
{
    class Animal {
        constructor (type, age) {
          this.type = type
          this._age = age
        }
        get age () {
          return this._age
        }
        set age (val) {
          this._age = val
        }
      }
}

// 属性只读
{
    class Animal {
        constructor (type) {
          this.type = type
        }
        get addr () {
          return '北京动物园'
        }
      }
}

// 利用 set/get 实现了对 element.innerHTML 的简单封装。
class CustomHTMLElement {
  constructor (element) {
    this.element = element
  }
  get html () {
    return this.element.innerHTML
  }
  set html (value) {
    this.element.innerHTML = value
  }
}


// 设置一个私有属性(闭包)，然后通过一定的规则来限制对它的修改，利用 set/get就可以轻松实现。
{
    let #age = 1
    class Animal {
    constructor(type) {
        this.type = type
    }
    get age() {
        return #age
    }
    set age(val) {
        if (val > 0 && val < 10) {
        #age = val
        }
    }
    }
}

// Static Methods:静态方法是面向对象最常用的功能，在 ES5 中利用 function 实现的类是这样实现一个静态方法的。
{
    let Animal = function (type) {
        this.type = type
        this.walk = function () {
          console.log(`I am walking`)
        }
      }
      
      Animal.eat = function (food) {
        console.log(`I am eating`);
      }
}

// 在 ES6 中使用 static 的标记是不是静态方法，代码如下：
{
    class Animal {
        constructor (type) {
          this.type = type
        }
        walk () {
          console.log(`I am walking`)
        }
        static eat () {
          console.log(`I am eating`)
        }
      }
}

// es5继承
{
// 定义父类
let Animal = function (type) {
    this.type = type
  }
  // 定义方法
  Animal.prototype.walk = function () {
    console.log(`I am walking`)
  }
  // 定义静态方法
  Animal.eat = function (food) {
    console.log(`I am eating`)
  }
  // 定义子类
  let Dog = function () {
    // 初始化父类
    Animal.call(this, 'dog')
    this.run = function () {
      console.log('I can run')
    }
  }
  // 继承
  Dog.prototype = Animal.prototype
}

// ES6继承
{
    class Animal {
        constructor (type) {
          this.type = type
        }
        walk () {
          console.log(`I am walking`)
        }
        static eat () {
          console.log(`I am eating`)
        }
      }
      
      class Dog extends Animal {
        constructor () {
          super('dog')
        }
        run () {
          console.log('I can run')
        }
      }
}