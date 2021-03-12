/**
 * 假如我们要做一个日历组件，那我们肯定要知道一年12个月中每个月都多少天，
 * 这个我们要怎么判断呢？最笨的方法当然是用 if else 啊。
 */
{
    if (month === 1) {
        return 31;
    }
    if (month === 2) {
        return 28;
    }
    // ...
    if (month === 12) {
        return 31;
    }

    // 我们不妨转换一下思维，每个月份对应一个数字，月份都是按顺序的，我们是否可以用一个数组来储存天数？到时候用下标来访问？这样是不是看着就要简单多了。
    const month = new Date().getMonth(),
    year = new Date().getFullYear(),
    isLeapYear = year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    // const monthDays = [31, isLeapYear ? 29 : 28, 31, ... , 31];
    const days = monthDays[month];
}

/** 延伸：状态机
 * 菜单的展开收起
 */
class Menu {
    constructor() {
        this.on = new On(this);
        this.pff = new Off(this);
    }
    setState(newState) {
        this.currentState = newState;
    }
    init() {
        this.currentState = this.on;
        const button = document.querySelector("#btn");
        button.onclick = function() {
            this.currentState.click();
        }
    }
}
class On {
    constructor(menu) {
        this.menu = menu;
    }
    click() {
        this.menu.setState(this.menu.off);
    }
}
class Off {
    constructor(menu) {
        this.menu = menu;
    }
    click() {
        this.menu.setState(this.menu.on);
    }
}

/**
 * 上面这段代码虽然实现了功能，但还存在这么几个问题：
代码复杂化： 每次都需要对新状态增加一个类。
代码耦合： 状态转换和业务逻辑耦合在一起。
转换关系不清晰： 状态之间的转换关系不够清晰。
前面我们讲过表驱动，如果使用表来配置转换之间的转换关系呢？
将状态的转换封装起来，我们只需要实现业务逻辑就行了。
http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html
javascript-state-machine 是一个经典的有限状态机库，它的用法也比较接近表驱动。

 */
const fsm = new StateMachine({
    init: 'off',
    transitions: [
      { name: 'show', from: 'off',  to: 'on' },
      { name: 'hide', from: 'on', to: 'off'  }
    ],
    methods: {
      onShow: function() { console.log('打开') },
      onHide: function() { console.log('关闭') }
    },
    error: function(eventName, from, to, args, errorCode, errorMessage) {
　　　　　　return 'event ' + eventName + ': ' + errorMessage;
　　　　},
  });