// pages/search/search.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: '',
    showClear: false,
    openid: '',
    showHistory: true,
    historyList: [],
    hotSearchList: [
      '笋类',
      '菌菇类',
      '水笋烧肉',
      '笋干炒肉',
      '梅菜扣肉',
      '干豆角烧肉',
      '茶树菇土鸡汤'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        openid: app.globalData.userInfo.openid
      })
    }
  },

  bindKeyInput(e) {
    // console.log(this.data.showClear)
    let that = this;
    let value = e.detail.value;
    that.setData({
      searchContent: value
    })
    if (that.data.searchContent.length > 0 && !that.data.showClear) {
      that.setData({
        showClear: true
      })
    } else if (value.length == 0) {
      that.setData({
        showClear: false
      })
    }
  },

  clearInput: function(){
    console.log("清除")
    this.setData({
      showClear: false,
      searchContent: ''
    })
  },

  backHome(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 进入搜索结果页 -> list
  goSearch() {
    let content = this.data.searchContent
    if (!content) {
      console.log('内容为空')
      return
    }

    console.log(content)

    this.addHistory(content)

    wx.navigateTo({
      url: `/pages/list/list?content=${content}`,
    })
  },

  // 添加历史记录
  addHistory(content) {
    const db = wx.cloud.database()
    let that = this

    // 查看是否有历史记录
    db.collection('SearchHistory').where({
      _openid: this.data.openid,
      _id: 'history' + this.data.openid
    }).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res)
        if (!res.data.length) {
          console.log(' 历史记录为空')
          let historyArray = []
          historyArray.unshift(content)
          db.collection('SearchHistory').add({
            data: {
              _id: 'history' + that.data.openid,
              description: 'history',
              historyList: historyArray
            }
          }).then(res => {
            console.log(res)
          })
        } else {
          console.log('已有历史记录')
          let historyArray = res.data[0].historyList
          historyArray.unshift(content)
          console.log([...new Set(historyArray)])
          db.collection('SearchHistory').doc('history' + that.data.openid).update({
            data: {
              historyList: [...new Set(historyArray)]
            }
          }).then((res) => {
            console.log(res)
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  goSearchByHistory(e) {
    console.log(e)
    let content = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/list/list?content=${content}`,
    })
  },

  // 清空历史记录
  clearHistory() {
    const db = wx.cloud.database()
    db.collection('SearchHistory').doc('history' + this.data.openid).update({
      data: {
        historyList: []
      }
    }).then((res) => {
      console.log(res)
      wx.showToast({
        icon: '删除',
        title: '清空历史',
      })
    })

    this.setData({
      historyList: []
    })
  },

  // 读取历史记录
  getHistory() {
    let that = this
    const db = wx.cloud.database()
    db.collection('SearchHistory').doc('history' + that.data.openid).get({
      success(res) {
        console.log(res.data)
        that.setData({
          historyList: res.data.historyList
        })
      }
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
    this.getHistory()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.getHistory()
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

  }
})