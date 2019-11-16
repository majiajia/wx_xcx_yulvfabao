// pages/update_price/update_price.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        var that = this;
        app.getUserInfo(function (user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/get_service_cfg_list.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
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
                            service_cfg_list:res_data
                        })
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
    update_price:function(res) {
        var that = this;
        var info = res.detail.value;
        var service_1_price = info.service_1_price;
        var service_2_price = info.service_2_price;
        var service_3_price = info.service_3_price;
        var service_4_price = info.service_4_price;
        var service_9_price = info.service_9_price;
        var service_8_price = info.service_8_price;

        var service_5_member_price = info.service_5_member_price;
        var service_5_public_price = info.service_5_public_price;
        
        var service_6_member_price = info.service_6_member_price;
        var service_6_public_price = info.service_6_public_price;

        var service_7_member_price = info.service_7_member_price;
        var service_7_public_price = info.service_7_public_price;

        wx.showModal({
            title : "确认更新价格",
            content : "请确认是否更新价格",
            confirmText:"保存",
            success:function(res) {
                if(res.confirm) {
                    wx.showLoading({
                        title:"加载中",
                    });
                    app.getUserInfo(function(user_info){
                        var user_id = user_info.user_id;
                        var sign = user_info.sign;
            
                        wx.request({
                            url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/update_service_price.php',
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: {
                                user_id : user_id,
                                sign : sign,
                                service_1_price : service_1_price,
                                service_2_price : service_2_price,
                                service_3_price : service_3_price,
                                service_4_price : service_4_price,
                                service_8_price : service_8_price,
                                service_9_price : service_9_price,
                                service_5_member_price : service_5_member_price,
                                service_5_public_price : service_5_public_price,
                                service_6_member_price : service_6_member_price,
                                service_6_public_price : service_6_public_price,
                                service_7_member_price : service_7_member_price,
                                service_7_public_price  : service_7_public_price,
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
                                    wx.navigateBack({
                                        delta: 1
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
                }
            }
        });

    }
})