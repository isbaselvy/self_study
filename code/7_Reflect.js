/**
 * 定义：编译阶段不知道是被什么加载，而是在运行的时候才加载，执行，先调用，apply执行的时候才指定对象
 * Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法，这些方法与处理器对象的方法相同。
 * Reflect不是一个函数对象，因此它是不可构造的。
 * [!tip]
 * 与大多数全局对象不同，Reflect没有构造函数。
 * 你不能将其与一个new运算符一起使用，或者将Reflect对象作为一个函数来调用。
 * Reflect的所有属性和方法都是静态的（就像Math对象）
 */

/** API-Reflect.apply()，和 Function.prototype.apply() 功能类似。
 * -语法：Reflect.apply(target, thisArgument, argumentsList)
 * -参数说明：
 * target：目标函数，必选
 * thisArgument：target函数调用时绑定的this对象，可选
 * argumentsList：target函数调用时传入的实参列表，该参数应该是一个数组或类数组的对象，可选
 */
{
    const a = Reflect.apply(Math.floor, undefined, [1.75])
    console.log('Reflect.apply(Math.floor, undefined, [1.75])的执行结果：', a)

    const b = Function.prototype.apply(Math.floor, undefined, [1.75])
    console.log('Function.apply(Math.floor, undefined, [1.75])的执行结果：', a)

    // 应用，根据价格决定定价采用Math.flOor还是Math.ceil
    const price = 90.75
    const p = Reflect.apply(price > 100 ? Math.floor : Math.ceil, null, [price])
    console.log('p:', p)
}

/**
* API-Reflect.construct()，Reflect.construct() 方法的行为有点像 new 操作符 构造函数 ， 相当于运行 new target(…args).
* -语法：Reflect.construct(target, argumentsList[, newTarget])
* -参数说明：
* target：被运行的目标函数，必选
* argumentsList：调用构造函数的数组或者伪数组，必选
* newTarget：该参数为构造函数， 参考 new.target 操作符，如果没有newTarget参数， 默认和target一样
[!WARNING]
如果target或者newTarget不是构造函数，抛出TypeError
* 应用：利用反射实例化类，调用不同类去实例化对象
*/
{
    const date = Reflect.construct(Date, [])
    console.log('实例化一个date对象:', date.getTime())
    // Reflect.construct允许你使用可变的参数来调用构造函数  
    function Foo(...params) {
        console.log('Foo, args:', params)
    }
    var obj1 = new Foo(1, 2, 3);
    var obj2 = Reflect.construct(Foo, [1, 2]);

    // 如果使用 newTarget 参数，则表示继承了 newTarget 这个超类：

    function someConstructor() {}
    var result = Reflect.construct(Array, [], someConstructor)

    console.log(result, Reflect.getPrototypeOf(result)) // 输出：someConstructor.prototype
    Array.isArray(result) // true
}

/**
 * Reflect.define​Property()
 * -静态方法 Reflect.defineProperty() 基本等同于 Object.defineProperty() 方法，唯一不同是返回 Boolean 值。Object返回的是对象，W3C：object会陆续迁移到reflect
 * -语法：Reflect.defineProperty(target, propertyKey, attributes)
 * -参数说明
 * target	目标对象 必选
 * propertyKey	要定义或修改的属性的名称	必选
   attributes	要定义或修改的属性的描述	必选
 */
{
    const student = {}
    Reflect.defineProperty(student, 'name', {
        value: 'Mike'
    }) // true
    console.log(student.name) // "Mike"
}

/**
 * Reflect.delete​Property()
 * Reflect.deleteProperty 允许你删除一个对象上的属性。返回一个 Boolean 值表示该属性是否被成功删除。它几乎与非严格的 delete operator 相同。
 * 语法：Reflect.deleteProperty(target, propertyKey)
 * -参数说明
 * target	删除属性的目标对象	Y
 * propertyKey	将被删除的属性的名称	Y
 */
{
    var obj = {
        x: 1,
        y: 2
    };
    Reflect.deleteProperty(obj, "x"); // true
    console.log(obj) // { y: 2 }

    // 删除数组索引
    var arr = [1, 2, 3, 4, 5];
    Reflect.deleteProperty(arr, "3"); // true
    console.log(arr); // [1, 2, 3, , 5]

    // 如果属性不存在，返回 true
    let r = Reflect.deleteProperty({}, "foo"); // true
    console.log(r)

    // 如果属性不可配置，返回 false
    let re = Reflect.deleteProperty(Object.freeze({
        foo: 1
    }), "foo"); // false
    console.log(re)
}

/**
 * Reflect.get() -Reflect.get() 方法的工作方式，就像从 object (target[propertyKey]) 中获取属性，但它是作为一个函数执行的。
 * -语法：Reflect.get(target, propertyKey[, receiver])
 * -参数说明：
 * target	需要取值的目标对象	Y
    propertyKey	需要获取的值的键值	Y
    receiver	如果遇到 getter，此值将提供给目标调用	N
 */
{
    // Object
    var obj = {
        x: 1,
        y: 2
    }
    console.log('Reflect.get obj:', Reflect.get(obj, 'x')) // 1
    //  数组
    console.log('Reflect.get array:', Reflect.get([1, 2, 4], '1')) // 2
}

/**
 * Reflect.get​OwnProperty​Descriptor()
    静态方法 Reflect.getOwnPropertyDescriptor() 与 Object.getOwnPropertyDescriptor() 方法相似。
    如果在对象中存在，则返回给定的属性的属性描述符，否则返回 undefined。
    语法
    Reflect.getOwnPropertyDescriptor(target, propertyKey)
    解释
    参数	含义	必选
    target	需要寻找属性的目标对象	Y
    propertyKey	获取自己的属性描述符的属性的名称	N
 */
{
    console.log(
        Reflect.getOwnPropertyDescriptor({
            x: 'hello'
        }, 'x')
    ) // {value: "hello", writable: true, enumerable: true, configurable: true}
    // 没有的属性返回undefined
    console.log(Reflect.getOwnPropertyDescriptor({
        x: 'hello'
    }, 'y')) // undefined

    // 数组
    console.log(Reflect.getOwnPropertyDescriptor([], 'length')) // {value: 0, writable: true, enumerable: false, configurable: false}
    // 
    // console.log(Reflect.getOwnPropertyDescriptor("foo", 0)) // // TypeError: "foo" is not non-null object
    console.log(Object.getOwnPropertyDescriptor("foo", 0)) // // { value: "f", writable: false, enumerable: true, configurable: false }
}

/**
 * Reflect.get​PrototypeOf()
    静态方法 Reflect.getPrototypeOf() 与 Object.getPrototypeOf() 方法是一样的。 
    都是返回指定对象的原型（ 即， 内部的[[Prototype]] 属性的值）。
    语法
    Reflect.getPrototypeOf(target)
    解释
    参数 含义 必选
    target 获取原型的目标对象 Y
 */
{
    let d = new Date()
    console.log(Reflect.getPrototypeOf(d), d instanceof Date) // true
}

/**
  * Reflect.has()
    Reflect.has 用于检查一个对象是否拥有某个属性， 相当于in 操作符
    语法
    Reflect.has(target, propertyKey)
    解释
    参数 含义 必选
    target 获取原型的目标对象 Y
    propertyKey 属性名， 需要检查目标对象是否存在此属性 Y
  */
{
    console.log('Reflect.has:', Reflect.has({
        x: 1
    }, 'y'))
}

/**
   * Reflect.isExtensible()
    Reflect.isExtensible 判断一个对象是否可扩展（ 即是否能够添加新的属性）， 它与 Object.isExtensible() 方法一样。
    语法
    Reflect.isExtensible(target)
    解释 *
        参数 含义 必选
    target 获取原型的目标对象 Y
   */
{
    let obj = {
        x: 1
    }
    console.log('Reflect.isExtensible:', Reflect.isExtensible(obj)) // true
    Object.freeze(obj)
    console.log('Reflect.isExtensible:', Reflect.isExtensible(obj)) // false
}

/**
    * Reflect.own​Keys()
    Reflect.ownKeys 方法返回一个由目标对象自身的属性键组成的数组。 
    它的返回值等同于 Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))
    语法
    Reflect.ownKeys(target)
    解释 *
        参数 含义 必选
    target 获取原型的目标对象 Y
    */
{
    console.log('Reflect.ownKeys:', Reflect.ownKeys({
        z: 3,
        y: 2,
        x: 1
    })) // [ "z", "y", "x" ]

    // 数组
    console.log(Reflect.ownKeys([])) // ["length"]

    // symbol
    var sym = Symbol.for("comet");
    var sym2 = Symbol.for("meteor");
    var obj = {
        [sym]: 0,
        "str": 0,
        "0": 0,
        [sym2]: 0
    };
    console.log(Reflect.ownKeys(obj)) // ["0", "str", Symbol(comet), Symbol(meteor)]
    // Indexes in numeric order,
    // strings in insertion order,
    // symbols in insertion order
}


/**
 * Reflect.prevent​Extensions() 
    Reflect.preventExtensions 方法阻止新属性添加到对象 例如： 防止将来对对象的扩展被添加到对象中)。 
    该方法与 Object.preventExtensions() 方法一致
    语法
    Reflect.preventExtensions(target)
    解释 *
        参数 含义 必选
    target 获取原型的目标对象 Y
 */

{
    // Objects are extensible by default.
    var empty = {};
    console.log('Reflect.isExtensible:', Reflect.isExtensible(empty)) // === true
    // ...but that can be changed.
    Reflect.preventExtensions(empty);
    console.log('Reflect.isExtensible after preventExtensible:', Reflect.isExtensible(empty)) // === true
    // Reflect.preventExtensions(1); // Uncaught TypeError: Reflect.preventExtensions called on non-object
    console.log('Object.preventExtensions:', Object.preventExtensions(1))
}

/**
 * Reflect.set()
    Reflect.set 方法允许你在对象上设置属性。 它的作用是给属性赋值并且就像 property accessor 语法一样， 但是它是以函数的方式。
    语法
    Reflect.set(target, propertyKey, value[, receiver])
    解释 *
        参数 含义 必选
    target 获取原型的目标对象 Y
    propertyKey 设置的属性的名称 Y
    value 设置的值 Y
    receiver 如果遇到 setter， this 将提供给目标调用 N
 */
{
    var obj = {};
    Reflect.set(obj, "prop", "我是Reflect.set的prop"); // true
    console.log('Reflect.set:', obj.prop); // "value"
    // Array
    var arr = ["duck", "duck", "duck"];
    Reflect.set(arr, 2, "goose"); // true
    console.log('Reflect.set arr:', arr); // ["duck", "duck", "goose"]
    // It can truncate an array.
    Reflect.set(arr, "length", 1); // true
    console.log('Reflect.set arr length:', arr) // ["duck"]
    // 只有一个参数，key和value都是undefined
    var obj = {};
    Reflect.set(obj); // true
    console.log(obj) // 6_Reflect.js:293 {undefined: undefined}
    console.log( Reflect.getOwnPropertyDescriptor(obj, undefined)) // { value: undefined, writable: true, enumerable: true, configurable: true }
}

/**
 * Reflect.set​PrototypeOf()
    Reflect.setPrototypeOf 方法改变指定对象的原型（ 即， 内部的[[Prototype]] 属性值）
    语法
    Reflect.setPrototypeOf(target, prototype)
    解释 *

        参数 含义 必选
    target 获取原型的目标对象 Y
    prototype 对象的新原型（ 一个对象或 null） Y

 */
{
    let obj = {}
    Reflect.setPrototypeOf(obj, Object.prototype); // true
    console.log(Reflect.getPrototypeOf(obj))

    // 改变prototype
    Reflect.setPrototypeOf(obj, null);  // true
    console.log(Reflect.getPrototypeOf(obj)) // null

    // 
    Reflect.setPrototypeOf(obj, String); // true
    console.log(Reflect.getPrototypeOf(obj)) // String

    // 如果obj是不可扩展的，则设置不成功
    Object.freeze(obj)
    console.log(Reflect.setPrototypeOf(obj, null))     // false
    console.log(Reflect.getPrototypeOf(obj)) // String

    // 如果设置导致原型链循环，则设置不成功
    var target = {};
    var proto = Object.create(target);
    console.log(Reflect.setPrototypeOf(target, proto)) // false
}


/**
 * [!WARNING]
 * 对于以上所有 API 第一个参数是 Object 的， 如果给定的不是 Object 则抛出一个 TypeError 异常
 */
