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
        fail-fast: 如果有某种条件会导致模块无法正常运行下去，就应该让模块立刻终止
        fail-safe: 如果模块遇到某种错误，不应该让程序失败，而是采取某种降级策略，尽量往下走。
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