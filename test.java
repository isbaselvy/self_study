/**
 * 通用的“策略树“框架，通过树形结构实现分发与委托，每层通过指定的参数进行向下分发委托，直到达到最终的执行者。
 * 该框架包含两个类：{@code StrategyHandler} 和 {@code AbstractStrategyRouter}
 * 其中：通过实现 {@code AbstractStrategyRouter} 抽象类完成对策略的分发，
 * 实现 {@code StrategyHandler} 接口来对策略进行实现。
 * 像是第二层 A、B 这样的节点，既是 Root 节点的策略实现者也是策略A1、A2、B1、B2 的分发者，这样的节点只需要
 * 同时继承 {@code StrategyHandler} 和实现 {@code AbstractStrategyRouter} 接口就可以了。
 *
 * <pre>
 *           +---------+
 *           |  Root   |   ----------- 第 1 层策略入口 router实现
 *           +---------+
 *            /       \  ------------- 根据入参 P1 进行策略分发
 *           /         \
 *     +------+      +------+
 *     |  A   |      |  B   |  ------- 第 2 层不同策略的实现
 *     +------+      +------+
 *       /  \          /  \  --------- 根据入参 P2 进行策略分发
 *      /    \        /    \
 *   +---+  +---+  +---+  +---+
 *   |A1 |  |A2 |  |B1 |  |B2 |  ----- 第 3 层不同策略的实现
 *   +---+  +---+  +---+  +---+
 * </pre>
 *
 * @author
 * @date
 * @see StrategyHandler
 * 类的要点： 
 * 1.构造函数：
 *   调用registerStrategyMapper() 根据入参获取到对应的handler
 * 2.属性：
 *   (1) strategyMapper: 是一个映射,保存路由 —— 策略的映射，可通过 if-else 实现，也可通过 Map 实现。
 * (2) defaultStrategyHandler:
 * 3.方法：
 * (1)registerStrategyMapper: 在该方法中实现其不同子节点的路由逻辑,根据入参路由获取到对应的策略。
 *    如果子节点路由逻辑比较简单，可以直接通过 if-else 进行分发。当然如果为了更好地性能、适应更复杂的分发逻辑也可以使用 Map 等保存映射。
 * applyStrategy: 执行策略，框架会自动根据策略分发至下游的 Handler 进行处理
 */

/**
    策略模式：根据不同的入参采取不同的策略。
    一个简单的例子就是不同用户购买东西，普通用户不打折，会员用户9折，VIP用户8折。
    用常规实现就是
    class action = {
        constructor() {

        }
    }
    // 转换成js语言来讲，有一个类，继承了router和handler
    class 
 */



@Component
public abstract class AbstractStrategyRouter<T, R> {

    /**
     * 策略映射器，根据指定的入参路由到对应的策略处理者。
     * 
     * 初始化的时候获取mapper
     * map是一个映射，保存了 可通过 if-else 实现，也可通过 Map 实现。
     * @param <T> 策略的入参类型
     * @param <R> 策略的返回值类型
     */
    public interface StrategyMapper<T, R> {
        /**
         * 根据入参获取到对应的策略处理者。可通过 if-else 实现，也可通过 Map 实现。
         *
         * @param param 入参
         * @return 策略处理者
         */
        StrategyHandler<T, R> get(T param);
    }

    private StrategyMapper<T, R> strategyMapper;

    /**
     * 类初始化时注册分发策略 Mapper
     */
    @PostConstruct
    private void abstractInit() {
        strategyMapper = registerStrategyMapper();
        Objects.requireNonNull(strategyMapper, "strategyMapper cannot be null");
    }

    @Getter
    @Setter
    @SuppressWarnings("unchecked")
    private StrategyHandler<T, R> defaultStrategyHandler = StrategyHandler.DEFAULT;

    /**
     * 执行策略，框架会自动根据策略分发至下游的 Handler 进行处理
     *
     * @param param 入参
     * @return 下游执行者给出的返回值
     */
    public R applyStrategy(T param) {
        final StrategyHandler<T, R> strategyHandler = strategyMapper.get(param);
        if (strategyHandler != null) {
            return strategyHandler.apply(param);
        }

        return defaultStrategyHandler.apply(param);
    }

    /**
     * 抽象方法，需要子类实现策略的分发逻辑
     *
     * @return 分发逻辑 Mapper 对象
     */
    protected abstract StrategyMapper<T, R> registerStrategyMapper();
}

/**
继承 AbstractStrategyRouter<T, R> 抽象类只需要实现 protected abstract StrategyMapper<T, R> registerStrategyMapper(); 
抽象方法即可，在该方法中实现其不同子节点的路由逻辑。

如果子节点路由逻辑比较简单，可以直接通过 if-else 进行分发。当然如果为了更好地性能、适应更复杂的分发逻辑也可以使用 Map 等保存映射。

对于实现了该抽象类的 Router 节点，只需要调用其 public R applyStrategy(T param) 方法即可获取该节点的期望输出。
框架会自动根据定义的路由逻辑将 param 传递到对应的子节点，再由子节点不断向下分发直到叶子节点或可以给出业务输出的一层。
这个过程有点类似递归或者分治的思想。
 */

 /**
 * @author
 * @date
 */
public interface StrategyHandler<T, R> {

    @SuppressWarnings("rawtypes")
    StrategyHandler DEFAULT = t -> null;

    /**
     * apply strategy
     *
     * @param param
     * @return
     */
    R apply(T param);
}

/**
 除了根节点外，都要实现 StrategyHandler<T, R> 接口。如果是叶子节点，由于不需要再向下委托，因此不再需要同时继承 AbstractStrategyRouter<T, R>
  抽象类，只需要在 R apply(T param); 中实现业务逻辑即可。

对于其他责任树中的中间层节点，都需要同时继承 Router 抽象类和实现 Handler 接口，在 R apply(T param); 方法中首先进行一定异常入参拦截，
遵循 fail-fast 原则，避免将这一层可以拦截的错误传递到下一层，同时也要避免“越权”做非本层职责的拦截校验，避免产生耦合，为后面业务拓展挖坑。
在拦截逻辑后直接调用本身 Router 的 public R applyStrategy(T param) 方法路由给下游节点即可。
 */