Page({
    data: {
      cartItems: [], // 用于存储接收到的商品数据
      totalPrice: 0 
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