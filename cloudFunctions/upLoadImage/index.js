// 云函数入口文件
const cloud = require('wx-server-sdk');
const path = require('path');
const fs = require('fs');

cloud.init();

// 云函数入口函数
exports.main = async (event, context) => {
  const fileID = await upLoadImage(event.fileID);
  return fileID;
};

// 上传图片到云存储
async function upLoadImage(fileID) {
  try {
    // 异步读取文件内容
    console.log(fileID);
    const fileData = fs.readFileSync(fileID);
    // 上传文件到云存储
    const result = await cloud.uploadFile({
      cloudPath: 'images/' + path.basename(fileID), // 上传至云端的路径
      fileContent: fileData, // 文件 Buffer，必须是 ArrayBuffer 或者 Buffer
    });
    return result; // 返回上传成功的文件信息对象
  } catch (err) {
    console.error('上传图片失败：', err);
    throw err;
  }
}
