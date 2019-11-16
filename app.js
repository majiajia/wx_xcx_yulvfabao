//app.js
App({
    onLaunch: function () {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo;
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    })
                }
            }
        })
    },
    getUserInfo: function (cb) {
        var that = this;

        if(that.globalData.user_id == "" || that.globalData.sign == "") {
            wx.login({
                success: function (data) {
                    var code = data.code;
                    wx.request({
                        url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/user_info/get_user_session.php',
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                            code: code,
                        },
                        method: 'POST',
                        success: function (res) {
                            var res_status = parseInt(res.data.status);
                            var res_data = res.data.data;
                            var res_msg = res.data.msg;
    
                            if (res_status != 0) {
                                wx.showToast({
                                    title: res_msg
                                });
                                return;
                            }
                            var user_id = res_data.user_id;
                            var sign = res_data.sign;
                            that.globalData.user_id = user_id;
                            that.globalData.sign = sign;
    
                            var user_info = {
                                user_id: user_id,
                                sign: sign,
                            }
    
                            typeof cb == "function" && cb(user_info);
                        },
                        fail: function (res) {
    
                        },
                        complete: function (res) {
    
                        }
                    })
                }
            })
        } else {
            var user_info = {
                user_id: that.globalData.user_id,
                sign: that.globalData.sign,
            }
            
            typeof cb == "function" && cb(user_info);
        }
        
    },
    globalData: {
        userInfo : null,
        user_id : "",
        sign : "",
    }
})