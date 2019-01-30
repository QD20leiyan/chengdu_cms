<!--主体-->
<div class="pn-wrap h-mTop67">
    <div class="pn-lb">
        <div class="c-860 c-demoslider">
            <div id="cuteslider_3_wrapper" class="cs-circleslight">
                <div id="cuteslider_3" class="cute-slider" data-width="1600" data-height="600" data-overpause="true">
                    <ul data-type="slides">
                        <?php if($banner){ ?>
                        <?php foreach($banner as $key => $value):?>
                            <li data-delay="5" data-src="5" data-trans3d="tr6,tr17,tr22,tr23,tr29,tr27,tr32,tr34,tr35,tr53,tr54,tr62,tr63,tr4,tr13,tr45" data-trans2d="tr3,tr8,tr12,tr19,tr22,tr25,tr27,tr29,tr31,tr34,tr35,tr38,tr39,tr41">
                                <img  src="<?= $value['thumb'];?>" data-src="<?= $value['thumb'];?>" data-thumb="<?= $value['url'];?>">
                                <a data-type="link" href="<?= $value['url'];?>" target="_blank"></a>
                            </li>
                        <?php endforeach;?>
                        <?php } ?>
                    </ul>
                    <ul data-type="controls">
                        <li data-type="captions"></li>
                        <li data-type="link"></li>
                        <li data-type="video"></li>
                        <li data-type="slideinfo"></li>
                        <li data-type="circletimer"></li>
                        <li data-type="previous"></li>
                        <li data-type="next"> </li>
                        <li data-type="bartimer"></li>
                        <li data-type="slidecontrol" data-thumb="false" data-thumbalign="up"></li>
                    </ul>
                </div>
                <div class="cute-shadow"><img src="<?php echo STATIC_DOMAIN;?>2.0/font/bg/shadow.png?<?=VERSION?>" alt="shadow"></div>
            </div>

            <script type="text/javascript">
                var cuteslider3 = new Cute.Slider();
                cuteslider3.setup("cuteslider_3" , "cuteslider_3_wrapper", "http://cdnstatic.yingxiong.com/yingxiong/2.0/font/css/slider-style.css");
                cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_START, function(event) { });
                cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_END, function(event) { });
                cuteslider3.api.addEventListener(Cute.SliderEvent.WATING, function(event) { });
                cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_NEXT_SLIDE, function(event) { });
                cuteslider3.api.addEventListener(Cute.SliderEvent.WATING_FOR_NEXT, function(event) { });
            </script>
        </div>
    </div>
    <div class="pn-inner">
        <div class="pn-box">
            <div class="pn-nav" data-option-key="filter">
                <ul>
                    <li class="all">
                        <a href="#all" data-option-value="*" class="active">
                            <i></i>
                            <span>所有产品</span>
                            <em></em>
                        </a>
                    </li>
                    <li class="hot">
                        <a href="#hot" data-option-value=".hot">
                            <i></i>
                            <span>热门游戏</span>
                            <em></em>
                        </a>
                    </li>
                    <li class="new">
                        <a href="#new" data-option-value=".new">
                            <i></i>
                            <span>最新游戏</span>
                            <em></em>
                        </a>
                    </li>
                    <li class="test">
                        <a href="#test" data-option-value=".test">
                            <i></i>
                            <span>测试游戏</span>
                            <em></em>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="pn-con">
                <div class="pn-list">
                    <?php foreach($games_list as $value ):
                        ?>
                        <figure class="item <?= isset($value['tag']) ? $value['tag'] : '' ;?>" >
                            <a href="javascript:">
                                <div class="hover" data-modal-image="<?= $value['modal_pic'];?>" data-modal-link-url="<?= $value['user_name']; ?>">
                                    <div class="pn-ewm">
                                        <img src="<?= $value['redirect_url'];?>" alt="<?= $value['title'];?>">
                                        <p><?= $value['ewm_title'];?></p>
                                    </div>
<!--                                    <div class="pn-more" data-modal-image="--><?//= $value['modal_pic'];?><!--" data-modal-link-url="--><?//= $value['from']; ?><!--">-->
                                        <div class="pn-more">
                                        <span>了解更多</span>
                                        <i></i>
                                    </div>
                                </div>
                                <i class="icon"></i>
                                <img src="<?= $value['thumb'];?>" alt="<?= $value['title'];?>">
                            </a>
                            <figcaption>
                                <h3><?= $value['title'];?></h3>
                                <h6><?= $value['sub_title'];?></h6>
                            </figcaption>
                        </figure>
                    <?php endforeach;?>
                </div>
            </div>
        </div>
    </div>
</div>



<div class="pn-tck">
    <div class="pn-tckcon">
        <i class="pn-tck-close"></i>
        <img src="" alt="">
        <a href="" class="pn-tck-home" target="_blank"></a>
    </div>
</div>


<script>
    $(function(){
        $(".pn-lb").height($("#cuteslider_3").height());
        window.onresize = function(){
            $(".pn-lb").height($("#cuteslider_3").height());
        }
        $(".pn-list .item").on("click",".hover",function(){
            var image_url = $(this).attr('data-modal-image');
            var href_url =  $(this).attr('data-modal-link-url');
            $(".pn-tck").find('img').attr({"src":image_url});
            $(".pn-tck").find('a').attr({"href":href_url});
            $(".pn-tck").show();
        })
        $(".pn-tck-close").click(function(){
            $(".pn_tck").empty();
            $(".pn-tck").hide();
        })
    })
</script>
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN;?>2.0/css/isotope.css?<?=VERSION?>">
<script src="<?php echo STATIC_DOMAIN;?>2.0/js/jquery.isotope.min.js?<?=VERSION?>"></script>
<script>
    $(function(){
        var $container = $('.pn-box .pn-list');
        $container.isotope({});

        var $optionSets = $('.pn-box .pn-nav'),
            $optionLinks = $optionSets.find('a');
        // console.log($optionSets)

        $optionLinks.click(function(){
            var $this = $(this);
            // don't proceed if already selected
            if ( $this.hasClass('active') ) {
                return false;
            }
            var $optionSet = $this.parents('.pn-nav');
            $optionSet.find('.active').removeClass('active');
            $this.addClass('active');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[ key ] = value;
            if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
                // changes in layout modes need extra logic
                changeLayoutMode( $this, options )
            } else {
                // otherwise, apply new options
                $container.isotope( options );
            }

            return false;
        });
    });
</script>