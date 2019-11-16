// pages/about_us/about_us.js
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
        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/get_company_info.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id: user_id,
                    sign: sign,
                },
                method: 'POST',
                success: function(res) {
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
                        var company_desc_1 = res_data.desc_1;
                        var company_desc_2 = res_data.desc_2;
                        var company_desc_3 = res_data.desc_3;
                        var company_desc_4 = res_data.desc_4;

                        var company_service = res_data.service;

                        that.setData({
                            'desc_1' : company_desc_1,
                            'desc_2' : company_desc_2,
                            'desc_3' : company_desc_3,
                            'desc_4' : company_desc_4,
                            'service':company_service,
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
    show_lawer_wechat_code:function(res) {
        wx.previewImage({
            urls:[
                "https://xcx.hnfabang.cn/xcx/yulvfabao/imgs/lawer_qrcode_0415.jpg"
            ],
        })
    },
    dial_phone:function(res) {
        var that = this;
        var phone = res.currentTarget.dataset.phone;
        
        wx.makePhoneCall({
            phoneNumber:phone
        });
    }
})