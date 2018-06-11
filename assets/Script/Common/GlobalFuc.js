window.G_Func = {
    formatSeconds(value) {
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if(theTime > 60) {
            theTime1 = parseInt(theTime/60);
            theTime = parseInt(theTime%60);
            if(theTime1 > 60) {
                theTime2 = parseInt(theTime1/60);
                theTime1 = parseInt(theTime1%60);
            }
        }
        var result = ""+parseInt(theTime)+"秒";
        if(theTime1 > 0) {
            result = ""+parseInt(theTime1)+"分"+result;
        }
        if(theTime2 > 0) {
            result = ""+parseInt(theTime2)+"小时"+result;
        }
        return result;
    },

    isPackageIsMine(id){
        if(G_Data.userDataObj && G_Data.userDataObj.lsAirdropParcel){
            for(let i in G_Data.userDataObj.lsAirdropParcel){
                let packId = G_Data.userDataObj.lsAirdropParcel[i];
                if(packId == id){
                    return true;
                }
            }
        }
        return false;
    },

    popTip(str){
        cc.log("popTip : " + str);

        let label = cc.find("Canvas/tipBg/tipLabel");
        label.getComponent(cc.RichText).string = str;

        let tipBg = cc.find("Canvas/tipBg");
        tipBg.stopAllActions();
        tipBg.setLocalZOrder(99999);
        tipBg.active = true;
        tipBg.opacity = 255;

        tipBg.runAction(new cc.Sequence(new cc.DelayTime(2),new cc.FadeOut(2),new cc.CallFunc(function () {
            this.active = false;
        }.bind(tipBg))))
    },

    checkCallBack(resp){
        if(resp !==null && (typeof resp =="string") && resp.indexOf("rejected by user") > -1) {
            this.popTip("用户取消了交易");
            return;
        }
    },

    checkExtension() {
        if (typeof(webExtensionWallet) === "undefined") {
            this.popTip("钱包插件未安装！");
        }
    },

}