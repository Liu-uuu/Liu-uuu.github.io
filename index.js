
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


			var txt=document.getElementById("txt");
			var btn=document.getElementById("btn");

			btn.onclick=function(){
				if (txt.value=="叮咚") {
					window.open("welcome.html")
				}else{
					alert("口令不对哦，再想想！")
				}
			}

		}