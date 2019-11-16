// pages/order_item/order_item.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        upload_file_path_array:[],
        upload_file_name_array:[],
        upload_file_num:"-",
        user_upload_imgs:[],
        company_logo:"",
        business_license:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var order_id = options.id;
        that.setData({
            order_id:order_id
        });

        wx.showLoading({
            title : "加载中",
        });

       app.getUserInfo(function(user_info){
           var user_id = user_info.user_id;
           var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/get_daoyou_item.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id: user_id,
                    sign: sign,
                    order_id:order_id,
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
                        })
                    } else {
                        that.setData({
                            // 'service_id' : res_data.service_id,
                            'contact_name':res_data.contact_name,
                            'contact_phone':res_data.contact_phone,
                            'daoyou_license_url' : res_data.license_url,
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
    
    preview_img:function(res) {
        var img_url = res.currentTarget.dataset.url;
        wx.previewImage({
            urls: [ img_url ],
            success:function(res) {
                console.log(res);
            },
            fail:function(res) {
                console.log(res);
            },
            complete:function(res) {
                console.log(res);
            }
        });
    }
})