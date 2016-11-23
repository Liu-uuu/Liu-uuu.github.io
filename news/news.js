
var datas={};

	function requestData(id,fn){
		var xhr=new XMLHttpRequest();
		xhr.open('get',"https://apis.baidu.com/showapi_open_bus/channel_news/search_news?channelId="+id,true);
		xhr.setRequestHeader('apikey','770651441b1a9c317ead81b8a9137436');
		xhr.send();
		xhr.onreadystatechange=function(){
			if (xhr.readyState==4) {
				if (xhr.status==200) {
					datas[id]=JSON.parse(xhr.responseText).showapi_res_body.pagebean;
					localStorage.data=JSON.stringify(datas);
					fn(id);
				}
			}
		}
	};
	// 6秒后，如果没点击加载频道列表，就加载频道列表
	setTimeout(function (){
		if (!datas.list) {
			var xhr=new XMLHttpRequest();
			xhr.open('get',"https://apis.baidu.com/showapi_open_bus/channel_news/channel_news",true);
			xhr.setRequestHeader('apikey','770651441b1a9c317ead81b8a9137436');
			xhr.send();
			xhr.onreadystatechange=function(){
				if (xhr.readyState==4) {
					if (xhr.status==200) {
						datas.list=JSON.parse(xhr.responseText).showapi_res_body.channelList;
						localStorage.data=JSON.stringify(datas);
						console.log(1)
					}
				}
			}
		}
	},6000)


	function addCol(id){
		requestData(id,function(id){
			var picList="",noPicList="";
			var num=0;
			for (var i = 0; i < datas[id].contentlist.length; i++) {
				if (num==20) {
					break;
				}
				if(datas[id].contentlist[i].havePic==true){
					num++;
					picList+=
						"<li class=has_pic><a href=./content.html?"+id+"="+i+">"+
							"<img src="+datas[id].contentlist[i].imageurls[0].url+">"+
							"<span>"+datas[id].contentlist[i].title+"</span>"+
						"</a></li>"
				}
				else{
					noPicList+=
						"<li class=no_pic><a href=./content.html?"+id+"="+i+">"+
							"<span>"+datas[id].contentlist[i].title+"</span>"+
						"</a></li>";
				}
			}
			document.getElementById('container').innerHTML+=
			"<div class=pindao>"+
				"<h1>"+datas[id].contentlist[0].channelName+"</h1>"+
				"<ul class=col style=width:"+num*1.82+"rem>"+picList+"</ul><ul>"+noPicList+"</ul>"+
			"</div>";
			// for (var i = 0; i < lis.length; i++) {
			// 	lis[i].onclick=function(){
			// 		alert(this.parentNode.id+":::"+this.getAttribute("name"))
			// 	}
			// }
		});
	}
	function add(id){
		requestData(id,function(id){
			var listS="";
			var num=0;
			for (var i = 0; i < datas[id].contentlist.length; i++) {
				if (num==3) {
					break;
				}
				if(datas[id].contentlist[i].havePic==true){
					num++;
					listS+=
						"<li class=has_pic><a href=./content.html?"+id+"="+i+">"+
							"<img src="+datas[id].contentlist[i].imageurls[0].url+">"+
							"<span>"+datas[id].contentlist[i].title+"</span>"+
						"</a></li>"
				}
				// else{
				// 	listS=
				// 		"<li class=no_pic  name="+i+">"+
				// 			"<span>"+datas[id].contentlist[i].title+"</span>"+
				// 		"</li>"+listS;
				// }
			}
			document.getElementById('container').innerHTML+=
			"<div class=pindao>"+
				"<h1>"+datas[id].contentlist[0].channelName+"</h1>"+
				"<ul id="+id+">"+listS+"</ul>"+
			"</div>";
			for (var i = 0; i < lis.length; i++) {
				lis[i].onclick=function(){
					alert(this.parentNode.id+":::"+this.getAttribute("name"))
				}
			}
		});
	}

	add("5572a108b3cdc86cf39001cd");
	setTimeout(function(){
		addCol("5572a108b3cdc86cf39001ce");
	},600)
	// setTimeout(function(){
	// 	add("5572a108b3cdc86cf39001cf")
	// },200)
	
	var lis=document.getElementById("container").getElementsByTagName('li');
