const app = getApp();
Page({
  data: {
    moodDescription: '',
    selectedThemes: [],
    selectedMusicTypes: [],
    themes: [{
        title: '#Birthday',
        selected: false
      },
      {
        title: '#Family',
        selected: false
      },
      {
        title: '#Love',
        selected: false
      },
      {
        title: '#Happy',
        selected: false
      },
      {
        title: '#Dance',
        selected: false
      }
    ],
    musicTypes: [{
        title: '#Pop',
        selected: false
      },
      {
        title: '#Rock',
        selected: false
      },
      {
        title: '#R&B',
        selected: false
      },
      {
        title: '#RAP',
        selected: false
      },
      {
        title: '#Jazz',
        selected: false
      },
      {
        title: '#male-voice',
        selected: false
      },
      {
        title: '#female-voice',
        selected: false
      },
      {
        title: '#p-funk cloud rap',
        selected: false
      }
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

  inputMood(e) {
    this.setData({
      moodDescription: e.detail.value
    });
  },

  toggleSelection(type, item) {
    let selectedArray = type === 'theme' ? [...this.data.themes] : [...this.data.musicTypes];

    const index = selectedArray.findIndex(x => x.title === item.title);
    if (index !== -1) {
      selectedArray[index].selected = !selectedArray[index].selected;
    }

    this.setData({
      [type === 'theme' ? 'themes' : 'musicTypes']: selectedArray
    });
  },

  toggleThemeSelection(e) {
    const selectedTheme = e.currentTarget.dataset.item;
    this.toggleSelection('theme', selectedTheme);

    console.log('Current selected themes:', this.data.themes);
  },

  toggleMusicTypeSelection(e) {
    const selectedMusicType = e.currentTarget.dataset.item;
    this.toggleSelection('musicType', selectedMusicType);

    console.log('Current selected music types:', this.data.musicTypes);
  },

  create() {
    const {
      moodDescription,
      themes,
      musicTypes
    } = this.data;
    const selectedThemes = themes.filter(theme => theme.selected).map(theme => theme.title);
    const selectedMusicTypes = musicTypes.filter(type => type.selected).map(type => type.title);

    if (!moodDescription || selectedThemes.length === 0 || selectedMusicTypes.length === 0) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    console.log('Creating song with the following data:');
    console.log('Mood Description:', moodDescription);
    console.log('Selected Themes:', selectedThemes);
    console.log('Selected Music Types:', selectedMusicTypes);

    wx.request({
      url: 'https://inc.aipowernft.com/echospace/write/',
      // url: 'http://127.0.0.1:8000/write/',
      method: 'POST',
      header: {
        'content-type': 'application/json', // 设置请求头类型为 JSON
      },
      data: {
        moodDescription, // 使用你的变量
        themes: selectedThemes,
        musicTypes: selectedMusicTypes,
        modelTypes: 1,
      },
      success: (res) => {
        console.log("res:", res)
        console.log(JSON.parse(res.data[0]));
        // console.log(res.data[0].success);
        const tmp = JSON.parse(res.data[0])
        if (tmp.success) {
          const jobID = tmp.jobID;
          console.log(`jobID: ${jobID}`);
          wx.showToast({
            title: '任务创建成功',
            icon: 'success'
          });
          wx.navigateTo({
            url: '/pages/loading/loading',
          });
          this.pollJobStatus(jobID);
        } else {
          wx.showToast({
            title: '任务创建失败，请重试',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
      }
    });

  },
  // handleTap(event) {
  //   const jobID = '101cda16-0161-4901-b7ec-65114c94c6f9';
  //   this.pollJobStatus(jobID); // 传递正确的 jobID
  // },
  pollJobStatus(jobID) {
    const intervalID = setInterval(() => {
        console.log(`jobID: ${jobID}`);
        wx.request({
          // url: `http://127.0.0.1:8080/job-status/${jobID}/`,
          url: `https://inc.aipowernft.com/echospace/job-status/${jobID}/`, // 更新为目标服务的完整URL
          method: 'GET',
          header: {
            'Content-Type': ' '
          },
          success: (res) => {
            console.log("res", res);
            let tmp = JSON.parse(res.data[0])
            if (tmp.success && tmp.jobStatus === 'done') {
              clearInterval(intervalID); // 停止轮询
              const responseData = JSON.parse(tmp.responseData); // 解析返回的JSON数据
              const item = responseData.audio;

              const audio = responseData.audio;
              const blessing = responseData.blessing;
              const title = responseData.title;
              const lyric = responseData.lyrics;

              app.globalData.audioInfo.audio = audio;
              app.globalData.audioInfo.blessing = blessing;
              app.globalData.audioInfo.title = title;
              app.globalData.audioInfo.lyric = lyric;

              if (!item) {
                wx.showToast({
                  title: '生成失败，请重试！',
                  icon: 'none',
                  duration: 2000,
                  complete: () => {
                    wx.navigateBack({
                      delta: 1
                    });
                  }
                });
                return;
              }
              wx.navigateTo({
                url: `/pages/onlyGifts/onlyGifts`,
              });
              // wx.navigateTo({
              //   url: '/pages/musicPlay/musicPlay?audioInfo=' + encodeURIComponent(JSON.stringify([item])),
              // });
              // this.updateAudioInfo(item); 
            } else {
              console.log('任务未完成，继续轮询...');
            }
          },
          fail: (err) => {
            console.error('Failed to query job status:', err);
          }
        });
      },
      5000);
  },

  async updateAudioInfo(item) {
    console.log("updateAudioInfo ", item);
    const downloadRes = await this.downloadFile(item);
    const uploadRes = await this.uploadFile(downloadRes.tempFilePath);
    const tempFileURL = await this.getTempFileURL(uploadRes.fileID);

    item = tempFileURL;
    console.log('Updated audio info:', item);

    // Store updated audio info in local storage
    wx.setStorage({
      key: 'updatedAudioInfo',
      data: item,
      success: () => {
        console.log('Audio info stored successfully.');
      },
      fail: (err) => {
        console.error('Failed to store audio info:', err);
      }
    });
    // try {
    //   const downloadRes = await this.downloadFile(item);
    //   const uploadRes = await this.uploadFile(downloadRes.tempFilePath);
    //   const tempFileURL = await this.getTempFileURL(uploadRes.fileID);

    //   item = tempFileURL;
    //   console.log('Updated audio info:', item);

    //   // Store updated audio info in local storage
    //   wx.setStorage({
    //     key: 'updatedAudioInfo',
    //     data: item,
    //     success: () => {
    //       console.log('Audio info stored successfully.');
    //     },
    //     fail: (err) => {
    //       console.error('Failed to store audio info:', err);
    //     }
    //   });
    // } catch (err) {
    //   console.error('Failed to handle audio file:', err);
    //   wx.showToast({
    //     title: '处理音频文件失败，请重试',
    //     icon: 'none'
    //   });
    // }
  },

  downloadFile(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success: res => {
          if (res.statusCode === 200) {
            resolve(res);
          } else {
            reject(new Error('Failed to download file, status code: ' + res.statusCode));
          }
        },
        fail: err => {
          reject(err);
        }
      });
    });
  },

  uploadFile(filePath) {
    const cloudPath = `audios/${Date.now()}_${Math.floor(Math.random() * 1000)}.mp3`;
    return new Promise((resolve, reject) => {
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err);
        }
      });
    });
  },

  getTempFileURL(fileID) {
    return new Promise((resolve, reject) => {
      wx.cloud.getTempFileURL({
        fileList: [fileID],
        success: res => {
          if (res.fileList && res.fileList[0].tempFileURL) {
            resolve(res.fileList[0].tempFileURL);
          } else {
            reject(new Error('Failed to get temp file URL'));
          }
        },
        fail: err => {
          reject(err);
        }
      });
    });
  },


  navigateToChat() {
    wx.navigateTo({
      url: '/pages/chat/chat'
    });
  },

  mockCreate() {
    const {
      moodDescription,
      themes,
      musicTypes
    } = this.data;
    const selectedThemes = themes.filter(theme => theme.selected).map(theme => theme.title);
    const selectedMusicTypes = musicTypes.filter(type => type.selected).map(type => type.title);

    if (!moodDescription || selectedThemes.length === 0 || selectedMusicTypes.length === 0) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }
    const audioInfo = this.data.audioInfo;
    wx.navigateTo({
      url: `/pages/onlyGifts/onlyGifts?audioInfo=${encodeURIComponent(JSON.stringify(audioInfo))}`
    });
  }
});