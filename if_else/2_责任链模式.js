/**
 * 责任链模式
 * 责任链模式是实现了类似“流水线”结构的逐级处理，通常是一条链式结构，
 * 将“抽象处理者”的不同实现串联起来：如果当前节点能够处理任务则直接处理掉，
 * 如果无法处理则委托给责任链的下一个节点，如此往复直到有节点可以处理这个任务。
 * 典型案例：请假逐级审批
 */
 {
    class Action {
        constructor(name) {
            this.name = name
            this.nextAction = null
        }
        setNextAction(action) {
            this.nextAction = action
        }
        handle() {
            console.log(`${this.name}审批`)
            if(this.nextAction !== null) {
                this.nextAction.handle()
            }
        }
    }

    // 调用
    let a1 = new Action('组长')
    let a2 = new Action('经理')
    let a3 = new Action('总监')
    a1.setNextAction(a2)
    a2.setNextAction(a3)
    a1.handle()
}

/**ES5实现
 * 场景需求，给一个输入框，绑定事件，请求远程数据，根据不同的数据类型创建成不同的组件
 */

// 第一级：绑定事件
bindEvents('el', {
    evnetType: request()
})
// 第二级请求数据
function request(target, url, param){
    if (opts.onBeforeLoad.call(target, param) == false) return;
    // loader封装的可暴露给外面自定义的请求方法
    opts.loader.call(target, param, function(data){
        loadData(target, data, remainText);
    }, function(){
        opts.onLoadError.apply(this, arguments);
    });
}
// 第三级：处理数据
function loadData(target, data, remainText){   
    renderComponent()
}
// 第四级：渲染组件
function renderComponent() {

}