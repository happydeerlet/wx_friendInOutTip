//index.js
var tipList = [];
var i = 0;
var isLast = true;
var tempList = [];

// 弹幕参数
class tip {
  constructor(text, icon, top = 80, time = 8) {
    this.text = text;
    this.icon = icon;
    this.top = top;
    this.time = time;
    this.display = true;
    this.id = i++;
  }
}

Page({
  data: {
    tipData: [],
  },
  onLoad: function () {},
  onReady: function () {
    this.gameTips = this.selectComponent("#gameTips");
  },

  onHide() {
    this.gameTips.clear();
  },
  onUnload() {
    this.gameTips.clear();
  },

  addTip: function () {
    let url = "http://thirdwx.qlogo.cn/mmopen/vi_32/TuLXYR0orLpzicWibNH9QicyU1Bicmw757pY5kSH4lptfkSkYwjzfJiaOtWEVIebkybN5mibumoExJtBU3QBzewOwXKQ/132"

    let data = {
      icon: url,
      content: "this is test"
    }
    this.gameTips.addTip(data);

  },
  
})