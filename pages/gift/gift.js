Page({
  data: {
    audioInfo: {}, // 存储音频信息
    audioUrl: '', // 音频地址
    isPlaying: false, // 是否正在播放
    innerAudioContext: null, // 音频上下文
  },

  onLoad: function(options) {
    // 获取从上一页传递过来的音频信息
    if (options.audioInfo) {
      try {
        const audioInfo = JSON.parse(decodeURIComponent(options.audioInfo));
        this.setData({ audioInfo });
        console.log("Gift audio info: ", audioInfo);

        // 获取音频地址
        if (audioInfo && audioInfo.length > 0) {
          this.setData({ audioUrl: audioInfo[0].audio_url });
        }

        // 初始化 InnerAudioContext
        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = this.data.audioUrl; // 设置音频源
        this.setData({ innerAudioContext });

        // 监听音频播放结束事件
        innerAudioContext.onEnded(() => {
          this.setData({ isPlaying: false });
        });

        // 错误处理
        innerAudioContext.onError((err) => {
          console.error('Failed to play audio:', err);
        });

        // 添加调试日志
        console.log('Audio URL:', this.data.audioUrl);
        console.log('InnerAudioContext initialized with URL:', innerAudioContext.src);

      } catch (e) {
        console.error('Failed to parse audioInfo:', e);
      }
    }
  },

  togglePlay() {
    const { isPlaying, innerAudioContext, audioUrl } = this.data;

    if (!innerAudioContext || !audioUrl) {
      console.error('Audio context or URL is not initialized properly');
      return;
    }

    if (isPlaying) {
      innerAudioContext.pause(); // 暂停播放
    } else {
      innerAudioContext.play(); // 开始播放
    }

    this.setData({ isPlaying: !isPlaying });
  },

  onUnload: function() {
    const { innerAudioContext } = this.data;
    if (innerAudioContext) {
      innerAudioContext.destroy(); // 销毁音频上下文
    }
  },

  navigateBack() {
    wx.navigateBack(); // 返回上一级页面
  }
});
