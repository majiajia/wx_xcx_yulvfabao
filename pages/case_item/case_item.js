// pages/case_item/case_item.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        case_id:"",
        upload_file_path_array:[],
        upload_file_name_array:[],
        upload_file_num : "-",
        user_upload_imgs : [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var case_id = options.id;
        that.setData({
            case_id : case_id
        });
        
        wx.showLoading({
            title : "加载中",
        });

        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/case/get_case_item.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id: user_id,
                    sign: sign,
                    case_id: case_id,
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
                        var other_file_array = res_data.other_file.split(",");
                        
                        that.setData({
                            upload_file_name_array:that.data.upload_file_name_array.concat(other_file_array),
                            upload_file_path_array:that.data.upload_file_path_array.concat(other_file_array),
                        }) ;
                        var tmp_upload_file_array = [];
                        var tmp_upload_file_name_len = that.data.upload_file_name_array.length;
                        for(var index = 0; index < tmp_upload_file_name_len;index ++) {
                            tmp_upload_file_array.push("https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/" + that.data.upload_file_name_array[index]);
                        }
                        that.setData({
                            user_upload_imgs:tmp_upload_file_array
                        });
                        
                        that.setData({
                            upload_file_num:that.data.upload_file_name_array.length
                        });
                        that.setData({
                            problem_desc : res_data.problem_desc,
                            contact_name : res_data.contact_name,
                            contact_phone : res_data.contact_phone,
                            // submit_time : res_data.submit_time,
                            other_file : res_data.other_file,
                            is_admin : res_data.is_admin,
                            case_status:res_data.case_status,
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
    update_user_case:function(res) {
        var that = this;
        var info = res.detail.value;
        var contact_name = info.contact_name;
        var contact_phone = info.contact_phone;
        var problem_desc = info.problem_desc;
        var other_file = info.other_file;
        var form_id = res.detail.formId;
        var is_admin = parseInt(info.is_admin);
        wx.showLoading({
            title:"加载中"
        });
        
        app.getUserInfo(function (user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;
            if(is_admin == 1) {
                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/case/update_case.php',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        user_id : user_id,
                        sign : sign,
                        case_id : that.data.case_id,
                        problem_desc : problem_desc,
                        other_file : that.data.upload_file_path_array.toString(),
                        contact_name : contact_name,
                        contact_phone : contact_phone,
                        form_id : form_id,
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
                            wx.redirectTo({
                            // wx.navigateTo({
                                'url':"/pages/submit_order_success/submit_order_success"
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
            } else if(is_admin == 2) {
                wx.request({
                    url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/case/confirm_case_status.php',
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        user_id : user_id,
                        sign : sign,
                        case_id : that.data.case_id,
                        form_id : form_id,
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
                            wx.showToast({
                                'title' : "处理完成"
                            }); 
                        }
                    },
                    fail: function (res) {
                        console.log(res);
                    },
                    complete: function (res) {
                        console.log(res);
                        // wx.hideLoading();
                    }
                })
            }
            
        });    
    },
    choose_and_upload:function(res) {
        var that = this;
        wx.showLoading({
            title:"加载中"
        });
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表 tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
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
            },
            complete:function(res) {
                wx.hideLoading();
            }
        })
    },
    pre_img : function(res) {
        var url = res.currentTarget.dataset.url;

        wx.previewImage({             
            urls:[ url ],
        });
    }
    
})