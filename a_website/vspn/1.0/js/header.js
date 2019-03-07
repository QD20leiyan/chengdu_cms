document.write('<script type="text/javascript" src="js/bootstrap-hover-dropdown.min.js"></script>');
var header = '<div id="header">\
	    		<ul class="nav nav-tabs">\
	    		  <li class="logo"><img id="vspn-logo" width="158.23" height="42" src="images/footer/logo.png" alt="VSPN"></li>\
				  <li><a href="Index.html">首页</a></li>\
				  \
				  <li role="presentation" class="dropdown">\
				    <a class="dropdown-toggle" data-hover="dropdown" href="about-us.html" role="button" aria-haspopup="true" aria-expanded="false">\
				      关于我们\
				    </a>\
				    <ul class="dropdown-menu">\
				    	<li><a href="about-us.html#about">公司简介</a></li>\
				    	<li class="divider"></li>\
					    <li><a href="about-us.html#business">业务历程</a></li>\
					    <li class="divider"></li>\
					    <li><a href="about-us.html#partner">合作伙伴</a></li>\
					    <li class="divider"></li>\
					    <li><a href="about-us.html#contact">联系我们</a></li>\
					    <li class="divider"></li>\
					    <div class="trangle-line"></div>\
					    <div class="trangle-top"></div>\
					    <div class="trangle-down"></div>\
				    </ul>\
				  </li>\
\
				  <li role="presentation" class="dropdown">\
				    <a class="dropdown-toggle" data-hover="dropdown" href="BusinessLayout.html" role="button" aria-haspopup="true" aria-expanded="false">\
				      业务布局\
				    </a>\
				    <ul class="dropdown-menu">\
				    	<li><a href="Match.html">赛事运营</a></li>\
				    	<li class="divider"></li>\
					    <li><a href="BrandMarketing.html">电竞商业化</a></li>\
					    <li class="divider"></li>\
					    <li><a href="EsportsTV.html">电竞电视</a></li>\
					    <li class="divider"></li>\
					    <li><a href="Programme.html">节目制作</a></li>\
					    <li class="divider"></li>\
					    <li><a href="ArtistAgent.html">艺人经纪</a></li>\
					    <li class="divider"></li>\
					    <li><a href="VenuesAndEqu.html">电竞场馆</a></li>\
					    <li class="divider"></li>\
					    <div class="trangle-line"></div>\
					    <div class="trangle-top"></div>\
					    <div class="trangle-down"></div>\
				    </ul>\
				  </li>\
\
				  <li><a href="News.html">最新动态</a></li>\
				  <li><a href="join-us.html">加入我们</a></li>\
				</ul>\
	    	</div>';
	  $('#main').prepend($(header));

	  $('#header img').click(function(){
	   	window.location.href = 'Index.html';
	  });

	  var screenW = window.screen.width;
	 //  $('.nav > li > a').css('font-size', 22 / 1920 * screenW + 'px');
	 //  $('.dropdown-menu').css('font-size', 14 / 1920 * screenW + 'px');
	   