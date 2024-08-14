Page({
  data: {
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
    tags: ['收藏❤️', '推荐✨', '音乐🎵', '特效🪄'],
    showMoreTags: false,
    moreTags: ['IP', '魔法🪄', '结婚纪念', '商务送礼', '新婚礼物', '圣诞节🎄'],
    totalPrice: 0,
    titleFontSize: '24px',
    showGiftPopup: false, // 控制礼物弹出框的显示
    selectedGift: {} // 选中的礼物信息
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
    // this.calculateTotalPrice();
    // this.displayRandomBenefits();
  },
  toggleMoreTags() {
    this.setData({
      showMoreTags: !this.data.showMoreTags,
      tags: this.data.showMoreTags ? ['收藏❤️', '推荐✨', '音乐🎵', '特效🪄'] : this.data.tags.concat(this.data.moreTags)
    });
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
      this.stopGiftAnimation(); // 停止礼物图片旋转
    } else {
      innerAudioContext.play();
      this.setData({ isMusicPlaying: true });
      this.startGiftAnimation(); // 开始礼物图片旋转
    }
  },
  startGiftAnimation: function () {
    const animation = wx.createAnimation({
      duration: 9000, // 旋转一周的时间，单位ms
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    animation.rotate(360).step();
    this.setData({
      giftAnimation: animation.export()
    });
  },
  
  stopGiftAnimation: function () {
    const animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    animation.rotate(0).step();
    this.setData({
      giftAnimation: animation.export()
    });
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
    this.stopGiftAnimation(); // 停止礼物图片旋转
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
      this.stopGiftAnimation(); // 停止礼物图片旋转
    } else {
      giftAudioContext.src = selectedAudioUrl;
      giftAudioContext.play();
      this.setData({ isGiftPlaying: true });
      this.startGiftAnimation(); // 开始礼物图片旋转
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

  goToPreviewPage: function () {
    wx.navigateTo({
      url: '/pages/preview/preview?audioInfo=' + encodeURIComponent(JSON.stringify(this.data.audioInfo))
    });
  },
  navigateToList() {
    wx.switchTab({
      url: '/pages/list/list',
    })
  },

  goBack: function () {
    wx.navigateBack();
  },

  save: function () {
    // 保存操作
  },

  // calculateTotalPrice() {
  //   let total = 0;
  //   this.data.displayedBenefits.forEach(item => {
  //     total += item.price * item.quantity;
  //   });
  //   this.setData({
  //     totalPrice: total.toFixed(2)
  //   });
  // },

  // increaseQuantity(e) {
  //   const index = e.currentTarget.dataset.index;
  //   const displayedBenefits = this.data.displayedBenefits;
  //   displayedBenefits[index].quantity += 1;
  //   this.setData({ displayedBenefits });
  //   this.calculateTotalPrice();
  // },

  // decreaseQuantity(e) {
  //   const index = e.currentTarget.dataset.index;
  //   const displayedBenefits = this.data.displayedBenefits;
  //   if (displayedBenefits[index].quantity > 0) {
  //     displayedBenefits[index].quantity -= 1;
  //     this.setData({ displayedBenefits });
  //     this.calculateTotalPrice();
  //   }
  // },

  onUnload: function() {
    const { innerAudioContext } = this.data;
    if (innerAudioContext) {
      innerAudioContext.destroy(); // 销毁音频上下文
    }
  },

  // displayRandomBenefits() {
  //   let benefits = this.data.benefits;
  
  //   // Find the index of 'Starbucks' and 'McDonald'
  //   let starbucksIndex = benefits.findIndex(item => item.name === 'STARBUCKS');
  //   let mcdonaldIndex = benefits.findIndex(item => item.name === 'McDonald');
  
  //   // Swap Starbucks and McDonald to the front of the array
  //   if (starbucksIndex !== -1 && mcdonaldIndex !== -1) {
  //     [benefits[0], benefits[starbucksIndex]] = [benefits[starbucksIndex], benefits[0]];
  //     [benefits[1], benefits[mcdonaldIndex]] = [benefits[mcdonaldIndex], benefits[1]];
  //   }
  
  //   // Exclude Starbucks and McDonald from the remaining benefits
  //   let remainingBenefits = benefits.slice(2).filter(item => item.name !== 'STARBUCKS' && item.name !== 'McDonald');
  
  //   // Shuffle the remaining benefits and select the first two
  //   let shuffled = remainingBenefits.sort(() => 0.5 - Math.random());
  //   let selected = benefits.slice(0, 2).concat(shuffled.slice(0, 2));
  
  //   this.setData({ displayedBenefits: selected });
  // }
  
});
