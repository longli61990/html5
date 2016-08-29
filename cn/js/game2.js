var gamestate;
var game={
    gamestate:2,//游戏状态
    game_isstart:0,//游戏是否还可以开始
    game_isready:0,//游戏是否还可以准备
    game_user:{},//当前用户信息
    game_user_status:0,//当前用户状态（旁观者状态定义为100）
    game_user_online:0,//用户在线状态
    game_user_ph:null,//用户作为牌位号（旁观者为NULL）
    game_msg_currmsgid:0,//当前拉取到的消息最后一条ID
    game_player:null,//参与玩的用户信息
    game_yao_count:0,//摇的次数
    game_yao_result:[],//摇的结果
    game_jiao_user_curr_ph:null,//当前叫的人的座位号
    game_jiao_count:0,//叫过的次数
    game_jiao_result:[],//叫的结果，只存本人的
    game_jiao_result_last:[1,1],//存游戏中最后一个叫的点数，贯穿整个游戏中
    game_iskai:0,//游戏是否已经开
    game_user_kai_ph:null,//开的人牌位号
    game_kai_result:[],//kai的结果
    game_win_fail_ph:[],//赢得人的座位号和输的人座位号
    game_play_video_is:[1,1,1,1,1,1],//记录每个人是否可播放音频
    game_magnification:50,//游戏基础金额
    game_load_result_html2_count:0,
    game_is_jiao_one:0,
    game_resource:{},
    train_gamestate_switch:1,//开关
    train_playerstate_switch:1,
    train_heart_bean_switch:1,
    train_msg_switch:1,
    train_new_launch_switch:1,
    game_dj:{"100":"qd","10000":"yb","100000":"zs"},//游戏等级
    game_dom:{div_before:{dom:$(".div_before"),state:1,children:{before_seat:{dom:$(".before_seat")}}},div_start:{dom:$(".div_start"),state:0},div_result:{dom:$(".div_result"),state:0},msg_content:{dom:$(".msg_content")},div_ds:{dom:$(".div_ds")}},
    game_dom_start:{before_operation_div:{dom:$(".before_operation div")},curr_bs:{dom:$(".curr_bs")},curr_dj_img:{dom:$(".curr_dj_img"),state:0},money:{dom:$(".money")},start_user_info:{dom:$(".start_user_info")},div_jiao:{dom:$(".div_jiao"),children:{jiao_pop:{dom:$(".jiao_pop"),children:{jiao_result_1:{dom:$("#jiao_result_1")},jiao_result_2:{dom:$("#jiao_result_2")},jiao_pop_select1:{dom:$(".jiao_pop_select1")},jiao_pop_select2:{dom:$(".jiao_pop_select2")}}}}},div_guan:{dom:$(".div_guan"),children:{guan_result:{dom:$(".guan_result")},grid_0:{dom:$(".grid_0")},grid_1:{dom:$(".grid_1")},grid_2:{dom:$(".grid_2")},grid_3:{dom:$(".grid_3")},grid_4:{dom:$(".grid_4")},grid_5:{dom:$(".grid_5")}}}},
    game_dom_result:{restart:{dom:$(".restart")},result_title:{dom:$(".result_title")},result_win:{dom:$(".result_win"),children:{img_winavatar:{dom:$(".img_winavatar")},win_nickname:{dom:$(".win_nickname")},win_ub:{dom:$(".win_ub")}}},result_fail:{dom:$(".result_fail"),children:{img_failavatar:{dom:$(".img_failavatar")},fail_nickname:{dom:$(".fail_nickname")},fail_ub:{dom:$(".fail_ub")}}}},
    game_dom_pop:{djs_pop:{dom:$("#djs_pop"),state:0,children:{go_djs:{dom:$("#go_djs")}}}},
    system_user:[
        {player_id:0,player_name:"赵丽颖",player_url:"img/avatar/0.jpg",gender:"0"},
        {player_id:1,player_name:"梅长苏",player_url:"img/avatar/1.jpg",gender:"1"},
        {player_id:2,player_name:"芈月公主",player_url:"img/avatar/2.jpg",gender:"0"},
        {player_id:3,player_name:"孔女神",player_url:"img/avatar/3.jpg",gender:"1"},
        {player_id:4,player_name:"鹿晗",player_url:"img/avatar/4.jpg",gender:"1"},
        {player_id:5,player_name:"Angelababy",player_url:"img/avatar/5.jpg",gender:"0"},
        {player_id:6,player_name:"陈奕迅",player_url:"img/avatar/6.jpg",gender:"1"},
        {player_id:7,player_name:"尔康",player_url:"img/avatar/7.jpg",gender:"1"},
        {player_id:8,player_name:"范爷",player_url:"img/avatar/8.jpg",gender:"0"},
        {player_id:9,player_name:"李易峰",player_url:"img/avatar/9.jpg",gender:"1"},
        {player_id:10,player_name:"坡姐",player_url:"img/avatar/10.jpg",gender:"0"},
        {player_id:11,player_name:"宋茜",player_url:"img/avatar/11.jpg",gender:"0"},
        {player_id:12,player_name:"唐嫣",player_url:"img/avatar/12.jpg",gender:"0"},
        {player_id:13,player_name:"塘主",player_url:"img/avatar/13.jpg",gender:"1"},
        {player_id:14,player_name:"佟丽娅",player_url:"img/avatar/14.jpg",gender:"0"},
        {player_id:15,player_name:"王大锤",player_url:"img/avatar/15.jpg",gender:"1"},
        {player_id:16,player_name:"王凯",player_url:"img/avatar/16.jpg",gender:"1"},
        {player_id:17,player_name:"张钧甯",player_url:"img/avatar/17.jpg",gender:"0"},
        {player_id:18,player_name:"志玲姐姐",player_url:"img/avatar/18.jpg",gender:"0"},
        {player_id:19,player_name:"周杰伦",player_url:"img/avatar/19.jpg",gender:"1"}
    ],
    system_msgs:{1:"欢迎{0}{1}，4个人就能玩了，点左下角“?”先看看怎么玩吧！。",2:"我替{0}叫了{1}个{2}"},
    system_game_play_user_count:5,
    train_playerstate:function(){
                    var html="";
                    var user_ishave=false;
                    if(game.gamestate==2||game.gamestate==23){
                            for(var i=0;i<game.game_player.length;i++) {
                                var user = game.game_player[i];
                                var li_dom = game.game_dom_start.userli[i].dom;
                                if(user.player_status!=1){
                                    game.game_dom_start.userli[i].children.lx.dom.show();
                                }else{
                                    game.game_dom_start.userli[i].children.lx.dom.hide();
                                }
                                if (user.player_join_status >= 2) {
                                    var html_point_area="";
                                    if (user.player_id == uid) {
                                        var point = JSON.parse(user.player_dice_content);
                                        for (var j = 0; j < point.length; j++) {
                                            html_point_area += '<img style="opacity: 1" src="img/point_r_' + point[j] + '.png">';
                                        }
                                    } else {
                                        for (var j = 0; j < 5; j++) {
                                            html_point_area += '<img src="img/jiao_before.png">';
                                        }
                                    }
                                   // alert(i+"  "+game.game_dom_start.userli[i].children.point_area.addCount);
                                    if(!game.game_dom_start.userli[i].children.point_area.addCount||game.game_dom_start.userli[i].children.point_area.addCount==0){
                                        game.game_dom_start.userli[i].children.point_area.dom.html(html_point_area),game.game_dom_start.userli[i].children.point_area.addCount++;
                                    }
                                }
                                if (user.player_join_status >= 3 &&user.player_join_status%2!=0) {
                                    game.game_jiao_user_curr_ph=i;
                                    if (user.player_id == uid) {
                                        for (var m = 0; m < game.game_dom_start.userli.length; m++) {
                                            game.game_dom_start.userli[m].children.paopao.dom.html("").hide();
                                            game.game_dom_start.userli[m].children.jiao.dom.hide();
                                            game.game_dom_start.userli[m].children.kai.dom.hide();
                                        }
                                        game.game_dom_start.userli[i].children.jiao.dom.show();
                                        if (game.game_jiao_count > 0) {
                                            if (i > 0) {
                                                game.game_dom_start.userli[i-1].children.kai.dom.show();
                                                var prev_answerA = JSON.parse(game.game_player[i - 1].player_brag_answer);
                                                game.game_dom_start.userli[i - 1].children.paopao.dom.html(prev_answerA[0] + "个" + prev_answerA[1]).show();
                                                game.playVideo_jiao(prev_answerA[0], prev_answerA[1]);
                                                game.game_jiao_result_last=prev_answerA;
                                                if(prev_answerA[1]==1)game.game_is_jiao_one=1;
                                            } else {
                                                game.game_dom_start.userli[game.game_dom_start.userli.length - 1].children.kai.dom.show();
                                                var prev_answerA = JSON.parse(game.game_player[game.game_player.length - 1].player_brag_answer);
                                                game.game_dom_start.userli[game.game_player.length - 1].children.paopao.dom.html(prev_answerA[0] + "个" + prev_answerA[1]).show();
                                                game.playVideo_jiao(prev_answerA[0], prev_answerA[1]);
                                                game.game_jiao_result_last=prev_answerA;
                                                if(prev_answerA[1]==1)game.game_is_jiao_one=1;
                                            }
                                        }
                                        //启动倒计时
                                        if (!Util.countdown.isstart) {
                                            Util.countdown.init(30, $("#jiao_djs"), function () {
                                                game.jiaook(2);
                                            }).start();
                                        }
                                    } else {
                                        for (var m = 0; m < game.game_dom_start.userli.length; m++) {
                                            game.game_dom_start.userli[m].children.paopao.dom.html("").hide();
                                            game.game_dom_start.userli[m].children.jiao.dom.hide();
                                            game.game_dom_start.userli[m].children.kai.dom.hide();
                                        }
                                        game.game_dom_start.userli[i].children.paopao.dom.html("纠结中...").show();
                                        if (game.game_jiao_count > 0) {
                                            if (i > 0) {
                                                var prev_answerA = JSON.parse(game.game_player[i - 1].player_brag_answer);
                                                game.game_dom_start.userli[i - 1].children.paopao.dom.html(prev_answerA[0] + "个" + prev_answerA[1]).show();
                                                game.playVideo_jiao(prev_answerA[0], prev_answerA[1]);
                                                game.game_jiao_result_last=prev_answerA;
                                                if(prev_answerA[1]==1)game.game_is_jiao_one=1;
                                            } else {
                                                var prev_answerA = JSON.parse(game.game_player[game.game_player.length - 1].player_brag_answer);
                                                game.game_dom_start.userli[game.game_player.length - 1].children.paopao.dom.html(prev_answerA[0] + "个" + prev_answerA[1]).show();
                                                game.playVideo_jiao(prev_answerA[0], prev_answerA[1]);
                                                game.game_jiao_result_last=prev_answerA;
                                                if(prev_answerA[1]==1)game.game_is_jiao_one=1;
                                            }
                                        }
                                        if (!Util.countdown.isstart) {
                                            Util.countdown.stop();
                                            Util.countdown.init(3, $("#jiao_djs"), function () {
                                                game.jiaook(1);
                                            }).start();
                                        }
                                    }

                                }else if (user.player_join_status > 3 && user.player_join_status<50 &&user.player_join_status%2==0) {
                                    /**if (user.player_id == uid) {
                                        //用户刚叫之后的状态不一定及时轮训出来，会有重启计时器的可能，所以此处判断定时器在启动就停掉，定时器30s-轮训2秒有足够的时间在定时器跑完之前停掉
                                        if (Util.countdown.isstart)Util.countdown.stop();
                                    }**/
                                }else if(user.player_join_status == 50){
                                    game.game_user_kai_ph=i;
                                    if(i>0){
                                        game.game_kai_result=JSON.parse(game.game_player[i-1].player_brag_answer);
                                    }else{
                                        game.game_kai_result=JSON.parse(game.game_player[game.game_player.length-1].player_brag_answer);
                                    }
                                    if(game.game_iskai==0){
                                        game.game_iskai=1;
                                        game.game_dom_start.userli[i].children.paopao.dom.html("开").show();
                                        game.playVideo_kai();
                                        game.train_playerstate_switch=0;//停止轮训
                                        //做动画
                                        setTimeout(function(){
                                            game.game_dom_start.userli[game.game_user_kai_ph].children.paopao.dom.html("").hide();
                                            game.game_dom_start.div_guan.dom.show();
                                            //做ending动画
                                           game.last_result();
                                        },1000);
                                    }
                                }else{

                                }
                                if (user.player_id == uid) {
                                    user_ishave = true;
                                    game.game_user = user;
                                }
                            }

                        }
                        if(user_ishave){
                            game.game_user_status=game.game_user.player_join_status;
                            game.game_user_online= game.game_user.player_status;

                        }else{
                            game.game_user=null;
                            game.game_user_status=100;//代表旁观
                        }
            if(game.train_playerstate_switch)setTimeout(game.train_playerstate,2000);
    },
    send_msg:function(nickname,content){
        var html='<div><span>'+nickname+':</span><span>'+content+'</span></div>';
        game.game_dom.msg_content.dom.append(html);
        viewH =game.game_dom.msg_content.dom.height(),//可见高度
        contentH =game.game_dom.msg_content.dom.get(0).scrollHeight,//内容高度
        game.game_dom.msg_content.dom.scrollTop(contentH-viewH);
    },

    start:function(){
        game.game_dom_start.curr_bs.dom.hide();
        this.gamestate=2;
        this.game_user_status=1;
        var player_po=Util.randoms(0,this.system_user.length-1,this.system_game_play_user_count);
        this.game_player=[{player_id:uid,player_name:"秀主",player_url:"img/default.png",player_status:"1"}];
        for(var j=1;j<=player_po.length;j++){
            this.game_player[j]=this.system_user[player_po[j-1]];
            var points=Util.randomNum(5);
            this.game_player[j].player_dice_content=JSON.stringify(points);
            this.game_player[j].player_join_status=2;
            this.game_player[j].player_status=1;
        }
        var html ="";
        for(var i=0;i<this.game_player.length;i++){
            var user =this.game_player[i];
            html+='<li uid="'+user.player_id+'">';
            html+='<img class="avatar_s_2" src="'+user.player_url+'">';
            html+='<img class="lx" src="img/offline.png">';
            html+='<img class="avatar_s_2_bg" src="img/avatar_s.png">';
            html+='<span class="nickname">'+user.player_name+'</span>';
            html+='<img class="win_result ani_winorfail" src="img/win.png">';
            html+='<img class="fail_result ani_winorfail" src="img/fail.png">';
            html+='<img class="jiao ani_xz" src="img/jiao.png" onclick="game.jiao();">';
            html+='<img class="kai ani_xz" src="img/kai.png"  onclick="game.kai();">';
            html+='<img class="line" src="img/line.png">';
            html+='<div class="point_area">';
            html+='</div>';
            html+='<div class="paopao ani_paopao"></div>';
            html+='</li>';
            if(user.player_id==uid){
                game.game_user_ph=i;
                game.game_user=user;
            }else{
                var xb="美女";
                if(user.gender==1)xb="帅哥";
                game.send_msg("法官",game.system_msgs[1].format(xb,user.player_name));
            }
        }
        game.game_dom_start.start_user_info.dom.html(html);
        if(!game.game_dom_start.userli)game.game_dom_start.userli=[];
        for(var i=0;i<this.game_player.length;i++) {
            if (!game.game_dom_start.userli[i]){
                game.game_dom_start.userli[i] ={dom:game.game_dom_start.start_user_info.dom.children("li").eq(i)},
                    game.game_dom_start.userli[i].children={avatar:{dom:game.game_dom_start.userli[i].dom.children(".avatar_s_2")},nickname:{dom:game.game_dom_start.userli[i].dom.children(".nickname")},point_area:{dom:game.game_dom_start.userli[i].dom.children(".point_area"),addCount:0},paopao:{dom:game.game_dom_start.userli[i].dom.children(".paopao")},jiao:{dom:game.game_dom_start.userli[i].dom.children(".jiao")},kai:{dom:game.game_dom_start.userli[i].dom.children(".kai")},win_result:{dom:game.game_dom_start.userli[i].dom.children(".win_result")},fail_result:{dom:game.game_dom_start.userli[i].dom.children(".fail_result")},lx:{dom:game.game_dom_start.userli[i].dom.children(".lx")}};
            }
        }
        if(game.game_dom.div_before.state==1)game.game_dom.div_before.dom.hide(),game.game_dom.div_before.state=0;
        if(game.game_dom.div_start.state==0)game.game_dom.div_start.dom.show(),game.game_dom.div_start.state=1;
        if(game.game_user_status==1){//用户处于准备状态（当游戏状态为2，用户状态为1，表示刚开始游戏，需要要筛子）
            game.firstGgk();
        }
        app.user(function(status,data){
            if(status=="success"&&data.ret==0){
                var user={player_id:uid,player_name:data.uname,gender:data.gender,player_url:data.avatar,player_status:"1"};
                game.game_player[0]=user;
                game.game_dom_start.userli[0].children.avatar.dom.attr("src",user.player_url);
                game.game_dom_start.userli[0].children.nickname.dom.html(user.player_name);
                var xb="美女";
                if(user.gender==1)xb="帅哥";
                game.send_msg("法官",game.system_msgs[1].format(xb,user.player_name));
            }
        });
        this.train_playerstate();
    },
    ggk_isdraw:0,
    firstGgk:function(){
        if($(".div_kai").attr("show")!=1){
            $(".div_kai").show().attr("show","1");
            $("#ggk_result").html("");
            var points=Util.randomNum(5);
            for(var i=0;i<points.length;i++){
                document.getElementById("ggk_result").appendChild(game.game_resource.img["point"+points[i]].cloneNode());
            }
            $("#ggk_draw").html("");
            $("#ggk_draw").ggk({
                scratchDown:function(){
                    //canvas.style.backgroundImage='url('+img.src+')';
                    $(".ggk_bt").show();
                    game.ggk_isdraw=1;
                }
            });
            game.game_yao_result=points;
            game.game_yao_count++;
            Util.countdown.init(15,$("#ggk_djs"),function(){
                game.game_player[0].player_dice_content=JSON.stringify(game.game_yao_result);
                game.game_player[0].player_join_status=2;
                var index=Util.random(0,game.game_player.length-1);
                game.game_player[index].player_join_status=3;
                $(".div_kai").hide();
            }).start();
        }
    },
    resetGgk:function(){
                game.ggk_isdraw=0;
                $("#ggk_result").html("");
                var points=Util.randomNum(5);
                for(var i=0;i<points.length;i++){
                    document.getElementById("ggk_result").appendChild(game.game_resource.img["point"+points[i]].cloneNode());
                }
                $("#ggk_draw").html("");
                $("#ggk_draw").ggk({
                    color: "#ACAA9C",
                    scratchDown:function(){
                        game.ggk_isdraw=1;
                    },
                    scratchMove: function() {

                    }
                });
                game.game_yao_result=points;
                game.game_yao_count++;
                Util.countdown.restart(15);

    },
    ggkok:function(){
        if(game.ggk_isdraw){
            $(".div_kai").hide();
            game.game_player[0].player_dice_content=JSON.stringify(game.game_yao_result);
            game.game_player[0].player_join_status=2;
            var index=Util.random(0,game.game_player.length-1);
            game.game_player[index].player_join_status=3;
            Util.countdown.stop();
        }else{
            alert("请刮卡");
        }
    },
    jiao:function(){
        var playerCount=game.game_player.length;//获取有几个人玩
        var prev_user_ph=(game.game_user_ph>0?game.game_user_ph-1:playerCount-1);//获取上一个人的座位号
        var prev_answer=game.game_player[prev_user_ph].player_brag_answer;//获取上一个叫的结果
        var select1,select2;
        if(prev_answer==null){
            select1=[3,8],select2=[1,6];
        }else{
            var prev_answerA=JSON.parse(prev_answer);
            if(prev_answerA[0]>=playerCount*5&& prev_answerA[1]==6){
                popupNew("前方已经超能,无法继续叫,请直接开");
                return;
            }
            var select1_b=(prev_answerA[1]==6?prev_answerA[0]+1:prev_answerA[0]);
            var select1_a=((select1_b+5)<=playerCount*5?(select1_b+5):playerCount*5);
            var select2_b=(prev_answerA[1]==6?1:prev_answerA[1]+1);
            select1=[select1_b,select1_a],select2=[select2_b,6];
        }
        game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_result_1.dom.html("<label>"+select1[0]+"</label>");
        game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_result_2.dom.html('<img src="img/point_r_'+select2[0]+'.png">');
        game.game_jiao_result=[select1[0],select2[0]];
        game.game_dom_start.div_jiao.dom.show();
        var html="";
        for(var k=select1[0];k<=select1[1];k++){
            html+="<span>"+k+"</span>";
        }
        game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_pop_select1.dom.html(html);
        game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_pop_select2.dom.children("span").removeClass("available");
        for(var k=select2[0];k<=select2[1];k++){
            game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_pop_select2.dom.children("span").eq(k-1).addClass("available");
        }
        game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_pop_select1.dom.children("span").click(function(){
            $(this).addClass("clickafter").siblings().removeClass("clickafter");
            game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_result_1.dom.html("<label>"+$(this).html()+"</label>");
            game.game_jiao_result[0]=parseInt($(this).html());
            game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_pop_select2.dom.children("span").removeClass("available");
            if($(this).html()==select1[0]){
                for(var k=select2[0];k<=select2[1];k++){
                    game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_pop_select2.dom.children("span").eq(k-1).addClass("available");
                }
                game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_result_2.dom.html('<img src="img/point_r_'+select2[0]+'.png">');
                game.game_jiao_result[1]=select2[0];
            }else{
                for(var k=1;k<=6;k++){
                    game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_pop_select2.dom.children("span").eq(k-1).addClass("available");
                }
            }
        });
        game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_pop_select2.dom.children("span").click(function(){
            if($(this).attr("class")=="available"){
            $(this).addClass("clickafter").siblings().removeClass("clickafter");
            game.game_dom_start.div_jiao.children.jiao_pop.children.jiao_result_2.dom.html('<img src="img/point_r_'+($(this).index()+1)+'.png">');
            game.game_jiao_result[1]=$(this).index()+1;
            }
        });
    },
    jiaook:function(system_call){
        if(!system_call)system_call=0;//默认用户叫
        if(Util.countdown.isstart)Util.countdown.stop();
        var join_count = game.game_player.length;
        var prev_user_ph=(game.game_jiao_user_curr_ph>0?game.game_jiao_user_curr_ph-1:join_count-1);//获取上一个人的座位号
        var next_user_ph=(game.game_jiao_user_curr_ph>=join_count-1?0:game.game_jiao_user_curr_ph+1);//获取xia一个人的座位号
        game.game_dom_start.div_jiao.dom.hide();
        game.game_dom_start.userli[game.game_jiao_user_curr_ph].dom.children(".jiao").hide();
        game.game_dom_start.userli[prev_user_ph].dom.children(".kai").hide();
        if(system_call==1||system_call==2){
            var prev_answer=game.game_player[prev_user_ph].player_brag_answer;//获取上一个叫的结果
            $("#wid").html(prev_answer);
            var select1,select2;
            if(prev_answer==null){
                select1=[3,8],select2=[1,6];
            }else{
                var prev_answerA=JSON.parse(prev_answer);
                var result_count=0;
                for(var i=0;i<join_count;i++){
                    var dice_contentA=JSON.parse(game.game_player[i].player_dice_content);
                    for(var j=0;j<dice_contentA.length;j++){
                        if(dice_contentA[j]==prev_answerA[1] || (dice_contentA[j]==1 && game.game_is_jiao_one==0))result_count++;
                    }
                }
                if(result_count>=prev_answerA[0]) {//开的人输

                }else{
                    game.kai();
                    return;
                }
                if(prev_answerA[0]>=join_count*5){
                    game.kai();
                    return;
                }
                var select1_b=(prev_answerA[1]==6?prev_answerA[0]+1:prev_answerA[0]);
                var select1_a=((select1_b+5)<=join_count*5?(select1_b+5):join_count*5);
                var select2_b=(prev_answerA[1]==6?1:prev_answerA[1]+1);
                select1=[select1_b,select1_a],select2=[select2_b,6];
            }
            var jiao_num=Util.random(1,6);
            result_count=0;
            for(var i=0;i<join_count;i++){
                var dice_contentA=JSON.parse(game.game_player[i].player_dice_content);
                for(var j=0;j<dice_contentA.length;j++){
                    if(dice_contentA[j]==jiao_num || (dice_contentA[j]==1 && game.game_is_jiao_one==0))result_count++;
                }
            }
            if(result_count<select1[1] && result_count>=(select1[0]+1)){
                game.game_jiao_result=[Util.random(select1[0]+1,result_count),jiao_num];
            }else if(result_count<(select1[0]+1)) {
                game.game_jiao_result=[select1[0]+1,jiao_num];
            }else{
                game.game_jiao_result=[Util.random(select1[0]+1,select1[1]),jiao_num];
            }
        }

        if(game.game_jiao_result.length<2){alert("请输入");return;}
        game.game_player[game.game_jiao_user_curr_ph].player_brag_answer=JSON.stringify(game.game_jiao_result);
        game.game_player[game.game_jiao_user_curr_ph].player_join_status++;
        game.game_player[next_user_ph].player_join_status++;

        if(game.game_jiao_result[1]==1)game.game_is_jiao_one=1;
        game.game_jiao_count++;
        if(system_call==2){
            game.send_msg("法官",game.system_msgs[2].format(game.game_player[game.game_jiao_user_curr_ph].player_name,game.game_jiao_result[0],game.game_jiao_result[1]))
        }
    },
    jiaoclose:function(){
        game.game_dom_start.div_jiao.dom.hide();
    },
    kai:function(system_call){
        if(Util.countdown.isstart)Util.countdown.stop();
        game.game_player[game.game_jiao_user_curr_ph].player_join_status=50;
        var win_user_id,lose_user_id;
        var join_count = game.game_player.length;
        var prev_user_ph=(game.game_jiao_user_curr_ph>0?game.game_jiao_user_curr_ph-1:join_count-1);//获取上一个人的座位号
        var next_user_ph=(game.game_jiao_user_curr_ph>=join_count-1?0:game.game_jiao_user_curr_ph+1);//获取xia一个人的座位号
        game.game_dom_start.userli[game.game_jiao_user_curr_ph].dom.children(".jiao").hide();
        game.game_dom_start.userli[prev_user_ph].dom.children(".kai").hide();
        var prev_user=game.game_player[prev_user_ph];
        var prev_answerA=JSON.parse(prev_user.player_brag_answer);
        var kai_point=prev_answerA[1],kai_point_count=prev_answerA[0];
        var result_count=0;
        for(var i=0;i<join_count;i++){
            var dice_contentA=JSON.parse(game.game_player[i].player_dice_content);
            for(var j=0;j<dice_contentA.length;j++){
                if(dice_contentA[j]==kai_point || (dice_contentA[j]==1 && game.game_is_jiao_one==0))result_count++;
            }
        }
        if(result_count>kai_point_count){//开的人输
            win_user_id=prev_user.player_id;
            lose_user_id = game.game_player[game.game_jiao_user_curr_ph].player_id;
        }else{//被开的人输
            lose_user_id = prev_user.player_id;
            win_user_id = game.game_player[game.game_jiao_user_curr_ph].player_id;
        }
        //alert(win_user_id+"  "+lose_user_id+"  result_count="+result_count+"  kai_point_count="+kai_point_count);
        if(!system_call)system_call=0;
        if(Util.countdown.isstart)Util.countdown.stop();
        game.game_user_kai_ph = game.game_jiao_user_curr_ph;
        game.game_kai_result = JSON.parse(game.game_player[prev_user_ph].player_brag_answer);
        if (game.game_iskai == 0) {
            game.game_iskai = 1;
            game.game_dom_start.userli[game.game_user_kai_ph].children.paopao.dom.html("开").show();
            game.playVideo_kai();
            game.train_playerstate_switch = 0;//停止轮训
            //做动画
            setTimeout(function () {
                game.game_dom_start.userli[game.game_user_kai_ph].children.paopao.dom.html("").hide();
                game.game_dom_start.div_guan.dom.show();
                //做ending动画
                game.last_result();
            }, 1000);
        }
    },
    last_result:function(){
        var result_count=0;

        this.last_result.loop=function(g){
            if(g<game.game_dom_start.userli.length){
                game.game_dom_start.userli[g].children.point_area.dom.html("");
                var dice_contentA=JSON.parse(game.game_player[g].player_dice_content);
                for(var j=0;j<dice_contentA.length;j++){
                    var img=game.game_resource.img["point_r_"+dice_contentA[j]].cloneNode();
                    if(dice_contentA[j]==game.game_kai_result[1] || (dice_contentA[j]==1 && game.game_is_jiao_one==0)){
                        result_count++;
                        img.style.opacity=1;
                    }
                    game.game_dom_start.userli[g].children.point_area.dom[0].appendChild(img);
                }
                var obj2 = (result_count+"").split("");
                var html_guan_result="";
                for(var m=0;m<obj2.length;m++){
                    html_guan_result+='<img src="img/guan_num_'+obj2[m]+'.png">';
                }
                game.game_dom_start.div_guan.children.guan_result.dom.html(html_guan_result);
                game.game_dom_start.div_guan.children["grid_"+g].dom.show();
                g++;
                setTimeout("game.last_result.loop("+g+")",1000);
            }else{
                if(game.game_kai_result[0]>result_count){
                    game.game_dom_start.userli[game.game_user_kai_ph].children.win_result.dom.show();
                    game.game_dom_start.userli[(game.game_user_kai_ph==0?game.game_player.length-1:game.game_user_kai_ph-1)].children.fail_result.dom.show();
                    game.game_win_fail_ph=[game.game_user_kai_ph,(game.game_user_kai_ph==0?game.game_player.length-1:game.game_user_kai_ph-1)];
                }else{
                    game.game_dom_start.userli[game.game_user_kai_ph].children.fail_result.dom.show();
                    game.game_dom_start.userli[(game.game_user_kai_ph==0?game.game_player.length-1:game.game_user_kai_ph-1)].children.win_result.dom.show();
                    game.game_win_fail_ph=[(game.game_user_kai_ph==0?game.game_player.length-1:game.game_user_kai_ph-1),game.game_user_kai_ph];
                }
                setTimeout(game.load_result_html,3000);
            }
        }
        this.last_result.loop(0);
    },
    load_result_html:function(){
        if(game.gamestate!=3){
            game.gamestate=3;
            game.game_load_result_html2_count++;
        }
        if(game.game_win_fail_ph[0]==game.game_user_ph){
            game.game_dom_result.result_title.dom.html('<img class="result_zha" src="img/win_title.png">');
        }else if(game.game_win_fail_ph[1]==game.game_user_ph){
            game.game_dom_result.result_title.dom.html('<img class="result_zha" src="img/fail_title.png">');
        }
        var failub=game.game_magnification*game.game_jiao_count;
        game.game_dom_result.result_win.children.img_winavatar.dom.attr("src",game.game_player[game.game_win_fail_ph[0]].player_url);
        game.game_dom_result.result_win.children.win_nickname.dom.html(game.game_player[game.game_win_fail_ph[0]].player_name);
        //game.game_dom_result.result_win.children.win_ub.dom.html(game.game_jiao_count+" × ");
        //game.game_dom_result.result_win.children.win_ub.dom[0].appendChild(game.game_resource.img[game.game_dj[game.game_magnification]].cloneNode());
        game.game_dom_result.result_fail.children.img_failavatar.dom.attr("src",game.game_player[game.game_win_fail_ph[1]].player_url);
        game.game_dom_result.result_fail.children.fail_nickname.dom.html(game.game_player[game.game_win_fail_ph[1]].player_name);
        //game.game_dom_result.result_fail.children.fail_ub.dom.html(game.game_jiao_count+" × ");
        //game.game_dom_result.result_fail.children.fail_ub.dom[0].appendChild(game.game_resource.img[game.game_dj[game.game_magnification]].cloneNode());
        if(sponsor==uid){
            game.game_dom_result.restart.dom.click(function(){
                href_index();
            }).show();
        }
        game.game_dom.div_start.dom.hide();game.game_dom.div_start.state=0;
        game.game_dom.div_result.dom.show();game.game_dom.div_result.state=1;
        setTimeout(function() {
            $(".result_zha").removeClass("result_zha");
        },3000);
    },
    playVideo_jiao:function(num1,num2){
        if(game.game_jiao_result_last[0]!=num1 || game.game_jiao_result_last[1]!=num2){
            game.game_resource.media.sound.play(num1,function(){
                setTimeout(function(){
                    game.game_resource.media.sound.play("ge",function(){
                        setTimeout(function() {
                            game.game_resource.media.sound.play(num2);
                        },500);
                    });
                },800);
            });
        }
    },
    playVideo_kai:function(){
        game.game_resource.media.sound.play("kai");
    },
    ds:function(num) {
        if (num != 0){
            var text="元宝";
            if(game.game_dj[game.game_magnification]=="zs")text="钻石";
            var money = game.game_magnification * num;
            app.dice_reward(money,"感谢"+game.game_player[game.game_win_fail_ph[0]].player_name+"打赏了"+num+"个"+text);
        }
        game.game_dom.div_ds.dom.hide();
    },
    init:function(){
        $(function(){
            if(nativeProtol.getPhoneType()=="others") {
                if(sponsor!=null && uid!=null){
                    init();
                    game.start();
                }
            }else{
                if(uid==null){
                    nativeProtol.getUserInfo(function(){
                        uid = nativeProtol.userId;
                        init();
                        game.start();
                    });
                }else{
                    init();
                    game.start();
                }
            }
        });

        this.game_resource.img={};
        for(var i=1;i<=6;i++){//初始化6个筛子点数图片
            this.game_resource.img["point"+i] = new Image();
            this.game_resource.img["point"+i].src="img/point_y_"+i+".png";
            this.game_resource.img["point"+i].name="point"+i;
            this.game_resource.img["point"+i].addEventListener('load',function(e){

            });
            this.game_resource.img["point_r_"+i] = new Image();
            this.game_resource.img["point_r_"+i].src="img/point_r_"+i+".png";
            this.game_resource.img["point_r_"+i].name="point_r_"+i;
            this.game_resource.img["point_r_"+i].addEventListener('load',function(e){

            });
        }
        this.game_resource.img.qd = new Image();
        this.game_resource.img.qd.src="img/2/qd.png";
        this.game_resource.img.qd.name="qd";
        this.game_resource.img.yb = new Image();
        this.game_resource.img.yb.src="img/2/yb.png";
        this.game_resource.img.yb.name="yb";
        this.game_resource.img.zs = new Image();
        this.game_resource.img.zs.src="img/2/zs.png";
        this.game_resource.img.zs.name="zs";

        this.game_resource.media={};
        this.game_resource.media.sound = new Howl({
            urls: ["media/sound.mp3"],
            volume: .9,
            loop: false,
            sprite: {
                1: [0, 500],
                2: [500, 500],
                3: [1000, 500],
                4: [1500, 500],
                5: [2100, 500],
                6: [2600, 500],
                7: [3100, 500],
                8: [3600, 500],
                9: [4100, 500],
                10: [4600, 500],
                11: [5100, 700],
                12: [5800, 700],
                13: [6500, 600],
                14: [7200, 600],
                15: [7900, 700],
                16: [8600, 700],
                17: [9300, 700],
                18: [10000, 700],
                19: [10700, 600],
                20: [11400, 700],
                21: [12100, 900],
                22: [13000, 900],
                23: [13900, 900],
                24: [17500, 900],
                25: [14800, 900],
                26: [15700, 900],
                27: [16600, 900],
                28: [18400, 900],
                29: [19300, 800],
                30: [20100, 700],
                ge: [20900, 400],
                kai: [21400, 500],
                mate: [21900, 100]
            }
        });
        this.game_resource.media.bg = new Howl({
            urls: ["media/bg.mp3"],
            volume: .3,
            loop: true
        });

    }
}
