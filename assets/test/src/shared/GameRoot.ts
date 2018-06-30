const {ccclass,property} = cc._decorator;

@ccclass
export class GameRoot extends cc.Component {

    @property(cc.Node)
    private maskPanel:cc.Node = null;
    @property(cc.Label)
    private messageLabel: cc.Label = null;
    @property(cc.Node)
    private messageBtn1: cc.Node = null;
    @property(cc.Node)
    private messageBtn2: cc.Node = null;
    @property(cc.Node)
    private messageBtn3: cc.Node = null;
    @property(cc.Node)
    private loveMeBtn: cc.Node = null;
    @property(cc.Node)
    private tipPanel:cc.Node = null;
    @property(cc.Label)
    private tipLabel:cc.Label = null;
    @property(cc.Node)
    private rankLayer: cc.Node = null;

    @property
    private btn1Cb: any = null;
    @property
    private btn2Cb: any = null;
    @property
    private btn3Cb: any = null;

    start (){
        this.loveMeBtn.on(cc.Node.EventType.TOUCH_END,()=>{
            G_Net.autoCall(G_Neb.brick_loveMe,[],0.01,function(){
                G_Func.popTip("感谢您的支持！");
            });
        },this)
    }

    public showMaskMessage(message:string,btn1?:{label:string,cb?:Function,target?:any}
    ,btn2?:{label:string,cb?:Function,target?:any},btn3?:{label:string,cb?:Function,target?:any}) {
        this.messageLabel.string = message;

        if(!this.maskPanel.active){
            this.maskPanel.active = true;
        }
        if(btn1) {
            this.messageBtn1.active = true;
            this.messageBtn1.getComponent(cc.Label).string = btn1.label;
            this.btn1Cb = btn1.cb.bind(btn1.target);
            this.messageBtn1.once(cc.Node.EventType.TOUCH_END,()=>{
                this.hideMaskMessage();
                if(this.btn1Cb) {
                    this.btn1Cb();
                }
            },this);
        }else{
            this.messageBtn1.active = false;
        }
        if(btn2) {
            this.messageBtn2.active = true;
            this.messageBtn2.getComponent(cc.Label).string = btn2.label;
            this.btn2Cb = btn2.cb.bind(btn2.target);
            this.messageBtn2.on(cc.Node.EventType.TOUCH_END,()=>{
                if(this.btn2Cb) {
                    this.btn2Cb();
                }
            },this);
        }else{
            this.messageBtn2.active = false;
        }

        if(btn3) {
            this.messageBtn3.active = true;
            this.messageBtn3.getComponent(cc.Label).string = btn3.label;
            this.btn3Cb = btn3.cb.bind(btn3.target);
            this.messageBtn3.on(cc.Node.EventType.TOUCH_END,()=>{
                // this.hideMaskMessage();
                if(this.btn3Cb) {
                    this.btn3Cb();
                }
            },this);
        }else{
            this.messageBtn3.active = false;
        }

    }

    public hideMaskMessage() {
        this.maskPanel.active = false;
    }

    public showTip(tip:string) {
        this.tipLabel.string = tip;
        this.tipPanel.getComponent(cc.Animation).play();
    }

    public showRank(isshow:boolean,dataList) {
        this.rankLayer.active = isshow;
        this.rankLayer.getComponent("RankLayer_Vert").setRankData(dataList);
    }
}