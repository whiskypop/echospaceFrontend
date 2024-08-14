Page({
  data: {
    audioInfo: [], // 用于接收音乐信息
    audioUrl: '', // 音频地址
    isPlaying: false, // 是否正在播放
    innerAudioContext: null, // 音频上下文
    currentTime: 0,
    duration: 0,
    formattedCurrentTime: '00:00',
    formattedDuration: '00:00',
  },
  onLoad: function(options) {
    if (options.audioInfo) {
      try {
        const audioInfo = JSON.parse(decodeURIComponent(options.audioInfo));
        this.setData({ audioInfo });

        if (audioInfo && audioInfo.length > 0) {
          this.setData({ audioUrl: audioInfo[0].audio_url });
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

        innerAudioContext.onCanplay(() => {
          this.getAudioDuration(innerAudioContext);
        });

        innerAudioContext.onTimeUpdate(() => {
          const currentTime = innerAudioContext.currentTime;
          this.setData({
            currentTime: currentTime,
            formattedCurrentTime: this.formatTime(currentTime)
          });
        });

        console.log('Audio URL:', this.data.audioUrl);
        console.log('InnerAudioContext initialized with URL:', innerAudioContext.src);

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

  togglePlay: function () {
    const { innerAudioContext, isPlaying } = this.data;
    if (isPlaying) {
      innerAudioContext.pause();
    } else {
      innerAudioContext.play();
    }
    this.setData({ isPlaying: !isPlaying });
  },

  seekMusic: function (e) {
    const value = e.detail.value;
    const { innerAudioContext } = this.data;
    innerAudioContext.seek(value);
    this.setData({
      currentTime: value,
      formattedCurrentTime: this.formatTime(value)
    });
  },

  handleSliderChanging: function (e) {
    const value = e.detail.value;
    this.setData({
      currentTime: value,
      formattedCurrentTime: this.formatTime(value)
    });
  },

  goToMusicPlay: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  onUnload: function() {
    const { innerAudioContext } = this.data;
    if (innerAudioContext) {
      innerAudioContext.destroy();
    }
  },
});
