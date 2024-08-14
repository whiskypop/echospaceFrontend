Page({
  data: {
    musicList: [
      {
        id: "1",
        title: 'Urban Bliss Beat',
        image_url: 'https://cdn1.suno.ai/image_3fdba0a3-3558-49cd-a5e7-7979f0fa4126.png',
        lyric: "(Verse 1)↵In the city glow, she walks alone,↵Simple kicks, coffee in her hand.↵High-rise dreams, but a humble home,↵Finds her joy in the little things so grand.↵(Chorus)↵Tiny treasures in her urban maze,↵City lights, but she's got her stars,↵In her pocket, sunshine on gray days,↵She's rich in life, no need for fancy cars.↵(Verse 2)↵Laughter spills in crowded streets,↵A gentle rain, an umbrella dance.↵Life's a canvas, every moment she greets,↵With a grateful heart, in her eyes, there's a chance.↵(Bridge)↵Oh, she's living, not just surviving,↵In every breath, she finds something new.↵Material things, she's not desiring,↵Her wealth is real, and her skies are blue.",
        audio_url: 'https://636c-cloud1-5gmggv5l8f2ead23-1326484866.tcb.qcloud.la/audios/1716543528085_825.mp3',
        isPlaying: false
      },
      {
        id: "2",
        title: 'Urban Bliss Beat',
        image_url: 'https://cdn1.suno.ai/image_3fdba0a3-3558-49cd-a5e7-7979f0fa4126.png',
        lyric: "(Verse 1)↵In the city glow, she walks alone,↵Simple kicks, coffee in her hand.↵High-rise dreams, but a humble home,↵Finds her joy in the little things so grand.↵(Chorus)↵Tiny treasures in her urban maze,↵City lights, but she's got her stars,↵In her pocket, sunshine on gray days,↵She's rich in life, no need for fancy cars.↵(Verse 2)↵Laughter spills in crowded streets,↵A gentle rain, an umbrella dance.↵Life's a canvas, every moment she greets,↵With a grateful heart, in her eyes, there's a chance.↵(Bridge)↵Oh, she's living, not just surviving,↵In every breath, she finds something new.↵Material things, she's not desiring,↵Her wealth is real, and her skies are blue.",
        audio_url: 'https://636c-cloud1-5gmggv5l8f2ead23-1326484866.tcb.qcloud.la/audios/1716543528085_825.mp3',
        isPlaying: false
      },
      // 其他歌曲信息
    ],
    innerAudioContext: null // 声明内部音频上下文
  },
  togglePlay(e) {
    const id = e.currentTarget.dataset.id;
    const index = this.data.musicList.findIndex(item => item.id === id);
    
    // 检查是否找到对应的音乐信息
    if (index === -1) {
      console.error('Failed to find music with id:', id);
      return;
    }
    
    const currentMusic = this.data.musicList[index];
    const isPlaying = !currentMusic.isPlaying;

    // 更新当前音乐的播放状态
    this.setData({
      [`musicList[${index}].isPlaying`]: isPlaying
    });

    let innerAudioContext = this.data.innerAudioContext; // 获取内部音频上下文

    // 如果内部音频上下文为空，则创建新的实例
    if (!innerAudioContext) {
      innerAudioContext = wx.createInnerAudioContext();
      this.setData({ innerAudioContext }); // 更新页面数据
    }

    // 如果当前音乐正在播放，则暂停其他音乐的播放
    if (isPlaying) {
      this.data.musicList.forEach(item => {
        if (item.id !== id && item.isPlaying) {
          this.setData({
            [`musicList[${this.data.musicList.findIndex(i => i.id === item.id)}].isPlaying`]: false
          });
        }
      });

      // 播放当前音乐
      const audioUrl = currentMusic.audio_url;
      innerAudioContext.src = audioUrl; // 设置音频源
      innerAudioContext.play();
      
      // 监听音频播放结束事件
      innerAudioContext.onEnded(() => {
        this.setData({
          [`musicList[${index}].isPlaying`]: false
        });
      });

      // 错误处理
      innerAudioContext.onError((err) => {
        console.error('Failed to play audio:', err);
      });
    } else {
      // 暂停当前音乐
      innerAudioContext.pause();
    }
  },
  // 其他页面逻辑
});
