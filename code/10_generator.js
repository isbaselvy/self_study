/**
 * 生成器基础
 * 生成器的形式是一个函数，函数名称前面加一个星号（ *）表示它是一个生成器。只要是可以定义函数的地方，就可以定义生成器。
 * 注意 箭头函数不能用来定义生成器函数。
 * 标识生成器函数的星号不受两侧空格的影响：
 */
{
    // 生成器函数声明
    function* generatorFn() { }
    // // 生成器函数表达式
    // let generatorFn = function* () { }
    // // 作为对象字面量方法的生成器函数
    // let foo = {
    //     * generatorFn() { }
    // }
    // // 作为类实例方法的生成器函数
    // class Foo {
    //     * generatorFn() { }
    // }
    // // 作为类静态方法的生成器函数
    // class Bar {
    //     static * generatorFn() { }
    // }

    // 调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行（ suspended）的状态。
    // 与迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器开始或恢复执行
    const g = generatorFn()
    console.log(g)
    /*
        generatorFn {<suspended>}
        __proto__: Generator
        [[GeneratorLocation]]: 10_generator.js:9
        [[GeneratorState]]: "suspended"
        [[GeneratorFunction]]: ƒ* generatorFn()
        [[GeneratorReceiver]]: Window
        [[Scopes]]: Scopes[2]
    */
    console.log(g.next); // ƒ next() { [native code] }
    // next()方法的返回值类似于迭代器，有一个 done 属性和一个 value 属性。
    // 函数体为空的生成器函数中间不会停留，调用一次 next()就会让生成器到达 done: true 状态。
    console.log(g.next()) // {value: undefined, done: true}

    // value 属性是生成器函数的返回值，默认值为 undefined，可以通过生成器函数的返回值指定
    function* generatorFnHasVal() {
        console.log('开始执行了!') // 生成器函数只会在初次调用 next()方法后开始执行
        return 'foo has return value'
    }
    const g2 = generatorFnHasVal() // 此时不会输出'开始执行了!'
    console.log(g2.next()); // {value: "foo has return value", done: true}
    // 生成器对象实现了 Iterable 接口，它们默认的迭代器是自引用的：
    console.log(generatorFn()); // generatorFn {<suspended>}
    console.log(generatorFn()[Symbol.iterator]()); // generatorFn {<suspended>}
    console.log(g === g[Symbol.iterator]()); // true

    console.log(generatorFn() === generatorFn()[Symbol.iterator]()) // 每一次generatorFn()生成的是不同的迭代器
}

/**
 * 通过yield中断执行
 * yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。生成器函数在遇到 yield关键字之前会正常执行。
 * 遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生成器函数只能通过在生成器对象上调用 next()方法来恢复执行：
 * 
 * 此时的 yield 关键字有点像函数的中间返回语句，它生成的值会出现在 next()方法返回的对象里。
 * 通过 yield 关键字退出的生成器函数会处在 done: false 状态；通过 return 关键字退出的生成器函数会处于 done: true 状态。
 * 
 * yield 关键字必须直接位于生成器函数定义中，出现在嵌套的非生成器函数中会抛出语法错误
 */
{
    function* generatorFn() {
        yield 'foo';
        console.log('first yield')
        yield 'bar'
        return 'result'
    }
    let generatorObject = generatorFn();
    console.log(generatorObject.next()); // {value: "foo", done: false}
    console.log(generatorObject.next()); // 执行console,输出first yield; {value: "bar", done: false}
    console.log(generatorObject.next()); // {value: "result", done: true}
    console.log(generatorObject.next()); // 结束后再次调用,value为undefined. {value: undefined, done: true}

    // 生成器函数内部的执行流程会针对每个生成器对象区分作用域。在一个生成器对象上调用 next()不会影响其他生成器
    let generatorObject2 = generatorFn();
    console.log(generatorObject2.next()); // {value: "foo", done: false},和generatorObject互不影响
}

/**
 * 1. 生成器对象作为可迭代对象
 * 在生成器对象上显式调用 next()方法的用处并不大。其实，如果把生成器对象当成可迭代对象，那么使用起来会更方便
 */
{
    function* generatorFn() {
        yield 1;
        yield 2;
        yield 3;
    }
    const g = generatorFn()
    for (const x of g) {
        console.log(x); // 1 2 3
    }

    // 在迭代器中讲过,数据的解构也会触发迭代
    const arr = [...generatorFn()]; // 等价下面
    console.log(arr) // [1,2,3]

    // 在需要自定义迭代对象时，这样使用生成器对象会特别有用。比如，我们需要定义一个可迭代对象，而它会产生一个迭代器，这个迭代器会执行指定的次数
    function* nTimes(n) {
        while (n--) {
            yield;
        }
    }
    for (let _ of nTimes(3)) {
        // console.log('foo');
    }
    // foo 3次
}

/**
 * 2. 使用 yield 实现输入和输出，next传参，是替换yield表达式的返回值
 * 除了可以作为函数的中间返回语句使用， yield 关键字还可以作为函数的中间参数使用。
 * 上一次让生成器函数暂停的 yield 关键字会接收到传给 next()方法的第一个值。
 * 第一次调用 next()传入的值不会被使用，因为这一次调用是为了开始执行生成器函数
 */
{
    function* generatorFn(initial) {
        console.log(initial);
        console.log('yield1:', yield '输出1');
        console.log('yield2:', yield '输出2');
        return yield 'bar'
    }
    let generatorObject = generatorFn('foo');
    // 第一次调用是为了开始执行生成器函数, next()传入的值不会被使用
    console.log(generatorObject.next('bar')); // foo, {value: "输出1", done: false},
    // 将next1赋值给yield1,将yield2的结果返回
    console.log(generatorObject.next('第二次next yield接收的值')); // yield1: 第二次next yield接收的值, {value: "输出2", done: false}执行yield2右边之前的内容,打印yield1, 第二次next yield接收的值
    // yield2: 第三次next yield接收的值, {value: "bar", done: false}
    console.log(generatorObject.next('第三次next yield接收的值'));
    // {value: "第四次next yield接收的值", done: true}
    console.log(generatorObject.next('第四次next yield接收的值'));

    // yield 关键字可以同时用于输入和输出，如下例所示：
    function* gFn() {
        return yield 'foo';
    }
    let g = gFn();
    // 遇到 yield 关键字时暂停执行并计算出要产生的值： "foo"
    console.log(g.next('bar1')); // { done: false, value: 'foo' }
    // 下一次调用 next()传入了"bar"，作为交给同一个 yield 的值。然后这个值被确定为本次生成器函数要返回的值。
    console.log(g.next('bar2')); // { done: true, value: 'bar2' }

    // yield 关键字并非只能使用一次。比如，以下代码就定义了一个无穷计数生成器函数：
    function* gFn2() {
        for (let i = 0; ; ++i) {
            yield i;
        }
    }
    let g2 = gFn2();
    console.log(g2.next().value); // 0
    console.log(g2.next().value); // 1
    console.log(g2.next().value); // 2
    console.log(g2.next().value); // 3
    // todo yield的暂停,当遇到yield表达式???
    function* gen(params) {
        let val
        val = yield 1 // 第一次next，遇到yield，只执行的yield的右边1，此时赋值动作没有发生，第二次next才执行左边的赋值
        console.log(val)
    }

    const l = gen()
    l.next()
    l.next() // console undefined
    console.log('next传值与yield表达式的值-------------------');
    function* gen2() {
        let val
        val = yield 'abc'
        console.log('val-------------', val)
        let val2 = yield 'bcd'
        console.log('val2-------------', val2)
        // return val2
    }

    const l2 = gen2();
    console.log(l2.next(10)); // {value: "abc", done: false}
    // 遇到第二个yield暂停，第一个yield接收next传参20，计算并赋值给val，输出20并将‘bcd’返回
    console.log(l2.next(20)); // val------------- 20  {value: "bcd", done: false}
    // 执行第二个yield左边赋值 30，但此时并没有将yield表达式的值返回，所以是undefined 如果第二个加了return，next执行结果将是{value: 30, done: true}
    console.log(l2.next(30)); // val2------------- 30 {value: undefined, done: true}
}

console.log('---------产生可迭代对象分界线------------')
/**
 * 3. 产生可迭代对象
 * 可以使用星号增强 yield 的行为，让它能够迭代一个可迭代对象（或generator对象），从而一次产出一个值
 * 与生成器函数的星号类似， yield 星号两侧的空格不影响其行为
 * 
 */
{
    // 等价的 generatorFn：
    // function* generatorFn() {
    //     for (const x of [1, 2, 3]) {
    //         yield x;
    //     }
    // }
    function* generatorFn() {
        yield* [1, 2, 3];
    }
    for (const x of generatorFn()) {
        console.log(x); // 1 2 3
    }

    // yield*的值是关联迭代器返回 done: true 时的 value 属性。对于普通迭代器来说，这个值是undefined：
    function* gFn() {
        console.log('iter value:', yield* [1, 2, 3]);
    }
    for (const x of gFn()) {
        console.log('value:', x);
    }
    // value: 1
    // value: 2
    // value: 3
    // iter value: undefined
    // 对于生成器函数产生的迭代器来说，这个值就是生成器函数返回的值：
    function* innerGeneratorFn() {
        yield 'foo';
        return 'bar';
    }
    function* outerGeneratorFn(genObj) {
        console.log('iter value:', yield* innerGeneratorFn());
    }
    for (const x of outerGeneratorFn()) {
        console.log('value:', x);
    }
    // value: foo
    // iter value: bar
}

/**
 * 使用 yield*实现递归算法
 * yield*最有用的地方是实现递归操作，此时生成器可以产生自身。
 */
{
    /**
     * 
     * @param {在这个例子中，每个生成器首先都会从新创建的生成器对象产出每个值，然后再产出一个整数。结
果就是生成器函数会递归地减少计数器值，并实例化另一个生成器对象。从最顶层来看，这就相当于创
建一个可迭代对象并返回递增的整数。} n 
     */
    function* nTimes(n) {
        if (n > 0) {
            yield* nTimes(n - 1);
            yield n - 1;
        }
    }
    for (const x of nTimes(3)) {
        console.log(x);
    }
    // 0
    // 1
    // 2

    /*
        使用递归生成器结构和 yield*可以优雅地表达递归算法。下面是一个图的实现，用于生成一个随
机的双向图
    */
    // class Node {
    //     constructor(id) {
    //         this.id = id;
    //         this.neighbors = new Set();
    //     }
    //     connect(node) {
    //         if (node !== this) {
    //             this.neighbors.add(node);
    //             node.neighbors.add(this);
    //         }
    //     }
    // }
    // class RandomGraph {
    //     constructor(size) {
    //         this.nodes = new Set();
    //         // 创建节点
    //         for (let i = 0; i < size; ++i) {
    //             this.nodes.add(new Node(i));
    //         }
    //         // 随机连接节点
    //         const threshold = 1 / size;
    //         for (const x of this.nodes) {
    //             for (const y of this.nodes) {
    //                 if (Math.random() < threshold) {
    //                     x.connect(y);
    //                 }
    //             }
    //         }
    //     }
    //     // 这个方法仅用于调试
    //     print() {
    //         for (const node of this.nodes) {
    //             const ids = [...node.neighbors]
    //                 .map((n) => n.id)
    //                 .join(',');
    //             console.log(`${node.id}: ${ids}`);
    //         }
    //     }
    // }
    // const g = new RandomGraph(6);
    // g.print();
    // 示例输出：
    // 0: 2,3,5
    // 1: 2,3,4,5
    // 2: 1,3
    // 3: 0,1,2,4
    // 4: 2,3
    // 5: 0,4

    //     图数据结构非常适合递归遍历，而递归生成器恰好非常合用。为此，生成器函数必须接收一个可迭
    // 代对象，产出该对象中的每一个值，并且对每个值进行递归。这个实现可以用来测试某个图是否连通，
    // 即是否没有不可到达的节点。只要从一个节点开始，然后尽力访问每个节点就可以了。结果就得到了一
    // 个非常简洁的深度优先遍历：
    class Node {
        constructor(id) {
            // ...
        }
        connect(node) {
            // ...
        }
    }
    class RandomGraph {
        constructor(size) {
            // ...
        }
        print() {
            // ...
        }
        isConnected() {
            const visitedNodes = new Set();
            function* traverse(nodes) {
                for (const node of nodes) {
                    if (!visitedNodes.has(node)) {
                        yield node;
                        yield* traverse(node.neighbors);
                    }
                }
            }
            // 取得集合中的第一个节点
            const firstNode = this.nodes[Symbol.iterator]().next().value;
            // 使用递归生成器迭代每个节点
            for (const node of traverse([firstNode])) {
                visitedNodes.add(node);
            }
            return visitedNodes.size === this.nodes.size;
        }
    }
}

/**
 * 生成器作为默认迭代器
 * 因为生成器对象实现了 Iterable 接口，而且生成器函数和默认迭代器被调用之后都产生迭代器，
所以生成器格外适合作为默认迭代器。下面是一个简单的例子，这个类的默认迭代器可以用一行代码产
出类的内容
 */
{
    class Foo {
        constructor() {
            this.values = [1, 2, 3];
        }
        *[Symbol.iterator]() {
            yield* this.values;
        }
    }
    const f = new Foo();
    for (const x of f) {
        console.log(x);
    }
    // 1
    // 2
    // 3
    // 这里， for-of 循环调用了默认迭代器（它恰好又是一个生成器函数）并产生了一个生成器对象。
    // 这个生成器对象是可迭代的，所以完全可以在迭代中使用。
}

/**
 * 提前终止生成器
 * 与迭代器类似，生成器也支持“可关闭”的概念。一个实现 Iterator 接口的对象一定有 next()方法，
 * 还有一个可选的 return()方法用于提前终止迭代器。生成器对象除了有这两个方法，还有第三个方法： throw()。
 * return()和 throw()方法都可以用于强制生成器进入关闭状态。
 */
{
    console.log('---------生成器中止return------------------');
    // 生成器的方法
    // function* generatorFn() {}
    // const g = generatorFn();
    // console.log(g); // generatorFn {<suspended>}
    // console.log(g.next); // f next() { [native code] }
    // console.log(g.return); // f return() { [native code] }
    // console.log(g.throw); // f throw() { [native code] }

    // 1. return()方法会强制生成器进入关闭状态。提供给 return()方法的值，就是终止迭代器对象的值：
    // 与迭代器不同，所有生成器对象都有 return()方法，只要通过它进入关闭状态，就无法恢复了。
    // 后续调用 next()会显示 done: true 状态，而提供的任何返回值都不会被存储或传播：
    function* generatorFn() {
        for (const x of [1, 2]) {
            yield x;
        }
    }

    const g = generatorFn();
    console.log('return前的生成器：', g); // generatorFn {<suspended>}
    console.log(g.next()); // { done: false, value: 1 }
    console.log(g.return(4)); // { done: true, value: 4 }
    console.log('retur后的生成器：', g); // generatorFn {<closed>}
    console.log(g.next()); // { done: true, value: undefined }
    console.log(g.next()); // { done: true, value: undefined }
    console.log(g.next()); // { done: true, value: undefined }

    // for-of 循环等内置语言结构会忽略状态为 done: true 的 IteratorObject 内部返回的值。
    console.log('-------for...of..中的return------------')
    function* gen() {
        for (const x of [1, 2, 3]) {
            yield x;
        }
    }
    const l = gen();
    // for (const x of l) {
    //     if (x > 1) {
    //         g.return(4);
    //     }
    //     console.log(x); // 1 2 3 
    // }
    console.log(l.next()); // {value: 1, done: false}
    l.return(4)
    console.log(l.next()); // {value: undefined, done: true}
}

/**
 * throw()方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭：
 * 不过，假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。
 * 处理会跳过对应的 yield，因此在这个例子中会跳过一个值。
 */
{
    console.log('---------生成器中止throw------------------');
    // throw 内部不处理错误
    function* generatorFn() {
        for (const x of [1, 2, 3]) {
            yield x;
        }
    }
    const g = generatorFn();
    console.log(g, g.next()); // generatorFn {<suspended>} {value: 1, done: false}
    try {
        g.throw('foo');
    } catch (e) {
        console.log(e); // foo
    }
    console.log(g, g.next()); // generatorFn {<closed>} {value: undefined, done: true}

    console.log('------throw,迭代器内部处理了错误------------');
    function* generatorFn2() {
        for (const x of [1, 2, 3]) {
            try {
                yield x;
            } catch (e) { }
        }
    }

    const l = generatorFn2();
    // 注意 如果生成器对象还没有开始执行，那么调用 throw()抛出的错误不会在函数内部被捕获，因为这相当于在函数块外部抛出了错误。
    // l.throw('start')
    console.log(l, l.next()); // generatorFn2 {<suspended>} { done: false, value: 1}
    l.throw('foo');
    console.log(l, l.next()); // generatorFn2 {<suspended>} { done: false, value: 3}
    // 在这个例子中，生成器在 try/catch 块中的 yield 关键字处暂停执行。在暂停期间， throw()方
    // 法向生成器对象内部注入了一个错误：字符串"foo"。这个错误会被 yield 关键字抛出。因为错误是在
    // 生成器的 try/catch 块中抛出的，所以仍然在生成器内部被捕获。可是，由于 yield 抛出了那个错误，
    // 生成器就不会再产出值 2。此时，生成器函数继续执行，在下一次迭代再次遇到 yield 关键字时产出了值 3。
}