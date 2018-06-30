'use strict';

let JumpCenter = function(){
  LocalContractStorage.defineMapProperty(this, "jumpScoreMap", {
    parse: function (text) {
      return new JumpContent(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });

  LocalContractStorage.defineMapProperty(this, "jumpScoreArrayMap");
  LocalContractStorage.defineProperty(this, "playerNum");

}

JumpCenter.prototype = {
  init(){
    this.playerNum = 0;
    this._admin = "n1JPeX8mkSy2D2RycVEsB1JRL3b5aMMdY56";
  },

  upload (score){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    var bk_height = new BigNumber(Blockchain.block.height);

    if(!score){
      console.log("must got a score");
      return
    }

    var mapData = this.jumpScoreMap.get(from);    
    if (mapData) {     
      if(mapData.score > score){
        score = mapData.score;
      }
    }else{
      this.jumpScoreArrayMap.set(this.playerNum, from);
      this.playerNum++;
    }

    var data = new JumpContent();
    data.score = score;
    // data.totalScore = totalScore;
    data.nameStr = from;
    this.jumpScoreMap.set(from, data);    

    return this.playerNum
  },

  getNowJumpMeter (){
    var from = Blockchain.transaction.from;
    return this.jumpScoreMap.get(from);
  },

  getRankList (){
    let result = [];    
    for (var i = 0 ;i < this.playerNum; i++) {
      let key = this.jumpScoreArrayMap.get(i);
      let parData = this.jumpScoreMap.get(key);
      result.push(parData);
    }
    return result;
  },
};

var JumpContent = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.score = new BigNumber(o.score);    
    this.nameStr = o.nameStr;
  } else {
    this.score = new BigNumber(0);    
    this.nameStr = "";
  }
};

JumpContent.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

module.exports = JumpCenter;