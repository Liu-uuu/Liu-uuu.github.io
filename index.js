
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
				}else if(txt.value=="yun"){
					window.open("yun.html","_self")
				}else if(txt.value=="作品"){
					window.open("i/index.html","_self")
				}else if (txt.value=="小游戏") {
					window.open("2048.html","_self")
				}else{
					alert("你可以先点击鼠标右键试试 那里有你要的通关文牒")
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
			txt.focus();
			txt.select();

			var listBox=document.getElementById('listbox')
			document.oncontextmenu=function(ev){
				var ev=ev||window.event;
				listBox.style.display='block';
				listBox.innerHTML='<ul>'+
					'<li style="text-align:center">欢迎您来到这里！<br/>恭候多时了</li>'+
					'<li>你可以输入以下关键字进行登录:<p>作品、小游戏、mac</p></li>'+
					'<li>欢迎提出指导意见</li>'+
					'</ul>'
				listBox.style.top=ev.clientY+'px';
				listbox.style.left=ev.clientX+'px';
				return false;
			}
			document.onclick=function(){
				listBox.style.display='none';
			}

		}
