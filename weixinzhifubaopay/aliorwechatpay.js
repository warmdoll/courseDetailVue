var payFn={
    initFn:function(){
        this.clickConfirmbtn();//点击确认支付
        this.moneyValid($("input[name='totalManey']").get(0));
    },
    clickConfirmbtn:function(){
        var that=this;
        $("#confirm-btn").on('click',function(){
                that.payTextfn();
        })  
    },
    //支付金额文本框判断
    payTextfn:function(){
        var that=this;
        var totalManey=$("input[name='totalManey']").val();
        if (totalManey == "0") {
            that.addpromptText("输入最小金额不能为零");
            return;
        }
        if (totalManey == "") {
            that.addpromptText("请输入金额");
            return;
        }
        if (totalManey == "输入金额") {
            that.addpromptText("请输入筹集金额~~");
            return;
        }
        that.getprepay_id();
          
    },
    //获取订单号
    getprepay_id: function () {
        var that = this;
        that.payconfig = {};
        $.post("?", { m: $("input[name='totalManey']").length>0?$("input[name='totalManey']").val():""}, function (msg) {
            var result;
            if (typeof (msg) == "string") {
                result = JSON.parse(msg);
            } else {
                result = msg;
            }
            if (result.ResultCode == 0) {//获取成功  需要调用微信的支付
                that.payconfig = result.Data;
                //跳转支付页面 支付宝 或微信
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)== 'micromessenger'){
                //微信支付
                   that.onSupport(); //调用支付
                }else if(ua.match(/AlipayClient/i)== "alipayclient"){
                //支付宝支付
                   that.aliPay(result.Data.package);//传入订单id
                }else{
                //其它浏览器
                   that.addpromptText("请使用支付宝或微信扫描该二维码");
                }

            } else {
                that.addpromptText(result.Message);
            }
        });
    },
    onSupport: function (payconfig) {
        var that = this;
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady);
            }
        } else {
            that.onBridgeReady();
        }
    },
    onBridgeReady: function () {
        var that = this;
        WeixinJSBridge.invoke(
               'getBrandWCPayRequest', {
                   "appId": that.payconfig.appId,     //公众号名称，由商户传入     
                   "timeStamp": that.payconfig.timeStamp,         //时间戳，自1970年以来的秒数     
                   "nonceStr": that.payconfig.nonceStr, //随机串     
                   "package": that.payconfig.package,//	统一下单接口返回的prepay_id参数值
                   "signType": that.payconfig.signType,         //微信签名方式：     
                   "paySign": that.payconfig.paySign //微信签名 
               },
               function (res) {
                   if (res.err_msg == "get_brand_wcpay_request:ok") {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                      $(".outer-box").addClass("success-pay").html('<p class="tc">\
                                <img src="/weixin/Content/wap/image/timg.jpg" width="40%">\
                                </p>\
                                <p class="tc">支付成功</p>');
                   } else {
                       that.addpromptText("支付失败");
                   }
               }
           );
    },
    //金额验证的js 
    moneyValid: function (obj) {
        $(obj).on('input propertychange', function () {
            var value = $(this).val(),
            validValue = value.replace(/[^\d\.]|^\./g, '').replace(/\.{2}/g, '.').replace(/^([1-9]\d*|0)(\.\d{1,2})(\.|\d{1})?$/, '$1$2').replace(/^0\d{1}/g, '0'); ;
            $(this).val(validValue);
        });
    },
    wexinPay:function(){
        if(typeof(wxconfig)!="undefined"&&typeof(wx)!="undefined"){
            wxconfig["debug"]=false;
            wxconfig["jsApiList"]=["chooseWXPay"];//支付
            wx.config(wxconfig);//注册接口
            wx.ready(function(){
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                if(typeof(paywxconfig)!="undefined"){//支付页面自动调起微信的支付请求
                    var params=["timestamp","nonceStr","package","signType","paySign"];
                    var paramsFlag=true;
                    for(var i=0;i<params.length;i++){
                        if(!(params[i] in paywxconfig)||!paywxconfig[params[i]]){
                            paramsFlag=false;
                            break;
                        }
                    }
                    if(paramsFlag){
                        wx.chooseWXPay({
                            timestamp: paywxconfig.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: paywxconfig.nonceStr, // 支付签名随机串，不长于 32 位
                            package: paywxconfig.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: paywxconfig.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: paywxconfig.paySign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数  提示成功
                                 $(".outer-box").addClass("success-pay").html('<p class="tc">\
                                <img src="/weixin/Content/wap/image/timg.jpg" width="40%">\
                                </p>\
                                <p class="tc">支付成功</p>');
                            }
                        });
                    }
                }
            });
            wx.error(function(res){
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        }
    },
    aliPay:function(aliPaynumber){
         //支付宝
         function ready(callback) {
            // 如果jsbridge已经注入则直接调用
            if (window.AlipayJSBridge) {
                callback && callback();
            } else {
                // 如果没有注入则监听注入的事件
                document.addEventListener('AlipayJSBridgeReady', callback, false);
            }
        };
        ready(function(){
            document.querySelector('.pay-btn').addEventListener('click', function(){
                AlipayJSBridge.call("tradePay",{
                tradeNO: aliPaynumber//订单号
                }, function(result){
                alert(JSON.stringify(result));
                });
            });
        });
    
    },
    addpromptText: function (skiptext) { 
	    $(".js-all-message").stop(true, true).animate({
		    opacity: 1,
	    }, 4000, function() {
		    $(".js-all-message").show();
	    }).text(skiptext).stop(true, true).animate({
		    opacity: 0,
	    }, 4000, function() {
		    $(".js-all-message").hide();
	    });
	 },
     setCookie: function (name, value, minute) {
        var minute = minute || 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + minute * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
};