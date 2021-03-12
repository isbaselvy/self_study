/**
 * 策略模式：根据不同的入参采取不同的策略。
 */
// es6实现
{
    class OrdinaryUser {
        buy() {
            console.log('ordinary buy') // 定价策略
        }
    }
    class MenberUser {
        buy() {
            console.log('menber buy') // 定价策略
        }
    }
    class VipUser {
        buy() {
            console.log('vip buy') // 定价策略
        }
    }
    // 调用，todo：如果不可避免通过条件语句实现根据入参来调用，
    // 代码整洁之道中推荐设计再高一级的抽象类，将我们的swicth...case语句埋在抽象类的constructor中
    var u1 = new OrdinaryUser()
    u1.buy()
    var u2 = new MenberUser()
    u1.buy()
    var u3 = new VipUser()
    u1.buy()
}
// ES5
let priceceStrategy = function () {
    // 内部算法对象 
    let strategy = {
        return30(price) {
            return price + parseInt(price / 100) * 30
        },
        return50(price) {
            return price + parseInt(price / 100) * 50
        },
        price80(price) {
            return price * 80 / 100
        },
        price90(price) {
            return price * 90 / 100
        }
    }
    // 策略方法调用接口
    return {
        strategyFunction(type, price) {
            return strategy[type] && strategy[type](price)
        },
        // 添加算法
        addStrategy(type, fn) {
            strategy[type] = fn
        }
    }
}()

// 框架代码案例
var editors = $.extend({},
    getDefaultEditors([
        'text', 'textbox', 'passwordbox', 'filebox', 'numberbox', 'numberspinner',
        'combobox', 'combotree', 'combogrid', 'combotreegrid', 'datebox', 'datetimebox',
        'timespinner', 'datetimespinner'
    ]), {
        textarea: {
            init: function (container, options) {
                var input = $('<textarea class="datagrid-editable-input"></textarea>').appendTo(container);
                input.css('vertical-align', 'middle')._outerHeight(options.height);
                return input;
            },
            getValue: function (target) {
                return $(target).val();
            },
            setValue: function (target, value) {
                $(target).val(value);
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            }
        },
        checkbox: {
            init: function (container, options) {
                var input = $('<input type="checkbox">').appendTo(container);
                input.val(options.on);
                input.attr('offval', options.off);
                return input;
            },
            getValue: function (target) {
                if ($(target).is(':checked')) {
                    return $(target).val();
                } else {
                    return $(target).attr('offval');
                }
            },
            setValue: function (target, value) {
                var checked = false;
                if ($(target).val() == value) {
                    checked = true;
                }
                $(target)._propAttr('checked', checked);
            }
        },
        validatebox: {
            init: function (container, options) {
                var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
                input.validatebox(options);
                return input;
            },
            destroy: function (target) {
                $(target).validatebox('destroy');
            },
            getValue: function (target) {
                return $(target).val();
            },
            setValue: function (target, value) {
                $(target).val(value);
            },
            resize: function (target, width) {
                $(target)._outerWidth(width)._outerHeight($.fn.datagrid.defaults.editorHeight);
            }
        }
    });

function getDefaultEditors(names) {
    var editors = {};
    $.map(names, function (name) {
        editors[name] = getEditorConf(name);
    });
    return editors;

    function getEditorConf(name) {
        function isA(target) {
            return $.data($(target)[0], name) != undefined;
        }
        return {
            init: function (container, options) {
                var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
                if (input[name] && name != 'text') {
                    return input[name](options);
                } else {
                    return input;
                }
            },
            destroy: function (target) {
                if (isA(target, name)) {
                    $(target)[name]('destroy');
                }
            },
            getValue: function (target) {
                if (isA(target, name)) {
                    var opts = $(target)[name]('options');
                    if (opts.multiple) {
                        return $(target)[name]('getValues').join(opts.separator);
                    } else {
                        return $(target)[name]('getValue');
                    }
                } else {
                    return $(target).val();
                }
            },
            setValue: function (target, value) {
                if (isA(target, name)) {
                    var opts = $(target)[name]('options');
                    if (opts.multiple) {
                        if (value) {
                            $(target)[name]('setValues', value.split(opts.separator));
                        } else {
                            $(target)[name]('clear');
                        }
                    } else {
                        $(target)[name]('setValue', value);
                    }
                } else {
                    $(target).val(value);
                }
            },
            resize: function (target, width) {
                if (isA(target, name)) {
                    $(target)[name]('resize', width);
                } else {
                    $(target)._size({
                        width: width,
                        height: $.fn.datagrid.defaults.editorHeight
                    });
                }
            }
        }
    }
}