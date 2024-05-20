Page({
  data: {
    audioUrl: '',
    imageUrl: '',
    title: '',
    tags: '',
    lyrics: '',
    currentTime: '00:00',
    duration: '00:00',
    playing: true,
    showLyrics: false
  },

  onLoad(options) {
    const { audioUrl, imageUrl, title, tags, lyrics } = options;
    this.setData({
      audioUrl: decodeURIComponent(audioUrl),
      imageUrl: decodeURIComponent(imageUrl),
      title: decodeURIComponent(title),
      tags: decodeURIComponent(tags),
      lyrics: decodeURIComponent(lyrics)
    });

    this.audioCtx = wx.createInnerAudioContext();
    this.audioCtx.src = this.data.audioUrl;
    this.audioCtx.play();

    this.audioCtx.onTimeUpdate(() => {
      this.setData({
        currentTime: this.formatTime(this.audioCtx.currentTime),
        duration: this.formatTime(this.audioCtx.duration)
      });
    });

    this.audioCtx.onEnded(() => {
      this.setData({ playing: false });
    });
  },

  onUnload() {
    this.audioCtx.destroy();
  },

  formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  },

  togglePlay() {
    if (this.data.playing) {
      this.audioCtx.pause();
    } else {
      this.audioCtx.play();
    }
    this.setData({ playing: !this.data.playing });
  },

  toggleLyrics() {
    this.setData({ showLyrics: !this.data.showLyrics });
  }
});
