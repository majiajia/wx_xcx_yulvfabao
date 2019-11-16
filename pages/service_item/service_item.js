// pages/service_item/service_item.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        service_id:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        
        var service_id = options.service_id;

        that.setData({
            service_id:service_id,
        });

        wx.showLoading({
            title : "加载中",
        });

        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/get_service_cfg_item.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id: user_id,
                    sign: sign,
                    service_id: service_id,
                },
                method: 'POST',
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_data = res.data.data;
                    var res_msg = res.data.msg;
  
                    if (res_status != 0) {
                        wx.showToast({
                            title: "请确认信息完整",
                            success: function (res) {
                                console.log(res);
                            },
                            fail: function (res) {
                                console.log(res);
                            },
                            complete: function (res) {
                                console.log(res);
                            }
                        });
                        return;
                    } else {
                        that.setData({
                            'service_name' : res_data.service_name,
                            'service_desc' : res_data.service_desc,
                            'service_detail' : res_data.service_detail,
                            'price_public':res_data.price_public,
                            'price_member' : res_data.price_member,
                            'type' :res_data.type,
                            'status':res_data.status,
                            'service_id':service_id
                        });
                        wx.setNavigationBarTitle({
                            title:res_data.service_name + "- 旅法宝"
                        });
                    }
                },
                fail: function (res) {
                    console.log(res);
                },
                complete: function (res) {
                  wx.hideLoading();
                }
            })
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '旅法宝-旅游投诉纠纷案件律师服务团队',
            path: "/pages/index/index"
        }
    },
    nav_to_submit_order:function(res) {
        var that = this;
        var service_id = res.currentTarget.dataset.serviceId;
        // order_id 应该从 user_pay 之后获取
        var order_id = that.data.order_id;
        wx.navigateTo({
            url: '/pages/submit_order/submit_order?service_id=' + service_id + "&order_id=" + order_id,
        });
    },
    user_pay:function(res) {
        var that = this;
        var service_id = res.currentTarget.dataset.serviceId;
        var form_id = res.detail.formId;
        
        wx.showLoading({
            title : "加载中",
        });
        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/user_pay.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
                    service_id : service_id,
                    form_id : form_id,
                },
                method: 'POST',
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_data = res.data.data;
                    var res_msg = res.data.msg;
  
                    if (res_status == 100) { //用户可以免费享受服务
                        var tmp_order_id = res_data.out_trade_no;
                        wx.request({
                            url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/update_order_status.php',
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                user_id : user_id,
                                sign : sign,
                                order_id : tmp_order_id,
                                status : 2,
                            },
                            method: 'POST',
                            success: function (res) {
                                wx.navigateTo({
                                    url: '/pages/submit_order/submit_order?order_id=' + tmp_order_id + "&service_id=" + that.data.service_id,
                                });
                            },
                            complete:function(res) {
                                wx.hideLoading();
                            }
                        })
                    } else if (res_status == 5) {
                        wx.showToast({
                            title:res_msg,
                            success:function(res) {

                            },
                            complete:function(res) {
                                
                            }
                        });
                    } else if (res_status == 6) {
                        wx.showToast({
                            title : res_msg,
                            success:function(res) {

                            },
                            complete:function(res) {
                                
                            }
                        });
                    } else if (res_status != 0) {
                        wx.showToast({
                            title: "请确认信息完整",
                            success: function (res) {
                                console.log(res);
                            },
                            fail: function (res) {
                                console.log(res);
                            },
                            complete: function (res) {
                                console.log(res);
                            }
                        });
                    } else {
                        var res_is_member = parseInt(res_data.is_member) ;
                        if(service_id >= 1 && service_id <= 4) {
                            if(res_is_member == 1) {
                                wx.showToast({
                                    title:"已是顾问单位",
                                    success:function(res) {
                                        
                                    }    
                                });
                                console.log("会员有效期内,不需要购买");
                                return;
                            }
                        }
                        var res_timestamp = res_data.timeStamp;
                        var res_noncestr = res_data.nonceStr;
                        var res_package = res_data.package;
                        var res_pay_sign = res_data.paySign;
                        var order_id = res_data.out_trade_no;
                        var user_need_pay = res_data.user_need_pay;
                        console.log("user_pay.php user_need_pay:" + user_need_pay);
                        that.setData({
                            'order_id':order_id
                        })
                        wx.requestPayment({
                            timeStamp: res_timestamp + "",
                            nonceStr: res_noncestr+ "",
                            package: res_package,
                            signType: 'MD5',
                            paySign: res_pay_sign,
                            success(res) {
                                wx.showLoading({
                                    title:"加载中",
                                });
                                wx.request({
                                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/update_order_status.php',
                                    header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    data: {
                                        user_id : user_id,
                                        sign : sign,
                                        order_id : that.data.order_id,
                                        status : 2,
                                    },
                                    method: 'POST',
                                    success: function (res) {
                                        wx.navigateTo({
                                            url: '/pages/submit_order/submit_order?order_id=' + that.data.order_id + "&service_id=" + that.data.service_id,
                                        });                              
                                    },
                                    complete:function(res) {
                                        wx.hideLoading();
                                    }
                                });
                            },
                            fail(res) { 
                                console.log(res);
                            },
                          })
                    }
                },
                fail: function (res) {
                    console.log(res);
                },
                complete: function (res) {
                    
                }
            })
        });      
    },
    nav_to_daoyou_lawer:function(res) {
        wx.navigateTo({
            url : "/pages/daoyou_lawer/daoyou_lawer",          
        });
    }
})