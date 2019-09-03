// pages/detail/detail.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cloud_url: '',
    detail: {},
    tags: [], // 标签
    ingredients: [], // 主料
    loading: true,
    isExit: true, // 此菜品是否存在
    hasTips: false,
    userInfo: {},
    isCollected: false, // 菜品是否已收藏
    food_id: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      food_id: options.id,
      cloud_url: app.globalData.cloud_url
    })
    this.loadDetail(options.id) // 加载详情
    if (this.data.userInfo){
      this.getcollect(this.data.food_id) // 获取收藏菜品，并判断是否已收藏
    }
  },

  loadDetail(param) {
    let that = this
    wx.showLoading({
      title: '详情加载中...',
    })

    // 从云数据库读取列表
    const db = wx.cloud.database()
    const _ = db.command
    console.log(param)
    db.collection('Recipes').where({
      id: _.eq(param)
    }).get({
      success(res) {
        console.log('查询结果:', res.data)
        console.log(res.data.length)
        if (res.data.length) {
          console.log(12345)
          console.log(res.data[0])
          that.setData({
            detail: res.data[0]
          })
          console.log(111111)
          wx.setNavigationBarTitle({
            title: res.data[0].title
          })
        } else {
          console.log('该id为空')
          that.setData({
            isExit: false
          })
        }
        wx.hideLoading();
      },
      fail(res) {
        console.log('查询失败')
      }
    },
      console.log("this.data.detail.id"),
      console.log(this.data.detail.id)
    )
  },

  onBackhome() {
    wx.switchTab({
      url: `/pages/index/index`,
    })
  },

  onGoshopping() {
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },

  getUser: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
    })
    this.getcollect(this.data.food_id)
  },

  // 授权后可以收藏
  bindCollect() {
    this.onCollect()
    wx.vibrateLong({
      success: res => {
        console.log('震动成功');
      },
      fail: (err) => {
        console.log('震动失败');
      }
    })
    if (!this.data.isCollected) {
      wx.showToast({
        icon: '收藏',
        title: '收藏成功',
      })
    } else {
      wx.showToast({
        icon: '收藏',
        title: '已经取消收藏',
      })
    }
  },

  // 收藏
  onCollect() {
    const db = wx.cloud.database()
    let that = this

    // 查看是否有收藏记录
    db.collection('Collects').where({
      _openid: this.data.userInfo.openid,
      _id: 'collect' + this.data.userInfo.openid
    }).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res)
        let like = that.data.detail // 需要收藏的菜品
        // delete like._id

        if (!res.data.length) { // 如果从未收藏
          console.log(' 从未收藏')
          let detailArray = []
          detailArray.push(like)
          db.collection('Collects').add({
            data: {
              _id: 'collect' + that.data.openid,
              description: 'like',
              collectList: detailArray
            }
          }).then(res => {
            console.log(res)
          })
          this.setData({
            isCollected: true
          })
        } else { // 如果已有收藏记录
          console.log('已有收藏记录')
          let detailArray = res.data[0].collectList
          let i = 0
          let flag = false

          // 判断已有的收藏记录中是否已经收藏了此菜品
          detailArray.map((val, index) => {
            if (val.id == like.id) {
              i = index
              flag = true
            }
          })

          flag ? detailArray.splice(i, 1) : detailArray.push(like)

          db.collection('Collects').doc('collect' + that.data.openid).update({
            data: {
              collectList: detailArray
            }
          }).then((res) => {
            console.log(res)
          })

          that.setData({
            isCollected: !flag
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

  // 读取收藏列表
  getcollect(param) {
    let that = this
    const db = wx.cloud.database()
    // 查看是否有收藏记录
    db.collection('Collects').where({
      _openid: this.data.userInfo.openid,
      _id: 'collect' + this.data.userInfo.openid
    }).get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res)
        if (!res.data.length) { // 如果从未收藏
          console.log(' 从未收藏')
        } else { // 如果已有收藏记录
          console.log(res.data)
          let detailArray = res.data[0].collectList
          let flag = false
          // 判断已有的收藏记录中是否已经收藏了此菜品
          detailArray.map((val, index) => {
            if (val.id == param) {
              flag = true
            }
          })
          console.log(flag)
          that.setData({
            isCollected: flag
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

  }
})