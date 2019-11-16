Page({
    data: {
        img_l: ''
    },
    chooseImg: function () {
        var _this = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                console.log(res)
                _this.setData({
                    img_l: res.tempFilePaths
                })
                console.log(res)

            }
        })
    },
    up_img: function () {
        var _this = this;
        wx.uploadFile({
            url: 'https://xcx.hnfabang.cn/xcx/yulvfabao/test/upload.php', //接口
            filePath: _this.data.img_l[0],
            name: 'file',
            formData: {
                'user': 'test'
            },
            success: function (res) {
                var data = res.data;
                console.log(data);
                //do something
            },
            fail: function (error) {
                console.log(error);
            }
        })
    },
    preview_img: function () {
        wx.previewImage({
            current: this.data.img_l,
            urls: this.data.img_l 
        })
    },
    download_img:function(res) {
        var that = this;
        wx.downloadFile({
            url:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/1551924729293-2019-03-07.png",
            success:function(res) {
                var status_code = res.statusCode;
                if (status_code == 200) {
                    that.setData({
                        img_l:res.tempFilePath
                    });
                }
            }
        })
    },
    download_word:function(res) {
        wx.downloadFile({
            url:"https://xcx.hnfabang.cn/xcx/yulvfabao/upload_imgs/司法拍卖住宅-郑东新区-3月份后开拍.doc",
            success:function(res) {
                var filePath = res.tempFilePath;
                wx.openDocument({
                    filePath: filePath,
                    success:function(res) {
                        console.log("open doc ok");
                    }
                })
            } 
        });
    }
})