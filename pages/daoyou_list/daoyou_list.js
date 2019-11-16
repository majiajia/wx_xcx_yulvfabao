// pages/order/order.js
var app = getApp();

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
        var that = this;

        wx.showLoading({
            title : "加载中",
        });
        
        app.getUserInfo(function(user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/get_daoyou_list.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id: user_id,
                    sign: sign,
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
                        var daoyou_list = res_data.daoyou_list;

                        that.setData({
                            'daoyou_list' : daoyou_list,
                        });
                        if(daoyou_list.length <= 0) {
                            that.setData({
                                daoyou_list_empty:true
                            });
                        }
                    }
                },
                fail: function (res) {
                    console.log(res);
                },
                complete: function (res) {
                    wx.hideLoading();
                }
            })
        })
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
    nav_to_daoyou_item:function(res) {
        var order_id = res.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/daoyou_item/daoyou_item?id=' + order_id,
        })
    },
    nav_to_daoyou_lawer_list:function(res) {
        wx.navigateTo({
            url : "/pages/daoyou_lawer/daoyou_lawer",
        })
    }
})