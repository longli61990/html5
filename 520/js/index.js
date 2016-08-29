var serverUrl="http://webgame.api.youja.cn/uplus_activity";

var http_timeout=30000;
var util={

}
var variable= {
    load_activity_520:false,load_detail_520:false,load_rank_520:false
}
var app= {
    activity_520: function (uid,callback) {
        if (!variable.load_activity_520) {
            variable.load_activity_520 = true;
            $.ajax({
                url: serverUrl + "/520activity/activity?user_id="+uid,
                timeout: http_timeout,
                type: 'get',
                dataType: 'json',
                complete: function (XMLHttpRequest, status) {
                    variable.load_activity_520 = false;
                    if (callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    rank_520: function (uid,callback) {
        if (!variable.load_rank_520) {
            variable.load_rank_520 = true;
            $.ajax({
                url: serverUrl + "/520activity/rank?user_id="+uid+"&time="+new Date().getTime(),
                timeout: http_timeout,
                type: 'get',
                dataType: 'json',
                complete: function (XMLHttpRequest, status) {
                    variable.load_rank_520 = false;
                    if (callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    },
    detail_520: function (uid,callback) {
        if (!variable.load_detail_520) {
            variable.load_detail_520 = true;
            $.ajax({
                url: serverUrl + "/520activity/detail?user_id="+uid,
                timeout: http_timeout,
                type: 'get',
                dataType: 'json',
                complete: function (XMLHttpRequest, status) {
                    variable.load_detail_520 = false;
                    if (callback)callback(status, XMLHttpRequest.responseJSON);
                }
            });
        }
    }
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
};