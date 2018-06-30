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
    this.root = "n1JPeX8mkSy2D2RycVEsB1JRL3b5aMMdY56";
  },

  regist(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    var mapData = this.brickScoreMap.get(from);    
    if (mapData) {     
      throw new Error("already registed");
      return
    }else{
      this.brickScoreArrayMap.set(this.playerNum, from);
      this.playerNum++;
    }
    var data = new BrickContent();
    data.score = 0;
    // data.totalScore = totalScore;
    data.nameStr = from;
    this.brickScoreMap.set(from, data);    
  },

  checkRegist(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    return this.brickScoreMap.get(from);
  },

  upload (score){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    var bk_height = new BigNumber(Blockchain.block.height);

    if(!score){
      console.log("must got a score");
      throw new Error("Withdraw failed. Address:" + this.root + ", NAS:" + value);
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

  loveMe (){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    // var result = Blockchain.transfer(this.root, value * 1000000000000000000); //支持作者

  },

  withdraw: function(value) {
        if (Blockchain.transaction.from != this.root) {
            throw new Error("Permission denied.");
        }

        var result = Blockchain.transfer(this.root, parseInt(value) * 1000000000000000000);
        if (!result) {
            Event.Trigger("withdrawFailed", {
                Transfer: {
                    from: Blockchain.transaction.to,
                    to: this.root,
                    value: value
                }
            });

            throw new Error("Withdraw failed. Address:" + this.root + ", NAS:" + value);
        }

        Event.Trigger("withdraw", {
            Transfer: {
                from: Blockchain.transaction.to,
                to: this.root,
                value: value
            }
        });
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