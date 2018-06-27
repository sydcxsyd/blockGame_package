'use strict';

let BrickCenter = function(){
  LocalContractStorage.defineMapProperty(this, "brickScoreMap", {
    parse: function (text) {
      return new BrickContent(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });

  LocalContractStorage.defineMapProperty(this, "brickScoreArrayMap");
  LocalContractStorage.defineProperty(this, "playerNum");

}

BrickCenter.prototype = {
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

    var mapData = this.brickScoreMap.get(from);    
    if (mapData) {     
      if(mapData.score > score){
        score = mapData.score;
      }
    }else{
      this.brickScoreArrayMap.set(this.playerNum, from);
      this.playerNum++;
    }

    var data = new BrickContent();
    data.score = score;
    // data.totalScore = totalScore;
    data.nameStr = from;
    this.brickScoreMap.set(from, data);    

    return this.playerNum
  },

  getNowBrickMeter (){
    var from = Blockchain.transaction.from;
    return this.brickScoreMap.get(from);
  },

  getRankList (){
    let result = [];    
    for (var i = 0 ;i < this.playerNum; i++) {
      let key = this.brickScoreArrayMap.get(i);
      let parData = this.brickScoreMap.get(key);
      result.push(parData);
    }
    return result;
  },
};

var BrickContent = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.score = new BigNumber(o.score);    
    this.nameStr = o.nameStr;
  } else {
    this.score = new BigNumber(0);    
    this.nameStr = "";
  }
};

BrickContent.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

module.exports = BrickCenter;