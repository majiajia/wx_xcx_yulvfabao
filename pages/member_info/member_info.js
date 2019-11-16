var app = getApp();
Page({
    data: {
        company_logo: '',
        business_license:"",
    },
    
    onLoad: function (options) {
        var that = this;
        var case_id = options.id;
        wx.showLoading({
            title:"加载中",
        });
        app.getUserInfo(function (user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/user_info/get_member_info.php',
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
                        var res_user_type = parseInt(res_data.type) ;
                        
                        that.setData({
                            company_logo : res_data.company_logo,
                            company_name : res_data.company_name,
                            member_type_name : res_data.member_type_name,
                            
                            business_license : res_data.business_license,
                            contact_name : res_data.contact_name,
                            contact_phone : res_data.contact_phone,
                            is_admin : res_data.is_admin,
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
        })
    },
    preview_img:function(res) {
        var res_img_url = res.currentTarget.dataset.imgUrl;
        wx.previewImage({
            urls:[res_img_url],
            success:function(res) {
                console.log(res);
            },
            fail:function(res) {
                console.log(res);
            },
            complete:function(res) {
                console.log(res);
            }
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