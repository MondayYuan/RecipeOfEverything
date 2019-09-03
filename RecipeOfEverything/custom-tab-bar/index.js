Component({
  data: {
    selected: 0,
    color: "#515151",
    selectedColor: "#ff3333",
    borderStyle: "white",
    backgroundColor: "#eeeeee",
    list: [
      {
        "index": 0,
        "pagePath": "/pages/index/index",
        "iconPath": "/images/nav/index.png",
        "selectedIconPath": "/images/nav/index-active.png",
        "text": "首页"
      },
      {
        "index": 1,
        "pagePath": "/pages/shop/shop",
        "iconPath": "/images/nav/shop.png",
        "selectedIconPath": "/images/nav/shop-active.png",
        "text": "店铺"
      },
      {
        "index": 2,
        "pagePath": "/pages/user/user",
        "iconPath": "/images/nav/user.png",
        "selectedIconPath": "/images/nav/user-active.png",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      console.log("index" + data.index)
      this.setData({
        selected: data.index
      })
      console.log("selected" + this.data.selected)
    }
  }
})