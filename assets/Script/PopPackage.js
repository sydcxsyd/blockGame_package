cc.Class({
    extends: cc.Component,

    properties: {
        data : {
            default : null,
            visible : false,
        },
        choosingPackType : {
            default : null,
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:
    setData (data){
        this.data = data;
        this.reload();
    },

    reload (){
        let packageNode = this.node;
        let pageName = packageNode.getChildByName("pageName").getComponent("cc.Label");
        pageName.string = this.data.parid + "号包裹";

        let packageContentLabel1 = packageNode.getChildByName("packageContentLabel1").getComponent("cc.Label");
        packageContentLabel1.string = this.data.ticket_prices/G_Con.bigNum;

        let packageContentLabel2 = packageNode.getChildByName("packageContentLabel2").getComponent("cc.Label");
        packageContentLabel2.string = this.data.cost_min/G_Con.bigNum + "-" + (this.data.cost_max/G_Con.bigNum);

        this.setPackType(this.data.parstatus);
    },

    refeshTime (){
        let endTime = this.data.recycle_time;
        let nowDate = new Date();
        let nowTime = parseInt(nowDate.getTime()/1000);
        let leftSecond = endTime - nowTime;
        let packageContentLabel3 = this.node.getChildByName("packageContentLabel3").getComponent("cc.Label");

        if(leftSecond < 0){
            packageContentLabel3.string = "已过期";
            let buttonLabel = cc.find("confirmBtn/buttonLabel",this.node).getComponent(cc.Label);
            if(G_Func.isPackageIsMine(this.data.parid)){
                buttonLabel.string = "下架";
            }else{
                buttonLabel.string = "确定";
            }
            this.isOutOfTime = true;

        }else{
            if(leftSecond / 3600 > 24){
                packageContentLabel3.string = "剩余：" + parseInt(leftSecond / (3600 * 24)) + "天";
            }else{
                packageContentLabel3.string = "剩余：" + G_Func.formatSeconds(leftSecond);
            }
        }
    },

    ctor (){

    },

    onClickClose (){
    	this.node.destroy();
    },

    onClickConfirm (){
        if(this.choosingPackType == G_Con.packageState.enable){
            if(this.isOutOfTime){
                if(G_Func.isPackageIsMine(this.data.parid)){
                    G_Net.autoCall(G_Neb.soldOut,[parseInt(this.data.parid)],0,this.soldOutEnd.bind(this));
                }
                this.node.destroy();
            }else{
                G_Net.autoCall(G_Neb.lickParcel,[parseInt(this.data.parid)],this.data.ticket_prices/G_Con.bigNum,this.lickEnd.bind(this));
                this.node.destroy();
            }
        }else if(this.choosingPackType == G_Con.packageState.eaten){
            this.node.destroy();
        }else if(this.choosingPackType == G_Con.packageState.outDate){
            this.node.destroy();
        }
    },

    soldOutEnd (result){
        G_Func.checkCallBack(result);
    },

    lickEnd (result){
        cc.log("lickEnd : " + result);
        G_Func.checkCallBack(result);
    },

    setPackType (type){
        this.choosingPackType = type;
        let buttonLabel = cc.find("confirmBtn/buttonLabel",this.node).getComponent(cc.Label);
        if(this.choosingPackType == G_Con.packageState.enable){
            this.schedule(function (dt) {
                this.refeshTime();
            }.bind(this),1)
            buttonLabel.string = "立即舔包";
            this.refeshTime();
        }else if(this.choosingPackType == G_Con.packageState.eaten){
            let packageContentLabel3 = this.node.getChildByName("packageContentLabel3").getComponent("cc.Label");
            packageContentLabel3.string = "实际获得：" + this.data.final_prices/G_Con.bigNum;
            let packageContentLabelTime = this.node.getChildByName("packageContentLabelTime");
            let date = new Date(this.data.lick_time * 1000);
            packageContentLabelTime.getComponent("cc.Label").string = "开启时间：" + date.toLocaleString();
            packageContentLabelTime.active = true;
            buttonLabel.string = "确定";
        }else if(this.choosingPackType == G_Con.packageState.outDate){
            let packageContentLabel3 = this.node.getChildByName("packageContentLabel3").getComponent("cc.Label");
            packageContentLabel3.string = "已下架";
            buttonLabel.string = "确定";
        }
    },
    // update (dt) {},
});
