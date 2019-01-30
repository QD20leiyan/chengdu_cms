<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
  <meta name="keywords" content="VSPN 新闻动态 news">
  <link rel="shortcut icon" href="{$global.icon_img}">
  <link rel="stylesheet" type="text/css" href="{$smarty.const.STATIC_DOMAIN}1.0/bootstrap/css/bootstrap.css?{$smarty.const.VERSION}">
  <link rel="stylesheet" type="text/css" href="{$smarty.const.STATIC_DOMAIN}1.0/css/reset.css?{$smarty.const.VERSION}">
  <link rel="stylesheet" type="text/css" href="{$smarty.const.STATIC_DOMAIN}1.0/css/common.css?{$smarty.const.VERSION}">
  <!--[if IE 9 ]>
  <link rel="stylesheet" type="text/css" media="all" href="{$smarty.const.STATIC_DOMAIN}1.0/css/newlistie.css?{$smarty.const.VERSION}" />
  <![endif]-->
  <!--[if !(IE 9)]><!--><link rel="stylesheet" type="text/css" href="{$smarty.const.STATIC_DOMAIN}1.0/css/newslist.css?{$smarty.const.VERSION}"/><!--<![endif]-->
  <title>新闻动态</title>
</head>
<body>
  <div id="main" style="background-color: #272728">
    {include '../../layouts/wap/header.html'}
    <!-- 标题 -->
    <div class="mainTitle aboutTitle">
      <p class="activeColor topFont">新闻动态</p>
      <div class="title-line"></div>
      <div class="title-line-center"></div>
      <p class="subheadColor bottomFont">News</p>
    </div>
    <!-- 下方内容 -->
    <div class="content">
      <div class="news_list">
        <!-- 前3个新闻的对应的图片 -->
        <div id="news-top3-img">
          {fragment var=news_banner code=news_banner size=3}
          {if $news_banner neq ''}
          {foreach $news_banner as $key=>$v}
          <a href="{if $v.url}{$v.url}{else}javascript:;{/if}"><img id="img{$key+1}" src="{$v.thumb}"></a>
          {/foreach}
          {/if}
        </div>
        <ul id="news_list_ul" data-id="{$id}">
          {if !empty($data)}
          {foreach $data as $v}
          <li>
            <a target="_blank" href="{$v.linkUrl}">
              <span class="news_title">{$v.title}</span>
              <span class="news_time">{$v.created_at_formate}</span>
            </a>
          </li>
          {/foreach}
          {else}
          <div class="noData" style="line-height: 200px;color: #ab9365;text-align: center;font-size: 22px;">暂无数据</div>
          {/if}
        </ul>
        
      </div>


    </div>
    {include '../../layouts/wap/footer.html'}
  </div>
</body>
<script src="{$smarty.const.STATIC_DOMAIN}1.0/m/js/jquery-1.11.2.min.js?{$smarty.const.VERSION}"></script>
<script type="text/javascript">
    var isScroll = 1;//是否可以滚动
    var page = 1; //页数
    var id = $("#news_list_ul").attr("data-id");//类型
    var ajaxUrl = '{myurl name="commonMethod/ajax-get-list"}';
    getListFu();
    window.onscroll=function(){
        var winH = window.innerHeight; //屏幕高度
        var allH = document.body.scrollHeight; //总高度
        var topH = window.pageYOffset; //滚动高度
        if((allH - (winH
                + topH)<10) && isScroll == 1){
            isScroll = 0;
        }
    }
    function getListFu(){
        $.ajax({
            type:"get",
            url:ajaxUrl,
            data:{
                page:page++,
                id:id,
            },
            success:function(data){
                var data = JSON.parse(data);
                var result = '';
                if(data.status == 0&& data.msg.length>0){
                    for(var i = 0; i < data.msg.length; i++) {
                        result += "<li><a href=" + data.msg[i].wapLinkUrl+"><span><i>" +data.msg[i].name+"</i>"+data.msg[i].title+"</span><span>"+data.msg[i].created_at+"</span></a></li>";
                    }
                    if(data.msg.length<9){
                         $(".list-info .list-article").css("height","auto");
                         $(".more").hide();
                    }

                    $('#news_list_ul').append(result);
                    isScroll = 1;
                    $(".noData").hide();
                }else{
                     result += "";
                    $(".list-info .list-article").css("height","auto");
                         $(".more").hide();
                    $('#news_list_ul').append(result);
                     $(".noData").html("暂无数据...");
                }
            },
            error:function(data){
                console.log(data);
            }
        });
    }
</script>
</html>