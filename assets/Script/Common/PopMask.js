cc.Class({
    extends: cc.Component,

    properties: {
        tipLabel : {
            default : null,
            type : cc.RichText,
        },
        loading : {
            default : null,
            type : cc.Sprite,
        }
    },
    onLoad () {
        // cc.log(this.loading.getComponent(cc.Node));
        this.loading.node.runAction(cc.repeatForever(cc.rotateBy(1,360)));
    },
    setData (str){
        this.tipLabel.string = str;

        this.node.stopAllActions();
        // this.node.setLocalZOrder(99999);
        this.node.active = true;
        this.node.opacity = 255;
    },
});
