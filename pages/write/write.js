Page({
  data: {
    moodDescription: '',
    selectedThemes: [],
    selectedMusicTypes: [],
    themes: ['伤感', '励志', '爱情', '亲情', '英文', 'ai随机'],
    musicTypes: ['流行', '摇滚', '电子', 'RAP', '爵士', 'ai随机'],
    audioInfo: []
  },

  inputMood(e) {
    this.setData({
      moodDescription: e.detail.value
    });
  },

  toggleSelection(type, item) {
    let selectedArray = type === 'theme' ? this.data.selectedThemes : this.data.selectedMusicTypes;

    let index = selectedArray.indexOf(item);
    if (index === -1) {
      selectedArray.push(item);
    } else {
      selectedArray.splice(index, 1);
    }

    // 添加调试语句
    console.log(`Selected ${type}s:`, selectedArray);

    this.setData({
      [type === 'theme' ? 'selectedThemes' : 'selectedMusicTypes']: selectedArray
    });
  },

  toggleThemeSelection(e) {
    const selectedTheme = e.currentTarget.dataset.item;
    this.toggleSelection('theme', selectedTheme);

    // 调试语句，查看选中的主题
    console.log('Current selected themes:', this.data.selectedThemes);
  },

  toggleMusicTypeSelection(e) {
    const selectedMusicType = e.currentTarget.dataset.item;
    this.toggleSelection('musicType', selectedMusicType);

    // 调试语句，查看选中的音乐类型
    console.log('Current selected music types:', this.data.selectedMusicTypes);
  },

  create() {
    const { moodDescription, selectedThemes, selectedMusicTypes } = this.data;

    if (!moodDescription || selectedThemes.length === 0 || selectedMusicTypes.length === 0) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    // 打印用于创作的数据
    console.log('Creating song with the following data:');
    console.log('Mood Description:', moodDescription);
    console.log('Selected Themes:', selectedThemes);
    console.log('Selected Music Types:', selectedMusicTypes);


    // 发送数据到后端
    wx.request({
      url: 'http://localhost:8080/write/', 
      method: 'POST',
      data: {
        moodDescription,
        themes: selectedThemes,
        musicTypes: selectedMusicTypes
      },
      success: (res) => {
        if (res.data.success) {
          wx.showToast({
            title: '创作成功',
            icon: 'success'
          });
          // 处理生成的歌词，例如显示在页面上
          this.setData({ audioInfo: res.data });
          // console.log('生成的歌词:', res.data.lyrics);
        } else {
          wx.showToast({
            title: '创作失败，请重试',
            icon: 'none'
          });
        }
      },
      fail() {
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
      }
    });
    
  },
  playAudio(e) {
    const audio = e.currentTarget.dataset.audio;
    wx.showModal({
      title: audio.title,
      content: '点击播放按钮开始播放音乐',
      showCancel: false,
      confirmText: '播放',
      success: (result) => {
        if (result.confirm) {
          this.showAudioPlayer(audio);
        }
      }
    });
  },

  showAudioPlayer(audio) {
    wx.navigateTo({
      url: `/pages/audioPlayer/audioPlayer?audioUrl=${encodeURIComponent(audio.audio_url)}&imageUrl=${encodeURIComponent(audio.image_url)}&title=${encodeURIComponent(audio.title)}&tags=${encodeURIComponent('tags')}&lyrics=${encodeURIComponent(audio.lyric)}`
    });
  }
});
