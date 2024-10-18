const app = getApp();
Page({
  data: {
    step: 1,
    products: [{
        name: '好利来蛋糕兑换券',
        price: 399,
        video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Recommended for You-Cake Selection/cake7.mp4',
        isAddedToCart: false,
      },
      {
        name: '优衣库礼金卡',
        price: 399,
        video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Recommended for You-Happy Birthday/happy8.mp4',
        isAddedToCart: false,
      },
      {
        name: '星巴克饮品兑换券',
        price: 299,
        video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Recommended for You-Happy Birthday/happy6.mp4',
        isAddedToCart: false,
      }
    ],
    creativityMusic1: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Music Album/music10.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Music Album/music11.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Music Album/music6.mp4',
    ],
    creativityMusic2: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Music Album/music12.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Music Album/music5.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Music Album/music7.mp4',
    ],
    creativityPhoto1: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Disney/Disney1.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creative-Cartoon/watermark-3.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creative-Cartoon/watermark-5.mp4'
    ],
    creativityPhoto2: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Disney/Disney2.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Disney/Disney3.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/creativity/Creativity-Disney/Disney4.mp4'
    ],
    cart: [],
    totalQuantity: 0,
    totalPrice: 0.00
  },

  // Navigate to next step
  nextStep() {
    this.setData({
      step: 2
    });
    console.log("current step is:", step);
  },
  // 添加商品到购物车
  deleteFromCart(e) {
    // 获取点击的商品的索引
    const index = e.currentTarget.dataset.index;
    // 获取点击的商品信息
    const selectedProduct = this.data.products[index];

    // 检查购物车中是否已经存在该商品
    // let cartItem = this.data.cart.find(item => item.name === selectedProduct.name);
    let cartItem = app.globalData.globalCart.find(item => item.name === selectedProduct.name);

    if (cartItem && cartItem.quantity >= 1) {
      // 如果商品已经在购物车中，数量加1
      cartItem.quantity -= 1;
    }
    // 更新商品的 isAddedToCart 属性
    let updatedProducts = this.data.products;
    updatedProducts[index].isAddedToCart = true;
    // 更新购物车和产品列表
    this.setData({
      cart: app.globalData.globalCart,
      products: updatedProducts // 更新产品数据
    });
    console.log("Cart quantity : ", this.data.cart[index].quantity)
    // 计算总价和总数量
    this.calculateTotal();
  },
  addToCart(e) {
    // 获取点击的商品的索引
    const index = e.currentTarget.dataset.index;
    // 获取点击的商品信息
    const selectedProduct = this.data.products[index];

    // 检查购物车中是否已经存在该商品
    // let cartItem = this.data.cart.find(item => item.name === selectedProduct.name);
    let cartItem = app.globalData.globalCart.find(item => item.name === selectedProduct.name);

    if (cartItem) {
      // 如果商品已经在购物车中，数量加1
      cartItem.quantity += 1;
    } else {
      // 如果商品不在购物车中，添加该商品，并初始化数量为1
      app.globalData.globalCart.push({
        name: selectedProduct.name,
        video: selectedProduct.video,
        price: selectedProduct.price,
        quantity: 1
      });
    }
    // 更新商品的 isAddedToCart 属性
    let updatedProducts = this.data.products;
    updatedProducts[index].isAddedToCart = true;
    // 更新购物车和产品列表
    this.setData({
      cart: app.globalData.globalCart,
      products: updatedProducts // 更新产品数据
    });
    console.log("Cart quantity : ", this.data.cart[index].quantity)
    // 计算总价和总数量
    this.calculateTotal();
  },

  // 计算购物车总价和总数量
  calculateTotal() {
    let totalPrice = 0;
    let totalQuantity = 0;

    // 遍历购物车，计算总价和总数量
    this.data.cart.forEach(item => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });

    // 更新totalPrice和totalQuantity
    this.setData({
      totalPrice: totalPrice.toFixed(2), // 保留两位小数
      totalQuantity: totalQuantity
    });
  },

  // Navigate to the next page for creating the card
  goToCreate() {
    wx.navigateTo({
      url: '/pages/loadingGift/loadingGift'
    });
  },

  showMoreGifts() {
    console.log("show more gifts");
    wx.switchTab({
      url: `/pages/customizeGift/customizeGift`
    });
  },

  switchStep(e) {
    console.log("step switched!")
    const step = e.currentTarget.dataset.step;
    if (step == 1) {
      this.setData({
        step: 2
      });
      console.log("current step switched to", step)
    } else if (step == 2) {
      this.setData({
        step: 1
      });
    }
    // console.log("current step switched to", step)
  },
  navigateToList() {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  navigateToWrite() {
    wx.navigateTo({
      url: `/pages/write/write`
    });
  }
});