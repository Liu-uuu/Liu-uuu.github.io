

var yun=document.getElementById('yun');
var header=document.getElementById('header');
var blue=document.getElementById('blueArea');

var mainDiv=document.getElementById('main');
var leftDiv=document.getElementById('mainLeft');
var rightDiv=document.getElementById('mainRight');

divcss();

// move(blue,yun)

var lw=leftDiv.offsetWidth;
function divcss() {
	// 以下限制高
	var ddd=lw+header.offsetHeight;

	if (yun.offsetHeight<ddd) {
		yun.style.height=ddd+"px";
		
		mainDiv.style.height=lw+"px";
		leftDiv.style.height=lw+"px";
		rightDiv.style.height=lw+"px";

	}else{

		mainDiv.style.height=yun.offsetHeight-header.offsetHeight-2+'px';
		leftDiv.style.height=mainDiv.style.height;
		rightDiv.style.height=mainDiv.style.height;

	}
	// 限制高结束
	console.log(yun.style.height,yun.style.width)

	// 以下限制宽
	mainDiv.style.width=yun.style.width;
	if (mainDiv.offsetWidth<2*lw) {

		leftDiv.style.display='none';		
		rightDiv.style.width=mainDiv.style.width;

		if (mainDiv.offsetWidth<lw) {			
			yun.style.width=lw+"px";
			mainDiv.style.width=lw+"px";
			rightDiv.style.width=lw+"px";
		}

	}else{
		leftDiv.style.display='block';
		rightDiv.style.width=yun.offsetWidth-leftDiv.offsetWidth+'px';
	}
	// 限制宽结束
}
