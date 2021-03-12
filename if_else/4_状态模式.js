/**
 * 状态模式是一种行为型模式，对象可以根据状态的改变来改变自己的行为。
一般来说，我们都是封装对象的行为，而非对象的状态。
而在状态模式里面，就是把事物的每种状态都封装成独立的类，和状态有关的行为都在类的内部。
在切换状态的时候，只需要在上下文中把请求委托给当前状态对象就行了。
 */
class TrafficLight {
    constructor(state) {
        this.state = state;
    }
    switch() {
        if (this.state === 'green') {
            this.state = 'yellow';
            console.log("警示");
        } else if (this.state === 'yellow') {
            this.state = 'red';
            console.log("禁止通行");
        } else if (this.state === 'red') {
            this.state = 'green';
            console.log("准许通行");
        }
    }
}
const light = new TrafficLight("red");
setInterval(light.switch, 60 * 1000); // 假设每 60s 切换一次状态

// 状态模式改写
class RedLight {
    constructor(light) {
        this.light = light;
    }
    switch() {
        this.light.setState(this.light.greenLight);
        console.log("准许通行");
    }
}
class YellowLight {
    constructor(light) {
        this.light = light;
    }
    switch() {
        this.light.setState(this.light.redLight);
        console.log("禁止通行");
    }
}
class GreenLight {
    constructor(light) {
        this.light = light;
    }
    switch() {
        this.light.setState(this.light.yellowLight);
        console.log("警示");
    }
}

class Light {
    constructor() {
        this.greenLight = new GreenLight(this);
        this.redLight = new RedLight(this);
        this.yellowLight = new YellowLight(this);
    }
    setState(newState) {
        this.currentState = newState;
    }
    init() {
        this.currentState = this.redLight;
    }
}
const light = new Light();
light.init();
setInterval(light.currentState.switch, 60 * 1000)

// ES5实现
const SuperMarry = (function() {    
    let _currentState = [],        // 状态数组
        states = {
          jump() {console.log('跳跃!')},
          move() {console.log('移动!')},
          shoot() {console.log('射击!')},
          squat() {console.log('蹲下!')}
        }
    
    const Action = {
      changeState(arr) {  // 更改当前动作
        _currentState = arr
        return this
      },
      goes() {
        console.log('触发动作')
        _currentState.forEach(T => states[T] && states[T]())
        return this
      }
    }
    
    return {
      change: Action.changeState,
      go: Action.goes
    }
  })()
  
  SuperMarry
      .change(['jump', 'shoot'])
      .go()                    // 触发动作  跳跃!  射击!
      .go()                    // 触发动作  跳跃!  射击!
      .change(['squat'])
      .go()                    // 触发动作  蹲下!