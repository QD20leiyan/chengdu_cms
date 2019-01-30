<link rel="stylesheet" href="<?php echo STATIC_DOMAIN; ?>wap1.0/css/contact_us.css">
<section class="over_hide">
    <header class="cp_header">
        <?php echo $this->render('@app/views/layouts/wap/header.php');?>
        <img class="logo" src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/ab_img1_03.png">
    </header>
    <ul class="c_list">
        <li>
            <h1>商务合作</h1>
            <p>bd@yingxiong.com</p>
        </li>
        <li>
            <h1>媒体合作</h1>
            <p>media@yingxiong.com</p>
        </li>
        <li>
            <h1>投资关系</h1>
            <p>investment@yingxiong.com</p>
        </li>
        <li>
            <h1>市场异业</h1>
            <p>key_account@yingxiong.com</p>
        </li>
        <li>
            <h1>产品合作</h1>
            <p>product@yingxiong.com</p>
        </li>
        <li>
            <h1>VR销售</h1>
            <p>vrsales@yingxiong.com</p>
        </li>
        <li>
            <h1>人员招聘</h1>
            <p>hr@yingxiong.com</p>
        </li>
    </ul>
    <footer class="c_foot">
        <section class="c_icon1">
            <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/c_u_lxwm_03.png" alt="联系我们"/>
        </section>
        <div>
            <a href="javascript:" class="active">北京</a>
            <a href="javascript:">上海</a>
            <a href="javascript:">成都</a>
            <a href="javascript:">深圳</a>
            <a href="javascript:">台湾</a>
        </div>
        <p><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/c_u_img2.png"><span id="c_dihua">400-939-3333</span></p>
        <h1><img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/c_u_img3.png"><span id="c_dizhi">北京市朝阳区酒仙桥路宏源大厦3层</span></h1>
    </footer>
    <?php echo $this->render('@app/views/layouts/wap/footer.php');?>
    <div class="yx_bc_index">
        <p>回到<br/>首页</p>
    </div>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/flexible.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="<?php echo STATIC_DOMAIN; ?>wap1.0/public/yx_main1.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            function init() {
                //调用点击页面菜单按钮方法
                main1.click_top_nav({
                    ele: $(".nav_icon")
                });
                //返回上一页
                main1.go_back($("#nav_back"));
            }

            //改写点击顶部导航icon方法
            main1.click_top_nav = function(obj) {
                var ele = obj.ele;
                //添加点击事件
                if (ele) {
                    ele.on("touchend", function() {
                        var name = $(this).attr("name");
                        //0代表导航隐藏
                        if (name == 0) {
                            $(this).attr({"name": "1"});
                            $(this).children().eq(0).attr({"class": "nav_icon nav_hide"});
                            $(this).children().eq(1).attr({"class": "close"});
                            $(this).parent().children("ul").css("display", "block").attr("class", "animated bounceInRight");
                        } else {
                            $(this).attr("name", "0");

                            $(this).children().eq(0).attr({"class": "nav_icon"});
                            $(this).children().eq(1).attr({"class": "close nav_hide"});
                            $(this).parent().children("ul").attr("class", "animated bounceOutRight");
                            setTimeout(function() {
                                $(this).parent().children("ul").css("display", "none");
                            }, 500);
                        }
                    })
                }
            };

            function change_contact(text1, text2, isShow) {

                if (isShow) {
                    $(".c_foot>p>img").css("visibility", "visible");
                    $("#c_dihua").html(text1).css("visibility", "visible");
                    $("#c_dizhi").html(text2);
                } else {
                    $(".c_foot>p>img").css("visibility", "hidden");
                    $("#c_dihua").css("visibility", "hidden");
                    $("#c_dizhi").html(text2);
                }
            }

            //点击切换联系地址
            $(".c_foot>div>a").on("touchend", function() {
                var index = $(this).index();

                //初始化显示方式
                $(".c_foot>div>a").attr("class", "");
                $(this).attr("class", "active");
                switch (index) {
                    case 0:
                        {
                            change_contact("400-939-3333", "北京市朝阳区酒仙桥路宏源大厦3层", true);
                        }
                        break;
                    case 1:
                        {
                            change_contact("021-5168-8333", "上海市徐汇区漕东支路85号漕河泾实业大厦8层", true);
                        }
                        break;
                    case 2:
                        {
                            change_contact("028-6103-0922", "成都市高新区天府五街200号菁蓉国际广场A1-10楼", true);
                        }
                        break;
                    case 3:
                        {
                            change_contact("", "深圳市南山区比克科技大厦", false);
                        }
                        break;
                    case 4:
                        {
                            change_contact("", "深新北市新店区民权路108号10楼之1", false);
                        }
                        break;
                }
            });

            init();
        });

    </script>
</section>