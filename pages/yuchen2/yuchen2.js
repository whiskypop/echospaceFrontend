Page({
    data: {
      cartItems: [], // 用于存储接收到的商品数据
      totalPrice: 0 ,
      tags: ['音乐动效🎼', '游戏动效🎮', '创意视频🎞️', '特殊光效'],
      showMoreTags: false,
      moreTags: [],
      selectedTag: '', // 保存当前选中的tag
      currentProducts: [], // 当前展示的产品列表
      currentTag: '', // 保存当前展示的tag，用于区分展示视频还是图片
      effectItems: [
        'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/mall/mallSuggestBirth/adidas.mp4',
        'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/mall/mallSuggestBirth/adidas.mp4',
        'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/mall/mallSuggestBirth/adidas.mp4',
        'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/mall/mallSuggestBirth/adidas.mp4'
      ],
    },
  
    onLoad(options) {
      // 获取传递的数据并解析
      if (options.cartData) {
        const cartData = decodeURIComponent(options.cartData);
        try {
          const parsedData = JSON.parse(cartData);
          this.setData({
            cartItems: parsedData // 将数据存储到页面的 data 中
          });
        } catch (error) {
          console.error("解析 cartData 失败:", error);
        }
      }
      if (options.totalPrice) {
        this.setData({
          totalPrice: decodeURIComponent(options.totalPrice)
        });
      }
    },
    navigateToOnlyGifts() {
        const cartData = JSON.stringify(this.data.cartItems);
        const totalPrice = this.data.totalPrice;
        wx.navigateTo({
            url: `/pages/onlyGifts/onlyGifts?cartData=${encodeURIComponent(cartData)}&totalPrice=${encodeURIComponent(totalPrice)}`
        });
    },
  });