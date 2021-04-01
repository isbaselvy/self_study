// 改写规范后的ES6语法
class DemoController {
    constructor() {}
    async demo(ctx) {
        ctx.body = {
            msg: 'body message'
        }
    }
}

export default new DemoController()