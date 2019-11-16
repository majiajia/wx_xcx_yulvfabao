// pages/daoyou_lawer/daoyou_lawer.js
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
        var id = options.id;

        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/tour_lawer/get_tour_lawer_item.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
                    id : id,
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
                                console.assert(res);
                            }
                        });
                    } else {
                        var answer = res_data.answer;
                        if(answer == null) {
                            answer = "待回复";
                        }
                        var question = res_data.question;
                        var ask_time = res_data.ask_time;

                        var img_url_list_empty = true;
                        var img_url_list = [];
                        if( (res_data.other_file != '') && (res_data.other_file != null) ) {
                            img_url_list = res_data.other_file.split(",");
                            img_url_list_empty = false;
                        }

                        that.setData({
                            answer : answer,
                            question : question,
                            ask_time : ask_time,
                            img_url_list : img_url_list,
                            img_url_list_empty : img_url_list_empty,
                        })
                    }
                },
                fail : function (res) {
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
    dial_phone:function(res) {
        var that = this;
        var phone = res.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber:phone
        });
    },
    pre_img:function(res) {
        var that = this;
        // var url = res.currentTarget.dataset.url;
        wx.previewImage({
            urls : that.data.img_url_list,
        });
    }
})