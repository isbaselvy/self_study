/**
 * 以下为在看easyui源码时学到
 * 丢掉累赘的长串if...else...，没有它们的代码好清爽
 * todo 更复杂逻辑可参考：https://juejin.cn/post/6844903705058213896，待吸收整理
 */
// 改造前的代码
function setinput(data) {
    $.each(data, function (i, val) {
        var inputId = val.id ? val.id : val.field;
        if (val.hidden) {

        } else if (val.type == 'daterangebox') {
            // 处理函数
        } else if (val.type == 'combotreegrid') {
            // 处理函数
        } else if (val.type === 'group') {
            // 处理函数
        } else if (val.type == ('datebox')) {
            // 处理函数
        } else if (val.type == ('combobox')) {
            // 处理函数
        } else if (val.type == ('combotree')) {
            // 处理函数
        } else if (val.type == ('combogrid')) {
            // 处理函数
        } else if (val.type == ('numberbox')) {
            // 处理函数
        } else if (val.type == ('comboxpage')) {
            // 处理函数
        } else if (val.type == ('datetimebox')) {
            // 处理函数
        } else if (val.type == ('numberspinner')) {
            // 处理函数
        } else if (val.type == 'datetimespinner') {
            // 处理函数
        } else if (val.type == ('filebox')) {
            // 处理函数
        } else if (val.type == ('textarea')) {
            // 处理函数
        } else if (val.type == ('checkbox')) {

        } else if (val.type == ('radio')) {

        } else if (val.type == 'easyuiCheckbox') {
            // 处理函数
        } else if (val.type == ('radiogroup')) {
            // 处理函数
        } else if (val.type == ('button')) {
            // 处理函数
        } else {
            // 处理函数
        }
    });
}

// 改造后的代码
function setinputNew(data) {
    var editorConf = {
        daterangebox: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        combotreegrid: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        group: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        datebox: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        combobox: {
            exec: function (inputId, val) {
                // url前缀
                if (val.url && val.url.match(/\/([^\/]*)\//g)[0] != (Config.sysUrl + '/')) {
                    val.url = Config.sysUrl + val.url;
                }
                // input类型为下拉列表
                var options = $.extend({}, comboOptions, val);
                $("#" + inputId).combobox(options);
            }
        },
        combotree: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        combogrid: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        numberbox: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        comboxpage: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        datetimebox: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        numberspinner: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        datetimespinner: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        filebox: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        textarea: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        checkbox: {
            exec: function (inputId, val) {

            }
        },
        radio: {
            exec: function (inputId, val) {

            }
        },
        easyuiCheckbox: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        radiogroup: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        button: {
            exec: function (inputId, val) {
                // 处理函数
            }
        },
        default: {
            exec: function (inputId, val) {
                // 处理函数
            }
        }
    }
    $.each(data, function (i, val) {
        var inputId = val.id ? val.id : val.field;
        if (val.hidden) {
            return true;
        }
        var editor = editorConf[val.type] || editorConf.default;
        editor.exec(inputId, val)
    });
}