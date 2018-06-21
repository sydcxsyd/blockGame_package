window.G_Net = {
    eventNode : null,
    isInit : false,
	init (){
		if(this.isInit){
			return;
		}
		this.isInit = true;
		G_EventManager.registerListener(G_Event.wx_wxLoginSuccess,G_WX.getUserInfo,G_WX);
        G_EventManager.registerListener(G_Event.wx_getUserInfoSuccess,G_Req.login,G_Req);
        G_EventManager.registerListener(G_Event.web_loginSuccess,function (jsonData) {
            console.log("login success")
            console.log(jsonData)
            G_User.user_id = jsonData.user.user_id;
            G_User.token = jsonData.user.token;
        },this)
	},

	login () {
		G_WX.wxLogin();
    },


        
};


