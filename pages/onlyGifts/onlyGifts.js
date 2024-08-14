Page({
  data: {
    showMusic: false,
    audioInfo: [], // 用于接收音乐信息
    audioUrl: '', // 音频地址
    isMusicPlaying: false, // 是否正在播放
    giftAnimation: null, // 用于控制礼物图片旋转的动画对象
    innerAudioContext: null, // 音乐播放组件的音频上下文
    giftAudioContext: null, // 礼物播放背景乐的音频上下文
    currentTime: 0,
    duration: 0,
    formattedCurrentTime: '00:00',
    formattedDuration: '00:00',
    firstArray: [],
    secondArray: [],
    // displayedBenefits: [], 
    tags: ['收藏❤️', '推荐✨', '音乐🎵', '特效🪄'],
    showMoreTags: false,
    moreTags: ['IP', '魔法🪄', '结婚纪念', '商务送礼', '新婚礼物', '圣诞节🎄'],
    selectedTag: '', // 保存当前选中的tag
    currentProducts: [], // 当前展示的产品列表
    currentTag: '', // 保存当前展示的tag，用于区分展示视频还是图片
    totalPrice: 0,
    titleFontSize: '24px',
    showGiftPopup: false, // 控制礼物弹出框的显示
    selectedGift: {}, // 选中的礼物信息
    filteredBenefits: [],
  },
  

  onLoad: function(options) {
    // this.calculateTotalPrice();
    // this.displayRandomBenefits();
    // 初始化礼物播放背景乐的音频上下文
    if (options.cartData) {
      const cartData = JSON.parse(decodeURIComponent(options.cartData));
      console.log("Received cart data:", cartData); 
      // 将 cartData 存储在本地存储中
      wx.setStorageSync('cartData', cartData);

      // 根据数量分割数组
      let firstArray = [];
      let secondArray = [];

      if (cartData.length > 4) {
          firstArray = cartData.slice(0, 4);
          secondArray = cartData.slice(4);
      } 
      else {
          firstArray = cartData;
      }

      this.setData({ firstArray: firstArray, secondArray: secondArray });
    } 
    else {
     // 尝试从本地存储中获取 cartData
     const cartData = wx.getStorageSync('cartData');
    if (cartData) {
         console.log("Retrieved cart data from storage:", cartData);
         
         // 根据数量分割数组
         let firstArray = [];
         let secondArray = [];

         if (cartData.length > 4) {
             firstArray = cartData.slice(0, 4);
             secondArray = cartData.slice(4);
         } else {
             firstArray = cartData;
         }
         this.setData({ firstArray: firstArray, secondArray: secondArray });
    }else {
      console.log("No cart data received.");
    }
    }
    if (options.audioInfo) {
      this.setData({
        showMusic: !this.data.showMusic
      });
      try {
        const audioInfo = JSON.parse(decodeURIComponent(options.audioInfo));
        this.setData({ audioInfo });

        // 获取音频地址
        if (audioInfo && audioInfo.length > 0) {
          this.setData({ audioUrl: audioInfo[0].audio_url });
        }

        // 初始化 InnerAudioContext
        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = this.data.audioUrl; // 设置音频源
        this.setData({ innerAudioContext });

        // 初始化礼物播放背景乐的音频上下文
        const giftAudioContext = wx.createInnerAudioContext();
        this.setData({ giftAudioContext });

        // 监听音频播放结束事件
        innerAudioContext.onEnded(() => {
          this.setData({ isPlaying: false });
        });

        // 错误处理
        innerAudioContext.onError((err) => {
          console.error('Failed to play audio:', err);
        });

         // 监听音频准备好事件获取音频时长
        innerAudioContext.onCanplay(() => {
          this.getAudioDuration(innerAudioContext);
        });

        // 监听音频更新事件，获取当前播放时间
        innerAudioContext.onTimeUpdate(() => {
          const currentTime = innerAudioContext.currentTime;
          this.setData({
            currentTime: currentTime,
            formattedCurrentTime: this.formatTime(currentTime)
          });
        });

        // 添加调试日志
        console.log('Audio URL:', this.data.audioUrl);
        console.log('InnerAudioContext initialized with URL:', innerAudioContext.src);
        // Call adjustFontSize function on window resize
        wx.onWindowResize(this.adjustFontSize.bind(this));
      } catch (e) {
        console.error('Failed to parse audioInfo:', e);
      }
    }
  },
  getAudioDuration: function(innerAudioContext) {
    setTimeout(() => {
      const duration = innerAudioContext.duration;
      if (!isNaN(duration) && duration > 0) {
        this.setData({ 
          duration: duration,
          formattedDuration: this.formatTime(duration)
        });
        console.log('Audio duration set to:', duration);
      } else {
        console.log('Audio duration still not available, retrying...');
        this.retryGetDuration(innerAudioContext);
      }
    }, 500);
  },
  formatTime: function(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  },
  // 音乐播放组件的播放控制函数
  toggleMusicPlay: function () {
    const { innerAudioContext, isMusicPlaying } = this.data;
    if (isMusicPlaying) {
      innerAudioContext.pause();
      this.setData({ isMusicPlaying: false });
    } else {
      innerAudioContext.play();
      this.setData({ isMusicPlaying: true });
    }
  },
  toggleMoreTags() {
    this.setData({
      showMoreTags: !this.data.showMoreTags,
      tags: this.data.showMoreTags ? ['收藏❤️', '推荐✨', '音乐🎵', '特效🪄'] : this.data.tags.concat(this.data.moreTags)
    });
  },


  goBack: function () {
    wx.navigateBack();
  },

  save: function () {
    // 保存操作
  },

  
  navigateToList() {
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  navigateToMall() {
    wx.navigateTo({
      url: '/pages/mall/mall',
    })
  },
  navigateToShare() {
    wx.navigateTo({
      url: '/pages/share/share',
    })
  },
  navigateToWrite() {
    wx.navigateTo({
      url: `/pages/write/write`
    });
  },
  goToMusicPage: function () {
    wx.navigateTo({
      url: '/pages/music/music?audioInfo=' + encodeURIComponent(JSON.stringify(this.data.audioInfo))
    });
  },
});
