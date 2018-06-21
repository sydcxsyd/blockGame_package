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
        stickLengthenSpeed : 1,
    },
    stoneList : null,
    isStickLengthening : false,
    // LIFE-CYCLE CALLBACKS:
    start () {

    },
    
    onLoad () {
        this.node.on("touchstart",this.startTouch,this);
        this.node.on("touchend",this.endTouch,this);

        this.stick = this.node.getChildByName("stick");

        this.stoneList = [];
    },

    startTouch(){
        this.isStickLengthening = true;
    },

    endTouch(){
        this.isStickLengthening = false;
    },

    stickStartLengthen(){

    },

    stickEndLengthen(){

    },

    playerMove(){

    },

    next(){
        this.clean();
        this.createNewStone();
        this.sreenMove();
        this.destroyOldStone();
    },

    clean(){

    },

    createNewStone(){
    	let node = new cc.Node('Sprite');
	    let sp = node.addComponent(cc.Sprite);

	    sp.spriteFrame = "Texture/pipe.png";
	    node.parent = this.node;

	    this.stoneList = []
    },

    sreenMove(){

    },

    destroyOldStone(){

    },

    update (dt) {
        if(this.isStickLengthening){
            var size = this.stick.getContentSize();
            size.height += this.stickLengthenSpeed;
            this.stick.setContentSize(size);
        }
    },
});
