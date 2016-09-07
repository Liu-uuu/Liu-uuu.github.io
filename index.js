
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

			function signIn(){
				if (txt.value=="mac") {
					window.open("desktop.html","_self")
				}else if (text.value=="yun"){
					window.open("yun.html","_self")
				}
				else{
					alert("口令不对哦，再想想！")
				}
			}
			
			btn.onclick=function(){
				signIn();
			}
			txt.onkeypress=function(ev){
				var ev=ev||event;
				if (ev.keyCode==13) {
					signIn();
				}
			}

		}
