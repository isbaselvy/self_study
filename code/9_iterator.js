/**
 * 迭代理解:循环是迭代的基础,for循环是最简单的一种迭代
 */
{
    for (let i = 1; i <= 10; ++i) {
        // console.log(i);
    }
}

/**
 * 迭代器模式:实现了正式的 Iterable 接口，而且可以通过迭代器 Iterator 消费
 * 可迭代对象:基本上，可以把可迭代对象理解成数组或集合这样的集合类型的对象。
 * 它们包含的元素都是有限的，而且都具有无歧义的遍历顺序
 * 可迭代协议:Iterable 接口,实现 Iterable 接口（可迭代协议）要求同时具备两种能力：支持迭代的自我识别能力和创建实现Iterator 接口的对象的能力。
 * 在 ECMAScript 中，这意味着必须暴露一个属性作为“默认迭代器”，而且这个属性必须使用特殊的 Symbol.iterator 作为键。
 * 这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。
 * 实现了Iterable的内置对象:字符串,数组,映射,集合,arguments对象,nodeList等DOM集合类型
 */
{
    // 检查是否存在默认迭代器
    const str = 'abc'
    const num = 2
    console.log(str[Symbol.iterator]) // ƒ [Symbol.iterator]() { [native code] }
    console.log(num[Symbol.iterator]) // undefined
    // 调用迭代器工厂函数会生成一个迭代器
    console.log(str[Symbol.iterator]()); // StringIterator {}

    // 实际写代码过程中,不需要显示调用迭代器工厂函数生成迭代器,实现可迭代协议的所有类型都会自动兼容接收可迭代对象的任何语言特性。
    // 接收可迭代对象的原生语言特性包括：for...of,数组解构, 扩展操作符, Array.from(), 创建集合,创建映射, promise.all,Promise.race(),yield*
    // 这些原生语言结构会在后台调用提供的可迭代对象的这个工厂函数，从而创建一个迭代器：
    let arr = ['foo', 'bar', 'baz'];
    let arr2 = [...arr];
    console.log(arr2); // ['foo', 'bar', 'baz']
    // 如果对象原型链上的父类实现了 Iterable 接口，那这个对象也就实现了这个接口：
    class FooArray extends Array { }
    let fooArr = new FooArray('foo', 'bar', 'baz');
    for (let el of fooArr) {
        console.log(el);
    }
}

/**
 * 迭代器协议:
 * 迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。
 * 迭代器 API 使用 next()方法在可迭代对象中遍历数据。每次成功调用 next()，都会返回一个 IteratorResult 对象，
 * 其中包含迭代器返回的下一个值。若不调用 next()，则无法知道迭代器的当前位置。
 * next()方法返回的迭代器对象 IteratorResult 包含两个属性： done 和 value。
 * done 是一个布尔值，表示是否还可以再次调用 next()取得下一个值； value 包含可迭代对象的下一个值（ done 为false），
 * 或者 undefined（ done 为 true）。 done: true 状态称为“耗尽”。
 */
{
    // 以数组为例
    let arr = ['foo', 'bar']
    // 获取迭代器工厂函数
    let iterFunc = arr[Symbol.iterator]
    console.log(iterFunc) // ƒ values() { [native code] }
    // 获取迭代器对象
    // let iter = iterFunc() 会报错
    let iter = arr[Symbol.iterator]()
    console.log(iter) // Array Iterator {}
    // 调用迭代器的next方法
    console.log(iter.next()); // {value: "foo", done: false}
    console.log(iter.next()); // {value: "bar", done: false}
    console.log(iter.next()); // {value: undefined, done: true},迭代器已耗尽,再次调用仍是同样的结果
    console.log(iter.next()); // {value: undefined, done: true}

    // 每个迭代器都表示对可迭代对象的一次性有序遍历。不同迭代器的实例相互之间没有联系，只会独立地遍历可迭代对象
    let iter2 = arr[Symbol.iterator]()
    console.log(iter2.next()); // {value: "foo", done: false}
    // 迭代器仅仅是使用游标来记录遍历可迭代对象的历程,如果可迭代对象在迭代期间被修改了，那么迭代器也会反映相应的变化：
    // 在数组中间插入值
    arr.splice(1, 0, 'ccc');
    console.log(iter2.next()); // {value: "ccc", done: false}
    // ......
    // ![TIP]:迭代器维护着一个指向可迭代对象的引用，因此迭代器会阻止垃圾回收程序回收可迭代对象。
    console.log('数组的两个迭代器示例iter === iter2:', iter === iter2) // false

    // 每个以这种方式创建的迭代器也实现了 Iterable 接口,Symbol.iterator 属性引用的工厂函数会返回相同的迭代器
    // 使用迭代器iter再生成一个迭代器iter2
    let iter3 = iter[Symbol.iterator]()
    console.log('数组的迭代器iter与iter生成的迭代器iter3,iter === iter3:', iter === iter3) // true
    // 因为每个迭代器也实现了 Iterable 接口，所以它们可以用在任何期待可迭代对象的地方
    for (let item of iter3) {
        console.log('迭代器iter生成的迭代器iter3', item);
    } // 此处前面iter已使用next迭代完,所以无输出

    let iter4 = arr[Symbol.iterator]()
    let iter5 = iter4[Symbol.iterator]()
    // for (let item of iter5 ) { console.log('迭代器iter4生成的迭代器iter5', item); } // foo bar ccc
    // 不用for of,采用next, iter4和iter5是同一个迭代器,iter4调用一次后,游标已执行ccc,所以再次调用iter打出的是ccc
    console.log('iter4:', iter4.next()) // {value: "foo", done: false}
    console.log('iter5:', iter5.next()) // {value: "ccc", done: false}

    /**
     * “迭代器”的概念有时候容易模糊，因为它可以指通用的迭代，也可以指接口，还可以指正式的迭
     * 代器类型。下面的例子比较了一个显式的迭代器实现和一个原生的迭代器实现。
     */
    // 这个类实现了可迭代接口（ Iterable）
    // 调用默认的迭代器工厂函数会返回
    // 一个实现迭代器接口（ Iterator）的迭代器对象
    class Foo {
        [Symbol.iterator]() {
            return {
                next() {
                    return {
                        done: false,
                        value: 'foo'
                    };
                }
            }
        }
    }
    let f = new Foo();
    // 打印出实现了迭代器接口的对象
    console.log(f[Symbol.iterator]()); // { next: f() {} }
    // Array 类型实现了可迭代接口（ Iterable）
    // 调用 Array 类型的默认迭代器工厂函数
    // 会创建一个 ArrayIterator 的实例
    let a = new Array();
    // 打印出 ArrayIterator 的实例
    console.log(a[Symbol.iterator]()); // Array Iterator {}
}

/**
 * 自定义迭代器:与 Iterable 接口类似，任何实现 Iterator 接口的对象都可以作为迭代器使用
 * 这个属性必须使用特殊的 Symbol.iterator 作为键, 返回一个next方法供调用
 */
{
    class Counter {
        // Counter 的实例应该迭代 limit 次
        constructor(limit) {
            this.count = 1;
            this.limit = limit;
        }
        next() {
            if (this.count <= this.limit) {
                // next方法的返回对象固定,须有{done: bool, value: any}字段
                return {
                    done: false,
                    value: this.count++
                };
            } else {
                // 须有截止条件
                return {
                    done: true,
                    value: undefined
                };
            }
        }
        [Symbol.iterator]() {
            return this;
        }
    }
    let counter = new Counter(3);
    for (let i of counter) {
        console.log(i); // 1 2 3
    }
    // 这个类实现了 Iterator 接口，但不理想。这是因为它的每个实例只能被迭代一次
    for (let i of counter) {
        console.log(i); // 无输出
    }
    // 改进,将limit与迭代器生成的时候一同赋值
    class Counter2 {
        constructor(limit) {
            this.limit = limit;
        }
        [Symbol.iterator]() {
            let count = 1
            let limit = this.limit
            return {
                next() {
                    if (count <= limit) {
                        return {
                            done: false,
                            value: count++
                        };
                    } else {
                        return {
                            done: true,
                            value: undefined
                        };
                    }
                }
            };
        }
    }
    let counter2 = new Counter2(3);
    for (let i of counter2) {
        console.log('counter2:', i); // 1 2 3
    }
    for (let i of counter2) {
        console.log('counter2:', i); // 1 2 3
    }
    // 自定义的iterator对象未实现Iterable接口
    // let iter1 = counter2[Symbol.iterator]()
    // let iter2 = iter1[Symbol.iterator]()// Uncaught TypeError: iter1[Symbol.iterator] is not a function
    // console.log(iter1 === iter2) 
}

/**
 * 可终止的迭代器
 * 可选的 return()方法用于指定在迭代器提前关闭时执行的逻辑。执行迭代的结构在想让迭代器知道它不想遍历到可迭代对象耗尽时，就可以“关闭”迭代器。
 * 例如:for-of 循环通过 break、 continue、 return 或 throw 提前退出,解构操作并未消费所有值
 * return()方法必须返回一个有效的 IteratorResult 对象。简单情况下，可以只返回{ done: true }
 */
{
    console.log('---------------可中止迭代器分割线------------')
    class Counter {
        constructor(limit) {
            this.limit = limit;
        }
        [Symbol.iterator]() {
            let count = 1, limit = this.limit;
            return {
                // next方法迭代器调用
                next() {
                    if (count <= limit) {
                        return {
                            done: false,
                            value: count++
                        };
                    } else {
                        return {
                            done: true
                        };
                    }
                },
                // return方法可选,指定关闭逻辑
                return() {
                    console.log('Exiting early');
                    return {
                        done: true
                    };
                }
            };
        }
    }
    let counter1 = new Counter(5);
    // for ... of的break中止
    for (let i of counter1) {
        if (i > 2) {
            // 中止迭代会调用return方法
            break;
        }
        console.log('for..of:', i); // 1, 2,  'Exiting early'
    }
    // throw 错误中止
    let counter2 = new Counter(5);
    try {
        for (let i of counter2) {
            if (i > 2) {
                throw 'err';
            }
            console.log('throw error', i); // 1, 2,  'Exiting early'
        }
    } catch (e) { }
    // 解构中止
    let counter3 = new Counter(5)
    let [a, b] = counter3 // 'Exiting early'

    // 如果迭代器没有关闭，则还可以继续从上次离开的地方继续迭代。比如，数组的迭代器就是不能关闭的：
    let arr = [1, 2, 3, 4, 5];
    let iter = arr[Symbol.iterator]();
    for (let i of iter) {
        console.log(i); // 1 2 3
        if (i > 2) {
            break
        }
    }
    for (let i of iter) {
        console.log(i); // 4 5
    }

    /**
     * 因为 return()方法是可选的，所以并非所有迭代器都是可关闭的。要知道某个迭代器是否可关闭，
     * 可以测试这个迭代器实例的 return 属性是不是函数对象。不过，仅仅给一个不可关闭的迭代器增加这
     * 个方法并不能让它变成可关闭的。这是因为调用 return()不会强制迭代器进入关闭状态。即便如此，return()方法还是会被调用。
     */
    
    let arr2 = [1, 2, 3, 4, 5];
    let iter2 = arr2[Symbol.iterator]();
    iter2.return = function () {
        console.log('Exiting early');
        return { done: true };
    };
    for (let i of iter2) {
        console.log(i);
        if (i > 2) {
            break
        }
    }
    // 1
    // 2
    // 3
    // Exiting early
    for (let i of iter2) {
        console.log(i);
    }
    // 4
    // 5
}

/**
 * 可迭代协议：有Symbol.iterator,就是可迭代的
 * 迭代器协议：迭代器要求返回一个对象，对象包含next方法，next返回{done, value}
 */