// release/components/chatbox
const app = getApp();
const timeutil = require('./timeutil');
const cx = Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    roomId: {
      type: Number,
      observer: function (newVal, oldVal) {
        if (newVal != undefined && newVal != null) {
        }
      }
    }
  },
  pageLifetimes: {
    show: function () {

    },
  },
  lifetimes: {
    attached() {
      var that = this;
      that.initMessageHistory();
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            systemInfo: res
          })
        }
      })
    },
    detached() {
      try {
      } catch (error) {
        console.log('--消息监听器关闭失败--')
      }
    }
  },
  data: {
    openid: app.globalData.openid || wx.getStorageSync('openid'),
    scrollId: '',
    systemInfo: {},
    chatList: [],
    isTop: false
  },
  methods: {
    viewImage(e) {
      let url = e.currentTarget.dataset.url;
      wx.previewImage({
        urls: [url],
      })
    },
    tapTop() {
      console.log('--触顶--')
      var that = this;
      that.setData({
        isTop: true
      }, () => {
      })
    },
    initMessageHistory() {
      var that = this;
      app.globalData.cht = that
      that.setData({
        chatList: [
          {
            "type":"man",
            "avatarUrl":"image/user.jpeg",   
            "content":"你好，ChatGpt",
          },
          {
            "type":"robot",
            "avatarUrl":"image/openai-avatar.png",
            "content":"你好！有什么问题我可以帮忙解答吗？欢迎随时向我提问。",
          }
        ]
      })
    },
    
  }
})
