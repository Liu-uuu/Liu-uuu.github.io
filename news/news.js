var listData="",listX=2;
// 5秒后，如果没点击加载频道列表，就加载频道列表
try{
	if (window.localStorage.getItem("listData")) {
		listData=JSON.parse(window.localStorage.getItem("listData"))
	}
	setTimeout(function (){
		if (!window.localStorage.getItem("listData")) {
			var xhr=new XMLHttpRequest();
			xhr.open('get',"https://apis.baidu.com/showapi_open_bus/channel_news/channel_news",true);
			xhr.setRequestHeader('apikey','770651441b1a9c317ead81b8a9137436');
			xhr.send();
			xhr.onreadystatechange=function(){
				if (xhr.readyState==4) {
					if (xhr.status==200) {
						listData=JSON.parse(xhr.responseText).showapi_res_body.channelList;
						window.localStorage.setItem("listData",JSON.stringify(listData));
					}
				}
			}
		}
	},5000)
}catch(error){}

var wrap = document.querySelector("#wrap");
var footerTip=document.getElementById("bottom_tip");
var loadNext=true;
var Scroll = new MScroll(
	{
		element: wrap,
		showBar: true	
	}
);
Scroll.onscrollstart = function() {
	if(!listData){
		var xhr=new XMLHttpRequest();
		xhr.open('get',"https://apis.baidu.com/showapi_open_bus/channel_news/channel_news",true);
		xhr.setRequestHeader('apikey','770651441b1a9c317ead81b8a9137436');
		xhr.send();
		xhr.onreadystatechange=function(){
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					listData=JSON.parse(xhr.responseText).showapi_res_body.channelList;
					window.localStorage.setItem("listData",JSON.stringify(listData));
				}
			}
		}
	}
};
Scroll.onscroll = function() {
	if(this.iScroll.y < this.minTranslate.y){
		footerTip.style.display="block";
		footerTip.style.opacity=1;
	}else{
		footerTip.style.display="none";
		footerTip.style.opacity=0;
	}
};
Scroll.onscrollend = function() {
	if(this.iScroll.y < this.minTranslate.y- footerTip.offsetHeight && loadNext==true&&listData) {
		footerTip.style.display="none";
		footerTip.style.opacity=0;
		if (listX<listData.length) {
			loadNext=false;
			moreNews(listData[listX].channelId,1,"container");
		}
	}
};






	

	// Ajax请求一组数据
	function requestNews(id,page,fn){
		var xhr=new XMLHttpRequest();
		xhr.open('get',"https://apis.baidu.com/showapi_open_bus/channel_news/search_news?channelId="+id+"&page="+page,true);
		xhr.setRequestHeader('apikey','770651441b1a9c317ead81b8a9137436');
		xhr.send();
		xhr.onreadystatechange=function(){
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					var responseObj=JSON.parse(xhr.responseText).showapi_res_body.pagebean;
					fn(responseObj);	
					try{
						var arrName="id"+id;//存储的频道
						if(window.localStorage.getItem(arrName)){//如果频道已存储，继续加页码
							var data=JSON.parse(window.localStorage.getItem(arrName));//存储转化成数组
							data[page]=JSON.parse(xhr.responseText).showapi_res_body.pagebean;//为数组添加新页信息
							window.localStorage.setItem(arrName,JSON.stringify(data))//转化为字符串并存储
						}else{//如果频道未存储
							var data=[];//直接定义数组并加数据
							data[page]=JSON.parse(xhr.responseText).showapi_res_body.pagebean;//为数组添加新页信息
							window.localStorage.setItem(arrName,JSON.stringify(data))//转化为字符串并存储
						}
					}catch(error){
					}	
				}
			}
		}
	};

	
	// 渲染一组轮播图新闻
	addBanner("5572a109b3cdc86cf39001db",1)
	function addBanner(id,page){
		requestNews(id,page,function(obj){
			var liInner="";//图片组内容
			var num=0;//图片新闻计数
			for (var i = 0; i < obj.contentlist.length; i++) {
				if(obj.contentlist[i].havePic==true){
					num++;//有图则计数+1	
					liInner+=
						"<li>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<i><img src="+obj.contentlist[i].imageurls[0].url+"></i>"+
								"<div>"+
									"<span>"+obj.contentlist[i].title+"</span>"+
								"</div>"+
							"</a>"+
						"</li>";	
				}
			}
			// 生成到页面
			document.getElementById("banner").innerHTML="<ul title="+num+" style=width:"+3.75*num+"rem >"+liInner+"</ul>";
		});
	}
	// 渲染一组国内新闻
	function addPicNews(id,page,parentId){
		requestNews(id,page,function(obj){
			var liInner="";//图片组内容
			var uls="";//图片组合并
			var num=0;//图片新闻计数
			for (var i = 0; i < obj.contentlist.length; i++) {

				if(obj.contentlist[i].havePic==true){
					num++;//有图则计数+1	
					liInner+=
						"<li class=has_pic>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<i><img src="+obj.contentlist[i].imageurls[0].url+"></i>"+
								"<span>"+obj.contentlist[i].title+"</span>"+
							"</a>"+
						"</li>"
					// 每三个一组
					if (num%3==0) {
						if (liInner) {
							uls+="<ul display=float:left>"+liInner+"</ul>";
							liInner="";
						}	
					}
				}
			}

			// 生成到页面
			var inner=
				"<h1>"+obj.contentlist[0].channelName+"</h1>"+
				"<div id=china_wrap><div id=pic_group title="+(num-num%3)/3+" style=width:"+(num-num%3)/3*3.75+"rem>"+uls+"</div></div>"+
				"<div class=enter><a href=./channel.html?"+id+">进入频道</a></div>";
			document.getElementById(parentId).innerHTML=inner;
			Scroll.reSize();
		});	
	}
	addPicNews("5572a108b3cdc86cf39001cd",1,"china")
	addCol("5572a108b3cdc86cf39001ce",1,"int")
	// 渲染一组国际新闻
	function addCol(id,page,parentId){
		requestNews(id,page,function(obj){
			var picList="",noPicList="";//有图和无图容器
			var num=0;
			for (var i = 0; i < obj.contentlist.length; i++) {
				if(obj.contentlist[i].havePic==true){
					num++;//有图计数+1
					picList+=
						"<li>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<i><img src="+obj.contentlist[i].imageurls[0].url+"></i>"+
								"<span>"+obj.contentlist[i].title+"</span>"+
							"</a>"+
						"</li>";
					//控制图片新闻个数
					if (num==20) {
						break;
					}
				}
				else{//无图新闻组
					noPicList+=
						"<li class=no_pic>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<span>"+obj.contentlist[i].title+"</span>"+
								"<span class=no_pic_icon>无图</span>"
							"</a>"+
						"</li>";
				}
				if (i==12) {
					break;
				}
			}

			// 有图放进一个class=col的ul，无图放另一个ul
			var inner=
				"<h1>"+obj.contentlist[0].channelName+"</h1>"+
				"<div id=cols_wrap><ul title="+num+" class=col style=width:"+num*1.62+"rem>"+picList+"</ul></div><ul>"+noPicList+"</ul>"+
				"<div class=enter><a href=./channel.html?"+id+">进入频道</a></div>";	
			document.getElementById(parentId).innerHTML=inner;
			var _this=document.getElementById('cols_wrap').getElementsByTagName('ul')[0];
			var _thisStart=0;
			var _thisMoveFrom=0;
			var _thisMoveTo=0;
			var  step=document.documentElement.clientWidth/3.75*1.62;
			_this.addEventListener("touchstart",function(e){
				_thisStart=e.changedTouches[0].pageX;
			})
			_this.addEventListener("touchmove",function(e){
				_thisMoveTo=e.changedTouches[0].pageX-_thisStart+_thisMoveFrom;
				_this.style.WebkitTransform=_this.style.transform="translateX("+_thisMoveTo+"px)";
			})
			_this.addEventListener("touchend",function(e){
				_thisMoveTo=e.changedTouches[0].pageX-_thisStart+_thisMoveFrom;
				if (e.changedTouches[0].pageX-_thisStart<0) {_thisMoveTo-=16}
				if (e.changedTouches[0].pageX-_thisStart>0) {_thisMoveTo+=16}	
				if (_thisMoveTo>0) {_thisMoveTo=0}
				if (_thisMoveTo<(3-num)*step) {_thisMoveTo=(2-num+0.41)*step}
				_thisMoveFrom=_thisMoveTo;
				_this.style.WebkitTransform=_this.style.transform="translateX("+_thisMoveTo+"px)";
			})

			Scroll.reSize();
		});
	}
	// 上拉加载新闻组
	function moreNews(id,page,parentId){
		requestNews(id,page,function(obj){
			var newsList="";//统一一个容器
			var breakNum=5+Math.floor(Math.random()*5)
			for (var i = 0; i < obj.contentlist.length; i++) {
				if(obj.contentlist[i].havePic==true){
					newsList+=
						"<li class=has_pic>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<i><img src="+obj.contentlist[i].imageurls[0].url+"></i>"+
								"<span>"+obj.contentlist[i].title+"</span>"+
							"</a>"+
						"</li>";
				}
				else{//无图新闻组
					newsList+=
						"<li class=no_pic>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<span>"+obj.contentlist[i].title+"</span>"+
								"<span class=no_pic_icon>无图</span>"
							"</a>"+
						"</li>";
				}
				if (i==breakNum) {
					break;
				}
			}
			var inner=
			"<div class=pindao>"+
				"<h1>"+obj.contentlist[0].channelName+"</h1>"+
				"<ul>"+newsList+"</ul>"+
				"<div class=enter><a href=./channel.html?"+id+">进入频道</a></div>"+
			"</div>";
			document.getElementById(parentId).innerHTML+=inner;
			Scroll.reSize();
			if (listX<listData.length) {
				listX++;
				loadNext=true;
			}else if (listX==listData.length) {
				footerTip.innerHTML="拉到底了哟~~"
			}
			
		});
	}
	// moreNews("5572a108b3cdc86cf39001cf",1,"container");

	// var a1=document.getElementById('cols_wrap').getElementsByTagName('ul')[0];
	// a1.onclick=function () {
	// 	alert(1)
	// }
	document.onclick=function(ev){
		if (ev.target.className="col") {
			ev.target.left=ev.target.offsetLeft-3.75+"rem";
		}
	}


