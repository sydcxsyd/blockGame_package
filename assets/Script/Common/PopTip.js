cc.Class({
    extends: cc.Component,

    properties: {
        tipLabel : {
            default : null,
            type : cc.RichText,
        }
    },
    onLoad () {},
    setTipData (str){
        this.tipLabel.string = str;

        this.node.stopAllActions();
        this.node.setLocalZOrder(99999);
        this.node.active = true;
        this.node.opacity = 255;

        this.node.runAction(new cc.Sequence(new cc.DelayTime(2),new cc.FadeOut(2),new cc.CallFunc(function () {
            this.active = false;
            // this.destroy();
        }.bind(this.node))))
    },
});
