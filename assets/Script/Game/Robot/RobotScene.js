// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        contentLabel : {
            default : null,
            type : cc.Label,
        },

        nasLabel : {
            default : null,
            type : cc.Label,
        },

        nameLabel : {
            default : null,
            type : cc.Label,
        },

        growUpLabel : {
            default: null,
            type: cc.Label,
        },

        fightLabel : {
            default : null,
            type : cc.Label,
        },

        popLayer : {
            default : null,
            type : cc.Node,
        },

        robot : {
            default : null,
            type : cc.Sprite,
        },
    },
    onLoad (){
        this.popCallBack = null;
        this.robotData = null;
    },

    start () {
        this.robot.node.runAction(new cc.RepeatForever(new cc.Sequence(new cc.MoveTo(2,cc.v2(0,60)),new cc.MoveTo(2,cc.v2(0,90)))));
        G_Func.checkExtension();
        this.getShowData();
    },

    getShowData (){
        G_Net.autoCall(G_Neb.robotUrl_getUserData,[],0,this.getRobotDataSuccess.bind(this));
        G_Func.showMask(true);
    },

    getRobotDataSuccess (jsonData){
        G_Func.showMask(false);
        if(jsonData.result && jsonData.result != "null" && jsonData.result != "undefined"){
            let resultObj = JSON.parse(jsonData.result);
            this.robotData = resultObj;

        }else{
            this.popConfirmBox(function () {
                G_Func.showMask(true);
                G_Net.autoCall(G_Neb.robotUrl_createRobot,[],0,this.createRobotDataSuccess.bind(this));
            },"是否免费领取一个机械战姬?");
        }
    },

    createRobotDataSuccess(jsonData){
        G_Func.showMask(false);
        if(jsonData.result && jsonData.result != "null" && jsonData.result != "undefined"){
            let resultObj = JSON.parse(jsonData.result);
            this.reloadRobot();
        }
    },

    reloadRobot (){
        // this.fightNum = new BigNumber(0);
        // this.growUpLevel = new BigNumber(0);
        // this.costNas = new BigNumber(0);
        // this.nameStr = "";
        this.nameLabel.string = this.robotData.nameStr;
        this.fightLabel.string = this.robotData.fightNum;
        this.nasLabel.string = this.robotData.costNas;

        this.loadHeroPicture(this.growUpLevel);
    },

    loadHeroPicture (level){

    },

    popConfirmBox (callBack,contentStr){
        this.contentLabel.string = contentStr;
        this.popCallBack = callBack;
        this.popLayer.active = true;
    },

    clickPowerUp (){
        G_Net.autoCall(G_Neb.robotUrl_powerUp,[],0.001,function () {

        });
    },

    clickPower10Up (){
        G_Net.autoCall(G_Neb.robotUrl_powerUp,[],0.01,function () {

        });
    },

    clickRandomFight (){
        G_Net.autoCall(G_Neb.robotUrl_randomFight,[],0,function () {

        });
    },

    clickGrowUp (){
        G_Net.autoCall(G_Neb.robotUrl_growUp,[],1,function () {

        });
    },

    clickDestory (){
        G_Net.autoCall(G_Neb.robotUrl_destory,[],0,this.destorySuccess.bind(this));
    },

    destorySuccess (){

    },

    clickConfirm (){
        if(this.popCallBack){
            this.popCallBack();
        }
        this.popLayer.active = false;
    },

    clickClose (){
        this.popLayer.active = false;
    },
    // update (dt) {},
});
