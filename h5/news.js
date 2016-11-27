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

document.addEventListener(
	"touchstart",
	function(e){
		// e.preventDefault();
	}
);
var footerTip=document.getElementById("bottom_tip");
var loadNext=true;

// Scroll.onscrollstart = function() {
// 	if(!listData){
// 		var xhr=new XMLHttpRequest();
// 		xhr.open('get',"https://apis.baidu.com/showapi_open_bus/channel_news/channel_news",true);
// 		xhr.setRequestHeader('apikey','770651441b1a9c317ead81b8a9137436');
// 		xhr.send();
// 		xhr.onreadystatechange=function(){
// 			if (xhr.readyState==4) {
// 				if (xhr.status==200) {
// 					listData=JSON.parse(xhr.responseText).showapi_res_body.channelList;
// 					window.localStorage.setItem("listData",JSON.stringify(listData));
// 				}
// 			}
// 		}
// 	}
// };
// Scroll.onscroll = function() {
// 	if(this.iScroll.y < this.minTranslate.y){
// 		footerTip.style.display="block";
// 		footerTip.style.opacity=1;
// 	}else{
// 		footerTip.style.display="none";
// 		footerTip.style.opacity=0;
// 	}
// };
// Scroll.onscrollend = function() {
// 	if(this.iScroll.y < this.minTranslate.y- footerTip.offsetHeight && loadNext==true&&listData) {
// 		footerTip.style.display="none";
// 		footerTip.style.opacity=0;
// 		if (listX<listData.length) {
// 			loadNext=false;
// 			moreNews(listData[listX].channelId,1,"container");
// 		}
// 	}
// };

document.body.addEventListener("touchmove",function(){
	var top=document.body.scrollTop;
	var maxTop=document.body.clientHeight-document.documentElement.clientHeight;
	if (top>=maxTop) {
		footerTip.style.display="block"
	}
	else{
		footerTip.style.display="none"
	}
})
document.body.addEventListener("touchend",function(){
	footerTip.style.display="none"
	var top=document.body.scrollTop;
	var maxTop=document.body.clientHeight-document.documentElement.clientHeight;
	if (top>=maxTop) {
		if (loadNext) {
			if (listX<listData.length) {
				loadNext=false;
				moreNews(listData[listX].channelId,1,"container");
			}
		}
	}
})




	

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
			document.getElementById("banner").innerHTML="<ul title="+num+" style=width:"+3.75*2*num+"rem >"+liInner+liInner+"</ul><strong id=index1><b>1</b>/"+num+"</strong>";
			(function(){
				var theWrap=document.getElementById("banner").getElementsByTagName("ul")[0];
				var theStart=0;
				var theStartY=0;
				var theMoveFrom=0;
				var theMoveTo=0;
				var thePage=0;
				var  step=document.documentElement.clientWidth;
				theWrap.addEventListener("touchstart",function(e){
					theStart=e.changedTouches[0].pageX;
					theStartY=e.changedTouches[0].pageY;
					if (thePage<=0) {
						thePage=thePage+num;
						theMoveTo=(-1)*thePage*step;
						theWrap.style.WebkitTransform=theWrap.style.transform="translateX("+theMoveTo+"px)";
					}
					theMoveFrom=theMoveTo;
				})

				theWrap.addEventListener("touchmove",function(e){
					var disX=Math.abs(e.changedTouches[0].pageX-theStart);
					var disY=Math.abs(e.changedTouches[0].pageY-theStartY);
					if (disY<2*disX) {
						if (e.cancelable) {
							e.preventDefault();
						}
					}
					theMoveTo=e.changedTouches[0].pageX-theStart+theMoveFrom;
					theWrap.style.WebkitTransform=theWrap.style.transform="translateX("+theMoveTo+"px)";
				})
				theWrap.addEventListener("touchend",function(e){
					var dis=e.changedTouches[0].pageX-theStart;
					if (Math.abs(dis)>step*0.1) {
						thePage-=Math.round(dis/step);
					}
					// thePage=num;
					if (thePage>=num) {
						thePage=thePage-num;
					}
					theMoveTo=(-1)*thePage*step;
					theMoveFrom=theMoveTo;
					theWrap.style.WebkitTransform=theWrap.style.transform="translateX("+theMoveTo+"px)";
					document.getElementById("index1").innerHTML="<b>"+(thePage+1)+"</b>/"+num;
				})  
			})()
			
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
				"<h1>"+obj.contentlist[0].channelName+"<strong id=page1><b>1</b>/"+(num-num%3)/3+"</strong></h1>"+
				"<div id=china_wrap><div id=pic_group title="+(num-num%3)/3*2+" style=width:"+(num-num%3)/3*2*3.75+"rem>"+uls+uls+"</div></div>"+
				"<div class=enter><a href=./channel.html?"+id+">进入频道</a></div>";
			document.getElementById(parentId).innerHTML=inner;
			(function(){
				var theWrap=document.getElementById("pic_group");
				var theStart=0;
				var theStartY=0;
				var theMoveFrom=0;
				var theMoveTo=0;
				var thePage=0;
				var  step=document.documentElement.clientWidth;
				num=(num-num%3)/3;
				theWrap.addEventListener("touchstart",function(e){
					theStart=e.changedTouches[0].pageX;
					theStartY=e.changedTouches[0].pageY;
					if (thePage<=0) {
						thePage=thePage+num;
						theMoveTo=(-1)*thePage*step;
						theWrap.style.WebkitTransform=theWrap.style.transform="translateX("+theMoveTo+"px)";
					}
					theMoveFrom=theMoveTo;
				})

				theWrap.addEventListener("touchmove",function(e){
					var disX=Math.abs(e.changedTouches[0].pageX-theStart);
					var disY=Math.abs(e.changedTouches[0].pageY-theStartY);
					if (disY<2*disX) {
						if (e.cancelable) {
							e.preventDefault();
						}
					}
					theMoveTo=e.changedTouches[0].pageX-theStart+theMoveFrom;
					theWrap.style.WebkitTransform=theWrap.style.transform="translateX("+theMoveTo+"px)";
				})
				theWrap.addEventListener("touchend",function(e){
					var dis=e.changedTouches[0].pageX-theStart;
					if (Math.abs(dis)>step*0.1) {
						thePage-=Math.round(dis/step);
					}
					// thePage=num;
					if (thePage>=num) {
						thePage=thePage-num;
					}
					theMoveTo=(-1)*thePage*step;
					theMoveFrom=theMoveTo;
					theWrap.style.WebkitTransform=theWrap.style.transform="translateX("+theMoveTo+"px)";
					document.getElementById("page1").innerHTML="<b>"+(thePage+1)+"</b>/"+num;
				})  
			})()
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
			(function(){
				var _this=document.getElementById('cols_wrap').getElementsByTagName('ul')[0];
				var _thisStart=0;
				var _thisStartY=0;
				var _thisMoveFrom=0;
				var _thisMoveTo=0;
				var  step=document.documentElement.clientWidth/3.75*1.62;
				_this.addEventListener("touchstart",function(e){
					_thisStart=e.changedTouches[0].pageX;
					_thisStartY=e.changedTouches[0].pageY;
				})
				_this.addEventListener("touchmove",function(e){
					var disX=Math.abs(e.changedTouches[0].pageX-_thisStart);
					var disY=Math.abs(e.changedTouches[0].pageY-_thisStartY);
					if (disY<disX) {
						if (e.cancelable) {
							e.preventDefault();
						}
					}
					_thisMoveTo=e.changedTouches[0].pageX-_thisStart+_thisMoveFrom;
					_this.style.WebkitTransform=_this.style.transform="translateX("+_thisMoveTo+"px)";
				})
				_this.addEventListener("touchend",function(e){
					_thisMoveTo=e.changedTouches[0].pageX-_thisStart+_thisMoveFrom;
					if (_thisMoveTo>0) {_thisMoveTo=0}
					if (_thisMoveTo<(3-num)*step) {_thisMoveTo=(2-num+0.31)*step}
					_thisMoveFrom=_thisMoveTo;
					_this.style.WebkitTransform=_this.style.transform="translateX("+_thisMoveTo+"px)";
				})  
			})()

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
			if (listX<listData.length) {
				listX++;
				loadNext=true;
			}else{
				footerTip.innerHTML="拉到底了哟~~"
			}
			
		});
	}
	// moreNews("5572a108b3cdc86cf39001cf",1,"container");

	// var a1=document.getElementById('cols_wrap').getElementsByTagName('ul')[0];
	// a1.onclick=function () {
	// 	alert(1)
	// }
	// document.onclick=function(ev){
	// 	if (ev.target.className="col") {
	// 		ev.target.left=ev.target.offsetLeft-3.75+"rem";
	// 	}
	// }


