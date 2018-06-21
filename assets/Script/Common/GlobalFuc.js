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
        let canvasNode = cc.find("Canvas");
        if(canvasNode.getChildByName("global_popTip")){
            let popNode = canvasNode.getChildByName("global_popTip");
            var tip = popNode.getComponent('PopTip');
            tip.setTipData(str);
        }else{
            cc.loader.loadRes("Prefab/popTip", function(errorMessage,loadedResource){
                //检查资源加载
                if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
                if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; }
                //开始实例化预制资源
                var popTipPrefab = cc.instantiate(loadedResource);

                //将预制资源添加到父节点
                canvasNode.addChild(popTipPrefab,9999,"global_popTip");

                //获取预制资源中的js组件，并作出相应操作
                var tip = popTipPrefab.getComponent('PopTip');
                tip.setTipData(str);
            });
        }

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

    //接受参数
    //() 取一个0到1的随机数
    //(max) 取一个0到max的随机数
    //(min，max) 取一个min到max的随机数max>min
    getRandom : function(){
        if(arguments.length < 1){
            return Math.random()
        }else if(arguments.length == 1){
            return parseInt(Math.random()*1000000)%arguments[0];
        }else if(arguments.length == 2){
            return parseInt(Math.random()*(arguments[1]-arguments[0]+1) + arguments[0]);
        }
    },

    resetNodeBoxCollider : function(node){
        var box = node.getComponent(cc.BoxCollider);
        var nodeSize = node.getContentSize();
        box.size = nodeSize;
        box.offset = cc.v2((0.5 - node.anchorX) * nodeSize.width,(0.5 - node.anchorY) * nodeSize.height)
    },

}