/**
 * Created by ht on 2016/9/6.
 */

window.G_EventManager = {
    listener : {
        listener : null,    //监听者
        handle : null,      //句柄
    },
    events:[],
    registerListener : function(eventName,Function,listener,paraList) {
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }
        var newListener = Object.create(this.listener);
        newListener.listener = listener;
        newListener.handle = Function;
        newListener.paraList = paraList;
        this.events[eventName].push(newListener);
    },

    unRegisterListener : function(eventName,listener) {
        if(eventName in this.events) {
            while(1){
                var isDelete = false;
                for(var i in this.events[eventName]){
                    var acter = this.events[eventName][i];
                    if(acter.listener == listener){
                        this.events[eventName].splice(i,1)
                        isDelete = true;
                        break;
                    }
                }
                if(!isDelete){
                    return;
                }
            }

        }
    },

    isRegisterListener : function(eventName){
        if(eventName in this.events) {
            return true;
        }
        return false;
    },

    logListentener : function(){
        log.i("---------------------------------start---------------------------------");
        for(var i in this.events){
            var index = 0;
            for(var j in this.events[i]){
                log.i(i,index++)
            }
        }
        log.i("---------------------------------end---------------------------------");
    },

    pushEvent : function(eventName,paramaterList/* array */){
        if(eventName in this.events) {
            var list = [];
            for(var i in this.events[eventName]){
                list.push(this.events[eventName][i]);
            }
            for(var i in list){
                var acter = list[i];
                var fuc = acter.handle;
                var that = acter.listener;
                //var callFunc = fuc.bind(that);
                if(acter.paraList){
                    fuc.apply(that,acter.paraList);
                }else{
                    fuc.apply(that,paramaterList);
                }

            }
        }
    },
};