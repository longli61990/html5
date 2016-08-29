//json对象转字符串函数
var obj2String = function(_obj) {
	var t = typeof (_obj);
	if(t != 'object' || _obj === null) {
		// simple data type
		if (t == 'string') {
			_obj = '"' + _obj + '"';
		}
		return String(_obj);
	}else{
		if( _obj instanceof Date) {
			return _obj.toLocaleString();
		}
		// recurse array or object
		var n, v, json = [], arr = (_obj && _obj.constructor == Array);
		for (n in _obj) {
			v = _obj[n];
			t = typeof (v);
			if (t == 'string') {
				v = '"' + v + '"';
			}else if(t == "object" && v !== null){
				v = this.obj2String(v);
			}
			json.push(( arr ? '' : '"' + n + '":') + String(v));
		}
		return ( arr ? '[' : '{') + String(json) + ( arr ? ']' : '}');
	}
};

/*
1. 事件通知类接口：
由友加客户端调用，
前端js需设置nativeProtol.callbackEventFromClient函数
*/
function sendEventToWeb(evt, param){
	nativeProtol.callbackEventFromClient(evt,param);
}

function callbackClientInfo(userinfo){
	var userinfo_array = userinfo.split("##");
	if(userinfo_array.length == 3){
		nativeProtol.sessionId = userinfo_array[0];
		nativeProtol.token = userinfo_array[1];
		nativeProtol.userId = userinfo_array[2];
		if(nativeProtol.targetId == null){
			nativeProtol.targetId = nativeProtol.userId;
		}
		//alert('老接口从客户端获取userId成功userId='+$userId);
	}
	nativeProtol.callbackDataFromClient();
}

/*
2. 数据获取类接口：
由友加客户端调用
前端js需设置nativeProtol.callbackDataFromClient
*/
function getDataFromClientCallBack(data_id,data){
	//alert('data_id='+data_id+',data='+data);
	if(data_id == 'DT_ALLINFO'){
        $("#test").append("   DT_ALLINFO="+data);
		var userinfo_array = data.split("##");
		if(userinfo_array.length == 3){
			nativeProtol.sessionId = userinfo_array[0];
			nativeProtol.token = userinfo_array[1];
			nativeProtol.userId = userinfo_array[2];
			if(nativeProtol.targetId == null){
				nativeProtol.targetId = nativeProtol.userId;
			}
			//alert('新接口从客户端获取userId成功userId='+nativeProtol.userId);
		}
	}else if(data_id == 'DT_CVER'){
		nativeProtol.client_ver = data;
	}else if(data_id == 'DT_UTYPE'){
		nativeProtol.user_type = data;
	}else if(data_id == 'DT_LOCATION'){
		nativeProtol.user_location = data;
	}
	nativeProtol.callbackDataFromClient();
}

/*
3. 交互
由友加客户端调用
前端js需设置nativeProtol.callbackServiceFromClient
*/
function sendServiceResultToWeb(sid,c2s_param1,c2s_param2){
	//alert('sendServiceResultToWeb:sid='+sid+',c2s_param1='+c2s_param1+',c2s_param2='+c2s_param2);
	nativeProtol.callbackServiceFromClient(sid,c2s_param1,c2s_param2);
}

var nativeProtol = {
    getQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
	request:function(paras){
		var url = location.href; 
		var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
		var paraObj = {} 
		for (i=0; j=paraString[i]; i++){ 
			paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
		} 
		var returnValue = paraObj[paras.toLowerCase()]; 
		if(typeof(returnValue)=="undefined"){ 
			return null; 
		}else{ 
			return returnValue; 
		} 
	},
	getPhoneType:function() {
		var phone_type = 'others';
		var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        if(bIsIphoneOs){
            phone_type = 'ios';
        }
        if(bIsAndroid){
            phone_type = 'and';
        }
		return phone_type;
	},

	token:null,
	userId:null,
	sessionId:null,
	client_ver:null,
	user_type:null,
	user_location:null,
	targetId:null,
	uplusFlag:false,
	weixinFlag:false,
	callbackDataFromClient:function(){},
	callbackEventFromClient:function(evt,param){},
	callbackServiceFromClient:function(sid,c2s_param1,c2s_param2){},

	getUserInfo:function(callback){
		nativeProtol.callbackDataFromClient = callback;
		try{
			if(nativeProtol.getPhoneType() == 'ios'){
				location.href="js-call:getClientInfo";
				setTimeout(function(){
					location.href="js-call::getDataFromClient::DT_ALLINFO";
				},10);
			}else if(nativeProtol.getPhoneType() == 'and'){
				getDataFromClientCallBack('DT_ALLINFO',window.jscall.getDataFromClient('DT_ALLINFO'));
			}else{
				callback();
			}
		}catch(err) {
			callback();
		}
	},
	getClientVer:function(callback){
		try{
			nativeProtol.callbackDataFromClient = callback;
			if(nativeProtol.getPhoneType() == 'ios'){
				setTimeout(function(){
					location.href="js-call::getDataFromClient::DT_CVER";
				},20);
			}else if(nativeProtol.getPhoneType() == 'and'){
				getDataFromClientCallBack('DT_CVER',window.jscall.getDataFromClient('DT_CVER'));
			}else{
				callback();
			}
		}catch(err) {
			callback();
		}
	},
	getClientVerInt:function(client_ver){
		if(client_ver == null || client_ver == '' || client_ver == 'undefined'){
			return 0;
		}else{
			var version = client_ver.substr(0, 5);
			var version_array = version.split(".");
			var version_int = parseInt(version_array[0]*100) + parseInt(version_array[1]*10) + parseInt(version_array[2]);
			return version_int;
		}
	},
	getUserType:function(callback){
		try{
			nativeProtol.callbackDataFromClient = callback;
			if(nativeProtol.getPhoneType() == 'ios'){
				setTimeout(function(){
					location.href="js-call::getDataFromClient::DT_UTYPE";
				},30);
			}else if(nativeProtol.getPhoneType() == 'and'){
				getDataFromClientCallBack('DT_UTYPE',window.jscall.getDataFromClient('DT_UTYPE'));
			}else{
				callback();
			}
		}catch(err) {
			callback();
		}
	},
	getUserLocation:function(callback){
		try{
			nativeProtol.callbackDataFromClient = callback;
			if(nativeProtol.getPhoneType() == 'ios'){
				setTimeout(function(){
					location.href="js-call::getDataFromClient::DT_LOCATION";
				},40);
			}else if(nativeProtol.getPhoneType() == 'and'){
				getDataFromClientCallBack('DT_LOCATION',window.jscall.getDataFromClient('DT_LOCATION'));
			}else{
				callback();
			}
		}catch(err) {
			callback();
		}
	},

	/*
	evt值						param值		说明
	EVT_S2C_AUDIO_CLOSE			无			关声音
	EVT_S2C_AUDIO_OPEN			无			开声音
	EVT_C2S_WEBVIEW_EXPEND		无			webview展开
	EVT_C2S_WEBVIEW_CONTRACT	无			webview收起
	*/
	sendEventToClient:function(evt, param){
		try{
			if(nativeProtol.getPhoneType() == 'ios'){
				setTimeout(function(){
					location.href="js-call::sendEventToClient::"+evt+"::"+param;
				},10);
			}else if(nativeProtol.getPhoneType() == 'and'){
				window.jscall.sendEventToClient(evt,param);
			}else{
				//callback();
			}
		}catch(err) {
			//callback();
		}
	},


	/*
	sid值	说明	param值	c2s_param1值	c2s_param2值
	S_PHOTO	上传照片或拍照	1拍照；2本地照片；3拍照或本地照片，用户可选	上传完毕后的照片缩略图url，'error'表示操作失败，'cancel'表示用户取消了	上传完毕后的原图url
	S_RECORD_AUDIO	录制音频	无	上传完毕后的音频url，'error'表示操作失败，'cancel'表示用户取消了	无
	S_RECORD_VIDEO	录制视频	无	上传完毕后的视频缩略图url，'error'表示操作失败，'cancel'表示用户取消了	上传完毕后的视频url
	S_ROCK	启动摇动手机的检测，在stop或cancel之前只要用户摇动了手机，就会发送sendServiceResultToWeb	无	无	无
	S_BLOW	启动吹气检测，在stop或cancel之前只要用户对着话筒吹气了，就会发送sendServiceResultToWeb	无	分贝数	无
	S_SHARE	启动分享	json格式的内容模板	分享目的编号， 'cancel'表示用户取消了	'1'用户分享出去了，'0'没有分享出去
	*/
	startServiceFromClient:function(sid,param, callback){
		try{
			nativeProtol.callbackServiceFromClient = callback;
			if(nativeProtol.getPhoneType() == 'ios'){
				setTimeout(function(){
					location.href="js-call::startServiceFromClient::"+sid+"::"+param;
				},10);
			}else if(nativeProtol.getPhoneType() == 'and'){
				window.jscall.startServiceFromClient(sid,param);
			}else{
				//callback();
			}
		}catch(err) {
			//callback();
		}
	},
	stopServiceFromClient:function(sid){
		try{
			if(nativeProtol.getPhoneType() == 'ios'){
				setTimeout(function(){
					location.href="js-call::stopServiceFromClient::"+sid;
				},10);
			}else if(nativeProtol.getPhoneType() == 'and'){
				window.jscall.stopServiceFromClient(sid);
			}else{
				//callback();
			}
		}catch(err) {
			//callback();
		}
	},
	cancelServiceFromClient:function(sid){
		try{
			if(nativeProtol.getPhoneType() == 'ios'){
				setTimeout(function(){
					location.href="js-call::cancelServiceFromClient::"+sid;
				},10);
			}else if(nativeProtol.getPhoneType() == 'and'){
				window.jscall.cancelServiceFromClient(sid);
			}else{
				//callback();
			}
		}catch(err) {
			//callback();
		}
	},
	init:function(){
		nativeProtol.token = nativeProtol.request('token');
		nativeProtol.userId = nativeProtol.request('userId');
		if(nativeProtol.userId == null){
			if(nativeProtol.token != null){
				var token_array = nativeProtol.token.split("-");
				if(token_array.length > 1){
					nativeProtol.userId = token_array[1];
				}
			}
		}
		nativeProtol.sessionId = nativeProtol.request('sessionId');
		if(nativeProtol.sessionId == null){
			if(nativeProtol.token != null){
				var token_array = nativeProtol.token.split("-");
				if(token_array.length > 1){
					nativeProtol.sessionId = token_array[0];
				}
			}
		}
		nativeProtol.client_ver = nativeProtol.request('client_ver');
		nativeProtol.user_type = nativeProtol.request('user_type');
		nativeProtol.user_location = nativeProtol.request('user_location');
		nativeProtol.targetId = nativeProtol.request('targetId');

		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/youjiawebview/i)=="youjiawebview") {
			nativeProtol.uplusFlag = true;
		}
		if(ua.match(/micromessenger/i)=="micromessenger") {
			nativeProtol.weixinFlag = true;
		}

	}
};

nativeProtol.init();

/*
分享样式示例：
var $shareData = {
						"weixin_pyq": {
						"s_description": "朋友圈s描述",
						"s_title": "朋友圈stitle",
						"description": "朋友圈描述",
						"title": "朋友圈title",
						"imageurl":"http://app.youja.cn/client/demo/native/images/share.jpg",
						"shareurl":"http://app..youja.cn/client/demo/demo9/index.html"
						},
						"qq_kj": {
						"s_description": "qq空间s描述",
						"s_title": "qq空间stitle",
						"description": "qq空间描述",
						"title": "qq空间title",
						"imageurl":"http://app.youja.cn/client/demo/native/images/share.jpg",
						"shareurl":"http://app..youja.cn/client/demo/demo9/index.html"
						},
						"sina_wb": {
						"s_description": "新浪微博s描述，友加-#全世界陪你说话# @友加官方微博 @友加君",
						"s_title": "新浪微博stitle",
						"description": "新浪微博描述，友加-#全世界陪你说话# @友加官方微博 @友加君",
						"title": "新浪微博title",
						"imageurl":"http://app.youja.cn/client/demo/native/images/share.jpg",
						"shareurl":"http://app..youja.cn/client/demo/demo9/index.html"
						},
						"qq_hy": {
						"s_description": "qq好友s描述",
						"s_title": "qq好友stitle",
						"description": "qq好友描述",
						"title": "qq好友title",
						"imageurl":"http://app.youja.cn/client/demo/native/images/share.jpg",
						"shareurl":"http://app..youja.cn/client/demo/demo9/index.html"
						},
						"hall": {
						"s_description": "哈哈sd",
						"s_title": "哈哈st",
						"description": "哈哈d",
						"title": "哈哈t",
						"imageurl":"http://app.youja.cn/client/demo/native/images/share.jpg",
						"shareurl":"http://app..youja.cn/client/demo/demo9/index.html"
						},
						"weixin_hy": {
						"s_description": "微信好友s描述",
						"s_title": "微信好友stitle",
						"description": "微信好友描述",
						"title": "微信好友title",
						"imageurl":"http://app.youja.cn/client/demo/native/images/share.jpg",
						"shareurl":"http://app..youja.cn/client/demo/demo9/index.html"
						}
					};
nativeProtol.startServiceFromClient('S_SHARE',obj2String($shareData),callback);
*/