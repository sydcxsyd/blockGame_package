cc.Class({
    extends: cc.Component,

    properties: {
        registLabel : {
            default: null,
            type: cc.Label
        },  
        registNameBox : {
            default: null,
            type: cc.EditBox
        },  
    },

    // use this for initialization
    onLoad: function () {

    },

    regist (){
        cc.log("regist")
        let name = this.registNameBox.string;
        G_Net.registerNickname(name);
    },

    getInfo (){
        cc.log("regist")
        let name = this.registNameBox.string;
        G_Net.getAssemblyInfo();
    },


    // called every frame
    update: function (dt) {

    },
});
