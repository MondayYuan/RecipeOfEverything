//index.js
//获取应用实例
const app = getApp()

Page({
  cloud_url: '',
  data: {
    sungan_method_img: '/images/index/sungan_method.png',
    sun_kind_img: '/images/index/sun_kind.png',
    jungu_kind_img: '/images/index/jungu_kind.png',
    other_kind_img: '/images/index/other_kind.png'
  },

  goSearch(e) {
    wx.navigateTo({
      url: `/pages/search/search`,
    })
  },

  goMethod() {
    wx.navigateTo({
      url: '/pages/method/method',
    })
  },

  goList(e) {
    console.log(e.currentTarget.dataset.content)
    wx.navigateTo({
      url: `/pages/list/list?content=${e.currentTarget.dataset.content}`,
    })
  },

  onLoad: function (options) {
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
        selected: 0
      })
    }
  }
})
