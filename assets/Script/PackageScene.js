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
        choosePage : {
            default : 0,
            visible : false,
        },

        pageType : {
            default : {
                mine : 1,
                history : 2,
                market : 3,
            },
            visible : false,
        }
    },

    start () {

    },

    onClickSendEvent (event){
        
    },

    onClickHistoryEvent (event){

    },

    onClickMineEvent (event){

    },

    onClickMarketEvent (event){

    },

    // update (dt) {},
});
