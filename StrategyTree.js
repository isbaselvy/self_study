/**
 策略模式：根据不同的入参采取不同的策略。
 一个简单的例子就是不同用户购买东西，普通用户不打折，会员用户9折，VIP用户8折。
 */

// 常规实现
{
    class User {
        constructor(name) {
            this.name = name
        }
        buy() {
            if (this.name === 'ordinary') {
                console.log(this.name + ' buy')
            } else if (this.name === 'menber') {
                console.log(this.name + ' buy')
            } else {
                console.log(this.name + ' buy')
            }
        }
    }
    // 调用
    var u1 = new User('ordinary')
    u1.buy()
    var u2 = new User('menber')
    u2.buy()
    var u3 = new User('vip')
    u3.buy()
}


// 策略模式
{
    class OrdinaryUser {
        buy() {
            console.log('ordinary buy')
        }
    }

    class MenberUser {
        buy() {
            console.log('menber buy')
        }
    }

    class VipUser {
        buy() {
            console.log('vip buy')
        }
    }
    // 调用
    var u1 = new OrdinaryUser()
    u1.buy()
    var u2 = new MenberUser()
    u1.buy()
    var u3 = new VipUser()
    u1.buy()
    /**
     * Q: 策略模式如何通过入参来实现调用不同的构造
     * java中会有枚举类，可以考虑用常量数组来保存用户类型，便于扩展
     */
    class UserFactory {
        constructor() {
            
        }
    }
    const USERENUM = ['Odinary', 'Menber', 'Vip']
}


