cc.Class({
    extends: cc.Component,

    properties: {
        startButton: cc.Button,        
    },

    // use this for initialization
    onLoad: function () {        
        G_Net.init();
        this.startButton.node.on("click", function ()
        {
            cc.director.loadScene("gameSceneBird");
        })
        let startButton = this.startButton;

        G_EventManager.registerListener(G_Event.web_loginSuccess,this.loginSuccess,this);

        // this.autoLogin();
    },

    autoLogin (){
        G_Net.login();
    },

    loginSuccess(){
        wx.showModal({
            title: "用户登录",
            content: "登录成功"
        });
    },

    // called every frame
    // update: function (dt) {

    // },

    onDestroy(){
        G_EventManager.unRegisterListener();
    },

});
