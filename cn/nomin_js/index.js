var sponsor = getQueryString("sponsor");
var uid = getQueryString("uid");
var crid = getQueryString("crid");
var launch_id = getQueryString("launch_id");
if(crid==null)crid=1;//特别提醒：crid目前所有协议中都没用到，已废弃
var act_def_id = getQueryString("act_def_id");
if(act_def_id==null)act_def_id=15;
var act_his_id = getQueryString("act_his_id");
var nickname=null;
function href_index(){
    window.location.href="index.html?uid="+uid+"&sponsor="+sponsor+"&crid="+crid;
}
function href_join(){
    window.location.href="join.html?uid="+uid+"&sponsor="+sponsor+"&crid="+crid+"&launch_id="+launch_id;
}
function href_result(){
    window.location.href="result.html?uid="+uid+"&sponsor="+sponsor+"&crid="+crid+"&launch_id="+launch_id;
}
function back(){
    window.history.go(-1);
}
function li_img_click(userid){
    window.location.href="./?yjJumpClientPage=profile&uid="+userid;
}
var clientapp={
     uploadpic:function(type,callback){
        nativeProtol.startServiceFromClient("S_PHOTO",type,function(sid,param1,param2){
            //param1缩略图  param2原图
            //alert(param1+" "+param2);
            if(param1=="cancel"||param2=="cancel"||param1=="null"||param1=="(null)"||param2=="null"||param2=="(null)"||param1=="error"||param2=="error"){
                callback(false);
            }else{
                callback(true,param1);
            }
        });
    }
}
var Util = {
    countdown:{
        jdom:undefined,
        time:0,
        callback:null,
        isstart:0,
        init:function(time,jdom,callback){
            this.jdom=jdom;
            this.time=time;
            this.callback=callback;
            return this;
        },
        start:function(){
                this.isstart=1;
                this.jdom.html(this.time);
                this.fun = setTimeout(function(){
                    Util.countdown.time--;
                    if(Util.countdown.time>=0){Util.countdown.start()}else{
                        Util.countdown.isstart=0;
                        if(Util.countdown.callback)Util.countdown.callback();
                        Util.countdown.stop();
                    }
                },1000);
        },
        restart:function(time){
            this.time=time+1;
        },
        stop:function(){
            Util.countdown.isstart=0;
            clearTimeout(this.fun);
            //this.time=0;
            //this.start(0,this.jdom);
        }
    },
    randomNum:function(count){
        var result=[];
        if(count>0){
            for(var i=0;i<count;i++){
                result[i]=Math.floor(Math.random()*6+1);
            }
        }
        return result;
    },
    random:function(num1,num2){
        return Math.floor(Math.random()*(num2-num1)+num1);
    }
}
var variable={
    load_magnification_list:false,
    load_launch:false,
    load_come_into:false,
    load_ready:false,
    load_quit:false,
    load_get_start_status:false,
    load_get_player_status:false,
    load_get_message_list:false,
    load_set_message:false,
    load_game_start:false,
    load_shake_dice:false,
    load_brag:false,
    load_open_answer:false,
    load_brag_result:false,
    load_next_launch:false,
    load_get_heart_bean:false,
    load_game_over:false,
    load_ub_is_enough:false,
    load_dice_reward:false
}
var app={
    magnification_list:function(callback){
        if(!variable.load_magnification_list) {
            variable.load_magnification_list = true;
            $.ajax({
                url: serverUrl + "/magnification_list?callback=?",
                timeout: http_timeout,
                type: 'get',
                dataType: 'json',
                complete: function (XMLHttpRequest, status) {
                    variable.load_magnification_list=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    launch:function(magnification,callback){
        if(!variable.load_launch) {
            variable.load_launch = true;
            $.ajax({
                url: serverUrl + "/launch?callback=?",
                data: {"room_id": crid, "sponsor_id": sponsor,"magnification":magnification},
                timeout: http_timeout,
                type: 'get',
                dataType: 'json',
                complete: function (XMLHttpRequest, status) {
                    variable.load_launch = false;
                    if(callback==null){
                        var data =XMLHttpRequest.responseJSON;
                        if (status=="success"&&data.ret == 0) {
                            href_join(sponsor,uid,crid,data.launch_id);
                        }
                    }else {
                        callback(status, XMLHttpRequest.responseJSON);
                    }
                }
            });
        }
    },
    come_into:function(callback){
        if(!variable.load_come_into) {
            variable.load_come_into = true;
            $.ajax({
                url: serverUrl + "/come_into?callback=?",
                data: {"room_id": crid, "sponsor_id": sponsor, "user_id": uid},
                timeout: http_timeout,
                type: 'get',
                dataType: 'json',
                complete: function (XMLHttpRequest, status) {
                    variable.load_come_into = false;
                    if(callback==null){
                        var data =XMLHttpRequest.responseJSON;
                        if (status=="success"&&data.ret == 0) {
                            launch_id=data.launch_id;
                        }
                    }else {
                        callback(status, XMLHttpRequest.responseJSON);
                    }
                }
            });
        }
    },
    ready:function(callback){
        if(!variable.load_ready){
            variable.load_ready=true;
            $.ajax({
                url:serverUrl+"/ready?callback=?",
                data:{"room_id":crid,"sponsor_id":sponsor,"player_id":uid,"launch_id":launch_id},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_ready=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    quit:function(callback){
        if(!variable.load_quit){
            variable.load_quit=true;
            $.ajax({
                url:serverUrl+"/quit?callback=?",
                data:{"room_id":crid,"sponsor_id":sponsor,"player_id":uid,"launch_id":launch_id},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_quit=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    get_start_status:function(callback){
        if(!variable.load_get_start_status){
            variable.load_get_start_status=true;
            $.ajax({
                url:serverUrl+"/get_start_status?callback=?",
                data:{"room_id":crid,"sponsor_id":sponsor,"launch_id":launch_id},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_get_start_status=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    get_player_status:function(callback){
        if(!variable.load_get_player_status){
            variable.load_get_player_status=true;
            $.ajax({
                url:serverUrl+"/get_player_status?callback=?",
                data:{"launch_id":launch_id,"user_id": uid},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_get_player_status=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    get_message_list:function(msg_id,callback){
        if(!variable.load_get_message_list){
            variable.load_get_message_list=true;
            $.ajax({
                url:serverUrl+"/get_message_list?callback=?",
                data:{"launch_id":launch_id,"room_id":crid,"msg_id":msg_id,"count":10},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_get_message_list=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    set_message:function(content,callback){
        if(!variable.load_set_message){
            variable.load_set_message=true;
            $.ajax({
                url:serverUrl+"/set_message?callback=?",
                data:{"launch_id":launch_id,"room_id":crid,"user_id":uid,"nickname":nickname,"content":content,"type":1},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_set_message=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    game_start:function(callback){
        if(!variable.load_game_start){
            variable.load_game_start=true;
            $.ajax({
                url:serverUrl+"/game_start?callback=?",
                data:{"launch_id":launch_id,"room_id":crid,"user_id":uid,"sponsor_id":sponsor},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_game_start=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    shake_dice:function(dice_content,shake_count,callback){
        if(!variable.load_shake_dice){
            variable.load_shake_dice=true;
            $.ajax({
                url:serverUrl+"/shake_dice?callback=?",
                data:{"launch_id":launch_id,"room_id":crid,"player_id":uid,"sponsor_id":sponsor,"dice_content":dice_content,"shake_count":shake_count},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_shake_dice=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    brag:function(play_status,brag_answer,next_player_id,system_call,callback){
        if(!variable.load_brag){
            variable.load_brag=true;
            $.ajax({
                url:serverUrl+"/brag?callback=?",
                data:{"launch_id":launch_id,"room_id":crid,"player_id":uid,"sponsor_id":sponsor,"brag_answer":brag_answer,"next_player_id":next_player_id,"system_call":(system_call==null?1:system_call),"play_status":play_status},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_brag=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    open_answer:function(win_user_id,lose_user_id,system_call,callback){
        if(!variable.load_open_answer){
            variable.load_open_answer=true;
            $.ajax({
                url:serverUrl+"/open_answer?callback=?",
                data:{"launch_id":launch_id,"win_user_id":win_user_id,"lose_user_id":lose_user_id,"player_id":uid,"system_call":(system_call==null?1:system_call)},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_open_answer=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    brag_result:function(callback){
        if(!variable.load_brag_result){
            variable.load_brag_result=true;
            $.ajax({
                url:serverUrl+"/brag_result?callback=?",
                data:{"launch_id":launch_id},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_brag_result=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    next_launch:function(callback){
        if(!variable.load_next_launch){
            variable.load_next_launch=true;
            $.ajax({
                url:serverUrl+"/next_launch?callback=?",
                data:{"sponsor_id":sponsor,"room_id":crid},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_next_launch=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    game_over:function(callback){
        if(!variable.load_game_over){
            variable.load_game_over=true;
            $.ajax({
                url:serverUrl+"/game_over?callback=?",
                data:{"launch_id":launch_id},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_game_over=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    get_heart_bean:function(callback){
        if(!variable.load_get_heart_bean){
            variable.load_get_heart_bean=true;
            $.ajax({
                url:serverUrl+"/get_heart_bean?callback=?",
                data:{"sponsor_id":sponsor,"room_id":crid,"user_id":uid},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_get_heart_bean=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    ub_is_enough:function(callback){
        if(!variable.load_ub_is_enough){
            variable.load_ub_is_enough=true;
            $.ajax({
                url:serverUrl+"/ub_is_enough?callback=?",
                data:{"launch_id":launch_id,"player_id":uid},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_ub_is_enough=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    dice_reward:function(ub,msg,callback){
        if(!variable.load_dice_reward){
            variable.load_dice_reward=true;
            $.ajax({
                url:serverUrl+"/dice_reward?callback=?",
                data:{"launch_id":launch_id,"player_id":uid,"reward_ub":ub,"msg":msg},
                timeout : http_timeout,
                type : 'get',
                dataType:'json',
                complete:function(XMLHttpRequest,status){
                    variable.load_dice_reward=false;
                    if(callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    }
}
