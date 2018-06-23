const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.ScrollView)
    rankScroll : cc.ScrollView = null;

    @property(cc.Prefab)
    rankPanelPre : cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onClickCloseEvent (){
        this.node.active = false;
    }

    setRankData (dataList){
        let content = this.rankScroll.content;
        content.removeAllChildren();
        let index = 0;
        dataList.sort(function(a,b){
            return a.score < b.score ? 1 : -1;
        });

        for(let i in dataList){
            let data = dataList[i];
            let rankPanel = cc.instantiate(this.rankPanelPre);
            rankPanel.parent = content;
            rankPanel.getChildByName("nameLabel").getComponent(cc.Label).string = data.nameStr;
            rankPanel.getChildByName("rankLabel").getComponent(cc.Label).string = "第" + (index + 1) + "名";
            rankPanel.getChildByName("scoreLabel").getComponent(cc.Label).string = data.score + "分";
            index++;
        }
        content.height = index * (100 + 10) + 50;
    }
}
