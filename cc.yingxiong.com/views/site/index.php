<?php

use yii\helpers\Url;
use common\Cms;

?>


<link href="<?php echo STATIC_DOMAIN?>2.0/public/reset.css?<?= VERSION?>" rel="stylesheet">
<link href="<?php echo STATIC_DOMAIN?>2.0/public/public.css?<?= VERSION?>" rel="stylesheet">
<link href="<?php echo STATIC_DOMAIN?>2.0/css/c_index.css?<?= VERSION?>" rel="stylesheet">
<div id="i_lg_zc" class="i_lg_zc i_lg_zc_hide">
    <div>
        <img src="images/i_img1.png?<?= VERSION?>" alt="登录log">
        <label class="i_lg_close"></label>
        <div>
            <div class="i_login_form">
                <form class="i_yx_login" onsubmit="return false">
                    <ul>
                        <li class="i_l1">
                            <a class="a1 active" href="javascript:">英雄通行证登录</a>
                            <a class="a2" href="javascript:">短信验证登陆</a>
                        </li>
                        <li class="i_l2">
                            <label></label>
                            <input type="text" name="user">
                            <p>手机号/邮箱/用户名</p>
                        </li>
                        <li class="i_erro"></li>
                        <li class="i_l3">
                            <label></label>
                            <input type="password" name="pwd">
                            <p>登陆密码</p>
                        </li>
                        <li class="i_erro"></li>
                        <li class="i_l4">
                            <button id="yx_login_btn" type="button">登录</button>
                        </li>
                        <li class="i_l5">
                            <a href="javascript:">快速注册</a>
                        </li>
                    </ul>
                </form>
                <form class="i_dx_login">
                    <ul>
                        <li class="i_l1">
                            <a class="a1" href="javascript:">英雄登陆证登陆</a>
                            <a class="a2 active" href="javascript:">短信验证登陆</a>
                        </li>
                        <li class="i_l2">
                            <label></label>
                            <input type="text" name="n_phone">
                            <p>请输入手机号</p>
                        </li>
                        <li class="i_erro"></li>
                        <li class="i_l3">
                            <label></label>
                            <input type="text" name="yzm">
                            <p>短信验证码</p>
                            <span id="i_get_yzm" name="true">获取验证码</span>
                        </li>
                        <li class="i_erro"></li>
                        <li class="i_l4">
                            <button id="p_login_btn" type="button">登录</button>
                        </li>
                        <li class="i_l5">
                            <a href="javascript:">快速注册</a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="y_head">
    <div>
        <img src="images/y_logo_03.jpg" alt="" class="y_logo">
        <p>一切以玩家乐趣为依归</p>
        <div>
            <a class="y_user" href="#">帐号中心</a>
            <a class="y_kf" href="#">客服中心</a>
            <p>
                <a class="y_zw active" href="javascript:">中文</a>|<a class="y_yw" href="javascript:">English</a>
            </p>
        </div>
    </div>
</div>




<div class="i_head">
    <!--[if IE 8]>
    <div class="i_banner"></div>
    <![endif]-->
    <video autoplay="" class="i_video" data-setup="{}" id="i_video" loop="" preload="none">
        <source src="<?php echo STATIC_DOMAIN ?>2.0/video_box/cc_index_video.mp4" type="video/mp4">
    </video>
    <div class="i_h_content">
        <?php echo $this->render('@app/views/layouts/pc/nav.php', ['nav' => 'index']);?>

        <div class="i_h_btn">
                <a class="i_h_xz" href="javascript:alert('敬请期待！')">
                    下载游戏
                </a>
                <div id="userLogin">
                    <div class="i_login_end" style="display: <?php if (Cms::getSession('loginName', '')) { echo 'block'; } else {echo 'none';}?>">
                        <span id="lognUser">亲爱的<?php echo Cms::getSession('loginName')?>,欢迎您</span>
                        <a href="javascript:" id="logout">退出登录</a>
                    </div>

                    <div class="i_login_ing" style="display: <?php if (!Cms::getSession('loginName', '')) { echo 'block'; } else {echo 'none';}?>">
                        亲爱的玩家，欢迎
                        <a id="i_login_btn" href="javascript:">
                            登录
                        </a>
                        或者
                        <a id="i_zc_btn" href="http://i.yingxiong.com/pass/register?username=" target="_blank">
                            注册帐号
                        </a>
                    </div>
                </div>
            </div>
            <div id="i_h_jt" class="i_h_jt">
                <img  src="<?php echo STATIC_DOMAIN ?>2.0/images/c_down.png?<?= VERSION?>">
            </div>
        </div>
</div>
<div id="c_content" class="c_content">
    <div class="i_xwzx">
        <div class="i_xw_title">
            <img alt="新闻中心" src="<?php echo STATIC_DOMAIN ?>2.0/images/c_xwzx.png?<?= VERSION?>"/>
        </div>
        <div class="i_xw_c">
            <div class="i_xw_gg">
                <div>
                    <h1>
                        最新公告
                    </h1>
                    <span>
                            Latest announcement
                        </span>
                    <a href="<?php echo Url::to(['article/index'])?>">
                        More >
                    </a>
                </div>
                <p>
                    <a style="color: black;" href="<?php echo Url::to(['article/detail', 'id' => $xinwen[0]['id']])?>"><?php echo $xinwen[0]['title'];?></a>
                </p>
                <div class="i_xw_gg_role">
                    <h1>
                        NEW
                    </h1>
                    <h2>
                        Role
                    </h2>
                    <a href="<?php echo $pic[0]['url']?>"><img src="<?php echo $pic[0]['thumb']?>"></a>


                </div>
            </div>
            <div class="i_xw_lb page_lb">
                <ul>
                    <?php foreach ($banner as $v) {?>
                        <li><a href="<?php echo $v['url']?>"><img src="<?php echo $v['thumb']?>" alt=""/></a></li>
                    <?php }?>
                </ul>
                <div class="lb_icon lb_line">
                    <label class="active"></label><label></label><label></label><label></label>
                </div>
            </div>
        </div>
    </div>
    <div class="i_zz">
        <div class="i_zz_title">
            <img alt="种族介绍" src="<?php echo STATIC_DOMAIN ?>2.0/images/c_zz_title.png?<?= VERSION?>"/>
        </div>
        <div>
            <div class="i_zz_1">
                <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_zz_img1.png?<?= VERSION?>">
                <div>
                    <h1>
                        妖族
                        <span>
                                Beastkin
                            </span>
                    </h1>
                    <p>
                        妖族第一位王者诞生于牛魔族。当时的妖星花果山所处的星系没有恒星，处于无光的暗夜。
                    </p>
                </div>

            </div>
            <div class="i_zz_2">
                <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_zz_img2.png?<?= VERSION?>">
                <div>
                    <h1>
                        神族
                        <span>
                                Protoss
                            </span>
                    </h1>
                    <p>
                        妖族第一位王者诞生于牛魔族。当时的妖星花果山所处的星系没有恒星，处于无光的暗夜。
                    </p>
                </div>

            </div>
            <div class="i_zz_3">
                <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_zz_img3.png?<?= VERSION?>">
                <div>
                    <h1>
                        人族
                        <span>
                                Terran
                            </span>
                    </h1>
                    <p>
                        妖族第一位王者诞生于牛魔族。当时的妖星花果山所处的星系没有恒星，处于无光的暗夜。
                    </p>
                </div>

            </div>
        </div>
    </div>
    <div class="i_sp">
        <div class="i_sp_title">
            <img alt="视频中心" src="<?php echo STATIC_DOMAIN ?>2.0/images/c_sp_img1.png?<?= VERSION?>"/>
        </div>
        <div class="i_sp_c">
            <img src="<?php echo STATIC_DOMAIN ?>2.0/images/c_sp_img2.png?<?= VERSION?>">
            <div id="i_sp_v">
                <?php foreach ($video as $k => $v) {?>
                    <div class="i_sp_v<?php echo $k+1;?>" <!--rel="--><?php /*echo $v->contentMessage*/?>">
                        <img  src="<?php echo $v['thumb'] ?>">
                        <label></label>
                    </div>
                <?php }?>
            </div>
            <ul class="i_sp_wd">
                <li>
                    <img alt="" src="<?php echo STATIC_DOMAIN ?>2.0/images/c_wd.png?<?= VERSION?>"/>
                    <?php foreach ($FAQ as $v) {?>
                        <p>
                            <a style="color: black;" href="<?php echo Url::to(['article/detail', 'id' => $v['id']])?>"><?php echo $v['title']?></a>
                        </p>
                    <?php }?>
                </li>
                <li class="i_sp_last_li">
                    <img alt="" src="<?php echo STATIC_DOMAIN ?>2.0/images/c_zzxy.png?<?= VERSION?>"/>
                    <?php foreach ($zhanzheng as $v) {?>
                        <p>
                            <a style="color: black;" href="<?php echo Url::to(['article/detail', 'id' => $v['id']])?>"><?php echo $v['title']?></a>
                        </p>
                    <?php }?>
                </li>
            </ul>

        </div>
    </div>
</div>
<!-- 这是弹窗播放器 -->
<div class="page_video_box">
    <div id="my_video" class="my_video">
        <embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high"  width="640" height="360" align="middle" allowScriptAccess="always" flashvars="auto_play=1&gpcflag=1&width=640&height=360" type="application/x-shockwave-flash"></embed>
        <label class="v_close"></label>
    </div>
</div>
<script src="<?php echo STATIC_DOMAIN ?>2.0/public/jquery-1.7.1.min.js?<?= VERSION?>" type="text/javascript"></script>
<script src="<?php echo STATIC_DOMAIN ?>2.0/public/public.js?<?= VERSION?>" type="text/javascript"></script>
<script type="text/javascript">
    $(document).ready(function(){
        var djs_timer = "";
        var i_erro = $(".i_erro");

        function init(){
            page_input_init();
            init_banner_video();
            banner_init();
            page_aninate1(40,800);
        }
        //初始化banner播放器
        function init_banner_video(){
            var i_head = $(".i_head");
            var i_video = $(".i_video");
            var video_height = i_video.width()*0.5;
            i_head.height(video_height+"px");
            i_video.height(video_height+"px");
        }
        function banner_init(){
            banner.init($(".page_lb"));
        }
        function page_aninate1(l,time){
            $("#i_h_jt").animate({bottom:l+"px"},time,function(){
                if(l == 40){
                    l = 80;
                }else {
                    l = 40;
                }
                page_aninate1(l,1600);
            });
        }
        //弹出登录框
        function show_login_page(){
            $("#i_lg_zc").css({
                display: "block"
            })
            setTimeout(function(){
                $("#i_lg_zc").attr("class","i_lg_zc");
            },10);
        }
        //初始化登录输入框显示
        function page_input_init(){
            $(".i_login_form input").val(null).blur();
        }
        //英雄用户帐号登录和手机短信登录切换
        function change_login(left){
            $(".i_login_form").animate({"margin-left":left+"px"},200);
        }
        //前端验证手机登录的手机号码是否正确
        function is_ok_phone(){
            var my_input = $(".i_dx_login").find("input");
            var my_phone = my_input.eq(0).val();
            if(my_phone == "" || my_phone == undefined){
                login_err(2,"手机号不能为空");
                return;
            }

            if(!(/^1[345789]\d{9}$/.test(my_phone))){
                login_err(2,"请输入正确的手机号码");
                return false;
            }
            return true;
        }
        //前端验证手机登录的验证码是否正确
        function is_ok_yzm(){
            var my_input = $(".i_dx_login").find("input");
            var my_yzm = my_input.eq(1).val();
            if(my_yzm == "" || my_yzm == undefined){
                login_err(3,"验证码不能为空");
                return;
            }
            return true;
        }
        //倒计时
        function page_djs(ele,callback){
            var time = 60;
            if(ele){
                ele.html("60s");
            }
            djs_timer = setInterval(function(){
                time--;
                ele.html(time+"s");
                if(time == 0){
                    clearInterval(djs_timer);
                    ele.html("获取验证码");
                    if(callback){
                        callback();
                    }
                }
            },1000);
        }
        //登录错误提示
        //index : 错误显示的标签下标
        //text ： 错误提示内容
        function login_err(index,text){
            i_erro.eq(index).html(text);
        }
        //页面事件
        //点击向下箭头滚动
        $("#i_h_jt>img").click(function(){
            var scroll_offset = $("#c_content").offset();
            $("body,html").animate({
                scrollTop:scroll_offset.top
            },400);
        });
        //弹出登录框
        $("#i_login_btn").click(function(){
            change_login(0);
            setTimeout(function(){
                show_login_page();
            },210);
        });
        //
        $("#i_zc_btn").click(function(){
            change_login(-400);
            setTimeout(function(){
                show_login_page();
            },210);
        });
        //登录切换
        $(".i_login_form form li.i_l1 .a1").click(function(){
            change_login(0);
        });
        $(".i_login_form form li.i_l1 .a2").click(function(){
            change_login(-400);
        });

        $(".i_login_form p").click(function(){
            $(this).css({
                display: "none"
            }).parent().children("input").focus();
        });
        $(".i_login_form input").focus(function(){
            $(this).parent().children("p").css({
                display: "none"
            });
        });
        $(".i_login_form input").keyup(function(){
            $(this).val($(this).val().replace(/(^\s+)|(\s+$)/g,""));
        });
        $(".i_login_form input").blur(function(){
            var val = $(this).val();
            if(val == ""){
                $(this).parent().children("p").css({
                    display: "block"
                });
            }
        });
        //获取验证码
        $("#i_get_yzm").click(function(){
            // 根据name判断是否可以点击
            var name = $(this).attr("name");
            if(name == "false"){
                return;
            }
            if(is_ok_phone() != true){
                return;
            }
            //取消错误提示
            login_err(2,"");
            $(this).attr("name","false");
            //验证通过开始倒计时
            page_djs($(this),function(){
                $("#i_get_yzm").attr("name","true");
            });
        });
        //点击登录按钮
        // 这是用户帐号登录
        $("#yx_login_btn").click(function(){
            var my_input = $(".i_yx_login").find("input");
            var my_user = my_input.eq(0).val();
            if(my_user == "" || my_user == undefined){
                login_err(0,"用户名不能为空");
                return;
            }

            var my_pwd = my_input.eq(1).val();
            if(my_pwd == "" || my_pwd == undefined){
                login_err(1,"密码不能为空");
                return;
            }
            login_err(0,"");
            login_err(1,"");

            var username = $('#username').val();
            var password = $('#password').val();
            var _csrf = $('meta[name="csrf-token"]').attr('content');
            $.post('<?php echo Url::to(['site/login'])?>', {cms_csrf:_csrf, username:username, password:password}, function(data){
                if (data.status != 0) {
                    alert(data.msg);
                } else {
                    if (!data.msg.loginName) {
                        data.msg.loginName = username;
                        $("#i_lg_zc").css({
                            display: "none"
                        })
                    }
//                    var html = '<div class="i_login_end"><span>亲爱的'+data.msg.loginName+',欢迎您</span><a href="javascript:"  id = "logout">退出登录</a></div>';

                    $('.i_login_ing').hide();
                    $('.i_login_end').show();
                    $('#lognUser').html('亲爱的'+data.msg.loginName+',欢迎您');
//                    $('#userLogin').html(html);
                }
            }, 'json');
            //这是发起登录验证

        });
        // 这是用户手机登录
        $("#p_login_btn").click(function(){
            if(is_ok_phone() != true){
                return;
            }
            if(is_ok_yzm() != true){
                return;
            }
            //验证正确取消错误提示
            login_err(2,"");
            login_err(3,"");
            //这是发起登录验证
        });
        //关闭登录框
        $(".i_lg_close").click(function(){
            $("#i_lg_zc").attr("class","i_lg_zc i_lg_zc_hide");
            setTimeout(function(){
                $("#i_lg_zc").css({
                    display: "none"
                })
            },210);
        });
        //点击出现弹窗播放器
        $("#i_sp_v>div").on("click",function(){
            var rel = $(this).attr('rel');
            $('.page_video_box embed').attr('flashvars', rel+'&auto_play=1&gpcflag=1&width=640&height=360');
            $(".page_video_box").css({
                "display":"block",
                "opacity":"1",
                "transform":"scale(1,1)"
            });
        });
        //点击取消弹窗视频
        $(".v_close").click(function(){
            var page_video_box = $(".page_video_box");
            page_video_box.css({
                "opacity":"0",
                "transform":"scale(0,0)"
            });
            setTimeout(function(){
                page_video_box.css({
                    "display":"none"
                });
            },210);
        });

        init();

        $('#logout').click(function(){
            $.get('<?php echo Url::to(['site/logout'])?>', '', function(data){
                if (data.status != 0) {
                    alert(data.msg);
                } else {
                    $('.i_login_ing').show();
                    $('.i_login_end').hide();
                }
            }, 'json');
        });
    });
</script>



