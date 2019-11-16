// pages/lawer/lawer.js

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
        wx.showLoading({
            title:"加载中"
        });
        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign; 

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/lawer/get_lawer_list.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id: user_id,
                    sign: sign,
                    // form_id:formId,
                },
                method: 'POST',
                success: function (res) {
                    var res_status = parseInt(res.data.status);
                    var res_msg = res.data.msg;
                    var res_data = res.data.data;
                    if (res_status != 0) {
                        wx.showToast({
                            title: "请确认信息完整",
                            complete: function (res) {
                                
                            }
                        })
                    } else {
                        var res_primary_lawer = res_data.primary_lawer_info_list;
                        var res_lawer_list = res_data.lawer_info_list;
                        that.setData({
                            'primary_lawers' : res_primary_lawer,
                            'lawer_list': res_lawer_list,
                        });
                    }
                },
                fail: function (res) {
                    console.log(res);
                    wx.hideLoading();
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
    onShareAppMessage: function() {
        return {
            title: '旅法宝-旅游投诉纠纷案件律师服务团队',
            path: "/pages/index/index"
        }
    },
    show_company_license:function() {
        wx.previewImage({
            urls: [
                "https://xcx.hnfabang.cn/xcx/yulvfabao/imgs/lawer_qrcode_0415.jpg"
            ],
        })
    },
    nav_to_map:function() {
        wx.openLocation({
            latitude:34.74579481336806,
            longitude:113.77747395833333,
            name:"河南法帮法律咨询",
            address:"商都路与中兴南路建正东方中心A2408"
        });
        // wx.navigateTo({
        //     url: '/pages/map/map',
        // })
    }
})