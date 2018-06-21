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
        jumpSpeed : 0,
        gravity : 0,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.body = this.getComponent(cc.RigidBody);
    },

    start () {

    },

    dead (){
        cc.log("dead!!!!!");
        this.node.emit(G_Event.BirdDead,"isDead");
    },

    reset (){
        this.node.setPosition(0,0);
        this.body.linearVelocity = cc.v2(0,0)
    },

    jump (){
        cc.log("jump!!!!!");
        var velocity = this.body.linearVelocity;
        this.body.linearVelocity = cc.v2(0,this.jumpSpeed);        
    },

     onCollisionEnter: function (other) {
        this.dead();
    },

    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },

    onCollisionExit: function () {
        
    },
});
