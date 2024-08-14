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
      const fileList = [
        'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/Amy.png',
        'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/echo.png'
      ];
      wx.cloud.getTempFileURL({
        fileList: fileList,
        success: res => {
          const manAvatarUrl = res.fileList[0].tempFileURL;
          const robotAvatarUrl = res.fileList[1].tempFileURL;
    
          console.log('Man Avatar URL:', manAvatarUrl);
          console.log('Robot Avatar URL:', robotAvatarUrl);
    
          that.setData({
            chatList: [
              {
                type: 'man',
                avatarUrl: manAvatarUrl,
                content: 'Hello, echoSpace!',
              },
              {
                type: 'robot',
                avatarUrl: robotAvatarUrl,
                content: "Hello, I'm glad to hear you share your story. I'll help you express your emotions.",
              }
            ]
          });
        },
        fail: err => {
          console.error('getTempFileURL fail:', err);
        }
      });
    },
    
  }
})
