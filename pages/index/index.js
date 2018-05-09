//index.js
const classMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other'
}

Page({
  data: {
    classes: ["国内", "国际", "财经", "娱乐", "军事", "体育", "其他"],
    newsList: [],
    headNewsTitle: '',
    headNewsTimeStamp: '',
    headNewsImage: '',
    headNewsSource: '',
    currentClass: '国内',
  },

  onTapClass:function(res){
    let currentClass = res.target.id
    this.setData({
      currentClass: currentClass
    })
    this.getData() 
  },


  onLoad() {
    this.getData()
  },

  getData() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: classMap[this.data.currentClass],
      },
      success: res => {
        let result = res.data.result
        let newsList = []
        let headNewsTitle = result[0].title
        let headNewsImage = result[0].firstImage
        let headNewsTimeStamp = result[0].date.slice(11,16)
        let headNewsSource = result[0].source
        if (headNewsSource == '') {
          headNewsSource = "未知来源"
        }
        for (let i = 1; i < result.length; i += 1) {
          let news = result[i]
          if (news.source == '') {
            news.source = "未知来源"
          }
          newsList.push({
            title: news.title,
            timeStamp: news.date.slice(11, 16),
            source: news.source,
            imageURL: news.firstImage
          })
        }
        this.setData({
          headNewsTitle,
          headNewsImage,
          headNewsTimeStamp,
          headNewsSource,
          newsList: newsList
        })
        console.log(result)  
      }
    })
  },

  setNewsList() {
    
  }
})
