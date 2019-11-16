// pages/case/case.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        case_list_empty:false,
        upload_file_name_array : [],
        upload_file_path_array : [],
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
            title : "加载中",
        });

        app.getUserInfo(function(user_info){
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/case/get_case_list.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id : user_id,
                    sign : sign,
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
                        var res_case_list = res_data;
                        if(res_case_list.length <= 0) {
                            that.setData({
                                'case_list_empty' : true,
                            });
                        } else {
                            that.setData({
                                'case_list_empty' : false,
                            });
                        }
                        that.setData({
                            'case_list' : res_case_list,
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
    nav_to_case_item:function(res) {
        var that = this;
        var case_id = res.currentTarget.dataset.caseId;
        wx.navigateTo({
            url: '/pages/case_item/case_item?id=' + case_id,
        })
    },
    submit_case:function(e) {
        var that = this;
        var info = e.detail.value;
        var contact_name = info.contact_name;
        var contact_phone = info.contact_phone;
        var problem_desc = info.problem_desc;
        var other_file = that.data.upload_file_path_array.toString();
        var form_id = e.detail.formId;

        wx.showLoading({
            title : "加载中",
        });

        app.getUserInfo(function (user_info) {
            var user_id = user_info.user_id;
            var sign = user_info.sign;

            wx.request({
                url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/case/submit_case.php',
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    user_id: user_id,
                    sign: sign,
                    problem_desc : problem_desc,
                    other_file : other_file,
                    contact_name : contact_name,
                    contact_phone : contact_phone,
                    form_id:form_id,

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
                },
                complete: function (res) {
                    console.log(res);
                    wx.hideLoading();
                }
            })
        });    
    },
    choose_and_upload:function(res) {
        var that = this;
        wx.showLoading({
            title:"加载中",
        });
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表 tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                that.data.upload_file_name_array.push(tempFilePaths); 
                console.log(that.data.upload_file_name_array);
                that.setData({
                    upload_file_name_length : that.data.upload_file_name_array.length
                });

                wx.uploadFile({
                    url:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/upload.php",
                    filePath:tempFilePaths[0],
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
    }
})