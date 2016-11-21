var data = {
	files:[
		{
			id:0,
			title:'我的网盘',
			pid:-1,
			type:"file"
		},
		{
			id:1,
			pid:0,
			title:"我的音乐",
			type:"file"
		},
		{
			id:2,
			pid:0,
			title:"我的文档",
			type:"file"
		},
		{
			id:201,
			pid:2,
			title:"公开文档",
			type:"file"
		},
			{
			id:202,
			pid:2,
			title:"保密文档",
			type:"file"
		},
		{
			id:3,
			pid:0,
			title:"我的视频",
			type:"file"
		},
		{
			id:301,
			pid:3,
			title:"精彩视频",
			type:"file"
		},

		{
			id:101,
			pid:1,
			title:"示例音乐",
			type:"file"
		},
		{
			id:1011,
			pid:101,
			title:"流行",
			type:"file"
		},
		{
			id:102,
			pid:1,
			title:"我的收藏",
			type:"file"
		},
		{
			id:1012,
			pid:101,
			title:"摇滚",
			type:"file"
		},
		{
			id:1013,
			pid:101,
			title:"乡村",
			type:"file"
		},
		{
			id:4,
			pid:0,
			title:"我的前端",
			type:"file"
		},
		{
			id:401,
			pid:4,
			title:"HTML"
		},
		{
			id:402,
			pid:4,
			title:"CSS"
		},
		{
			id:403,
			pid:4,
			title:"JS"
		},
		{
			id:404,
			pid:4,
			title:"其他"
		}
	]
}

//hasChild:是否有子数据。参数为ID，返回布尔值
//allChild:找到所有子数据。参数与返回值均为ID的数组
//addChild:添加一个子数据。参数:带有ID属性的obj、名字、类型。
//reName:重命名
var getData={
	//是否有子数据
	hasChild:function (objDataId){
		for (var i = 0; i < data.files.length; i++) {
			if(objDataId==data.files[i].pid){
				return true;
				break;
			}
		}
		return false;
	},
	//所有子数据
	allChild:function (idArr){
		//需找第一层子数据
		function findChild(idArr) {
			var arr=[];
			var m=0;
			for (var i = 0; i < data.files.length; i++) {
				for(var j=0;j<idArr.length;j++){
					if(idArr[j]==data.files[i].pid){
						arr[m]=data.files[i].id;
						m++;
					}
				}
			}
			return arr;
		}

		//遍历所有子数据
		var b=findChild(idArr);

		while(b.length!=0){	
			idArr=idArr.concat(b);
			b=findChild(b);
			console.log(1)
		}
		return idArr;//返回的是ID的数组
	},
	//创建一个子数据。参数：元素对应数据的ID、名字、类型。
	addChild:function (obj,addName,addType){
		if (obj) {
			var sameName=false;                               //变量记录是否重名，默认false。
			for (var i = 0; i < data.files.length; i++) {	  //for循环找到同名数据，为true
				if (data.files[i].pid==obj.id) {              //找到每条与子数据同目录的数据
					if (data.files[i].title==addName) {       //逐条检验是否与新设文件名重复
						sameName=true;                        //若重名，则为true;
						break;
					}	
				}
			}

			if (sameName) {                                   //重名弹出提示。不将新数据加进总数据。
				alert("重名啦！")
			}else{
				var newDateJson={id:0,pid:0,title:"",type:""};//定义一条新数据
				newDateJson.id=new Date().getTime()           //生成唯一ID	
				newDateJson.pid=obj.id
				if (addName) {
					newDateJson.title=addName;
				}else{
					newDateJson.title='file'+newDateJson.id;
				}
				
				newDateJson.type=addType;		
				data.files.push(newDateJson);                 //将这条文件数据加进总数据
			}	
		}else{
			alert('出错啦！')
		}
	},
	//重命名title
	reName:function(dataId,newName) {
		for (var i = 0; i < data.files.length; i++) {
			if(data.files[i].id==dataId){
				data.files[i].title=newName;
			}
		}
	},
	//删除与obj对应的数据
	removeChild:function (obj){
		for (var i = 0; i < data.files.length; i++) {
			if (obj.id==data.files[i].id) {
				data.files.splice(i,1)
			}			
		}	
	} 
}