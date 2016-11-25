	

	// 6秒后，如果没点击加载频道列表，就加载频道列表
	setTimeout(function (){
		if (!window.localStorage.getItem("list")) {
			var xhr=new XMLHttpRequest();
			xhr.open('get',"https://apis.baidu.com/showapi_open_bus/channel_news/channel_news",true);
			xhr.setRequestHeader('apikey','770651441b1a9c317ead81b8a9137436');
			xhr.send();
			xhr.onreadystatechange=function(){
				if (xhr.readyState==4) {
					if (xhr.status==200) {
						var list=JSON.parse(xhr.responseText).showapi_res_body.channelList;
						window.localStorage.setItem("list",JSON.stringify(list));
					}
				}
			}
		}
	},6000)
	

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
	// 渲染一组图片新闻
	function addPicNews(id,page,parentId){
		requestNews(id,page,function(obj){
			var liInner="";
			var uls="";
			var num=0;
			var geile=false;
			for (var i = 0; i < obj.contentlist.length; i++) {

				if(obj.contentlist[i].havePic==true){
					if (geile==false) {
						document.getElementById("banner_box").innerHTML=
						"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
							"<li>"+
								"<i><img src="+obj.contentlist[i].imageurls[0].url.replace('http://','https://')+"></i>"+
								"<div>"+
									"<span>"+obj.contentlist[i].title+"</span>"+
								"</div>"+
							"</li>"+
						"</a>";
						geile=true;
					}



					liInner+=
						"<li class=has_pic>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<i><img src="+obj.contentlist[i].imageurls[0].url.replace('http://','https://')+"></i>"+
								"<span>"+obj.contentlist[i].title+"</span>"+
							"</a>"+
						"</li>"

					num++;
					if (num%3==0) {
						if (liInner) {
							uls+="<ul class=float>"+liInner+"</ul>";
							liInner="";
						}	
					}
				}
			}
			var inner="<h1>"+obj.contentlist[0].channelName+"</h1><div id=pic_group>"+uls+uls+uls+"</div>";
			document.getElementById(parentId).innerHTML=inner;
		});
	}
	addPicNews("5572a108b3cdc86cf39001cd",1,"china")
	addCol("5572a108b3cdc86cf39001ce",3,"int")
	// 渲染一组左右滚动的新闻
	function addCol(id,page,parentId){
		requestNews(id,page,function(obj){
			var picList="",noPicList="";
			var num=0;
			for (var i = 0; i < obj.contentlist.length; i++) {
				if (num==20) {
					break;
				}
				var geile=false;
				if(obj.contentlist[i].havePic==true){

					if(obj.contentlist[i].havePic==true){
						if (geile==false) {
							document.getElementById("banner_box").innerHTML=
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<li>"+
									"<i><img src="+obj.contentlist[i].imageurls[0].url.replace('http://','https://')+"></i>"+
									"<div>"+
										"<span>"+obj.contentlist[i].title+"</span>"+
									"</div>"+
								"</li>"+
							"</a>";
							geile=true;
						}
					}
					num++;
					picList+=
						"<li>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<i><img src="+obj.contentlist[i].imageurls[0].url.replace('http://','https://')+"></i>"+
								"<span>"+obj.contentlist[i].title+"</span>"+
							"</a>"+
						"</li>"
				}
				else{
					noPicList+=
						"<li class=no_pic>"+
							"<a href=./content.html?"+id+"="+(page+"-"+i)+">"+
								"<span>"+obj.contentlist[i].title+"</span>"+
								"<span class=no_pic_icon>无图</span>"
							"</a>"+
						"</li>";
				}
			}
			var inner=
				"<h1>"+obj.contentlist[0].channelName+"</h1>"+
				"<ul class=col style=width:"+num*1.82+"rem>"+picList+"</ul><ul>"+noPicList+"</ul>";
			
			document.getElementById(parentId).innerHTML=inner;
		});
	}


	// add("5572a108b3cdc86cf39001cd");
	// setTimeout(function(){
	// 	addCol("5572a108b3cdc86cf39001ce");
	// },600)


