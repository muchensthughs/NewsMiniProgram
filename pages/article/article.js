// pages/article/article.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: "",
    time: "",
    source: "",
    pageView: 0,
    mainBody: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    this.getArticle()
  },

  // request API result
  getArticle() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id,
      },
      success: res => {
        let result = res.data.result
        this.setArticle(result)
      }
    })
  },

  //set up data
  setArticle(result) {
    let title = result.title
    let time = result.date.slice(11, 16)
    let source = result.source
    if (source == "") {
      source = "未知来源"
    }
    let pageView = result.readCount
    let mainBody = []
    for (let i = 0; i < result.content.length; i += 1) {
      if (result.content[i].type == "p" || result.content[i].type == "strong") {
        mainBody.push({
          contentType: "text",
          content: result.content[i].text
        })
      } else {
        mainBody.push({
          contentType: "image",
          content: result.content[i].src
        })
      }

    }
    this.setData({
      title,
      time,
      source,
      pageView,
      mainBody
    })
  }


})