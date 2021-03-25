/**
 * 字符串扩展
 * String.prototype.matchAll()
 */
{
    const str = `
    <html>
        <body>
            <div>第一个div</div>
            <p>这是p</p>
            <div>第二个div</div>
            <span>这是span</span>
            <div>第三个div</div>
        </body>
    </html>
    `
    const regExp = /<div>(.*)<\/div>/g
    const ite = str.matchAll(regExp)
    console.log(ite) // 返回的是一个迭代器：RegExpStringIterator
    console.log(ite.next());
    /*
        {value: Array(2), done: false}
        done: false
        value: Array(2)
        0: "<div>第一个div</div>"
        1: "第一个div"
        groups: undefined
        index: 39
        input: "↵    <html>↵        <body>↵            <div>第一个div</div>↵            <p>这是p</p>↵            <div>第二个div</div>↵            <span>这是span</span>↵            <div>第三个div</div>↵        </body>↵    </html>↵    "
        length: 2
        __proto__: Array(0)
        __proto__: Object

        // ite.next().value[1],存放的就是匹配到的值
    */
    console.log(ite.next());
    console.log(ite.next());
    console.log(ite.next());
}

/**
 * 动态导入(按需加载)
 * Dynamic import()
 * 应用：路由懒加载，首屏优化
 */
{
    // const oBtn = document.querySelector('#btn')
    // oBtn.addEventListener('click', () => {
    //     import('./ajax').then(mod => {
    //         // console.log(mod)
    //         mod.default('static/a.json', res => {
    //             console.log(res)
    //         })
    //     })
    // })
}

/**
 * 新的原始数据类型：BigInt
 */
console.log('--------------BigInt--------------');
{
    // js中number类型能表示的最大数 2 ** 53
    const max = 2 ** 53
    console.log(max)
    console.log(Number.MAX_SAFE_INTEGER)
    console.log(max === max + 1) // true
    const exceedMax = Number.MAX_SAFE_INTEGER + 9
    // 超过能表示的最大范围时会出现精度问题
    console.log(exceedMax, exceedMax + 1); // 9007199254741000 9007199254741000

    // 使用BigInt表示
    const bigInt = 9007199254740993n
    console.log(bigInt)
    console.log(typeof bigInt) // bigint

    console.log(1n == 1) // true
    console.log(1n === 1) // false

    const bigInt2 = BigInt(9007199254740993n)
    console.log(bigInt2)
    const num = bigInt + bigInt2
    // 输出会带n，如不想展示n。可将其转换成字符串展示
    console.log(num.toString())
}

console.log('--------------Promise新扩展--------------');
/**
 * Promise新扩展
 * Promise.all():数组内的都成功，才会成功，任一一个失败就失败
 * Promise.allSettled():不管数组内的promise决议成功还是失败，一旦所有promise都决议完成，
 * 就返回一个在所有给定的promise都已经fulfilled或rejected后的promise，
 * 并带有一个对象数组，每个对象表示对应的promise结果
 */
{
    // Promise.all([
    //     Promise.resolve({
    //         code: 200,
    //         data: [1, 2, 3]
    //     }),
    //     Promise.reject({
    //         code: 500,
    //         data: []
    //     }),
    //     Promise.resolve({
    //         code: 200,
    //         data: [7, 8, 9]
    //     }),
    // ]).then(res=>{
    //     console.log(res)
    //     console.log('成功')
    // }).catch(err=>{
    //     console.log(err)
    //     console.log('失败')
    // })

    // es2020
    Promise.allSettled([
        Promise.resolve({
            code: 200,
            data: [1, 2, 3]
        }),
        Promise.reject({
            code: 500,
            data: []
        }),
        Promise.resolve({
            code: 200,
            data: [7, 8, 9]
        }),
    ]).then(res => {
        console.log(res)
        console.log('成功')
        // const data = res.filter(item => item.status === 'fulfilled')
        // console.log(data)
    }).catch(err => {
        console.log(err)
        console.log('失败')
    })
}
console.log('---------globalThis----------');
/**
 * globalThis:提供一个标准去获取不同环境下的全局对象
 * node端的全局对象：global
 * web： window/self
 */
{
    console.log(window);
    // Window {window: Window, self: Window, document: document, name: "", location: Location, …}
    console.log(self);
    // Window {window: Window, self: Window, document: document, name: "", location: Location, …}

    const getGlobal = () => {
        if (typeof self !== 'undefined') {
            return self
        }
        if (typeof window !== 'undefined') {
            return window
        }
        if (typeof global !== 'undefined') {
            return global
        }
        throw new Error('无法找到全局对象')
    }
    const global = getGlobal()
    console.log(global)

    console.log(globalThis)
}

console.log('---------可选链--------');
/**
 * Optional chainning
 * 可选链
 */
{
    // 可选链
    const user = {
        address: {
            street: 'xx街道',
            getNum() {
                return '80号'
            }
        }
    }
    // 可选链之前取某个对象的属性
    // const street = user && user.address && user.address.street
    // console.log(street)

    // const num = user && user.address && user.address.getNum && user.address.getNum()
    // console.log(num)
    // 注意： ?. 不可分开
    const street = user?.address?.street
    console.log(street)
    const num = user?.address?.getNum?.()
    console.log(num)
}

console.log('------空值合并运算符-------');
/**
 * 空值合并运算符:??,当传递的值为null或undefined时才取默认值
 * ||运算的缺陷：传0 false ''会被默认值覆盖
 */
{
    const b = null
    // const a = b || 5 // 传0 false ''会被默认值覆盖
    const a = b ?? 6
    console.log(a)
}