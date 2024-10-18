Page({
  data: {
    moodDescription: '',
    showPopup: false,
    showSection: false,
    products: {
      '美食饮品🍲': [{
          name: '星礼卡',
          price: 300.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/foodStarbucks.mp4',
          quantity: 0
        },
        {
          name: 'Pepsi',
          price: 39.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/foodPepsi2.mp4',
          quantity: 0
        },
        {
          name: 'Burger King',
          price: 58.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/foodBurgerKing.mp4',
          quantity: 0
        },
        {
          name: '麦当劳',
          price: 39.00,
          video: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundVideo/foodMcDonald.mp4',
          quantity: 0
        }
      ],
      '生活商超❤️‍🔥': [{
          name: 'Starbucks',
          price: 300.00,
          image: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/starbucks.png',
          quantity: 0
        },
        {
          name: 'iPad Pro',
          price: 8999.00,
          image: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/ipad pro.jpg',
          quantity: 0
        },
        {
          name: 'Stanley水杯',
          price: 288.00,
          image: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/stanley.jpg',
          quantity: 0
        },
        {
          name: 'Lamer精华',
          price: 3999.00,
          image: 'cloud://cloud1-5gmggv5l8f2ead23.636c-cloud1-5gmggv5l8f2ead23-1326484866/backgroundImage/lamer.jpg',
          quantity: 0
        }
      ],
      '美妆护肤💄': [{
          name: 'High Tea',
          price: 1099.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/makeupBurberry.mp4',
          quantity: 0
        },
        {
          name: 'Pandora',
          price: 2999.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/makeupPandora.mp4',
          quantity: 0
        },
        {
          name: 'Perfume',
          price: 598.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/makeupPerfume.mp4',
          quantity: 0
        },
        {
          name: 'YSLLipstick',
          price: 399.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/makeupYSL.mp4',
          quantity: 0
        },
        {
          name: 'Valentino',
          price: 999.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/makeupValentino.mp4',
          quantity: 0
        },
        {
          name: 'Lipstick',
          price: 399.00,
          video: 'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/makeupStick.mp4',
          quantity: 0
        }
      ],
    },
    starbucksVideos1: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/bagel.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/bagel2.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/cafeIce.mp4'
    ],

    starbucksVideos2: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/badminton.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/tennis.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/mochaIce.mp4'
    ],
    cosFlower1: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Beauty and Skin Care-Hua Zhizhi/hua1.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Beauty and Skin Care-Hua Zhizhi/hua2.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Beauty and Skin Care-Hua Zhizhi/hua3.mp4'
    ],
    cosFlower2: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Beauty and Skin Care-Hua Zhizhi/hua4.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Beauty and Skin Care-Hua Zhizhi/hua5.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/mall/Mall-Beauty and Skin Care-Hua Zhizhi/hua6.mp4'
    ],
    music1: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/gallery1.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/gallery2.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/gallery3.mp4',
    ],
    music2: [
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/gallery4.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/gallery5.mp4',
      'cloud://echospace-mateials-9d8r8fc399ddf.6563-echospace-mateials-9d8r8fc399ddf-1326484866/echo_assets/echo_assets/gallery1.mp4',
    ],
    tags: ['生活商超❤️‍🔥', '美食饮品🍲', '美妆护肤💄', '充值缴费', '影音娱乐🎞️', '知识阅读📚', '购物权益🛍️', '机酒出行🛫', '生活服务', '运动健康🏅', '结婚纪念', '商务送礼', '新婚礼物', '圣诞节🎄'],
    showMoreTags: false,
    moreTags: [],
    selectedTag: '', // 保存当前选中的tag
    currentProducts: [], // 当前展示的产品列表
    currentTag: '', // 保存当前展示的tag，用于区分展示视频还是图片
    cart: [],
    totalQuantity: 0,
    totalPrice: 0.00
  },
  showPopup() {
    const currentProducts = this.data.products[this.data.currentTag];
    this.setData({
      showPopup: true,
      currentProducts: currentProducts
    });
    console.log('showPopup:', this.data.showPopup);
  },

  // 关闭弹窗
  closePopup() {
    this.setData({
      showPopup: false
    });
  },

  onLoad() {
    // 默认显示第一个tag的产品
    this.setData({
      currentProducts: this.data.products[this.data.tags[2]],
      displayProducts: this.data.products[this.data.tags[1]].slice(0, 3),
      displayedCosmetics: this.data.products[this.data.tags[2]].slice(0, 3),
      displayedBrands: this.data.products[this.data.tags[1]].slice(0, 3),
      currentTag: this.data.tags[2],
      starbucksVideos1: this.data.starbucksVideos1,
      starbucksVideos2: this.data.starbucksVideos2,
    });
    this.calculateTotalPrice();
  },
  toggleSection: function () {
    this.setData({
      showSection: !this.data.showSection,
    });
    console.log('showSection: ', this.data.showSection);
  },
  toggleSelection(e) {
    const selectedTag = e.currentTarget.dataset.tag;
    if (!selectedTag) {
      console.error('Error: selectedTag is empty or undefined.');
      return;
    }

    if (this.data.selectedTag === selectedTag) {
      // 如果当前点击的tag已经是选中状态，则取消选中
      this.setData({
        selectedTag: '',
        currentProducts: [], // 清空展示的产品列表
        currentTag: '' // 清空当前展示的tag
      });
    } else {
      // 更新选中的tag，并更新展示的产品列表和当前展示的tag
      this.setData({
        selectedTag,
        currentProducts: this.data.products[selectedTag],
        displayProducts: this.data.products[selectedTag].slice(0, 3),
        currentTag: selectedTag // 标记当前展示的tag
      });

      console.log('Current Tag:', selectedTag); // 输出当前选中的标签信息
    }
  },

  inputMood(e) {
    this.setData({
      moodDescription: e.detail.value
    });
  },

  toggleMoreTags() {
    this.setData({
      showMoreTags: !this.data.showMoreTags,
      tags: this.data.showMoreTags ? ['生活商超❤️‍🔥', '美食饮品🍲', '美妆护肤💄'] : this.data.tags.concat(this.data.moreTags)
    });
  },

  navigateToChat() {
    wx.navigateTo({
      url: '/pages/chat/chat'
    });
  },

  navigateToOnlyGifts() {
    const cartData = JSON.stringify(this.data.cart);
    const totalPrice = this.data.totalPrice;
    wx.navigateTo({
      url: `/pages/onlyGifts/onlyGifts?cartData=${encodeURIComponent(cartData)}&totalPrice=${encodeURIComponent(totalPrice)}`
    });
  },
  navigatToYuchen1() {
    wx.navigateTo({
      url: '/pages/yuchen1/yuchen1'
    });
  },
  navigateToYuchen2() {
    const cartData = JSON.stringify(this.data.cart);
    const totalPrice = this.data.totalPrice;
    wx.navigateTo({
      url: `/pages/yuchen2/yuchen2?cartData=${encodeURIComponent(cartData)}&totalPrice=${encodeURIComponent(totalPrice)}`
    });
  },


  increaseQuantity: function (event) {
    const productName = event.currentTarget.dataset.name;
    this.updateProductQuantity(productName, 1);
  },

  decreaseQuantity: function (event) {
    const productName = event.currentTarget.dataset.name;
    this.updateProductQuantity(productName, -1);
  },

  updateProductQuantity: function (productName, change) {
    const arraysToUpdate = ['displayProducts', 'displayedCosmetics', 'displayedBrands'];
    let updatedCart = [...this.data.cart];

    arraysToUpdate.forEach(arrayName => {
      const updatedArray = this.data[arrayName].map(product => {
        if (product.name === productName) {
          product.quantity += change;
          if (product.quantity < 0) product.quantity = 0;

          const cartIndex = updatedCart.findIndex(cartItem => cartItem.name === productName);
          if (cartIndex > -1) {
            if (product.quantity === 0) {
              updatedCart.splice(cartIndex, 1); // 从购物车中移除数量为0的商品
            } else {
              updatedCart[cartIndex].quantity = product.quantity; // 更新购物车中的商品数量
            }
          } else if (product.quantity > 0) {
            updatedCart.push({
              ...product
            }); // 添加新商品到购物车
          }
        }
        return product;
      });
      this.setData({
        [arrayName]: updatedArray
      });
    });

    this.setData({
      cart: updatedCart
    });
    this.calculateTotalPrice();
    // 输出当前购物车内容
    console.log(this.data.cart);
  },

  calculateTotalPrice: function () {
    let totalPrice = 0;
    const arraysToSum = ['displayProducts', 'displayedCosmetics', 'displayedBrands'];

    arraysToSum.forEach(arrayName => {
      this.data[arrayName].forEach(product => {
        totalPrice += product.price * product.quantity;
      });
    });

    this.setData({
      totalPrice: totalPrice.toFixed(2)
    });
  },

  suggest() {
    this.setData({
      displayedBrands: this.data.products[this.data.tags[2]].slice(3, 6),
    });
    // 输出以验证当前的产品和标签是否已更新
    console.log('Suggested Products:', this.data.currentProducts);
    console.log('Current Tag:', this.data.currentTag);
  }
});