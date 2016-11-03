
		window.onload=function () {

			var box=document.getElementById('box')
			// fix(box);
			// window.onresize=function(){
			// 	fix(box);
			// }
			// function fix(obj){
			// 	var left=(document.documentElement.clientWidth-obj.offsetWidth)/2;
			// 	var top=(document.documentElement.clientHeight-obj.offsetHeight)/2;
				
				
			// 	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
				
			// 	obj.style.left=left+'px';
			// 	obj.style.top=(top+scrollTop)*1.1+'px';
			// }


			var txt=document.getElementById("txt");
			var btn=document.getElementById("btn");

			function signIn(){
				var pages=[
					{
						name:"苹果",
						path:"desktop.html"
					},
					{
						name:"手机",
						path:"m.html"
					},
					{
						name:"天气",
						path:"tq.html"
					},
					{
						name:"新闻",
						path:"news.html"
					},
					{
						name:"游戏",
						path:"2048.html"
					},
					{
						name:"企业",
						path:"qiye.html"
					}
				];

				for (var i = 0; i < pages.length; i++) {
					if (txt.value==pages[i].name) {
						window.open(pages[i].path,"_self");
						return 1;
						break;
					}
				}

			}
			
			btn.onclick=function(){
				var aa=signIn();
				if (!aa) {
					window.open("i/index.html","_self");
				}
			}
			txt.onkeypress=function(ev){
				var ev=ev||event;
				if (ev.keyCode==13) {
					var aa=signIn();
					if (!aa) {
						window.open("i/index.html","_self");
					}
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
					'<li>可用以下密码登录:<p>手机&nbsp|&nbsp天气&nbsp|&nbsp新闻</p><p>苹果&nbsp|&nbsp企业&nbsp|&nbsp文件夹</p></li>'+
					'<li class="tips">如果登录的是手机页面，请将窗口调小后刷新即可</li>'+
					'</ul>'
				listBox.style.top=ev.clientY+'px';
				listbox.style.left=ev.clientX+'px';
				return false;
			}
			document.onclick=function(){
				listBox.style.display='none';
			}

		}
