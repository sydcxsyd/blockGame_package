'use strict';

let BirdCenter = function(){
  LocalContractStorage.defineMapProperty(this, "birdScoreMap", {
    parse: function (text) {
      return new BirdContent(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });

  LocalContractStorage.defineMapProperty(this, "birdScoreArrayMap");
  LocalContractStorage.defineProperty(this, "playerNum");

}

BirdCenter.prototype = {
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

    var mapData = this.birdScoreMap.get(from);
    let totalScore = score;
    if (mapData) {
      mapData = totalScore.plus(mapData.totalScore);
      if(mapData.score > score){
        score = mapData.score;
      }
    }else{
      this.birdScoreArrayMap.set(this.playerNum, from);
      this.playerNum++;
    }

    var data = new BirdContent();
    data.score = score;
    data.totalScore = totalScore;
    data.nameStr = from;
    this.birdScoreMap.set(from, data);    

    return this.playerNum
  },

  getRankList (){
    let result = [];    
    for (var i = 0 ;i < this.playerNum; i++) {
      let key = this.birdScoreArrayMap.get(i);
      let parData = this.birdScoreMap.get(key);
      result.push(parData);
    }
    return result;
  },
};

var BirdContent = function (text) {
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

BirdContent.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

module.exports = BirdCenter;