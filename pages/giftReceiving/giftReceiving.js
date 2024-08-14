Page({
  data: {
    audioInfo: [], // 用于接收音乐信息
    audioUrl: '', // 音频地址
    isMusicPlaying: false, // 是否正在播放
    innerAudioContext: null, // 音乐播放组件的音频上下文
    giftAudioContext: null, // 礼物播放背景乐的音频上下文
    currentTime: 0,
    duration: 0,
    formattedCurrentTime: '00:00',
    formattedDuration: '00:00',
    benefits: [
      {
        name: 'McDonald',
        price: 39,
        quantity: 0,
        video: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/foodMcDonald.mp4',
        audioUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundAudios/restaurant.mp3',
        videoUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/foodMcDonald.mp4'
      },
      {
        name: 'Pepsi',
        price: 39,
        quantity: 0,
        video: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/foodPepsi.mp4',
        audioUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundAudios/Hamilton.mp3',
        videoUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/foodPepsi.mp4'
      },
      {
        name: '星礼卡',
        price: 300,
        quantity: 0,
        video: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/foodStarbucks.mp4',
        audioUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundAudios/Coffee.mp3',
        videoUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/starbucksCoffee.mp4'
      },
      {
        name: 'Burger King',
        price: 58,
        quantity: 0,
        video: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/foodBurgerKing.mp4',
        audioUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundAudios/Coffee.mp3',
        videoUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/foodBurgerKing.mp4'
      },


    ],
    // displayedBenefits: [],
    titleFontSize: '24px',
    showGiftPopup: false, // 控制礼物弹出框的显示
    selectedGift: {}, // 选中的礼物信息
    showPopup: false,
    shareImage: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/shareGift.jpg' 
  },

  onLoad: function(options) {
    // 获取传递过来的音乐信息
    if (options.audioInfo) {
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
        // Adjust font size for the music title
        this.adjustFontSize();
        // Call adjustFontSize function on window resize
        wx.onWindowResize(this.adjustFontSize.bind(this));
      } catch (e) {
        console.error('Failed to parse audioInfo:', e);
      }
    }
    // this.displayRandomBenefits();
  },

  adjustFontSize: function() {
    const query = wx.createSelectorQuery();
    query.select('.music-title').boundingClientRect((rect) => {
      if (rect) {
        const musicTitleWidth = rect.width;
        const parentWidth = wx.getSystemInfoSync().windowWidth - 40; // Adjust according to your layout
        if (musicTitleWidth > parentWidth) {
          this.setData({ 'titleFontSize': 'calc(20px - 0.5vw)' }); // Adjust this value as necessary
        } else {
          this.setData({ 'titleFontSize': '20px' });
        }
      }
    }).exec();
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

  retryGetDuration: function(innerAudioContext) {
    setTimeout(() => {
      const duration = innerAudioContext.duration;
      if (!isNaN(duration) && duration > 0) {
        this.setData({ 
          duration: duration,
          formattedDuration: this.formatTime(duration)
        });
        console.log('Audio duration set to:', duration);
      } else {
        console.log('Retrying to get audio duration...');
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
  

  // 显示礼物弹出框
  showGiftPopup: function (e) {
    const index = e.currentTarget.dataset.index;
    const selectedGift = this.data.benefits[index];
    this.setData({
      showGiftPopup: true,
      selectedGift: selectedGift,
      isGiftPlaying: false // 每次显示弹窗时，重置礼物播放状态
    });
  },

  // 关闭礼物弹出框
  closeGiftPopup: function () {
    this.setData({
      showGiftPopup: false
    });
  },
  // 礼物播放背景乐的控制函数
  toggleGiftAudio: function (e) {
    const { giftAudioContext, isGiftPlaying, selectedGift } = this.data;

    // 检查 giftAudioContext 是否被正确初始化
    if (!giftAudioContext) {
      console.error('giftAudioContext is not initialized.');
      return;
    }

    const selectedAudioUrl = selectedGift.audioUrl;

    if (giftAudioContext.src === selectedAudioUrl && isGiftPlaying) {
      giftAudioContext.pause();
      this.setData({ isGiftPlaying: false });
    } else {
      giftAudioContext.src = selectedAudioUrl;
      giftAudioContext.play();
      this.setData({ isGiftPlaying: true });
    }
     // 监听音频播放结束事件以实现循环播放
     giftAudioContext.onEnded(() => {
      giftAudioContext.play();
    });
  },
  
  

  seekMusic: function (e) {
    const value = e.detail.value;
    const { innerAudioContext } = this.data;
    innerAudioContext.seek(value);
    this.setData({ currentTime: value });
  },

  handleSliderChanging: function (e) {
    const value = e.detail.value;
    this.setData({ currentTime: value });
  },
  goToMusicPage: function () {
    wx.navigateTo({
      url: '/pages/music/music?audioInfo=' + encodeURIComponent(JSON.stringify(this.data.audioInfo))
    });
  },

  goBack: function () {
    wx.navigateBack();
  },

  save: function () {
    // 保存操作
  },

  onUnload: function() {
    const { innerAudioContext } = this.data;
    if (innerAudioContext) {
      innerAudioContext.destroy(); // 销毁音频上下文
    }
  },

  // displayRandomBenefits() {
  //   let benefits = this.data.benefits;
  //   let shuffled = benefits.sort(() => 0.5 - Math.random());
  //   let selected = shuffled.slice(0, 4);
  //   this.setData({ displayedBenefits: selected });
  // },
  
  showSharePopup: function () {
    console.log('Share Popup Image Path:', this.data.shareImage); 
    this.setData({ showPopup: true });
    this.showBlurBackground();
  },

  hideSharePopup: function () {
    this.setData({ showPopup: false });
    this.hideBlurBackground();
  },
  showBlurBackground: function() {
    this.setData({
      blurBackgroundVisible: true
    });
  },

  hideBlurBackground: function() {
    this.setData({
      blurBackgroundVisible: false
    });
  }
});
