var app = getApp()

Page({
  data: {
    cloud_url: '',
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    shops: [
      {
        qrcode: '/images/shop/taobao.jpg',
        search: [
          '淘宝搜索店铺名：',
          '万物记食材'
        ],
        tip: '使用手机淘宝扫一扫'
      },{
        qrcode: '/images/shop/pinduoduo.jpg',
        search: [
          '拼多多搜索店铺名：',
          '万物记食材'
        ],
        tip: '微信识别图中二维码'
      },{
        qrcode: '/images/shop/weixin.jpg',
        search: [
          '搜索微信号：',
          'M627886821'
        ],
        tip: '微信扫一扫，加客服微信'
      }
    ]
  },

  onLoad: function (options) {
    let that = this
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        that.setData({
          winHeight: calc
        });
      }
    })

    console.log('winheight' + this.data.winHeight)

    // let cloud_url = app.globalData.cloud_url
    // for(var index in this.data.shops) {
    //   this.data.shops[index].qrcode = cloud_url + this.data.shops[index].qrcode
    // }

    // console.log(this.data.shops)
    this.setData({
      cloud_url: app.globalData.cloud_url
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },

  previewImage: function(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.src],
    })
  },

  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  setClipboard: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.copytext,
      success: function(res){
        wx.getClipboardData({
          success: function(res) {
            console.log(res.data)
          }
        })
      }
    })
  }
})