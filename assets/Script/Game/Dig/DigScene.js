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

        eventScroll : {
            default : null,
            type : cc.ScrollView,
        },

        digEventPanel : {
            default : null,
            type : cc.Prefab,
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
    	}.bind(this));
    	G_Net.autoCall(G_Neb.dig_getNowDigMeter,[],0,this.getDigSuccess.bind(this));
        G_Func.checkExtension();
        G_Func.showMask(true,"加载中...");
    },

    getDigSuccess (jsonStr){
        G_Func.showMask(false);
        if(jsonStr.result && jsonStr.result != "" && jsonStr.result != "null"){
            let jsonData = JSON.parse(jsonStr.result);
            if(jsonData.digMeter){
                this.digMeter = jsonData.digMeter;
            }
            this.reloadDig()
        }
    },

    onClickDig (){

    },

	onClickRank (){
		this.rankLayer.active = true;
        G_Net.autoCall(G_Neb.dig_getRankList,[],0,this.getRankSuccess.bind(this));
        G_Func.showMask(true,"加载中...");
    },

    getRankSuccess (jsonStr){
        G_Func.showMask(false);
        if(jsonStr.result && jsonStr.result != "" && jsonStr.result != "null"){
            let dataList = JSON.parse(jsonStr.result);
            let rankDataList = [];
            for(var i in  dataList){
                let obj = dataList[i];
                let data = {};
                data.nameStr = obj.nameStr;
                data.scoreStr = obj.digMeter + "米";
                rankDataList.push(data);
            }
            this.rankLayer.getComponent("RankLayer").setRankData(rankDataList);
        }
    },

    onClickSend (){
        G_Net.autoCall(G_Neb.dig_upload,[this.digMeter],0,this.upLoadSucces.bind(this));
    },

    upLoadSucces (){
        G_Func.popTip("上传成功");
    },

    randomEvent (){
        let pre = cc.instantiate(this.digEventPanel);
        let richText = pre.getChildByName("eventLabel").getComponent(cc.RichText);
        let randomNum = G_Func.getRandom(1,33);
        let color = "ff1aff";
        if(randomNum <= 16){
            let randomPer = G_Func.getRandom(1,100);
            if(randomPer > 80){
                color = "0f1aff";
            }
        }
        richText.string = "你挖到了一个奇怪的数字<color=#" + color + ">" + randomNum + "</color>";
        pre.parent = this.eventScroll.content;

        this.eventScroll.content.height = (60 + 10) * this.eventScroll.content.getChildrenCount() + 60;
    },

    reloadDig (){
    	this.digLabel.string = "已挖掘：" + this.digMeter + "米"
    },

    update (dt) {
    	if(this.isDigging){
    		this.digMeter++;
    		this.reloadDig();

            let random = G_Func.getRandom();
            if(random * 1000 < 1){
                this.randomEvent();
            }
    	}
    },
});
