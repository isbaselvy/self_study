/**
 * 代理: ，可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用。
 * 在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制。
 * 语法:new Proxy(target, handler)
 * @param target 要处理的目标对象 必须
 * @param handler 处理程序对象 必须
 */
{
    let o = {
        name: 'xiaoming',
        price: 190
    }

    // 以下可简写:const proxy = new Proxy(target, Reflect);
    let p = new Proxy(o, {
        /**
         * get:在调用p.property,p[property],Object.create(proxy)[property]等会触发get
         * @param {*} target 目标对象,此处为o
         * @param {*} property 属性key
         * @param {*} receiver 接收对象,此处为p
         * @returns 
         */
        get(target, property, receiver) {
            console.log(target === o, receiver === p) // true true
            return Reflect.get(...arguments) + 'hhh'
        },

        set() {
            return Reflect.get(...arguments)
        },

        has() {
            console.log('触发has拦截')
            return Reflect.get(...arguments)
        }
    })
    // for in不会触发
    // for (const key in p) {
    //     console.log('key-------', key)
    // }
    // console.log('in 操作:', ('name' in p))
    // console.log(p, p.name) // p.name: xiaominghhh
    // Proxy {name: "xiaoming", price: 190}
    // [[Handler]]: Object
    // [[Target]]: Object
    // [[IsRevoked]]: false

    // 在代理对象上执行的任何操作实际上都会应用到目标对象上
    p.age = 14
    console.log(o.age) // 14
    // Proxy.prototype是undefined,因此不能使用instanceof
    // console.log(p instanceof Proxy) // Uncaught TypeError: Function has non-object prototype 'undefined' in instanceof check
    console.log(o === p) // false
    //  捕获器不变式:防止捕获其定义出现过于反常的行为
    // eg: name属性不可配置,不可写,当捕获器返回一个与原有name不同的值时,则会抛出typeerror,返回值一样则不报错
    Object.defineProperty(o, 'name', {
        writable: false,
        configurable: false
    })
    // p.name = 'new hhh' // 设置不可改变不可配置的值时会抛出type error
    // 8_proxy.js:50 Uncaught TypeError: 'set' on proxy: trap returned truish for property 'name' which exists 
    // in the proxy target as a non-configurable and non-writable data property with a different value
    // console.log(p.name) 
    // ncaught TypeError: 'get' on proxy: property 'name' is a read-only and non-configurable  data property 
    //on the proxy target but the proxy did not return its actual value (expected 'xiaoming' but got 'xiaominghhh')
}

/**
 * 可撤销代理:操作不可逆,且，撤销函数（ revoke()）是幂等的，调用多少次的结果都一样。
 * 撤销代理之后再调用代理会抛出 TypeError。
 * 撤销函数d.revoke和代理对象d.proxy是在实例化时同时生成的
 */
{
    let o = {
        name: 'xiaoming',
        price: 190
    }

    let d = Proxy.revocable(o, {
        get(target, key) {
            if (key === 'price') {
                return target[key] + 20
            } else {
                return target[key]
            }
        }
    })

    console.log(d.proxy.price, d)
    setTimeout(function () {
        d.revoke()
        setTimeout(function () {
            // console.log(d.proxy.price) // 8_proxy.js:75 Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
        }, 100)
    }, 1000)
}
/**
 * 使用反射API
 * 1.状态标记:很多反射方法返回称作“状态标记”的布尔值，表示意图执行的操作是否成功。
 * 有时候，状态标记比那些返回修改后的对象或者抛出错误（取决于方法）的反射 API 方法更有用
 * 提供状态返回的方法:
 * Reflect.defineProperty()
 * Reflect.preventExtensions()
 * Reflect.setPrototypeOf()
 * Reflect.set()
 * Reflect.deleteProperty()
 * 
 * 2. 用函数替代操作符
 * 以下反射方法提供只有通过操作符才能完成的操作。
 * Reflect.get()：可以替代对象属性访问操作符。
 * Reflect.set()：可以替代=赋值操作符。
 * Reflect.has()：可以替代 in 操作符或 with()。
 * Reflect.deleteProperty()：可以替代 delete 操作符。
 * Reflect.construct()：可以替代 new 操作符。
 * 
 * 3. 安全地应用函数
 * 在通过 apply 方法调用函数时，被调用的函数可能也定义了自己的 apply 属性（虽然可能性极小）。
 * 为绕过这个问题，可以使用定义在 Function 原型上的 apply 方法，比如：
 * Function.prototype.apply.call(myFunc, thisVal, argumentList);
 * 这种可怕的代码完全可以使用 Reflect.apply 来避免：
 * Reflect.apply(myFunc, thisVal, argumentsList);
 */
{
    // const o = {};
    // try {
    //     Object.defineProperty(o, 'foo', 'bar');
    //     console.log('success');
    // } catch (e) {
    //     console.log('failure');
    // }
    // 在定义新属性时如果发生问题， Reflect.defineProperty() 会返回 false， 而不是抛出错误。
    // 因此使用这个反射方法可以这样重构上面的代码：
    // 重构后的代码
    const o = {};
    if (Reflect.defineProperty(o, 'foo', {
            value: 'bar'
        })) {
        console.log('success');
    } else {
        console.log('failure');
    }
}

/**
 * 代理可以使用多层代理
 */
{
    const target = {
        foo: 'bar'
    };
    const firstProxy = new Proxy(target, {
        get() {
            console.log('first proxy');
            return Reflect.get(...arguments);
        }
    });
    const secondProxy = new Proxy(firstProxy, {
        get() {
            console.log('second proxy');
            return Reflect.get(...arguments);
        }
    });
    console.log(secondProxy.foo);
    // second proxy
    // first proxy
    // bar
}

/**
 * 代理的问题
 * 1. 代理中的 this
 * 2. 代理与内部槽位
 */
{
    // 代理中的this
    const target = {
        thisValEqualsProxy() {
            return this === proxy;
        }
    }
    const proxy = new Proxy(target, {});
    console.log(target.thisValEqualsProxy()); // false
    console.log(proxy.thisValEqualsProxy()); // true

    // 当代理对象依赖于对象标识时,就可能碰到意料之外的问题。
    const wm = new WeakMap();
    class User {
        constructor(userId) {
            wm.set(this, userId);
        }
        set id(userId) {
            wm.set(this, userId);
        }
        get id() {
            return wm.get(this);
        }
    }

    const user = new User('123')
    const up = new Proxy(user, Reflect)
    console.log(up.id) // undefined

    // 这是因为 User 实例一开始使用目标对象作为 WeakMap 的键，代理对象却尝试从自身取得这个实
    // 例。要解决这个问题，就需要重新配置代理，把代理 User 实例改为代理 User 类本身。之后再创建代
    // 理的实例就会以代理实例作为 WeakMap 的键了：
    const UserClassProxy = new Proxy(User, {});
    const proxyUser = new UserClassProxy(456);
    console.log(proxyUser.id); // 456

    // 2. 代理与内部槽位
    // 代理与内置引用类型（比如 Array）的实例通常可以很好地协同，但有些 ECMAScript 内置类型可
    // 能会依赖代理无法控制的机制，结果导致在代理上调用某些方法会出错。
    // 一个典型的例子就是 Date 类型。根据 ECMAScript 规范， Date 类型方法的执行依赖 this 值上的
    // 内部槽位[[NumberDate]]。代理对象上不存在这个内部槽位，而且这个内部槽位的值也不能通过普通
    // 的 get()和 set()操作访问到，于是代理拦截后本应转发给目标对象的方法会抛出 TypeError：
    const target2 = new Date();
    const proxy2 = new Proxy(target2, {});
    console.log(proxy2 instanceof Date); // true
    // proxy2.getDate(); // TypeError: 'this' is not a Date object
}

/**
 * 代理捕获器与反射方法-handler对象配置项(共13项)及触发操作
 * 1.get(target, property, receiver)
 * -返回值:无限制
 * -拦截操作:proxy.property,proxy[property],Object.create(proxy)[property],Reflect.get(proxy, property, receiver)
 * -捕获器不变式: 如果target.property 不可写且不可配置，则处理程序返回的值必须与 target.property 匹配
 *  如果 target.property 不可配置且[[Get]]特性为 undefined， 处理程序的返回值也必须是 undefined。
 * 
 * 2.set(target, property, value, receiver)
 * -返回值:返回 true 表示成功；返回 false 表示失败，严格模式下会抛出 TypeError
 * -拦截操作:proxy.property = value,  proxy[property] = value, Object.create(proxy)[property] = value, Reflect.set(proxy, property, value, receiver)
 * -捕获器不变式:
 *      如果 target.property 不可写且不可配置，则不能修改目标属性的值。
 *      如果 target.property 不可配置且[[Set]]特性为 undefined，则不能修改目标属性的值。
 *      在严格模式下，处理程序中返回 false 会抛出 TypeError
 * 
 * 3.has(target, property)
 * -返回值:必须返回布尔值，表示属性是否存在。返回非布尔值会被转型为布尔值。
 * -拦截操作:property in proxy, property in Object.create(proxy), with(proxy) {(property);}, Reflect.has(proxy, property)
 * -捕获器不变式:
 *      如果 target.property 存在且不可配置，则处理程序必须返回 true。
 *      如果 target.property 存在且目标对象不可扩展，则处理程序必须返回 true。
 * 
 * 4.defineProperty(target, property, descriptor)
 * -返回值:必须返回布尔值，表示属性是否存在。返回非布尔值会被转型为布尔值。
 * -拦截操作:Object.defineProperty(proxy, property, descriptor), Reflect.defineProperty(proxy, property, descriptor)
 * -捕获器不变式:
 *      如果目标对象不可扩展，则无法定义属性。
 *      如果目标对象有一个可配置的属性，则不能添加同名的不可配置属性。
 *      如果目标对象有一个不可配置的属性，则不能添加同名的可配置属性。
 * 
 * 5.getOwnPropertyDescriptor(target, property)
 * -返回值:必须返回对象，或者在属性不存在时返回 undefined
 * -拦截操作:Object.getOwnPropertyDescriptor(proxy, property), Reflect.getOwnPropertyDescriptor(proxy, property)
 * -捕获器不变式:
 *      如果自有的 target.property 存在且不可配置，则处理程序必须返回一个表示该属性存在的对象。
 *      如果自有的 target.property 存在且可配置，则处理程序必须返回表示该属性可配置的对象。
 *      如果自有的 target.property 存在且 target 不可扩展，则处理程序必须返回一个表示该属性存在的对象。
 *      如果 target.property 不存在且 target 不可扩展，则处理程序必须返回 undefined 表示该属性不存在。
 *      如果 target.property 不存在，则处理程序不能返回表示该属性可配置的对象
 * 
 * 6.deleteProperty(target, property)
 * -返回值:必须返回布尔值，表示删除属性是否成功。返回非布尔值会被转型为布尔值。
 * -拦截操作:delete proxy.property, delete proxy[property], Reflect.deleteProperty(proxy, property)
 * -捕获器不变式:
 *      如果自有的 target.property 存在且不可配置，则处理程序不能删除这个属性。
 *      
 * 7.ownKeys(target)
 * -返回值:必须返回包含字符串或符号的可枚举对象
 * -拦截操作:Object.getOwnPropertyNames(proxy), Object.getOwnPropertySymbols(proxy), Object.keys(proxy), Reflect.ownKeys(proxy)
 * -捕获器不变式:
 *      返回的可枚举对象必须包含 target 的所有不可配置的自有属性。
 *      如果 target 不可扩展，则返回可枚举对象必须准确地包含自有属性键
 * 
 * 
 * 8.getPrototypeOf(target)
 * -返回值:必须返回对象或 null。
 * -拦截操作:Object.getPrototypeOf(proxy), Reflect.getPrototypeOf(proxy), proxy.__proto__, Object.prototype.isPrototypeOf(proxy), proxy instanceof Object
 * -捕获器不变式:
 *      如果 target 不可扩展，则 Object.getPrototypeOf(proxy)唯一有效的返回值就是 Object.getPrototypeOf(target)的返回值。
 * 
 * 9.setPrototypeOf(target, prototype) 
 * -返回值:必须返回布尔值，表示原型赋值是否成功。返回非布尔值会被转型为布尔值。
 * -拦截操作:Object.setPrototypeOf(proxy), Reflect.setPrototypeOf(proxy)
 * -捕获器不变式:
 *      如果 target 不可扩展，则唯一有效的 prototype 参数就是 Object.getPrototypeOf(target)的返回值。
 * 
 * 10.isExtensible(target)
 * -返回值:必须返回布尔值，表示 target 是否可扩展。返回非布尔值会被转型为布尔值。
 * -拦截操作:Object.isExtensible(proxy), Reflect.isExtensible(proxy)
 * -捕获器不变式:
 *      如果 target 可扩展，则处理程序必须返回 true,反之false
 * 
 * 11.preventExtensions(target)
 * -返回值:必须返回布尔值，表示 target 是否已经不可扩展。返回非布尔值会被转型为布尔值。
 * -拦截操作:Object.preventExtensions(proxy), Reflect.preventExtensions(proxy)
 * -捕获器不变式:
 *      如果 Object.isExtensible(proxy)是 false，则处理程序必须返回 true。
 * 
  * 12.apply(target, thisArg, ...argumentsList) 
 * -返回值:无限制
 * -拦截操作:proxy(...argumentsList), Function.prototype.apply(thisArg, argumentsList), Function.prototype.call(thisArg, ...argumentsList), Reflect.apply(target, thisArgument, argumentsList)
 * -捕获器不变式:
 *      target 必须是一个函数对象
 * 
 * 13.construct(target, argumentsList, newTarget)
 * -返回值:construct()必须返回一个对象。
 * -拦截操作:new proxy(...argumentsList), Reflect.construct(target, argumentsList, newTarget)
 * -捕获器不变式:
 *      target 必须可以用作构造函数。
 * 
 * 
 */

/**
 * 应用:
 * 1.跟踪属性访问:通过捕获 get、 set 和 has 等操作，可以知道对象属性什么时候被访问、被查询。把实现相应捕获器的某个对象代理放到应用中，可以监控这个对象何时在何处被访问过：
 * 2.隐藏属性:设置对外部不可见
 * 3.属性验证:因为所有赋值操作都会触发 set()捕获器，所以可以根据所赋的值决定是允许还是拒绝赋值：
 * 4.函数与构造函数参数验证:跟保护和验证对象属性类似，也可对函数和构造函数参数进行审查。比如，可以让函数只接收某种类型的值：
 * 5.数据绑定与可观察对象:通过代理可以把运行时中原本不相关的部分联系到一起。这样就可以实现各种模式，从而让不同的代码互操作。
 * 6.深度监听对象,数组的变化
 */
{
    // 应用5.1:可以将被代理的类绑定到一个全局实例集合，让所有创建的实例都被添加到这个集合中：
    const userList = [];
    class User {
        constructor(name) {
            this.name_ = name;
        }
    }
    const proxy = new Proxy(User, {
        construct() {
            const newUser = Reflect.construct(...arguments);
            userList.push(newUser);
            return newUser;
        }
    });
    new proxy('John');
    new proxy('Jacob');
    new proxy('Jingleheimerschmidt');
    console.log('userList:', userList); // [User {}, User {}, User{}]
}

// 5.2 还可以把集合绑定到一个事件分派程序，每次插入新实例时都会发送消息：
{
    const userList = [];

    function emit(newValue) {
        console.log('添加成功:', newValue);
    }
    const proxy = new Proxy(userList, {
        set(target, property, value, receiver) {
            const result = Reflect.set(...arguments);
            if (result) {
                emit(Reflect.get(target, property, receiver));
            }
            return result;
        }
    });
    proxy[0]='John' // 只触发一次emit
    proxy.push('Jacob'); // ?会触发两次emit, why todo, 对length的监控?
}

/**
 * 应用场景一: 需要复制一份数据,且不修改原数据
 */
{
    let o = {
        name: 'xiaoming',
        price: 190
    }

    let d = new Proxy(o, {
        get(target, key) {
            return target[key]
        },
        set(target, key, value) {
            return false
        }
    })
    d.price = 300
    console.log(d.price, d.name)

    // ES5中实现,但不完全一致
    // for (let [key] of Object.entries(o)) {
    //   Object.defineProperty(o, key, {
    //     writable: false
    //   })
    // }
    // o.pirce = 300
    // console.log(o.name, o.price)
}

/**
 * 应用场景二: 数据拦截,校验
 */
{
    // 监听错误
    window.addEventListener('error', (e) => {
        console.log(e.message)
        // report('./')
    }, true)

    let o = {
        name: 'xiaoming',
        price: 190
    }
    // 校验规则
    let validator = (target, key, value) => {
        if (Reflect.has(target, key)) {
            if (key === 'price') {
                if (value > 300) {
                    // 不满足规则就要触发错误
                    throw new TypeError('price exceed 300')
                    // return false
                } else {
                    target[key] = value
                }
            } else {
                target[key] = value
            }
        } else {
            return false
        }
    }
    let d = new Proxy(o, {
        get(target, key) {
            return target[key] || ''
        },
        set: validator
    })
    // d.price = 301
    d.name = 'hanmeimei'
    // d.age = 400
    console.log(d.price, d.name, d.age)
}

/**
 * 生成只读属性
 */
{
    class Component {
        constructor() {
            this.proxy = new Proxy({
                id: Math.random().toString(36).slice(-8)
            }, {})
        }
        get id() {
            return this.proxy.id
        }
    }

    let com = new Component()
    let com2 = new Component()
    for (let i = 0; i < 10; i++) {
        console.log(com.id, com2.id)
    }
    com.id = 'abc' // 此处修改不成功
    console.log(com.id, com2.id)
}