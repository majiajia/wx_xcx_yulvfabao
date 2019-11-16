// pages/about_us/about_us.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        desc : "冯律师从事法律专业多年,为多家旅游企业单位提供长期的法律咨询服务。同时经常给旅游企业提供法律培训服务,对处理旅游从业中出现的问题具体丰富的经验.",
        service : "为旅游企业单位、旅游从业者提供专业有效的法律咨询服务。",
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
        var phone = res.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber:phone,
        });
    }
})