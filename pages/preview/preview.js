Page({
  data: {
    audioInfo: [], // 用于接收音乐信息
    audioUrl: '', // 音频地址
    isPlaying: false, // 是否正在播放
    innerAudioContext: null, // 音频上下文
  },
  onLoad: function(options) {
    if (options.audioInfo) {
      try {
        const audioInfo = JSON.parse(decodeURIComponent(options.audioInfo));
        this.setData({ audioInfo });

        if (audioInfo && audioInfo.length > 0) {
          this.setData({ 
            audioUrl: audioInfo[0].audio_url,
            'audioInfo[0].title': audioInfo[0].title || 'Happy Birthday',
            'audioInfo[0].author': audioInfo[0].author || 'mock的',
            'audioInfo[0].image_url': audioInfo[0].image_url || '/images/default_image.jpg' 
          });
        }

        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = this.data.audioUrl;
        this.setData({ innerAudioContext });

        innerAudioContext.onEnded(() => {
          this.setData({ isPlaying: false });
        });

        innerAudioContext.onError((err) => {
          console.error('Failed to play audio:', err);
        });

        console.log('Audio URL:', this.data.audioUrl);
        console.log('InnerAudioContext initialized with URL:', innerAudioContext.src);

      } catch (e) {
        console.error('Failed to parse audioInfo:', e);
      }
    }
  },

  togglePlay: function () {
    const { innerAudioContext, isPlaying } = this.data;
    if (isPlaying) {
      innerAudioContext.pause();
    } else {
      innerAudioContext.play();
    }
    this.setData({ isPlaying: !isPlaying });
  },

  goToMusicPlay: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  save: function () {
    // 保存按钮的逻辑
    console.log('Save button clicked');
  },

  pay: function () {
    // 支付按钮的逻辑
    // this.shareGift();
    wx.navigateTo({
      url: '/pages/share/share'
    });
  },
  // shareGift: function () {
  //   wx.showShareMenu({
  //     withShareTicket: true,
  //     success: (res) => {
  //       console.log('Share menu shown successfully', res);
  //     },
  //     fail: (err) => {
  //       console.error('Failed to show share menu', err);
  //     }
  //   });
  // },

  // onShareAppMessage: function (options) {
  //   return {
  //     title: '***送了你一个礼物',
  //     path: '/pages/musicPlay/musicPlay?audioInfo=' + encodeURIComponent(JSON.stringify(this.data.audioInfo)),
  //     imageUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/birthday.png', // 礼物包装的图片
  //     success: function (res) {
  //       console.log('分享成功');
  //     },
  //     fail: function (res) {
  //       console.log('分享失败');
  //     }
  //   }
  // },

  onUnload: function() {
    const { innerAudioContext } = this.data;
    if (innerAudioContext) {
      innerAudioContext.destroy();
    }
  },
});
