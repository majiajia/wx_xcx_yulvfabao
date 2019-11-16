// pages/me/me.js

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        user_type : 1,
        
        user_name:"",
        user_avatar:"",
        user_info_exist:false, //用户的头像和昵称是否存在
        
        company_logo:"",
        company_name:"",
        company_member_type:1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        
    },
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        console.log(e.detail.userInfo);
        
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
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
        var that = this;

        wx.showLoading({
            title : "加载中",
        });
        
        app.getUserInfo(function(user_info){
          var user_id = user_info.user_id;
          var sign = user_info.sign;
          wx.request({
              url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/user_info/get_user_info.php',
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
                      });
                  } else {
                    var res_user_type = parseInt(res_data.type) ;
                    var res_is_admin = parseInt(res_data.is_admin);
                    that.setData({
                        "is_admin" : res_is_admin
                    });
                    if(res_user_type == 1) {
                        if(res_data.name == '') {
                            that.setData({
                                'user_type' : res_user_type,
                                'user_name' : '',  
                                'user_avatar' : "",  
                            });
                        } else {
                            that.setData({
                                'user_type' : res_user_type,
                                'user_name' : res_data.name,  
                                'user_avatar' : res_data.avatar,  
                                'user_info_exist' : true,
                            });
                        }
                    } else if(res_user_type == 3) { //导游会员
                        if (res_data.name == '') {
                            that.setData({
                                'user_type': res_user_type,
                                'user_name': '',
                                'user_avatar': "../../imgs/my_order.png",
                            });
                        } else {
                            that.setData({
                                'user_type': res_user_type,
                                'user_name': res_data.name,
                                'user_avatar': res_data.avatar,
                                'user_info_exist': true,
                            });
                        }
                    } else {
                        that.setData({
                            'user_type' : res_user_type,
                            'company_logo' : res_data.company_logo,
                            'company_name' : res_data.company_name,
                            'member_type' : res_data.member_type,
                        });
                    }
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
    nav_to_about_us:function() {
        wx.navigateTo({
            url: '/pages/about_us/about_us'
        })
    },
    nav_to_update_member_info:function() {
        wx.navigateTo({
            url: '/pages/member_info_update/member_info_update',
        })
    },
    nav_to_order:function() {
        wx.navigateTo({
            url: '/pages/order/order',
        })
    },
    get_user_info:function(res) {
      var that = this;
      var user_info = res.detail.userInfo;
      var user_name = user_info.nickName;
      var user_avatar = user_info.avatarUrl;
      that.setData({
        user_name:user_name,
        user_avatar:user_avatar
      });
      wx.showLoading({
        title : "加载中",
      });
      app.getUserInfo(function(user_info){
        var user_id = user_info.user_id;
        var sign = user_info.sign;
        wx.request({
            url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/user_info/update_user_info.php',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                user_id: user_id,
                sign: sign,
                name:user_name,
                avatar:user_avatar,
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
                    // var res_member_info_list = res_data.member_info_list;
                    that.setData({
                        // 'member_info_list' : res_member_info_list,
                        'user_info_exist' : true,
                        'user_avatar' : user_avatar,
                        'user_name' : user_name,
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
    nav_to_update_price:function(res) {
        wx.navigateTo({
            url: '/pages/update_price/update_price',
        })
    },
    nav_to_my_lawer:function(res) {
        wx.navigateTo({
            url: '/pages/my_lawer/my_lawer',
        });
    },
    nav_to_daoyou:function(res) {
        wx.navigateTo({
            url: '/pages/daoyou_list/daoyou_list',
        });
    },
    nav_to_admin_send_msg:function(res) {
        wx.navigateTo({
            url:"/pages/admin_send_msg/admin_send_msg"
        });
    }
})