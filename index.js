
		window.onload=function () {

			var box=document.getElementById('box')
			fix(box);
			window.onresize=function(){
				fix(box);
			}
			function fix(obj){
				var left=(document.documentElement.clientWidth-obj.offsetWidth)/2;
				var top=(document.documentElement.clientHeight-obj.offsetHeight)/2;
				
				
				var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
				
				obj.style.left=left+'px';
				obj.style.top=(top+scrollTop)*1.1+'px';
			}
		}