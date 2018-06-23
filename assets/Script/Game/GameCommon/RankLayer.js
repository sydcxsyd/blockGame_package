cc.Class({
    extends: cc.Component,

    properties: {
        rankScroll : {
            default : null,
            type : cc.ScrollView,
        },

        rankPanelPre : {
            default : null,
            type : cc.Prefab,
        }
    },

    start () {

    },

    onClickCloseEvent (){
        this.node.active = false;
    },

    setRankData (dataList){
        let content = this.rankScroll.content;
        content.removeAllChildren();
        let index = 0;
        dataList.sort(function(a,b){
            return a.totalScore > b.totalScore ? 1 : -1;
        });

        for(let i in dataList){
            let data = dataList[i];
            let rankPanel = cc.instantiate(this.rankPanelPre);
            rankPanel.parent = content;
            rankPanel.getChildByName("nameLabel").getComponent(cc.Label).string = data.nameStr;
            rankPanel.getChildByName("rankLabel").getComponent(cc.Label).string = "第" + (index + 1) + "名";
            rankPanel.getChildByName("scoreLabel").getComponent(cc.Label).string = data.scoreStr;
            index++;
        }
        content.height = index * (100 + 10) + 50;
    },
});
