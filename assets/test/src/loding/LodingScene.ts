import { G } from "../G";
import { GameRoot } from "../shared/GameRoot";

const {ccclass, property} = cc._decorator;

@ccclass
export class LodingScene extends cc.Component {
    
    @property(cc.Label)
    private tipLabel: cc.Label = null;
    @property(cc.Node)
    private gameRoot:cc.Node = null;

    onLoad() {
        cc.game.addPersistRootNode(this.gameRoot);
        this.gameRoot.setLocalZOrder(999)
        this.initGlobal();
    }

    initGlobal() {
        G.gameRoot = this.gameRoot.getComponent(GameRoot);
    }

    protected start() {
        cc.director.setDisplayStats(false);
        let tip = "LOADING..."
        let i = 0;
        this.tipLabel.string = '';
        this.schedule(()=>{
            i++;
            if(i === tip.length+1) {
                this.onLoadSuccess();
            }else{
                this.tipLabel.string = tip.substring(0,i);
            }
        },0.3,tip.length+1,0.3);
    }
    @property(Object)
    private gameType = {
        gobang : "gobang",
        reversi : "reversi",
        game2048 : "2048",
        jump : "jump",
        puzzle : "puzzle",
        get47 : "get47",
        tetris : "tetris",
        mine : "mine",
        link : "link",
        snake : "snake",
        brick : "brick",
    };
    private onLoadSuccess() {
        G.enterScene(this.gameType.jump);
    }
}

