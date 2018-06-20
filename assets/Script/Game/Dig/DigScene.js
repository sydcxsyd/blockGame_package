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
        digLabel : {
        	default : null,
        	type : cc.Label,
        },

        digBtn : {
        	default : null,
        	type : cc.Node,
        },

        rankLayer : {
        	default : null,
        	type : cc.Node,
        },

        isDigging : {
        	default : false,
        	visible :false,
        },

        digMeter : {
        	default : 0,
        	visible :false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    	this.digBtn.on(cc.Node.EventType.TOUCH_START,function(){
    		this.isDigging = true;
    	}.bind(this))
    	this.digBtn.on(cc.Node.EventType.TOUCH_END,function(){
    		this.isDigging = false;
    	}.bind(this))
    	this.digBtn.on(cc.Node.EventType.TOUCH_CANCEL,function(){
    		this.isDigging = false;
    	}.bind(this))
    },

    onClickDig (){

    },

	onClickRank (){
		this.rankLayer.active = true;
    },

    onClickCloseRank (){
    	this.rankLayer.active = false;
    },

    onClickSend (){

    },

    randomEvent (){

    },

    reloadDig (){
    	this.digLabel.string = "已挖掘：" + this.digMeter + "米"
    },

    update (dt) {
    	if(this.isDigging){
    		this.digMeter++;
    		this.reloadDig()
    		G_Func.random();
    	}
    },
});
