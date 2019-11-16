var app = getApp();
Page({
    data: {
        company_logo: '',
        business_license:"",
    },
    
    onLoad: function () {
        var that = this;

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
                        var is_company_daoyou = parseInt(res_data.is_company_daoyou) ;
                        if(is_company_daoyou == 1) {
                            that.setData({
                                company_logo : res_data.company_logo,
                                company_name : res_data.company_name,
                                member_type_name : res_data.member_type_name,
                                
                                business_license : res_data.business_license,
                                contact_name : res_data.contact_name,
                                contact_phone : res_data.contact_phone,
                                is_admin : res_data.is_admin,
                                is_company_daoyou : is_company_daoyou
                            });
                        } else if(is_company_daoyou == 2) {
                            that.setData({
                                license_url : res_data.license_url,
                                contact_name : res_data.contact_name,
                                contact_phone : res_data.contact_phone,
                                is_admin : res_data.is_admin,
                                is_company_daoyou : is_company_daoyou
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '旅法宝-旅游投诉纠纷案件律师服务团队',
            path: "/pages/index/index"
        }
    },
    update_member_info: function (e) {
        var that = this;

        var form_id = e.detail.formId;
        var contact_name = e.detail.value.contact_name;
        var contact_phone = e.detail.value.contact_phone;
        var company_name = e.detail.value.company_name;
        var is_company_daoyou = that.data.is_company_daoyou;
        
        wx.showLoading({
            title:"加载中",
        });
        app.getUserInfo(function (user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/user_info/update_member_info.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign: sign,
                    contact_name : contact_name,
                    contact_phone : contact_phone,

                    company_name : company_name,
                    company_logo : that.data.company_logo,
                    business_license:that.data.business_license,
                    daoyou_license : that.data.license_url,
                    is_company_daoyou : is_company_daoyou,
                    form_id : form_id,
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
                        wx.showToast({
                            title:"更新成功",
                            success:function(res) {
                                wx.switchTab({
                                    url:"/pages/me/me"
                                });
                            },
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
        })
    },
    choose_and_upload : function(res) {
        var that = this;
        var type = res.currentTarget.dataset.type;
        wx.showLoading({
            title:"加载中",
        });
        wx.chooseImage({
            count : 1, // 默认9
            sizeType : ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表 tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                
                wx.uploadFile({
                    url:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/upload.php",
                    filePath : tempFilePaths[0],
                    name:"upload_file",
                    success : function(res) {
                        var tmp_data = res.data;
                        if(type == 1) {
                            that.setData({
                                company_logo:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/" + tmp_data
                            });
                        } else if(type == 2) {
                            that.setData({
                                business_license:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/" + tmp_data
                            });
                        }  else if(type == 3) {
                            that.setData({
                                license_url:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/" + tmp_data
                            });
                        }
                    },
                    complete:function(res) {
                        wx.hideLoading();
                    }
                });
            },
            complete:function(res) {
                wx.hideLoading();
            }
        });
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
    }
})