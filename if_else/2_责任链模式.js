$.fn.combobox = function(options, param){
    if (typeof options == 'string'){
        var method = $.fn.combobox.methods[options];
        if (method){
            return method(this, param);
        } else {
            return this.combo(options, param);
        }
    }
    
    options = options || {};
    return this.each(function(){
        var state = $.data(this, 'combobox');
        if (state){
            $.extend(state.options, options);
        } else {
            state = $.data(this, 'combobox', {
                options: $.extend({}, $.fn.combobox.defaults, $.fn.combobox.parseOptions(this), options),
                data: []
            });
        }
        create(this);
        if (state.options.data){
            loadData(this, state.options.data);
        } else {
            var data = $.fn.combobox.parseData(this);
            if (data.length){
                loadData(this, data);
            }
        }
        request(this);
    });
};

function request(target, url, param, remainText){
    var opts = $.data(target, 'combobox').options;
    if (url){
        opts.url = url;
    }
    param = $.extend({}, opts.queryParams, param||{});
    
    if (opts.onBeforeLoad.call(target, param) == false) return;

    opts.loader.call(target, param, function(data){
        loadData(target, data, remainText);
    }, function(){
        opts.onLoadError.apply(this, arguments);
    });
}

function loadData(target, data, remainText){
    var state = $.data(target, 'combobox');
    var opts = state.options;
    state.data = opts.loadFilter.call(target, data);

    opts.view.render.call(opts.view, target, $(target).combo('panel'), state.data);		

    var vv = $(target).combobox('getValues');
    $.easyui.forEach(state.data, false, function(row){
        if (row['selected']){
            $.easyui.addArrayItem(vv, row[opts.valueField]+'');
        }
    });
    if (opts.multiple){
        setValues(target, vv, remainText);
    } else {
        setValues(target, vv.length ? [vv[vv.length-1]] : [], remainText);
    }
    
    opts.onLoadSuccess.call(target, data);
}

// 绑定事件，设置值