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

        loveLabel : {
            default : null,
            type : cc.Label,
            tooltip: "平台喜欢的人",//在 属性检查器 面板中添加属性的 Tooltip
        },

        gameContentLayer : {
            default : null,
            type : cc.Node
        },

        platformLocation : {
            default : null,
            type : cc.Label
        },

        contentHeadLabel : {
            default : null,
            type : cc.Label
        },

        contentDescLabel : {
            default : null,
            type : cc.Label
        },

        contentSupportLabel : {
            default : null,
            type : cc.Label
        },

        contentHeadSprite : {
            default : null,
            type : cc.Sprite
        },


        newGameLayer : {
            default : null,
            type : cc.Node
        },

        heroGameLayer : {
            default : null,
            type : cc.Node
        },

        loveBtnPre : {
            default : null,
            type : cc.Prefab
        },

        loading : {
            default : null,
            type : cc.Prefab
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

        this.spriteFrameDic = {};
    },

    start () {
        this.schedule(this.pageTurnNext,this.pageTurnTime);
        this.loadPictures();
        this.getShowData();
        G_Func.checkExtension();
        this.initLoveBtn();
        this.platformLocation.string = "";
    },

    initLoveBtn(){
        for(let i = 1 ; i <= 3 ; i++){
            let sprite = cc.find("youxi0" + i,this.newGameLayer);
            this.createLoveBtn(sprite);
        }

        for(let i = 1 ; i <= 6 ; i++){
            let sprite = cc.find("youxi0" + i,this.heroGameLayer);
            this.createLoveBtn(sprite);
        }
    },

    createLoveBtn (root){
        let loveBtn = cc.instantiate(this.loveBtnPre);
        root.loveBtn = loveBtn;
        loveBtn.parent = root;
        let size = root.getContentSize();
        loveBtn.setPosition(size.width/2 - 16,size.height/2 - 24);
        loveBtn.on(cc.Node.EventType.TOUCH_END,this.touchLove,this);
    },

    touchLove(event){
        let rootBtn = event.currentTarget.parent;
        let data = rootBtn.data;
        G_Net.autoCall(G_Neb.platform_supportGame,[data.gaidx],0.0001,this.loveSuccess.bind(this));
        G_Func.popTip("正在交易中...")
    },

    loadPictures (){
        cc.loader.loadResDir("Platform",function (error,assets) {
            this.picturesLoadSuccess = true;
            for(var i in assets){
                this.spriteFrameDic[assets[i].name] = assets[i];
                // assets[i].retain();
            }
            this.reloadScene();
        }.bind(this))
    },

    reloadScene (){
        if(!this.picturesLoadSuccess || !this.allDataObj){
            return;
        }

        let index = 1;
        for(let i in this.allDataObj.AD_index_data){
            let data = this.allDataObj.AD_index_data[i];
            let sprite = cc.find("page_" + index,this.actPageView.content);
            sprite.on(cc.Node.EventType.TOUCH_END,this.clickPageView,this);
            let resData = G_PlatformRes[data.resindex];
            sprite.getComponent(cc.Sprite).spriteFrame = this.spriteFrameDic[resData.res];
            index++;
        }
        // this.allDataObj
        index = 1;
        let maxData = this.allDataObj.Game_newgameMax_data[0];
        let tempSprite = cc.find("youxi0" + index,this.newGameLayer);
        tempSprite.on(cc.Node.EventType.TOUCH_END,this.clickMax,this);
        let tempResData = G_PlatformRes[maxData.logoindex];
        tempSprite.getComponent(cc.Sprite).spriteFrame = this.spriteFrameDic[tempResData.res];
        tempSprite.loveBtn.getChildByName("loveLabel").getComponent(cc.Label).string = maxData.support;
        tempSprite.data = maxData;
        index++;
        for(let i in this.allDataObj.Game_newgame_data){
            let data = this.allDataObj.Game_newgame_data[i];
            let sprite = cc.find("youxi0" + index,this.newGameLayer);
            sprite.on(cc.Node.EventType.TOUCH_END,this.clickNew,this);
            let resData = G_PlatformRes[data.logoindex];
            sprite.getComponent(cc.Sprite).spriteFrame = this.spriteFrameDic[resData.res];
            sprite.loveBtn.getChildByName("loveLabel").getComponent(cc.Label).string = data.support;
            sprite.data = data;
            index++;
        }
        index = 1;
        for(let i in this.allDataObj.Game_game1_data){
            let data = this.allDataObj.Game_game1_data[i];
            let sprite = cc.find("youxi0" + index,this.heroGameLayer);
            sprite.on(cc.Node.EventType.TOUCH_END,this.clickHero,this);
            let resData = G_PlatformRes[data.logoindex];
            sprite.getComponent(cc.Sprite).spriteFrame = this.spriteFrameDic[resData.res];
            sprite.loveBtn.getChildByName("loveLabel").getComponent(cc.Label).string = data.support;
            sprite.data = data;
            index++;
        }
        this.loveLabel.string = "";
    },

    getShowData (){
        G_Net.autoCall(G_Neb.platform_getAllData,[],0,this.getAllDataSuccess.bind(this));
        G_Net.autoCall(G_Neb.platform_getGameData,[10],0,this.getLoveData.bind(this));
        G_Func.showMask(true);
    },

    getLoveData (jsonData){
        if(jsonData.result){
            let resultObj = JSON.parse(jsonData.result);
            this.loveLabel.string = resultObj[0].support;
        }
    },

    getAllDataSuccess (jsonData){
        G_Func.showMask(false);
        if(jsonData.result){
            let resultObj = JSON.parse(jsonData.result);
            cc.log(resultObj);
            this.allDataObj = resultObj;
            this.reloadScene();
        }
    },

    pageTurnNext (){
        let currentIndex = this.actPageView.getCurrentPageIndex();
        currentIndex++;
        let pageNum = this.actPageView.getPages().length;
        currentIndex = currentIndex >= pageNum ? 0 : currentIndex;
        this.actPageView.setCurrentPageIndex(currentIndex);
    },

    reloadContent (){
        this.contentHeadLabel.string = this.openingGame.name;
        this.contentDescLabel.string = this.openingGame.resinfo;
        this.contentSupportLabel.string = this.openingGame.support;

        let iconRes = G_PlatformRes[this.openingGame.logoindex].iconRes
        this.contentHeadSprite.spriteFrame = this.spriteFrameDic[iconRes];
    },

    closeEvent (){
        this.gameContentLayer.active = false;
    },

    startEvent (){
        cc.sys.openURL(this.openingGame.tarlink);
    },

    clickPageView (event){
        let index = event.currentTarget.name[event.currentTarget.name.length - 1];
        let data = this.allDataObj.AD_index_data[index - 1];

        cc.sys.openURL(data.tarlink);
    },

    clickMax (){
        let data = this.allDataObj.Game_newgameMax_data[0];
        this.gameContentLayer.active = true;
        this.openingGame = data;
        this.reloadContent()
    },

    clickNew (event){
        let index = event.currentTarget.name[event.currentTarget.name.length - 1];
        let data = this.allDataObj.Game_newgame_data[index - 2];

        this.gameContentLayer.active = true;
        this.openingGame = data;
        this.reloadContent()
    },

    clickHero (event){
        let index = event.currentTarget.name[event.currentTarget.name.length - 1];
        let data = this.allDataObj.Game_game1_data[index - 1];

        this.gameContentLayer.active = true;
        this.openingGame = data;
        this.reloadContent()
    },

    clickContentLove (){
        G_Net.autoCall(G_Neb.platform_supportGame,[this.openingGame.gaidx],0,this.loveSuccess.bind(this));
        G_Func.popTip("正在交易中...")
    },

    clickContentTest (){
        cc.sys.openURL(this.openingGame.dapdaplink);
    },

    loveSuccess (){
        // G_Func.showMask(false);
    },

    clickGood (){
        G_Net.autoCall(G_Neb.platform_supportGame,[10],0.0001,this.loveSuccess.bind(this));
    },

    update (dt) {
        
    },
});


