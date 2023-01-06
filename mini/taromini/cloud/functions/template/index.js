// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const { type, data } = event;
    let res = undefined;
    switch (type) {
      case 'add':
        res = await db.collection('templatelist').add({ data });
    }
    return res;
  } catch (e) {
    return {
      code: -1,
      msg: '操作失败，请重试！',
    };
  }
};
