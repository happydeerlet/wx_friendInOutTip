var tipList = [];
var i = 0;
var tempList = []; // 缓冲数据

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

Component({
  properties: {

  },
  data: {
    tipData: [],
  },
  methods: {
    clear: function () {
      tipList = [];
      tempList = [];
    },
    addTip: function (data) {
      if (tipList.length == 0) {
        tipList.push(new tip(data.content, data.icon));
        this.setData({
          tipData: tipList,
        })
      } else {
        tempList.push(new tip(data.content, data.icon));
        if (tempList.length <= 1) {
          this._add();
        }
      }

    },
    _tipAniStart: function (e) {},

    _tipAniIteration: function (e) {
      console.log("iteration");
    },
    _tipAniEnd: function (e) {
      console.log("end");
      for (let i = 0; i < tipList.length; i++) {
        if (tipList[i].id == e.currentTarget.dataset.id) {
          tipList.splice(i, 1);
          this.setData({
            tipData: tipList
          });
        }
      }
    },

    _add: function () {
      if (tempList.length > 0) {
        let _self = this;
        let lastItem = tipList[tipList.length - 1];
        console.log(tempList);
        const query = wx.createSelectorQuery().in(this);
        query.select('#tip_' + lastItem.id).boundingClientRect();
        console.log(query)
        query.selectViewport().scrollOffset();
        query.exec(function (res) {
          console.log(res[0])
          // console.log(res[0].right)
          // console.log(wx.getSystemInfoSync().windowWidth - 20);
          // console.log(res[0].right < wx.getSystemInfoSync().windowWidth - 20);

          if (res[0].left < wx.getSystemInfoSync().windowWidth - res[0].width - 20) {
            tipList.push(tempList[0]);
            tempList.splice(0, 1);
            _self.setData({
              tipData: tipList,
            })

            if (tempList.length > 0) {
              _self._add();
            }

          } else {
            _self._add();
          }
        });
      }
    }
  }
})
