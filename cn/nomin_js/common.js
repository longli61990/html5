var clientUrl="http://dd.app.youja.cn";
var serverUrl="http://webgame.api.youja.cn/server-015-cn"//"http://webgame.api.youja.cn"//"http://localhost:8081";//
var http_timeout=30000;//10S
var imgUser=["62150426","39358086","65319","20000","20007","10020910","11071","81860","20002","11431555"];
var objType={"1":"文字","2":"图片","3":"语音","4":"投票"}
var topicType={"1":"text","2":"img","3":"audio","4":"vote"}
var voteType={"1":"A","2":"B","3":"C","4":"D","5":"E","6":"F","7":"G","8":"H","9":"I","10":"J"}
var voteName={"1":"选项1","2":"选项2","3":"选项3","4":"选项4","5":"选项5","6":"选项6","7":"选项7","8":"选项8","9":"选项9","10":"选项10"}
var weekDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var playerSize=3;
/**
 * 测试地址:
 * http://localhost:63342/html5game/jjd/index.html?sponsor=39358086&crid=1&act_def_id=6&token=11111111111-39358086
 * http://localhost:63342/html5game/jjd/join.html?act_jjd_id=1&sponsor=39358086&act_def_id=6&token=&crid=1&uid=39358087&act_his_id=2;
 **/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};

//弹出框
function popupShow(content){
    var html = '<div class="MsgPopup">'+
        '<div class="MsgBox">'+
        '<div class="MsgBg"></div>'+
        '<div class="MsgMain">'+
        '<div class="MsgMainBox">'+
        '<div class="Content">'+
        '<div class="content_text">'+content+'</div>'+
        '<div class="Button"><a name="no" onclick="popupHide();" class="MsgBtnBox3">确定</a></div>'+
        '</div>'+

        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
    $(document.body).append(html);
    $('.MsgPopup').find('div:first').addClass("Show");
    $('.MsgMainBox').parent('div').addClass("Show");
}
function popupHide(){
    $('.MsgPopup').find('div:first').removeClass("Show");
    $('.MsgMainBox').parent('div').removeClass("Show");
    $('.MsgBtnBox').html('关 闭');
    $('.MsgPopup').remove();
}

//弹出框
function popupConfrim(content,callback){
    var html = '<div class="MsgPopup">'+
        '<div class="MsgBox">'+
        '<div class="MsgBg"></div>'+
        '<div class="MsgMain">'+
        '<div class="MsgMainBox">'+
        '<div class="Content">'+
        '<div class="content_text">'+content+'</div>'+
        '<div class="Button"><a name="no" class="MsgBtnBox3">取消</a><a class="MsgBtnBox3" name="yes">确定</a></div>'+
        '</div>'+

        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
    $(document.body).append(html);
    $('.MsgPopup').find('div:first').addClass("Show");
    $('.MsgMainBox').parent('div').addClass("Show");
    $(".MsgBtnBox3").click(function(){
        if($(this).attr("name")=="yes"){
            callback(true);
        }else if($(this).attr("name")=="no"){
            callback(false);
        }
        popupHide();
    });
}

function getDate(time){
    var date=new Date(time);
    var month=date.getMonth()+1;
    if(month<10)month="0"+month;
    var day=date.getDate();
    if(day<10)day="0"+day;
    return date.getFullYear()+"-"+month+"-"+day;
}
function getWeekLong(date){
    var dt = new Date(date);
    //var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekDay[dt.getDay()];
}

function loadind(){
    var top=$(document).height()/2-12;
    var html="";
    html+="<div id='loading_dd' style=\"display: block;text-align: center; background-color: #000;bottom: 0;height: 100%;left: 0;opacity: 0.6;position: absolute;right: 0;top: 0;width: 100%;\">";
    html+="<img id=\"img_ttt\" src=\"img/5-130H2191321-50.gif\" height=\"24px\" style=\"position: relative;top:"+top+"px\">";
    html+="</div>";
    $("body").append(html);
}
function hideloadind(){
    $("#loading_dd").remove();
}
//滑动弹出框
function slidedownPop(){
    var top=$(document).height()/2-12;
    var html="";
    html+="<div id='loading_dd' style=\"display: block;text-align: center; background-color: #000;bottom: 0;height: 100%;left: 0;opacity: 0.6;position: absolute;right: 0;top: 0;width: 100%;\">";
    html+="<img id=\"img_ttt\" src=\"img/5-130H2191321-50.gif\" height=\"24px\" style=\"position: relative;top:"+top+"px\">";
    html+="</div>";
    $("body").append(html);
}
function hideslidedownPop(){
    $("#loading_dd").remove();
}
function popupAutomatic(content,callback){
    var html="";
    html+="<div id='popupAutomatic' style='text-align: center;position: fixed;bottom: 60px;width: 100%;display: none;'><span style='color: #ffffff;background-color: #818181;height: 30px;line-height: 30px;display: inline-block;min-width: 100px;padding:0 5px;'>"+(content!=null?content:"")+"</span></div>";
    $("body").append(html);
    $("#popupAutomatic").fadeIn(200,function(){
        setTimeout(function(){
            $("#popupAutomatic").fadeOut(200,function(){
                $(this).remove();
                if(callback)callback();
            });
        },300);
    });
}

function popupNew(content){
    var win_height = window.innerHeight;
    $(".all_pop_content_1").html(content);
    $("#all_pop").show();
    var pop_height = $(".all_pop_content")[0].clientHeight;
    $(".all_pop_content").css("top",(win_height-pop_height)/2+"px");
}
loadSize();
var fontSize=14;
function loadSize(){
    var width = Math.min(window.innerWidth,$(window).width()), height = Math.min(window.innerHeight,$(window).height());
    fontSize=width/320*14;
    document.body.style.fontSize=fontSize+"px";
    //$("#wid").html(window.innerWidth+"px");

}
function resizeIndex(){
    var width = Math.min(window.innerWidth,$(window).width()), height = Math.min(window.innerHeight,$(window).height());
    var scale=320/568;
    if(width/height>scale){
        $(".bl_div").css("height",height+"px");
        $(".bl_div").css("width",height*scale+"px");
        $(".bl_div").css("fontSize",14*height/568+"px");
    }else{
        $(".bl_div").css("width",width+"px");
        $(".bl_div").css("height",width/scale+"px");
        $(".bl_div").css("top",(height-width/scale)/2+"px");
        $(".bl_div").css("fontSize",14*width/320+"px");
    }
}
function resizeJoin(){
    var win_width = Math.min(window.innerWidth,$(window).width()), win_height = Math.min(window.innerHeight,$(window).height());
    var width = $(".div_adapt")[0].clientWidth;
    var height = $(".div_adapt")[0].clientHeight;
    var pop_height = $(".gz_pop_content")[0].clientHeight;
    var scale=320/408;
    if(width/height>scale){
        $(".div_before").css("height",height+"px");
        $(".div_before").css("width",height*scale+"px");
        $(".div_before").css("fontSize",14*height/408+"px");

        $(".div_result").css("height",height+"px");
        $(".div_result").css("width",height*scale+"px");
        $(".div_result").css("fontSize",14*height/408+"px");
        $("#wid").html(14*height/408+"px");
        $(".div_start").css("fontSize",14*height/408+"px");
    }else{
        $(".div_before").css("width",width+"px");
        $(".div_before").css("height",width/scale+"px");
        $(".div_before").css("top",(height-width/scale)/2+"px");
        $(".div_before").css("fontSize",14*width/320+"px");

        $(".div_result").css("width",width+"px");
        $(".div_result").css("height",width/scale+"px");
        $(".div_result").css("top",(height-width/scale)/2+"px");
        $(".div_result").css("fontSize",14*width/320+"px");
        $("#wid").html(14*width/320+"px");
        $(".div_start").css("fontSize",14*width/320+"px");
    }
    $(".gz_pop_content").css("top",(win_height-14*22.5)/2+"px");
    fontSize=(width/320*14);
    $(".jiao_pop").css("margin-top",(height/fontSize-15.71)/2+"em");
    $(".ds_pop").css("margin-top",(height/fontSize-14.28)/2+"em");
    /**if(width/height>scale){
        $(".div_start").css("height",height+"px");
        $(".div_start").css("width",height*scale+"px");
        $(".div_start").css("fontSize",14*height/408+"px");
    }else{
        $(".div_start").css("width",width+"px");
        $(".div_start").css("height",width/scale+"px");
        $(".div_start").css("top",(height-width/scale)/2+"px");
        $(".div_start").css("fontSize",14*width/320+"px");
    }**/
}
window.onresize = function() {
    //$("#wid").html(width+"px");
    resizeIndex();
    resizeJoin();
}
game.init();