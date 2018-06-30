'use strict';

let RobotCenter = function(){
  LocalContractStorage.defineMapProperty(this, "robotMap", {
    parse: function (text) {
      return new RobotContent(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });
  LocalContractStorage.defineMapProperty(this, "robotArrayMap");
  LocalContractStorage.defineProperty(this, "playerNum");
}

RobotCenter.prototype = {
  init(){
    this.playerNum = 0;
    this.rootUser = "n1JPeX8mkSy2D2RycVEsB1JRL3b5aMMdY56";
  },

  createRobot(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    var bk_height = new BigNumber(Blockchain.block.height);
    var mapData = this.robotMap.get(from);
    if (mapData) {
      return;
    }

    var data = new RobotContent();
    data.name = from;
    data.fightNum = 1000;
    this.robotMap.set(from, data);

    this.playerNum++;
    this.brickScoreArrayMap.set(this.playerNum, from);   

  },

  getUserData(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    let data = this.robotMap.get(from);
    return data;
  },

  getHistory(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
  },

  powerUp(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;

    let gotFightNum = this.randomFightGrow(value);
    let data = this.robotMap.get(from);

    data.fightNum += gotFightNum;    
    data.costNas += value;
  },

  growUp(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;

    let gotFightNum = this.randomFightGrow(value);
    let data = this.robotMap.get(from);

    data.fightNum += gotFightNum;
    data.growUpLevel += 1;
    data.costNas += value;   
  },

  randomFightGrow (nasValue){
      let num = this._getRandom(100);
      let addFightNum = (num / 200 + 1) * nasValue * 10000;      
      return addFightNum
  },

  _getRandom : function(){
        if(arguments.length < 1){
            return Math.random()
        }else if(arguments.length == 1){
            return parseInt(Math.random()*1000000)%arguments[0];
        }else if(arguments.length == 2){
            return parseInt(Math.random()*(arguments[1]-arguments[0]+1) + arguments[0]);
        }
    },

  destory(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
    let data = this.robotMap.get(from);
    let reNas = data.costNas;
  },

  randomFight(){
    var from = Blockchain.transaction.from;
    var value = Blockchain.transaction.value;
  },

};

var RobotContent = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.fightNum = new BigNumber(o.fightNum);
    this.growUpLevel = new BigNumber(o.growUpLevel);
    this.nameStr = o.nameStr;
    this.costNas = new BigNumber(o.costNas);
  } else {
    this.fightNum = new BigNumber(0);
    this.growUpLevel = new BigNumber(0);
    this.costNas = new BigNumber(0);
    this.nameStr = "";
  }
};

RobotContent.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var FightContent = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.from = o.from;
    this.to = o.to;
    this.winner = o.winner;
    this.winnerGotNas = new BigNumber(o.winnerGotNas);
    this.winnerGotFightNum = new BigNumber(o.winnerGotFightNum);
  } else {
    this.from = "";
    this.to = "";
    this.winner = "";
    this.nameStr = "";
    this.winnerGotNas = new BigNumber(0);
    this.winnerGotFightNum = new BigNumber(0);
  }
};

FightContent.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

module.exports = RobotCenter;