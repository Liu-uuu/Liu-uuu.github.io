
function divResize(obj,obj1){
	/*
	 * 鼠标方向
	 * 左		w-resize
	 * 上		n-resize
	 * 右		e-resize
	 * 下		s-resize
	 * 
	 * 左上		nw-resize
	 * 右上		ne-resize
	 * 右下		se-resize
	 * 左下		sw-resize
	 * 
	 */

	var dir='';		//用于存储方向
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
			// if(ev.clientY<getPos(obj).top+10){
			// 	dir+='n';	//上
			// }
			
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
				
				// if(w<100){
				// 	w=100;
				// }
				
				obj.style.width=w+'px';
			}
			
			if(dir.indexOf('s')!=-1){	//往下拖
				var h=ev.clientY-mes.y+mes.h;
				
				// if(h<100){
				// 	h=100;
				// }
				
				obj.style.height=h+'px';
			}
			
			if(dir.indexOf('w')!=-1){	//往左拖
				var w=mes.w+(mes.x-ev.clientX);
				var l=mes.l-(mes.x-ev.clientX);
				
				
				// if(w<100){
				// 	w=100;
				// }
				
				// if(l>mes.r-100){
				// 	l=mes.r-100;
				// }
				
				obj.style.width=w+'px';
				obj.style.left=l+'px';
			}
			
			// if(dir.indexOf('n')!=-1){	//往上拖
			// 	var h=mes.h+(mes.y-ev.clientY);
			// 	var t=mes.t-(mes.y-ev.clientY);
				
			// 	if(h<100){
			// 		h=100;
			// 	}
			// 	// if(t>mes.b-100){
			// 	// 	t=mes.b-100;
			// 	// }
				
			// 	obj.style.height=h+'px';
			// 	obj.style.top=t+'px';
			// }
			
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
		//END	
	};
};
// function getPos(obj){
// 	return obj.getBoundingClientRect();
// }
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


