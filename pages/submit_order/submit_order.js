// pages/submit_order/submit_order.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        order_id:'',
        service_id:'',
        plan_date:"",
        upload_file_path_array:[],
        upload_file_name_array:[],
        upload_file_num:"-",
        user_upload_imgs:[],
        daoyou_license_url:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        console.log("submit order !!!");
        console.log(options);
        console.log("submit order !!!");
        var order_id = options.order_id;
        var service_id = parseInt(options.service_id);
        
        that.setData({
            order_id:order_id,
            service_id:service_id,
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
    submit_order:function(res){
        var that = this;

        var service_id = that.data.service_id;
        var order_id = that.data.order_id;

        var contact_name = "";
        var contact_phone = "";
        var problem_desc = "";
        var plan_date = "";
        var plan_place = "";
        var plan_num = "";
        
        var company_name = "";
        var company_logo = "";
        var contact_name = "";
        var contact_phone = "";
        var business_license = "";
        var other_file = "";
        var form_id = res.detail.formId;
    
        var info = res.detail.value;
        
        wx.showLoading({
            title : "加载中",
        });
        
        app.getUserInfo(function (user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            if(service_id >= 1 && service_id <= 4) {
                company_name = info.company_name;
                contact_name  = info.contact_name;
                contact_phone  = info.contact_phone;

                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/submit_order.php',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        user_id : user_id,
                        sign : sign,
                        order_id : order_id,
                        service_id : service_id,
                        company_name : company_name,
                        company_logo : that.data.company_logo,
                        contact_name : contact_name,
                        contact_phone : contact_phone,
                        business_license : that.data.business_license,
                        form_id: form_id,
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
                            wx.redirectTo({
                                'url':"/pages/submit_order_success/submit_order_success"
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
            } else if(service_id == 5) {
                company_name = info.company_name;
                contact_name = info.contact_name;
                contact_phone = info.contact_phone;
                problem_desc = info.problem_desc;
                
                if(company_name == '' || contact_name == '' || contact_phone == '' || problem_desc == ''  ) {
                    wx.showToast({
                        title: "请补充完整信息",
                        success : function(res) {
                            console.log(res);
                        },
                        fail:function(res) {
                            console.log(res);
                        }
                    })
                }
                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/submit_order.php',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        user_id : user_id,
                        sign : sign,
                        order_id : order_id,
                        service_id : service_id,
                            company_name : company_name,
                            contact_name : contact_name,
                            contact_phone : contact_phone,
                            problem_desc : problem_desc,
                            other_file : that.data.upload_file_path_array.toString(),
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
                            wx.redirectTo({
                                url:"/pages/submit_order_success/submit_order_success",
                                success:function(res) {
                                    console.log(res);
                                }
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
            } else if(service_id == 6 || service_id == 7) {
                company_name = info.company_name;
                contact_name = info.contact_name;
                contact_phone = info.contact_phone;
                problem_desc = info.problem_desc;
                
                plan_date = info.plan_date;
                if(company_name == '' || contact_name == '' || contact_phone == '' || problem_desc == '' || plan_date == '') {
                    wx.showToast({
                        title:"请补充完整信息",
                        success:function(res) {
                            console.log(res);
                        }
                    })
                }
                wx.request({ 
                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/submit_order.php',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        user_id : user_id,
                        sign : sign,
                        order_id : order_id,
                        service_id : service_id,
                        company_name:company_name,
                        contact_name : contact_name,
                        contact_phone : contact_phone,
                        problem_desc : problem_desc,
                        other_file : that.data.upload_file_path_array.toString(),
                        plan_date : plan_date,
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
                            wx.redirectTo({
                                'url':"/pages/submit_order_success/submit_order_success"
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
            } else if(service_id == 8) {
                company_name = info.company_name;
                contact_name = info.contact_name;
                contact_phone = info.contact_phone;
                plan_num = info.plan_num;
                plan_date = info.plan_date;
                plan_place = info.plan_place;
                if(company_name == '' || contact_name == '' || contact_phone == '' || plan_num == '' || plan_date == '' || plan_place == '') {
                    
                }
                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/submit_order.php',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        user_id : user_id,
                        sign : sign,
                        order_id : order_id,
                        service_id : service_id,
                        company_name : company_name,
                        contact_name : contact_name,
                        contact_phone : contact_phone,
                        plan_num : plan_num,
                        plan_date : plan_date,
                        plan_place : plan_place,
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
                            wx.redirectTo({
                                'url':"/pages/submit_order_success/submit_order_success"
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
            } else if(service_id == 9) {
                contact_name = info.contact_name;
                contact_phone = info.contact_phone;
                
                wx.request({    
                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/service/submit_order.php',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        user_id : user_id,
                        sign : sign,
                        order_id : order_id,
                        service_id : service_id,
                        contact_name : contact_name,
                        contact_phone : contact_phone,
                        daoyou_license_url : that.data.daoyou_license_url,
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
                            wx.redirectTo({
                            // wx.redirectTo({
                                'url':"/pages/submit_order_success/submit_order_success"
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
            }
            
        })      
    },
    bindDateChange:function(res) {
        console.log(res.detail.value);
        var that = this;
        that.setData({
            plan_date : res.detail.value
        });
    },
    choose_and_upload:function(res) {
        var that = this;
        wx.showLoading({
            title:"加载中",
        });
        
        var service_id = parseInt(res.currentTarget.dataset.serviceId) ;
        
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表 tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                if(service_id != 9) {
                    that.data.upload_file_name_array.push(tempFilePaths); 
                    that.setData({
                        upload_file_num : that.data.upload_file_name_array.length
                    });

                    wx.uploadFile({
                        url:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/upload.php",
                        filePath : tempFilePaths[0],
                        name:"upload_file",
                        success : function(res) {
                            var tmp_data = res.data;
                            that.data.upload_file_path_array.push(tmp_data);
                        },
                        complete:function(res) {
                            wx.hideLoading();
                        }
                    });
                } else {
                    wx.uploadFile({
                        url:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/upload.php",
                        filePath : tempFilePaths[0],
                        name:"upload_file",
                        success : function(res) {
                            var tmp_data = res.data;
                            that.setData({
                                daoyou_license_url: "https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/" + tmp_data,
                            });
                        },
                        complete:function(res) {
                            wx.hideLoading();
                        }
                    });
                }
            },
            complete:function(res) {
                wx.hideLoading();
            }
        })
    },
    choose_and_upload_company : function(res) {
        var that = this;
        var type = res.currentTarget.dataset.type;
        wx.showLoading({
            title:"加载中"
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
    },
})
