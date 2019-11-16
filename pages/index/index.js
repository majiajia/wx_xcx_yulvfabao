//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrls: [
            "../../imgs/index/bg_img_3.png",
            "../../imgs/index/bg_img_1.png",
            "../../imgs/index/bg_img_2.png",
        ],
        swiper_height : 0,
    },
    
    onShow:function(res) {
        var that = this;
        
        wx.showLoading({
            title : "加载中",
        });

        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/get_index_info.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
                    // form_id : formId,
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
                        var res_member_info_list = res_data.member_info_list;
                        var res_service_cfg_list = res_data.service_cfg_list;
                        var res_is_admin = parseInt(res_data.is_admin);
                        
                        that.setData({
                            'member_info_list' : res_member_info_list,
                            'service_cfg_list' : res_service_cfg_list,
                            'is_admin' : res_is_admin,
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
    onLoad: function () {
        // var that = this;
        // app.getUserInfo(function(user_info){
        //     var user_id = user_info.user_id;
        //     var sign = user_info.sign;

        //     wx.request({
        //         url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/get_index_info.php',
        //         header: {
        //             "Content-Type": "application/x-www-form-urlencoded"
        //         },
        //         data: {
        //             user_id: user_id,
        //             sign: sign,
        //             // form_id:formId,
        //         },
        //         method: 'POST',
        //         success: function (res) {
        //             var res_status = parseInt(res.data.status);
        //             var res_msg = res.data.msg;
        //             var res_data = res.data.data;
        //             if (res_status != 0) {
        //                 wx.showToast({
        //                     title: res_msg,
        //                     complete: function (res) {
        //                         console.assert(res);
        //                     }
        //                 })
        //             } else {
        //                 var res_member_info_list = res_data.member_info_list;
        //                 var res_service_cfg_list = res_data.service_cfg_list;
        //                 that.setData({
        //                     'member_info_list':res_member_info_list,
        //                     'service_cfg_list':res_service_cfg_list,
        //                 });
        //             }
        //         },
        //         fail: function (res) {
        //             console.log(res);
        //             wx.hideLoading();
        //         },
        //         complete: function (res) {
        //             console.log(res);
        //         }
        //     })
        // })
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    show_be_member_prompt:function(res) {
        
        var that = this;
        //如果用户当前不是会员,则当用户点击 service_id 为  5-8 的时候,提示成为会员后价格更优惠
        var service_id = parseInt(res.currentTarget.dataset.serviceId) ;
        console.log("service_id:" + service_id);

        wx.showLoading({
            title : "加载中",
        });

        if( service_id >= 5 && service_id <= 8) {
            app.getUserInfo(function(user_info){
                var user_id = user_info.user_id;
                var sign = user_info.sign;
                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/user_info/get_user_info.php',
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
                            var res_is_member = parseInt(res_data.is_member);
                            if(res_is_member == 2) { //不是会员
                                wx.showModal({
                                    title:"成为顾问单位更优惠",
                                    content:"成为顾问单位即可按会员价格购买,更实惠",
                                    showCancel:false,
                                    success:function(res) {
                                        wx.navigateTo({
                                            url: '/pages/service_item/service_item?service_id=' + service_id,
                                        });
                                    }
                                });
                            } else {
                                wx.navigateTo({
                                    url: '/pages/service_item/service_item?service_id=' + service_id,
                                });    
                            }
                        }
                    },
                    fail : function (res) {
                        console.log(res);
                    },
                    complete: function (res) {
                        wx.hideLoading();
                    }
                })                    
            })
        } else {
            wx.navigateTo({
                url: '/pages/service_item/service_item?service_id=' + service_id,
            });    
        }
    },
    dial_phone:function(res) {
        var that = this;
        var phone = res.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber : phone
        });
    },
    nav_to_member_info:function(res) {
        var that = this;
        var member_id = res.currentTarget.dataset.memberId;
        var is_admin =  parseInt(that.data.is_admin);
        if(is_admin == 2) {
            wx.navigateTo({
                'url' : "/pages/member_info/member_info?id=" + member_id,
            });
        }
    },
    imgae_load:function(e) {
        var that = this;
        
        var originalWidth = e.detail.width;
        var originalHeight = e.detail.height;
        
        var window_width = wx.getSystemInfoSync().windowWidth;

        that.setData({
            swiper_height : window_width * originalHeight / originalWidth 
        });
    }
})