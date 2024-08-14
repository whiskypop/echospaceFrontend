const cloud = require('wx-server-sdk');

cloud.init();

exports.main = async (event, context) => {
  try {
    const fileID = event.fileID;
    const result = await cloud.getTempFileURL({
      fileList: [fileID]
    });
    return result.fileList[0].tempFileURL;
  } catch (err) {
    console.log('Error:', err);
    return err;
  }
};
