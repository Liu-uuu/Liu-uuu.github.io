/*-----------------获取头部元素--------------------*/
var yun=document.getElementById('yun');
var header=document.getElementById('header');
var blue=document.getElementById('blueArea');
var toMin=blue.getElementsByTagName('span')[0];
var toClose=blue.getElementsByTagName('span')[1];
/*-----------------获取主体内容元素----------------*/
var mainDiv=document.getElementById('main');
var toCreate=document.getElementById('tocreate');
var toRename=document.getElementById('torename');
var toDelect=document.getElementById('todelect');
var leftDiv=document.getElementById('mainLeft');  //左
var fileTreeArea=document.getElementById("fileTree");
var rightDiv=document.getElementById('mainRight');//右
var pathArea=document.getElementById('path');
var fileArea=document.getElementById('fileArea');
/*-------------------------------------------------*/
//事件添加的兼容
function bind(obj, evname, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evname, fn, false);
	} else {
		obj.attachEvent('on' + evname, function() {
			fn.call(obj);
		});
	}
}
/*-------------------------------------------------*/
//获取元素相对浏览器窗口的位置
function getPos(obj) {	
	var pos = {left:0, top:0,right:0,bottom:0};
	var width0=obj.offsetWidth;
	var height0=obj.offsetHeight;

	while (obj) {
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	}
		pos.right = pos.left+width0;
		pos.bottom = pos.top+height0;
	return pos;
}
		// function getPos(obj){
		// 	return obj.getBoundingClientRect();
		// }
/*-------------------------------------------------*/
// haveChidDate(objDateid)是否有子数据（或元素）
function haveChidDate(objDateid){
	for (var i = 0; i < data.files.length; i++) {
		if(objDateid==data.files[i].pid){
			return true;
			break;
		}
	}
	return false;
}
/*-------------------------------------------------*/
//在obj对应的数据下创建一个子数据
//参数：元素对应数据的ID、名字、类型。
function addOneFile(obj,addName,addType){
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
			alert("重名啦！再给文件宝宝想个名字吧！")
		}else{
			var newDateJson={id:0,pid:0,title:"",type:""};//定义一条新数据
			newDateJson.id=new Date().getTime()           //生成唯一ID	
			newDateJson.pid=obj.id
			if (addName) {
				newDateJson.title=addName;
			}else{
				newDateJson.title='新文件'+newDateJson.id;
			}
			
			newDateJson.type=addType;		
			data.files.push(newDateJson);                 //将这条文件数据加进总数据
		}	
	}else{
		alert('出错啦！')
	}
}
/*-------------------------------------------------*/
//删除与obj对应的数据
function removeOneFile(obj){
	for (var i = 0; i < data.files.length; i++) {
		if (obj.id==data.files[i].id) {
			data.files.splice(i,1)
		}			
	}	
} 
/*-------------------------------------------------*/



/*----------------------响应式调整主体内容区宽高---------------------*/
var windowW=document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth;
var windowH=document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight;
if (windowW<600) {windowW=600}
if (windowH<400) {windowH=400}
yun.style.width=windowW*0.7+'px';
yun.style.height=windowH*0.9+'px';		
yun.style.left=windowW*0.15+'px';
yun.style.top=windowH*0.05+'px';//模拟窗口大小根据打开时的浏览器窗口大小初始化



divcss();//函数默认执行

var leftW=leftDiv.offsetWidth;/*---用变量保存leftDiv.offsetWidth---*/
function divcss() {

	/*----------以下限制高-----------*/
	var minH=header.offsetHeight+leftDiv.offsetWidth;//定义模拟窗口最小高度

	if (yun.offsetHeight<minH) {
		
		yun.style.height=minH+"px";	
		mainDiv.style.height=leftDiv.style.height=rightDiv.style.height=leftDiv.offsetWidth+"px";
		/*---设置左右DIV以及主DIV的最小高度与leftDiv的固定宽度相等---*/

	}else{
		mainDiv.style.height=yun.offsetHeight-header.offsetHeight-2+'px';//2为mainDiv上下border
		leftDiv.style.height=rightDiv.style.height=mainDiv.style.height;
	}
	fileArea.style.height=rightDiv.offsetHeight-30+'px';
	/*---END-------限制高-----------*/


	/*----------以下限制宽-----------*/
	
	
	mainDiv.style.width=yun.style.width;

	if (mainDiv.offsetWidth<2*leftW) {

		leftDiv.style.display='none';		
		rightDiv.style.width=mainDiv.style.width;

		if (mainDiv.offsetWidth<leftW) {
		leftDiv.style.display='none';			
			yun.style.width=leftW+"px";
			mainDiv.style.width=leftW+"px";
			rightDiv.style.width=leftW+"px";
		}

	}else{
		leftDiv.style.display='block';
		rightDiv.style.width=yun.offsetWidth-leftDiv.offsetWidth-3+'px';
	}
	/*---END-------限制宽-----------*/
}
/*---END------------------响应式调整主体内容区宽高---------------------*/







/*-----------------------------改变窗口大小-----------------------------*/
	/*obj.style.cursor  元素的cursor样式代表鼠标的显示方式。
	 * 其值有以下几种。分别代表在不同方向的状态
	 * 左   w-resize  / 上	n-resize
	 * 右	e-resize  / 下	s-resize
	 * 左上	nw-resize / 右上	ne-resize
	 * 右下	se-resize / 左下	sw-resize*/
window.onload=function(){
	divResize(yun,blue)
}

function divResize(obj,obj1){

	var dir='';		//用dir+'-resize'存储鼠标不同方向的显示方式
	var mes={};
	var isDown=0;	//鼠标是否down下,鼠标按下时为true
		
	obj.onmousedown=function(ev){
		var ev=ev||event;
		isDown=1;
		mes={
			x:ev.clientX,
			y:ev.clientY,
			w:this.offsetWidth,
			h:this.offsetHeight,
			l:getPos(this).left,
			t:getPos(this).top,
			r:getPos(this).right,
			b:getPos(this).bottom
		};
		return false;
	}


	var disX;
	var disY;
	obj1.onmousedown = function(ev) {
		var ev = ev || event;
		isDown=2;	
		disX = ev.clientX - obj.offsetLeft;
		disY = ev.clientY - obj.offsetTop;
		ev.cancelBubble = true;		
		return false;		
	}


	document.onmousemove=function(ev){
		var ev=ev||event;
		if(isDown<1){	//鼠标没按下

			dir='';
			obj.style.cursor='auto';
			if(ev.clientY<getPos(obj).top+10){
				dir+='n';	//上
			}			
			if(ev.clientY>getPos(obj).bottom-10){
				dir+='s';	//下
			}			
			if(ev.clientX<getPos(obj).left+10){
				dir+='w';	//左
			}			
			if(ev.clientX>getPos(obj).right-10){
				dir+='e';	//右
			}			
			obj.style.cursor=dir+'-resize';

		}else if(isDown==1){

			if(dir.indexOf('e')!=-1){	//往da拖
				var w=ev.clientX-mes.x+mes.w;			
				obj.style.width=w+'px';
			}			
			if(dir.indexOf('s')!=-1){	//往下拖
				var h=ev.clientY-mes.y+mes.h;			
				obj.style.height=h+'px';
			}			
			if(dir.indexOf('w')!=-1){	//往左拖
				var w=mes.w+(mes.x-ev.clientX);
				var l=mes.l-(mes.x-ev.clientX);				
				obj.style.width=w+'px';
				obj.style.left=l+'px';
			}			
			if(dir.indexOf('n')!=-1){	//往上拖
				var h=mes.h+(mes.y-ev.clientY);
				var t=mes.t-(mes.y-ev.clientY);				
				obj.style.height=h+'px';
				obj.style.top=t+'px';
			}			
			divcss();

		}else if(isDown==2){

			var moveX= ev.clientX - disX;
			var moveY= ev.clientY - disY;
			if (moveY<0) {
				moveY=0;
			}
			obj.style.left = moveX + 'px';
			obj.style.top = moveY + 'px';
			divcss();
		}		
	};
	
	document.onmouseup=function(){
		divcss();
		isDown=0;
		//释放全局捕获 releaseCapture();
		if ( obj.releaseCapture ) {
			obj.releaseCapture();
		}
	};
};
/*-----------------------------改变窗口大小-----------------------------*/

console.log('终于等到你了')
console.log('来不及解释了')
console.log('快联系我TEL:176-0080-0668')


/*----------------------------渲染文件树状导航-----------------------------*/
/*---------1、渲染树状导航的子目录-------------*/
function renderChildTree(obj) {
	obj.innerHTML="";

	for (var i = 0; i < data.files.length; i++) {
		var varfileid=obj.fileid;
		if (data.files[i].pid==varfileid) {
			
			var lis=document.createElement('li');
			var h3s=document.createElement('h3');
			var uls=document.createElement('ul');			
			
			h3s.innerHTML=data.files[i].title;

			h3s.fileid=data.files[i].id;
			h3s.pid=data.files[i].pid;
			h3s.title=data.files[i].title;
			h3s.haveChid=haveChidDate(data.files[i].id)
			
			uls.fileid=data.files[i].id;

			bind(h3s, 'click', treeRenderPath)

			bind(h3s, 'click', function(){
				var oothis=this;
				oothis.fileid=this.fileid;
				renderChildFiles(oothis);	
			})

			function treeRenderPath(){			//组合定义渲染路径的函数。
				var thisH=this;
				var pathArr=renderPathArr(thisH);
				renderPathNode(pathArr)
			}

			lis.appendChild(h3s);
			lis.appendChild(uls);
			obj.appendChild(lis);	

		}		
	}	
}
/*---END------1、渲染树状导航的子目录-------------*/

/*-----------------2、导航的内容------------------*/
renderTree(fileTreeArea);
function renderTree(obj){
	/*------一级目录生成------*/
	var oul=document.createElement('ul');//创建一级目录的ul
	oul.fileid=0;		 //初始化ul的关键参数
	oul.title='我的文件';

	renderChildTree(oul);				//先渲染ul的子目录。
	obj.appendChild(oul);				//将ul添加到父级（页面）。
	
	function treeImg(){                 //文件名前图标类型显示
		var h3Num=oul.getElementsByTagName('h3');
		for (var i = 0; i < h3Num.length; i++) {				
			if(h3Num[i].haveChid){
				h3Num[i].style.backgroundImage='url('+'treeimg.png'+')';
			}
		}
	}
	treeImg();							//显示文件图标类型

	/*---END---一级目录生成------*/

	/*------以下追加点击<打开/闭合>效果------*/

	var tit=oul.getElementsByTagName('h3');	
	var uls=oul.getElementsByTagName('ul');

	for (var i = 0; i < tit.length; i++) {

		tit[i].index=i;
		tit[i].onclick=onOffBtn;

		function onOffBtn(){

			var inner=uls[this.index].innerHTML			
			if(!inner){
				uls[this.index].style.paddingLeft=20+'px';
				renderChildTree(uls[this.index]);
			};
			
			if (this.onoff) {
				uls[this.index].style.display='none';
				this.style.backgroundPosition='0 4px'
				this.onoff=false;
			}else{	
				uls[this.index].style.display='block';
				this.style.backgroundPosition='0 -46px'
				this.onoff=true;
			}	
			
			tit=oul.getElementsByTagName('h3');	  //重新获取，更新值为递归设置事件做准备
			uls=oul.getElementsByTagName('ul');	
			for (var i = 0; i < tit.length; i++) {//用递归的方式为每个子元素加开关。
				tit[i].index=i;
				tit[i].onclick=onOffBtn;
			}
			treeImg()	//限制文件名前图标类型显示
		}
	}	
}
/*-----------------2、导航的内容------------------*/
/*---END-----------------------渲染文件树状导航----------------------------*/





/*----------------------------渲染文件区------------------------------------*/
fileArea.fileid=0;
renderChildFiles(fileArea);//初始渲染一次。参数为fileArea文件显示区的DIV。

/*---------------------根据数据渲染子文件----------------*/ 
//renderChildFiles(obj) 根据文件数据渲染obj下所有对应子元素
//obj必须具有obj.fileid属性。

function renderChildFiles(obj) {
	fileArea.innerHTML="";
	fileArea.visitorId=obj.fileid;//记录是哪位客人占用了fileArea的innerHTML
	var haveChidFile=haveChidDate(obj.fileid);

	if (haveChidFile) {

		for (var i = 0; i < data.files.length; i++) {

			if (data.files[i].pid==obj.fileid) {
		
				var newfiles=document.createElement('div');
				var newfileName=document.createElement('a');

				newfiles.fileid=data.files[i].id;
				newfiles.pid=data.files[i].pid;
				newfiles.title=data.files[i].title;
				newfiles.type=data.files[i].type;
				newfiles.haveChid=haveChidDate(newfiles.fileid);

				
				newfiles.onmouseover=function(){
					this.style.backgroundColor='#bfdaf4';
				}
				newfiles.onmouseout=function(){
					this.style.backgroundColor=''
				}
				newfiles.onclick=function(){
					if (this.selected) {
						this.style.border='';
						this.selected=false;
					}else{
						this.style.border='1px solid #479de3';
						this.selected=true;
					}

				}

				newfiles.ondblclick=function(){
					renderChildFiles(this);
					renderPath(this)
				}
	
				newfileName.innerHTML=data.files[i].title;

				newfiles.appendChild(newfileName)
				fileArea.appendChild(newfiles);
			}		
		}	
	}else{
		fileArea.innerHTML="<p id=nofile>---"+ obj.title+"---:暂时还没有内容<br/>"+"</p>";
	}

}
/*---END------------根据数据渲染子文件-------------------*/ 
/*----------------------------渲染文件区------------------------------------*/






/*------------------------------------------------------------------------获取路径------*/
//路径函数 ，按需调用。
function renderPath(obj){
	var pathArr=renderPathArr(obj);
	renderPathNode(pathArr)
}

/*------------------------------------------------------------------------------*/
//根据带有pid数据的元素，获取路径的数组。
//var pathArr=renderPathArr(obj)

//得到路径数组：pathArr
function renderPathArr(obj){
	var arr=[];
	var abc={};
	// abc.id=obj.fileid;				
	//定义abc为参照物。adc是数组的一员，数组传给元素的属性在abc里要有.
	for (var i = 0; i < data.files.length; i++) {
		if(data.files[i].id==obj.fileid){
			abc=data.files[i];
			// alert(abc.id)
			// alert(data.files[i].id)
			break;
		}
	}
	arr.unshift(abc)

	function findPrev() {
		for (var i = 0; i < data.files.length; i++) {
			if (data.files[i].id==abc.pid) {				
				abc=data.files[i];
				// abc.fileid=data.files[i].id;//fileid
				arr.unshift(abc)
				break;
			}	
		}
	}
	for (var i = 0; i < data.files.length; i++) {
		findPrev()
	}
	return arr;
}
/*------------------------------------------------------------------------------*/
//渲染路径元素（节点）
//renderPathNode(arr)参数：路径数组

// renderPathNode(pathArr)
function renderPathNode(arr){

	var pathBox=document.createElement('div'); //创建路径容器

	for (var i = 0; i < arr.length; i++) {

		var pathA=document.createElement('a');
		pathA.innerHTML= arr[i].title;      //给A添加innerHTML
		pathA.fileid=arr[i].id;             //给A添加fileid。用于点击时渲染文件区。
		pathA.title= arr[i].title; 
		pathA.arrIndex=i;                    //给A添加在数组中的index
		/*-----click------*/
		pathA.onclick=function(){
			var othis=this;
			pathPop()                        //递归函数 删除元素
			function pathPop(){
				if (othis.nextSibling) {
					othis.parentNode.removeChild(othis.nextSibling)//dom元素删除		
					pathPop()
				}			
			}
			arr.splice(othis.arrIndex+1,(arr.length-othis.arrIndex-2))//路径数据删除
			renderChildFiles(othis);         //依照此A再渲染内容区。
		}
		/*-----click结束------*/

		pathBox.appendChild(pathA);          //最后一步，装进pathBox容器
	}
	pathArea.innerHTML='';
	pathArea.appendChild(pathBox);	
}
/*------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------获取路径END------*/





/*-----------------------------按钮功能-----------------------------*/
//关闭按钮
toClose.onclick=function(){
	yun.style.display='none';
}


//最小化按钮
toMin.onclick=function(){

	yun.style.height='30px';
	yun.style.width='160px';
	yun.style.left=0;
	yun.style.top=(document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight)-30+'px';

	//弹出窗口按钮
	blue.getElementsByTagName('strong')[0].onclick=function(){
		var windowW=document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth;
		var windowH=document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight;
		if (windowW<600) {windowW=600}
		if (windowH<400) {windowH=400}
		yun.style.width=windowW*0.7+'px';
		yun.style.height=windowH*0.9+'px';		
		yun.style.left=windowW*0.15+'px';
		yun.style.top=windowH*0.05+'px';

		divcss();
		blue.getElementsByTagName('strong')[0].onclick=null;
	}
}
blue.getElementsByTagName('strong')[0].style.cursor='pointer';
//浏览器窗口调整大小时，最小化图标定位左下角
window.onresize=function(){
	if (yun.style.height=='30px') {
		yun.style.height='30px';
		yun.style.width='160px';
		yun.style.left=0;
		yun.style.top=(document.documentElement.clientHeight||document.body.clientHeidth||window.innerHeight)-30+'px';
	}
}

// var toCreate=document.getElementById('tocreate');
// var toRename=document.getElementById('torename');
// var toDelect=document.getElementById('todelect');

//新建文件夹按钮
toCreate.onclick=function(){
	var newDiv=document.createElement('div');
	var newInput=document.createElement('input');
	var newA=document.createElement('a');
	newInput.type='text';

	newDiv.appendChild(newInput);
	newDiv.appendChild(newA);
	fileArea.appendChild(newDiv);
	// alert(fileArea.visitorId)
	newInput.focus();

	var thisParentFile;//定义并找到新文件的父文件夹
	for (var i = 0; i < data.files.length; i++) {
		if(data.files[i].id==fileArea.visitorId){
			thisParentFile=data.files[i];
			thisParentFile.fileid=data.files[i].id;
		}
	}
	
	newInput.onkeydown=function(e){
		var e=e||window.event;
		if (e.keyCode==13) {
			newA.innerHTML=newInput.value;
			newInput.style.display='none';
			addOneFile(thisParentFile,newInput.value,'file');
			renderChildFiles(thisParentFile)
			fileTreeArea.innerHTML='';
			renderTree(fileTreeArea)//树状导航
		}
	}

}

//重命名按钮
toRename.onclick=function(){
	var areaDiv=fileArea.getElementsByTagName('div');
	var oneDiv=0;
	for (var i = 0; i < areaDiv.length; i++) {
		if(areaDiv[i].selected){
			oneDiv++;
			var renameDiv=areaDiv[i]
		}
	}
	if (oneDiv==1) {
		var ipt=document.createElement('input');
		ipt.type='text';
		ipt.value=renameDiv.children[0].innerHTML;

		renameDiv.children[0].style.display='none';
		renameDiv.appendChild(ipt);
		ipt.focus();
		ipt.onkeydown=function(e){
			var e=e||window.event;
			if (e.keyCode==13) {

				var thisParentFile;//定义并找到文件的父文件夹
				for (var i = 0; i < data.files.length; i++) {
					if(data.files[i].id==fileArea.visitorId){
						thisParentFile=data.files[i];
						thisParentFile.fileid=data.files[i].id;
					}
				}
				// alert(renameDiv.fileid)
				for (var i = 0; i < data.files.length; i++) {
					if(data.files[i].id==renameDiv.fileid){
						data.files[i].title=ipt.value;
						renderChildFiles(thisParentFile)//内容区
						fileTreeArea.innerHTML='';
						renderTree(fileTreeArea)//树状导航
					}
				}
			}
			
		}

	}else if(oneDiv==0){
		alert('逗我玩的吧 你并没有选中任何文件')
	}else{
		alert('是在下输了 并不能同时重命名'+oneDiv+'个文件')
	}
}

//删除按钮
toDelect.onclick=function(){
	var areaDiv=fileArea.getElementsByTagName('div');
	var delArr= []

	for (var i = 0; i < areaDiv.length; i++) {
		if(areaDiv[i].selected){
			delArr.push(areaDiv[i])
		}
	}
	for (var i = 0; i < delArr.length; i++) {
		delArr[i].parentNode.removeChild(delArr[i])
	}
}

// document.onkeydown=function(e){
// 	alert(e.keyCode)
// }