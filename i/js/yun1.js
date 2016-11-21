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
var toDelete=document.getElementById('todelect');
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

/*----------------------响应式调整主体内容区宽高---------------------*/




divcss();//函数默认执行

var leftW=leftDiv.offsetWidth;/*---用变量保存leftDiv.offsetWidth---*/
function divcss() {

	/*----------以下限制高-----------*/
	var minH=header.offsetHeight+leftDiv.offsetWidth;//定义模拟窗口最小高度
	if (yun.style.display!="none") {
		if (yun.offsetHeight<minH) {
			
			yun.style.height=minH+"px";	
			mainDiv.style.height=leftDiv.style.height=rightDiv.style.height=leftDiv.offsetWidth+"px";
			/*---设置左右DIV以及主DIV的最小高度与leftDiv的固定宽度相等---*/

		}else{
			mainDiv.style.height=yun.offsetHeight-header.offsetHeight-2+'px';//2为mainDiv上下border
			leftDiv.style.height=rightDiv.style.height=mainDiv.style.height;
		}
		fileArea.style.height=rightDiv.offsetHeight-30+'px';
	}

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
	divResize(yun)
}

function divResize(obj){

	//dir:用dir+'-resize'存储鼠标不同方向的显示方式
	//isDown:鼠标是否down下,鼠标按下时为true
	var dir='',	mes={},isDown=0;

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


	var disX,disY;



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

			if(dir.indexOf('e')!=-1){	//往右拖
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
