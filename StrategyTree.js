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
}

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
}

/**
 * 责任树模式
 * 将责任链与策略模式融合，即成为了一种广义的责任链模式，简称为“责任树模式”。
 * 这种模式不仅可以完成任务的逐级委托，也可以在任一级选择不同的下游策略进行处理。
 * ----------------------------------------------------------------------
 * <pre>
 *           +-----------------+
 *           |  Root(Router)   |   ----------- 第 1 层策略入口 router实现
 *           +-----------------+
 *            /       \  ------------- 根据入参 P1 进行策略分发
 *           /         \
 *     +------+      +------+
 *     |  A   |      |  B   |  ------- 第 2 层不同策略的实现 (Router handler类)
 *     +------+      +------+
 *       /  \          /  \  --------- 根据入参 P2 进行策略分发
 *      /    \        /    \
 *   +---+  +---+  +---+  +---+
 *   |A1 |  |A2 |  |B1 |  |B2 |  ----- 第 3 层不同策略的实现（Router handler类组合或者纯handler）
 *   +---+  +---+  +---+  +---+
 * </pre>
 * 代码思路：以下暂为逻辑代码。具体业务逻辑和实现下次具体实例见
 * 1.首先确认两个基本抽象类，
 *  Router类完成对策略的分发
 *  hanler类完成策略进行实现
 *  第2层这种就需要继承router和hanler两个类
 */
{
    /**
     * 策略分发类：
     * 属性：strategyMapper
     *  1.
     */
    class AbstractStrategyRouter {
        constructor() {
            this.strategyMapper = this.registerStrategyMapper()
            // todo 校验mapper不能为空
        }

        /**
         * 默认的hanler
         */
        defaultStrategyHandler(param) {
            console.log('默认处理....')
        }
        /**
         * 在该方法中实现其不同子节点的路由逻辑。
         * 如果子节点路由逻辑比较简单，可以直接通过 if-else 进行分发。
         * 当然如果为了更好地性能、适应更复杂的分发逻辑也可以使用 Map 等保存映射。
         */
        registerStrategyMapper() {

        }

        /**
         * 执行策略，框架会自动根据策略分发至下游的 Handler 进行处理
         *
         * @param param 入参
         * @return 下游执行者给出的返回值
         */
        applyStrategy() {
            // 根据入参获取对应策略
            const strategyHandler = this.strategyMapper.get(param);
            if (strategyHandler != null) {
                return strategyHandler.apply(param);
            }
    
            return this.defaultStrategyHandler.apply(param);
        }
    }

    
    /**
     * 如果是叶子节点，由于不需要再向下委托，只需要在apply(param)中实现业务逻辑即可。
        对于其他责任树中的中间层节点，都需要同时继承 Router类和实现 Handler 接口，在 R apply(T param); 
        方法中首先进行一定异常入参拦截，遵循 fail-fast 原则，避免将这一层可以拦截的错误传递到下一层，
        同时也要避免“越权”做非本层职责的拦截校验，避免产生耦合，为后面业务拓展挖坑。
        在拦截逻辑后直接调用本身 Router 的 appaly(param)方法路由给下游节点即可。
    */
    class StrategyHandler{
        constructor(router) {
            this.router = router
        }

        apply(param) {
            // 1.异常入参拦截 遵循 fail-fast 原则，避免将这一层可以拦截的错误传递到下一层，同时也要避免“越权”做非本层职责的拦截校验，避免产生耦合，异常就抛出错误
            // 2.如果是叶子节点（没有路由），直接实现业务逻辑，有路由则继续传递
            this.router.apply(param)
        }
    }
}
