import { BrickBall } from "./BrickBall";
import { BrickPaddle } from "./BrickPaddle";
import { BrickLayout } from "./BrickLayout";
import { G } from "../G";
import {STATE} from "../jump/JumpConstants";

const { ccclass, property } = cc._decorator;

@ccclass
export class BrickScene extends cc.Component {

    @property(BrickBall)
    private ball: BrickBall = null;
    @property(BrickPaddle)
    private paddle: BrickPaddle = null;
    @property(BrickLayout)
    private layout: BrickLayout = null;
    @property(cc.Label)
    private scoreLabel: cc.Label = null;
    
    private brickNum: number = 50;
    private score = 0;
    private physicsManager: cc.PhysicsManager = null;

    onLoad() {
        this.physicsManager = cc.director.getPhysicsManager();
        // this.startGame();
        G_Func.checkExtension();
        G_Net.autoCall(G_Neb.brick_checkRegist,[],0,this.getInfoSuccess.bind(this));
        G_Func.showMask(true);

    }

    getInfoSuccess (resultData){
        G_Func.showMask(false);
        if(resultData.result && resultData.result != "null" && resultData.result != "undefined"){
            G.gameRoot.showMaskMessage("等待中",
                {
                    label: "开始游戏", cb: () => {
                        this.startGame();
                    }, target: this
                },
                {
                    label: "排行榜", cb: () => {
                        cc.log("看看别人有多努力!!!!!!!!!!!!")
                        G_Func.showMask(true, "加载中...");
                        G.gameRoot.showRank(true, []);
                        G_Net.autoCall(G_Neb.brick_getRankList, [], 0, this.getRankSuccess.bind(this));
                }, target: this
            });

        }else{
            G.gameRoot.showMaskMessage("您还没有账号",
                {
                    label: "免费注册", cb: () => {
                        this.startGame();
                    }, target: this
                },
                {
                    label: "排行榜", cb: () => {
                        cc.log("看看别人有多努力!!!!!!!!!!!!")
                        G_Func.showMask(true, "加载中...");
                        G.gameRoot.showRank(true, []);
                        G_Net.autoCall(G_Neb.brick_getRankList, [], 0, this.getRankSuccess.bind(this));
                    }, target: this
                }
                );
        }
    }

    regist (){
        G_Func.showMask(true);
        G_Net.autoCall(G_Neb.brick_regist,[],0,this.registSuccess.bind(this));
    }

    registSuccess (){
        G_Func.showMask(false);
        G.gameRoot.showMaskMessage("等待中",
            {
                label: "开始游戏", cb: () => {
                    this.startGame();
                }, target: this
            },
            {
                label: "排行榜", cb: () => {
                    cc.log("看看别人有多努力!!!!!!!!!!!!")
                    G_Func.showMask(true, "加载中...");
                    G.gameRoot.showRank(true, []);
                    G_Net.autoCall(G_Neb.brick_getRankList, [], 0, this.getRankSuccess.bind(this));
                }, target: this
            });
    }
    //this.physicsManager.debugDrawFlags =0;
    // cc.PhysicsManager.DrawBits.e_aabbBit |
    // cc.PhysicsManager.DrawBits.e_pairBit |
    // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
    // cc.PhysicsManager.DrawBits.e_jointBit |
    // cc.PhysicsManager.DrawBits.e_shapeBit
    // ; 

    init() {
        this.score = 0;
        this.scoreLabel.string = "0";
        this.brickNum = 50;
        this.physicsManager.enabled = true;
        this.ball.init(this);
        this.paddle.init();
        this.layout.init(this.brickNum);
        // this.overPanel.init(this);

    }

    startGame() {
        this.init();
    }

    pauseGame() {
        this.physicsManager.enabled = false;
    }

    resumeGame() {
        this.physicsManager.enabled = true;
    }

    stopGame() {
        this.physicsManager.enabled = false;
        G.gameRoot.showMaskMessage("游戏结束",
            {
                label: "再来一局", cb: () => {
                    this.startGame();
                }, target: this
            },
            {
                label: "上传成绩", cb: () => {
                    G_Net.autoCall(G_Neb.brick_upload,[this.score],0,this.upLoadSucces.bind(this));
                }, target: this

            },
            {
                label: "排行榜", cb: () => {
                    cc.log("看看别人有多努力!!!!!!!!!!!!")
                    G_Func.showMask(true,"加载中...");
                    G.gameRoot.showRank(true,[]);
                    G_Net.autoCall(G_Neb.brick_getRankList,[],0,this.getRankSuccess.bind(this));
                }, target: this
            });
    }

    private upLoadSucces (){
        G_Func.popTip("本次结果已上传");
    }

    private getRankSuccess (jsonStr){
        cc.log(jsonStr.result);
        G_Func.showMask(false);
        if(jsonStr.result && jsonStr.result != "" && jsonStr.result != "null") {
            let dataList = JSON.parse(jsonStr.result);
            let rankDataList = [];
            for (var i in  dataList) {
                let obj = dataList[i];
                let data = {};
                data.nameStr = obj.nameStr;
                data.score = obj.score;
                rankDataList.push(data);
            }
            G.gameRoot.showRank(true, rankDataList);
        }
    }


    addScore(score){
        this.score += score;
    }

    minusBrick(n){
        this.brickNum -= n;
    }

    onBallContactBrick(ballNode, brickNode) {
        brickNode.parent = null;
        this.addScore(1);
        this.minusBrick(1);
        this.scoreLabel.string = this.score + "";
        if (this.brickNum <= 0) {
            this.stopGame();
        }
    }

    onBallContactGround(ballNode: cc.Node, groundNode: cc.Node) {
        this.stopGame();
    }

    onBallContactPaddle(ballNode: cc.Node, paddleNode: cc.Node) {

    }

    onBallContactWall(ballNode: cc.Node, brickNode: cc.Node) {

    }

    onDestroy() {
        this.physicsManager.enabled = false;
    }


}
