
		window.onload=function () {

			var box=document.getElementById('box');


			var txt=document.getElementById("txt");
			var btn=document.getElementById("btn");

			function signIn(){
				var pages=[
					{
						name:"苹果",
						path:"desktop.html",
					},
					{
						name:"文件",
						path:"./i/index.html",
					},
					{
						name:"color",
						path:"color.html",
					},
					{
						name:"ps",
						path:"webps.html"
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
					alert("输入有误！！")
					// window.open("i/index.html","_self");
				}
			}
			txt.onkeypress=function(ev){
				var ev=ev||event;
				if (ev.keyCode==13) {
					var aa=signIn();
					if (!aa) {
						alert("输入有误！！")
						// window.open("i/index.html","_self");
					}
				}
			}
			txt.focus();
			txt.select();

			var listBox=document.getElementById('listbox')
			// document.oncontextmenu=function(ev){
			// 	var ev=ev||window.event;
			// 	listBox.style.display='block';
			// 	listBox.innerHTML='<ul>'+
			// 		'<li style="text-align:center">欢迎您来到这里！<br/>恭候多时了</li>'+
			// 		'<li>可用以下密码登录:<p>文件&nbsp;|&nbsp;ps&nbsp|&nbsp苹果</p></li>'+
			// 		'<li class="tips">如果登录的是手机页面，请将窗口调小后刷新即可</li>'+
			// 		'</ul>'
			// 	listBox.style.top=ev.clientY+'px';
			// 	listbox.style.left=ev.clientX+'px';
			// 	return false;
			// }
			// document.onclick=function(){
			// 	listBox.style.display='none';
			// }

		}
