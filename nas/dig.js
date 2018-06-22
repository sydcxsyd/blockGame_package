'use strict';

let DigCenter = function(){
  LocalContractStorage.defineMapProperty(this, "digScoreMap", {
    parse: function (text) {
      return new DigContent(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });

  LocalContractStorage.defineMapProperty(this, "digScoreArrayMap");
  LocalContractStorage.defineProperty(this, "playerNum");

}

DigCenter.prototype = {
  init(){
    this.playerNum = 0;
  },

  upload (score){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    var bk_height = new BigNumber(Blockchain.block.height);

    if(!score){
      console.log("must got a score");
      return
    }

    var mapData = this.digScoreMap.get(from);
    let totalScore = score;
    if (mapData) {
      mapData = totalScore.plus(mapData.totalScore);
      if(mapData.score > score){
        score = mapData.score;
      }
    }else{
      this.digScoreArrayMap.set(this.playerNum, from);
      this.playerNum++;
    }

    var data = new DigContent();
    data.score = score;
    data.totalScore = totalScore;
    data.nameStr = from;
    this.digScoreMap.set(from, data);    

    return this.playerNum
  },

  getNowDigMeter (){
    var from = Blockchain.transaction.from;
    return this.digScoreMap[from]
  },

  getRankList (){
    let result = [];    
    for (var i = 0 ;i < this.playerNum; i++) {
      let key = this.digScoreArrayMap.get(i);
      let parData = this.digScoreMap.get(key);
      result.push(parData);
    }
    return result;
  },
};

var DigContent = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.score = new BigNumber(o.score);
    this.totalScore = new BigNumber(o.totalScore);
    this.nameStr = o.nameStr;
  } else {
    this.score = new BigNumber(0);
    this.totalScore = new BigNumber(0);
    this.nameStr = "";
  }
};

DigContent.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

module.exports = DigCenter;