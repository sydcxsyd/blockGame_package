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
        pageTurnTime : {
            default : 5,
            tooltip: "自动翻页时间",//在 属性检查器 面板中添加属性的 Tooltip
        },

        actPageView : {
            default : null,
            type : cc.PageView
        },

        gameContentLayer : {
            default : null,
            type : cc.Node
        },

        platformLocation : {
            default : null,
            type : cc.Label
        },

        gameContentLabel : {
            default : null,
            type : cc.Label
        },

        gameContentDescLabel : {
            default : null,
            type : cc.Label
        },

        openingGame : {
            default : null,
            visible : false,
        },

        gameObj : {
            default : null,
            visible : false,
        },

        goodCost : {
            default : 0.0001,
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameObj = {
            gameName : "",
            gameUrl : "",
            gameDesc : "",
            gameWallet : "",
        }
    },

    start () {
        this.schedule(this.pageTurnNext,this.pageTurnTime);

        this.initData();
    },

    pageTurnNext (){
        let currentIndex = this.actPageView.getCurrentPageIndex();
        currentIndex++;
        let pageNum = this.actPageView.getPages().length;
        currentIndex = currentIndex >= pageNum ? 0 : currentIndex;
        this.actPageView.setCurrentPageIndex(currentIndex);
    },

    openContent (gameObj){
        this.openingGame = gameObj;
        this.reloadContent();
        this.gameContentLayer.active = true;
    },

    reloadContent (){
        this.gameContentLabel.string = this.openingGame.gameName;
        this.gameContentDescLabel.string = this.openingGame.gameDesc;
    },

    closeEvent (){
        this.gameContentLayer.active = false;
    },

    startEvent (){
        cc.sys.openURL(this.openingGame.gameUrl);
    },

    clickPageView (event){
        let index = event.currentTarget.name[event.currentTarget.name.length - 1];
        let gameObj = this.pageViewDic[index];
        this.openContent(gameObj);
    },

    update (dt) {
        
    },

    initData (){
        this.pageViewDic = {};

        for (let i = 1 ; i <= 3 ; i++){
            this.pageViewDic[i] = Object.create(this.gameObj);
        }



        this.pageViewDic[1].gameName = "DapDap"
        this.pageViewDic[1].gameUrl = "https://dapdap.io/"
        this.pageViewDic[1].gameDesc = "哎呀"

        this.pageViewDic[2].gameName = "啊"
        this.pageViewDic[2].gameUrl = "https://sydcxsyd.github.io/jump_build/"
        this.pageViewDic[2].gameDesc = "哎呀"
    },
});
