window.G_Req = {
    baseUrl : "https://drsj.sandbox.hnzhili.cn/",
    login(){
        var url = this.baseUrl + "api/public/login";
        console.log("G_Req login");
        var command = new G_BCGateWay.BCCommand(function(jsonData){
            if(jsonData.code == 0){
                console.log(jsonData)
                G_EventManager.pushEvent(G_Event.web_loginSuccess,[jsonData]);
            }else{
                console.log(jsonData.msg)
            }
        },url);

        command.setParam("app_id",G_Con.app_id);
        command.setParam("code",encodeURIComponent(G_WX.wx_code));
        command.setParam("encrypted_data",encodeURIComponent(G_WX.wx_encryptedData));
        command.setParam("iv",encodeURIComponent(G_WX.wx_iv));
        command.setParam("time_ms",new Date().getTime());

        G_BCGateWay.sendBCCommond(command);
    },

    reportScore(score,startTime,endTime){
        var url = this.baseUrl + "api/game/getGameData";
        console.log("G_Req reportScore");
        var command = new G_BCGateWay.BCCommand(function(jsonData){
            if(jsonData.code == 0){
                console.log(jsonData)
            }else{
                console.log(jsonData.msg)
            }
        },url);

        command.setParam("app_id",G_Con.app_id);
        command.setParam("user_id",G_User.user_id);

        command.setParam("start_times",startTime);
        command.setParam("end_times",endTime);
        // command.setParam("game_data",G_User.user_id);
        command.setParam("score",score);
        command.setParam("gold_card",G_User.gold_card);
        command.setParam("coin",G_User.coin);
        command.setParam("token",G_User.token);
        command.setParam("time_ms",new Date().getTime());

        G_BCGateWay.sendBCCommond(command);
    },


}
