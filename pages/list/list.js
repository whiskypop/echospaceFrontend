// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: ['收藏❤️', '推荐✨', '音乐🎵', '特效🪄'],
    showMoreTags: false,
    moreTags: ['IP', '魔法🪄', '结婚纪念', '商务送礼', '新婚礼物', '圣诞节🎄'],
    selectedTag: '', // 保存当前选中的tag
    uploadedMedia: [],
    audioInfo: [
      {
        "id": "ff2f71c1-baa3-47b9-9fcc-da82d099c4a5", 
        "title": "Rhythms of Growth: A Birthday Anthem for My Son", 
        // "title": "Beijing Rain: The Commuter's Serenade", 
        "image_url": "https://cdn1.suno.ai/image_5b0f054d-c209-435d-a0bd-17cddaf44eff.png", 
        "lyric": "[Verse 1]\nWoke up with the sunrise in my eyes\nToday's the day that you're the world's surprise\nCandles on the cake, wishin' for your smile\n\u795d\u4f60\u5f00\u5fc3, every single mile\n\n[Chorus]\nHappy birthday, my love, let's raise a cheer\nFor every moment, every day you're here\nMay your dreams take flight, work go right\nIn my heart, you're the shining light\n\n[Verse 2]\nAnother year, but you're timeless to me\nWrapped up in love, as endless as the sea\nWith every laugh, my world's a better place\n\u5728\u4f60\u7684\u7b11\u5bb9, I find my grace\n\n[Chorus]\nHappy birthday, my love, let's make it loud\nFor the joy and love that you've allowed\nWith every step, may you find ease\nAnd in my arms, forever peace\n\n[Bridge]\nBlow out the candles, make a wish, my dear\nI'll be your strength, chase away any fear\n\u4eca\u5929, \u660e\u5929, always near\nTo celebrate you, year after year\n\n[Chorus]\nHappy birthday, my love, this song's for you\nFor all the happiness that you're due\nMay life's melody, always be sweet\nWith every heartbeat, we'll repeat\n\n[Outro]\nHappy birthday, my love, again I'll say\nMay you be blessed in every single way\n\u4eca\u5929\u662f\u4f60\u7684\u65e5\u5b50, let's live it right\nHappy birthday, love, into the night", 
        "audio_url": "https://636c-cloud1-5gmggv5l8f2ead23-1326484866.tcb.qcloud.la/audios/1718695401353_851.mp3", 
        "video_url": "", 
        "created_at": "2024-06-06T03:16:59.148Z", 
        "model_name": "chirp-v3", 
        "status": "streaming"
      }
    ]
  },
  chooseMedia() {
    const that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      success(res) {
        // Assuming only one file is chosen
        const tempFilePath = res.tempFiles[0].tempFilePath;
        that.setData({
          uploadedMedia: [tempFilePath]
        });
        const audioInfo = that.data.audioInfo;
        // Navigate to the new page and pass the media path
        wx.navigateTo({
          url: `/pages/giftReceivingWithPhoto/giftReceivingWithPhoto?tempFilePath=${encodeURIComponent(tempFilePath)}&audioInfo=${encodeURIComponent(JSON.stringify(audioInfo))}`
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  toggleMoreTags() {
    this.setData({
      showMoreTags: !this.data.showMoreTags,
      tags: this.data.showMoreTags ? ['收藏❤️', '推荐✨', '音乐🎵', '特效🪄'] : this.data.tags.concat(this.data.moreTags)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  navigateToWrite() {
    wx.navigateTo({
      url: `/pages/write/write`
    });
  }
})