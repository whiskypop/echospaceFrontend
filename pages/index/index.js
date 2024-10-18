// index.js
Page({
  data: {
    // 页面数据
    imageUrl: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/createGifts.png',
    // draftImages: [
    //   'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/draft1.png',
    //   'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/draft2.png',
    //   'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/draft3.png',
    //   'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/draft1.png',
    //   'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/draft2.png',
    //   'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/draft3.png'
    // ],
    packageImages: [
      'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/giftBirthday.png',
      'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/giftBirthday2.png'
    ],
    audioInfo: [{
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
    }],
    tags: ['推荐❤️', '生日✨', '情人节😘', '新年👩‍💻'],
    showMoreTags: false,
    moreTags: ['新生👶🏼', '生日🎁', '毕业礼👨‍🎓', '搬家/乔迁', '恋爱阶段🎀', '结婚纪念', '商务送礼', '新婚礼物', '圣诞节🎄'],
  },
  toggleMoreTags() {
    this.setData({
      showMoreTags: !this.data.showMoreTags,
      tags: this.data.showMoreTags ? ['推荐❤️', '生日✨', '情人节😘', '新年👩‍💻'] : this.data.tags.concat(this.data.moreTags)
    });
  },
  onLoad() {
    // 页面加载时的操作
  },
  navigateToChat() {
    wx.navigateTo({
      url: '/pages/chat/chat'
    });
  },
  navigateToWrite() {
    wx.navigateTo({
      url: `/pages/write/write`
    });
  },
  navigateToCustomizeGift() {
    wx.switchTab({
      url: `/pages/customizeGift/customizeGift`
    });
  },
  navigateToMusicPlay() {
    const audioInfo = this.data.audioInfo;
    wx.navigateTo({
      url: `/pages/musicPlay/musicPlay?audioInfo=${encodeURIComponent(JSON.stringify(audioInfo))}`
    });
  },
  navigateToModel() {
    wx.navigateTo({
      url: `/pages/model/model`
    });
  },
  navigateToYuchen1() {
    wx.navigateTo({
      url: `/pages/yuchen1/yuchen1`
    });
  },
  navigateToYuchen2() {
    wx.navigateTo({
      url: `/pages/yuchen2/yuchen2`
    });
  },
  navigateToNeedCollect() {
    wx.navigateTo({
      url: '/pages/needCollect/needCollect',
    })
  }
});