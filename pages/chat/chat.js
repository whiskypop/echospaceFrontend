var fs = wx.getFileSystemManager()
// 创建 Azure 存储服务的连接字符串
// const connectionString = 'DefaultEndpointsProtocol=https;AccountName=comicstorage;AccountKey=nronbCYvwQevIwiU5J0ghU6oEpGPK3HF2CpE60y3oomTUNKwJA62J7xml1tBW7TcRAgkVOIQP9at+AStZGRwUQ==;EndpointSuffix=core.windows.net'

// 创建 Blob 服务
// const blobService = azure.createBlobService(connectionString);
// 获取全局APP
const app = getApp();
// 上传图片到 Azure Blob 存储
function uploadImageToBlobStorage(filePath) {
  const containerName = 'images'; // 存储容器名称，需要预先创建
  const blobName = 'image_' + Date.now() + '.jpg'; // 为上传的图片生成唯一的 Blob 名称

  // 读取图片文件内容
  const content = fs.readFileSync(filePath);
  console.log("content:", content);

  // 上传图片到 Blob 存储
  blobService.createBlockBlobFromText(containerName, blobName, content, (error, result, response) => {
      if (!error) {
          console.log('图片上传成功');
          // 返回上传的图片在 Blob 存储中的 URL
          const imageUrl = blobService.getUrl(containerName, blobName);
          console.log('图片URL:', imageUrl);
      } else {
          console.error('图片上传失败:', error);
      }
  });
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    roomId: 1,
    content: '',
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  submit() {
    const that = this;
    const cht = app.globalData.cht;
    const content = that.data.content;

    // 添加用户输入到聊天列表
    cht.data.chatList.push({
      "type": "man",
      "avatarUrl": "image/user.jpeg",
      "content": that.data.content,
    });
    cht.setData({
      chatList: cht.data.chatList
    });

    // 清空输入框
    that.setData({
      content: ''
    });

    // 发送请求到后端
    wx.request({
      url: 'http://localhost:8080/chat_itf/',
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'X-WX-SERVICE': 'django-q86u'
      },
      data: {
        prompt: content
      },
      success(res) {
        // 添加后端返回的响应到聊天列表
        const robContent = res.data;
        cht.data.chatList.push({
          "type": "rob",
          "content": robContent,
          "avatarUrl": "image/openai-avatar.png",
        });
        cht.setData({
          chatList: cht.data.chatList,
          scrollId: `msg-${cht.data.chatList.length - 1}`,
        });
      },
      fail(err) {
        console.error('Failed to send request:', err);
      }
    });
  },
  // 选择图片方法
  chooseImage() {
    var that = this;
    // 调用微信选择图片 API
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: async function (res) {
        try {
          const tempFilePaths = res.tempFiles.map(file => file.tempFilePath);
          const cloudPath = 'images/' + Date.now() + '.png'; // 云存储中的文件路径，可以自定义
          // 上传图片到云存储
          const uploadResult = await wx.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: tempFilePaths[0]
          });
          console.log('上传成功，文件 ID：', uploadResult.fileID);
          // 将文件ID发送到后端
          wx.request({
            url: 'http://localhost:8080/upload_image/', // Django的接口地址
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            data: {
              fileID: uploadResult.fileID
            },
            success(res) {
              console.log('文件ID发送成功:', res.data);
            },
            fail(err) {
              console.error('文件ID发送失败:', err);
            }
          });
        } catch (error) {
          console.error('上传失败：', error);
        }
      },
      fail: function (res) {
        console.error('选择图片失败:', res);
      }
    });
  }
})
