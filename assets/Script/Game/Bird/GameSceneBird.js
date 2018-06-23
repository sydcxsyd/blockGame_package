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
    	pipe : {
    		default: null,
            type: cc.Prefab
    	},
        scoreLabel : {
            default: null,
            type: cc.Label,
        },

        endScoreLabel : {
            default: null,
            type: cc.Label,
        },

        pipeMoveSpeed : 1,

        startHolePercent : 0.3,
        holeDelPercent : 0.01,
        leastHolePercent : 0.05,

        createPipeFramesInterval : 10,

        score : {
    	    default: 0,
            visible : false,
        },

        moveDis : {
            default: 0,
            visible : false,
        },

        rankPanelPre : {
            default: null,
            type : cc.Prefab,
        },

        loadingLabel : {
            default: null,
            type : cc.Node,
        },

        isFirst : {
            default: true,
            visible : false,
        },

        isUploaded : {
            default: false,
            visible : false,
        },
    },

    pipList : null,

    currentHolePercent : 0,
    currentPipeMoveSpeed : 0,

    lastCreatePipeFrame : 0,
    endGameLayer : null,

    isPlaying : false,

    onLoad () {
    	// cc.director.getPhysicsManager().gravity = cc.v2(0,-800);
    	this.bird = this.node.getChildByName("bird");

        this.bird.on(G_Event.BirdDead,function(event){
            cc.log("i know brid dead!")
            cc.log(event.detail)
            this.gameEnd();
        },this);
 		      
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;

        this.endGameLayer = this.node.getChildByName("endGameLayer");
        this.endGameLayer.setLocalZOrder(3);

        this.rankLayer = this.node.getChildByName("rankLayer");
        this.rankLayer.setLocalZOrder(4);

        let scoreLabel = this.node.getChildByName("scoreLabel");
        scoreLabel.setLocalZOrder(2);

        let retryBtn = this.endGameLayer.getChildByName("retryBtn");
        retryBtn.on(cc.Node.EventType.TOUCH_END,this.reGame,this);

        let returnBtn = this.endGameLayer.getChildByName("returnBtn");
        returnBtn.on(cc.Node.EventType.TOUCH_END,this.returnToMain,this);

        this.bird.active = false;
        G_Func.checkExtension();
    },

    startGame () {
        cc.log("start")
        this.bird.active = true;
        this.isPlaying = true;
        this.pipeList = [];

        this.currentHolePercent = this.startHolePercent;
        this.currentPipeMoveSpeed = this.pipeMoveSpeed;

        this.lastCreatePipeFrame = this.createPipeFramesInterval;

        this.endGameLayer.active = false;

        this.node.on('touchend', function (event) {
            this.jump();
        }, this.bird.getComponent("Bird"));
        this.bird.getComponent("Bird").jump();

        this.reloadScore();
    },

    reGame (event){
        if(!this.isFirst){
            event.stopPropagation();
            this.clean();
        }
        this.isFirst = false;
        this.startGame();
    },

    clean (){
        for(var i in this.pipeList){
            this.pipeList[i].destroy();
        }
        var birdScript = this.bird.getComponent("Bird");
        birdScript.reset();
        this.score = 0;
        this.moveDis = 0;
        this.isUploaded = false;
    },

    reloadScore : function(){
        this.scoreLabel.string = "分数 ： " + this.score;
    },

    returnToMain (event){
        event.stopPropagation();
        cc.director.loadScene("startScene");
        cc.log("backToMain");
    },

    gameEnd (){
        this.isPlaying = false;
        this.node.off(cc.Node.EventType.TOUCH_END);
        this.endScoreLabel.string = "分数 ： " + this.score;
        this.scheduleOnce(function () {
            this.endGameLayer.active = true;
        },1);
    },

    createNewPipes () {
		// 使用给定的模板在场景中生成一个新节点
        let newUpPipe = cc.instantiate(this.pipe);
        let newDownPipe = cc.instantiate(this.pipe);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newUpPipe);
        this.node.addChild(newDownPipe);

        this.pipeList.push(newUpPipe);
        this.pipeList.push(newDownPipe);

       	this.initNewRandomPipes(newUpPipe,newDownPipe);
    },

    initNewRandomPipes (upPipe,downPipe){
        let size = this.node.getContentSize();
    	let holeY = G_Func.getRandom(0,size.height/2);
        holeY = holeY - size.height / 4;

        let upPipeHeight = size.height/2 - (holeY + (this.currentHolePercent * size.height / 2))
        let downPipeHeight = size.height/2 + (holeY - (this.currentHolePercent * size.height / 2))

        upPipe.setContentSize(cc.size(200,upPipeHeight));
        downPipe.setContentSize(cc.size(200,downPipeHeight));

        upPipe.setPosition(size.width,size.height / 2);
        downPipe.setPosition(size.width,-size.height / 2);

        upPipe.setAnchorPoint(cc.v2(0.5,1));
        downPipe.setAnchorPoint(cc.v2(0.5,0));

        G_Func.resetNodeBoxCollider(upPipe);
        G_Func.resetNodeBoxCollider(downPipe);
    },

    pipesMove (){
        for(let i in this.pipeList){
            let pipe = this.pipeList[i];
            pipe.setPositionX(pipe.getPositionX() - this.pipeMoveSpeed);
        }
        this.moveDis += this.pipeMoveSpeed;
        this.checkScore();
    },

    checkScore (){
        var score = (this.moveDis - this.node.getContentSize().width) / (this.createPipeFramesInterval * this.pipeMoveSpeed) + 1;
        this.score = score > 0 ? parseInt(score) : 0;
        this.reloadScore();
    },

    update (dt) {
        if(this.isPlaying){
            this.pipesMove();
            this.lastCreatePipeFrame++;
            if(this.lastCreatePipeFrame >= this.createPipeFramesInterval){
                this.createNewPipes();
                this.lastCreatePipeFrame = 0;
            }
            this.destroyOutScreenPipes();
        }
    },

    destroyOutScreenPipes (){
        for(var i = 0 ; i < this.pipeList.length;i++){
            let pipe = this.pipeList[i];
            if(pipe.getPositionX() < -this.node.getContentSize().width){
                pipe.destroy();
                this.pipeList.splice(i,1);
                i--;
            }
        }
    },

    onClickUpload (){
        if(this.isFirst){
            G_Func.popTip("请先进行游戏");
            return;
        }
        if(this.isUploaded){
            G_Func.popTip("本次结果已上传");
            return;
        }
        this.isUploaded = true;
        G_Net.autoCall(G_Neb.bird_upload,[this.score],0,this.upLoadSucces.bind(this));
    },

    upLoadSucces (){
        cc.log("upLoadSucces success!~!");
    },

    onClickRank (){
        this.rankLayer.active = true;
        this.loadingLabel.active = true;
        G_Net.autoCall(G_Neb.bird_getRankList,[],0,this.getBankDataSuccess.bind(this));
    },

    getBankDataSuccess (jsonStr){
        if(jsonStr.result != "null" && jsonStr.result != ""){
            let bankData = JSON.parse(jsonStr.result);
            this.setRankLayer(bankData);
        }
        this.loadingLabel.active = false;
    },

    onClickCloseRank (){
        this.rankLayer.active = false;
    },

    setRankLayer (dataList){
        let content = cc.find("Canvas/rankLayer/rankScroll/view/content");
        content.removeAllChildren();
        let index = 0;
        dataList.sort(function(a,b){
            return a.totalScore < b.totalScore ? 1 : -1;
        });

        for(let i in dataList){
            let data = dataList[i];
            let rankPanel = cc.instantiate(this.rankPanelPre);
            rankPanel.parent = content;
            rankPanel.getComponent("DigRankPanel").setData(index + 1,data.nameStr,"总分 ： " + data.totalScore + "分");
            index++;
        }
        content.height = index * 100 + 100 * 0.5;
    },
});
