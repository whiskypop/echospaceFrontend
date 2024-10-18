Page({
  data: {
    user_info: {
      name: "Amy·Adams",
      id: "631633188",
      location: "New York",
      gender: "female",
      rank: 10,
      vip: 3,
      achievements: 2
    },
    received_gifts: [{
        image: "cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/gift1.jpg",
        name: "Happy Birthday"
      },
      {
        image: "cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/gift2.jpg",
        name: "Your Birthday"
      },
      // Add more items as needed
      {
        image: "cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/gift3.jpg",
        name: "Happy"
      },
      {
        image: "cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/gift4.jpg",
        name: "Flowers"
      },
    ],
    sent_gifts: [{
        image: "cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/gift7.jpg",
        name: "love"
      },
      {
        image: "cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/gift5.jpg",
        name: "love u mom"
      },
      // Add more items as needed
      {
        image: "cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/gift6.jpg",
        name: "love u"
      },
      {
        image: "cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/gift8.jpg",
        name: "My baby"
      },
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
    }]
  },
  navigateToGiftReceiving: function () {
    const audioInfo = this.data.audioInfo;
    wx.navigateTo({
      url: `/pages/giftReceiving/giftReceiving?audioInfo=${encodeURIComponent(JSON.stringify(audioInfo))}`
    });
  }
});