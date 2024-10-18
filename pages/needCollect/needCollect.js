Page({
  options: {
    addGlobalClass: true
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const res = wx.getSystemInfoSync()
      this.setData({
        ratio: 750 / res.windowWidth
      })

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  data: {
    occasionTags: [{
        text: '#生日',
        selected: true
      },
      {
        text: '#聚会',
        selected: false
      },
      {
        text: '#商务',
        selected: false
      },
      {
        text: '#周年',
        selected: false
      },
      {
        text: '#节日',
        selected: false
      },
      {
        text: '自定义',
        selected: false
      }
    ],
    recipientTags: [{
        text: '#情侣',
        selected: true
      },
      {
        text: '#家人',
        selected: false
      },
      {
        text: '#领导',
        selected: false
      },
      {
        text: '#老师',
        selected: false
      },
      {
        text: '#同事',
        selected: false
      },
      {
        text: '自定义',
        selected: false
      }
    ],
    budget: 1000,
    startPos: 0, // 起始按钮位置
    endPos: 0, // 结束按钮位置
    pdLeft: 0, // 左边滑块的位置
    pdRight: 0, // 右边滑块的位置
    ratio: 2,
    startX1: 0, //计算左滑块初始位置离屏幕左边的距离
    startX2: 0, //计算右滑块初始位置离屏幕右边的距离
    min: 0,
    max: 2000,
  },

  toggleTagSelection: function (e) {
    const {
      type,
      index
    } = e.currentTarget.dataset;
    const tags = this.data[type];

    tags.forEach((tag, i) => {
      if (i === index) {
        tag.selected = !tag.selected;
      }
    });

    this.setData({
      [type]: tags
    });
  },

  onSliderChange: function (e) {
    this.setData({
      budget: e.detail.value
    });
  },

  onLoad: function () {
    // 页面加载时执行的操作  
    this.setData({
      startPos: 0,
      endPos: 200 // 根据滑动轨道的长度调整
    });
  },

  onStartTouch: function (event) {
    this.startX = event.touches[0].clientX; // 获取起始触点的 X 坐标
  },

  onStartMove: function (event) {
    const moveX = event.touches[0].clientX;
    const deltaX = moveX - this.startX;
    let newStartPos = this.data.startPos + deltaX;

    // 限制范围，确保在滑动轨道内
    if (newStartPos < 0) {
      newStartPos = 0;
    } else if (newStartPos > this.data.endPos - 20) { // 20 是按钮的宽度
      newStartPos = this.data.endPos - 20;
    }

    this.setData({
      startPos: newStartPos
    });
    this.startX = moveX; // 更新起始坐标
  },

  onEndTouchStart: function (event) {
    this.endStartX = event.touches[0].clientX; // 获取结束按钮的起始触点 X 坐标
  },

  onEndTouchMove: function (event) {
    const moveX = event.touches[0].clientX;
    const deltaX = moveX - this.endStartX;
    let newEndPos = this.data.endPos + deltaX;

    // 限制范围，确保在滑动轨道内
    if (newEndPos > this.data.sliderWidth) {
      newEndPos = this.data.sliderWidth;
    } else if (newEndPos < this.data.startPos + 20) { // 20 是按钮的宽度
      newEndPos = this.data.startPos + 20;
    }

    this.setData({
      endPos: newEndPos
    });
    this.endStartX = moveX; // 更新结束坐标
  },

  onEndTouch: function () {
    // 结束拖动逻辑
  },

  navigateToLoadingGift() {
    wx.navigateTo({
      url: '/pages/loadingGift/loadingGift',
    })
  },

  touchStart1(e) {
    // console.log("e0", e.touches[0].clientX);
    if (!this.data.startX1) {
      this.setData({
        startX1: e.touches[0].clientX
      })

    }
  },
  touchMove1(e) {
    // console.log("eeee1", e.touches[0].clientX);
    let x = (e.touches[0].clientX - this.data.startX1) * this.data.ratio
    let v = x >= 0 ? x : 0 //不能超过父容器最左边
    // 540 
    if (v + this.data.pdRight >= 540 - 27) { //右边的滑块越过左边时
      v = 540 - 27 - this.data.pdRight
    }
    this.setData({
      pdLeft: v,
      min: v === 540 ? 1900 : Math.round(v * 3.703703703703704)
    })
    // this.triggerEvent('submit', {
    //   min: Math.round(v / 5),
    // })
    // console.log("this.data.pdLeft", this.data.pdLeft);
  },
  touchEnd1() {},
  touchStart2(e) {
    // console.log("e0", e.touches[0].clientX);
    if (!this.data.startX2) {
      this.setData({
        startX2: e.touches[0].clientX
      })

    }
  },
  touchMove2(e) {
    // console.log("eeee2", e.touches[0].clientX);
    let x = (this.data.startX2 - e.touches[0].clientX) * this.data.ratio
    let v = x >= 0 ? x : 0 //不能超过父容器最右边
    // delta = 27
    if (v + this.data.pdLeft >= 513) { //右边的滑块越过左边时
      v = 513 - this.data.pdLeft
    }
    this.setData({
      pdRight: v,
      max: v === 540 ? 100 : Math.round((540 - v) * 3.703703703703704)
    })
    // this.triggerEvent('submit', {
    //   max: Math.round((600 - v) / 5),
    // })
    // console.log("this.data.pdRight", this.data.pdRight);
  },
  touchEnd2() {},
  reset() {
    this.setData({
      pdLeft: 0,
      pdRight: 0,
      startX1: 0,
      startX2: 0,
    })
    this.triggerEvent('submit', {
      min: 0,
      max: 120
    })
  },
});