
<?php

use yii\helpers\Url;


?>

<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/dropload.css" />
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/photoswipe.css">
<link rel="stylesheet" href="<?php echo STATIC_DOMAIN ?>1.0/m/css/default-skin.css">

<!-- 下载 -->
<?php echo $this->render('@app/views/layouts/wap/download.php');?>

<div class="top_H2"></div>
<div class="il_imgshow">
    <div class="il_header"><div class="returnIndex"><img src="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_31.png" alt="">返回</div></div>
    <div class="il_ul">
        <ul>
            <li class="js_index_103" data-id="103" index="0">时装展示</li>
            <li class="js_index_107" data-id="107" index="1">人物翅膀</li>
            <li class="js_index_111" data-id="111" index="2">BOSS展示</li>
            <li class="js_index_112" data-id="112" index="3">游戏截图</li>
        </ul>

    </div>
    <div class="il_imgbox">
        <ul class="il_lists">
            <div class="my-gallery" itemscope itemtype="<?php echo STATIC_DOMAIN ?>1.0/m/images/img/pic_30.png" curData="0">

<!--                <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">-->
<!--                    <a href="--><?php //echo STATIC_DOMAIN ?><!--m/images/img/pic_30.png" itemprop="contentUrl" data-size="800x500">-->
<!--                        <img src="--><?php //echo STATIC_DOMAIN ?><!--m/images/img/pic_30.png" itemprop="thumbnail" alt="Image description" /></a>-->
<!--                    <figcaption itemprop="caption description" class="figcaption_text" style="display:none;">清涟布衣</figcaption>-->
<!--                </figure>-->
            </div>

        </ul>
    </div>

</div>
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. It's a separate element, as animating opacity is faster than rgba(). -->
    <div class="pswp__bg" ></div>
    <div class="pswp__header">图片SHOW>时装展示</div>
    <div class="pswp_title">左右滑动以浏览更多图片</div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
        <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
        <!-- don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
                <!-- Controls are self-explanatory. Order can be changed. -->
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                <!-- <button class="pswp__button pswp__button--share" title="Share"></button>
                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button> -->
                <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                        <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div>
            </div>
            <!-- <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button> -->
            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>
        </div>
    </div>

</div>



<!-- <footer id="Hero-bar"><div class="f_t"><ul><li><a href="http://kf.yingxiong.com/Mobile/checkOption?Gid=100">客服中心</a></li><li><a href="http://bbs.yingxiong.com/index/gameBbsLogin?id=12" id="community">游戏社区</a></li></ul><div class="tel"><a href="tel:4009393333"><i></i>400-939-3333</a></div></div><p class="f_txt">COPY RIGHT   @2015-2016  ALL RIGHTS RESERVED</p><p class="f_link"><a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/4f6d0e4a76ec4ec1baa5b91e75404393">《网络文化经营许可证》 </a>&nbsp;<a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/gameNetTag/4028c08b573b3c8901573c1ba4e908b3">[2015]0629-259号</a></p></footer> -->

<!--<script type="text/javascript" src="http://cdnstatic.yingxiong.com/footer/js/footer.js"></script>
<script src="../js/public.js"></script> -->
<script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/dropload.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/photoswipe.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/photoswipe-ui-default.min.js"></script>
<script src="<?php echo STATIC_DOMAIN ?>1.0/m/js/function.js"></script>

<script>
    var id = '<?php echo $id?>';
    var curIndex = id||103;

    $(function(){

        $(".il_ul li").removeClass("il_active");
        $(".il_ul li.js_index_"+curIndex).addClass("il_active");

        $(".returnIndex").on("click",function(e){
            javascript:history.back(-1);
        })
        //下拉加载

        var tab1LoadEnd = false;
        var tab2LoadEnd = false;
        var tab3LoadEnd = false;
        var tab4LoadEnd = false;


        $(".il_ul li").on("click",function(e){
            page = 1;
            id = $(this).attr('data-id');
            $('.my-gallery').html('');
            e.stopPropagation();
//            if($(this).hasClass("il_active")){
//                return false;
//            }else{
                curIndex = $(this).attr('data-id');
                $(".il_ul li").removeClass("il_active");
                $(this).addClass("il_active");
//            };
            // 如果选中菜单一
            if(curIndex == 103){
                // 如果数据没有加载完
                if(!tab1LoadEnd){
                    // 解锁
                    dropload.unlock();
                    dropload.noData(false);
                }else{
                    // 锁定
                    dropload.lock('down');
                    dropload.noData();
                }
                // 如果选中菜单二
            }else if(curIndex == 107){
                if(!tab2LoadEnd){
                    // 解锁
                    dropload.unlock();
                    dropload.noData(false);
                }else{
                    // 锁定
                    dropload.lock('down');
                    dropload.noData();
                }
            }else if(curIndex == 111){
                if(!tab3LoadEnd){
                    // 解锁
                    dropload.unlock();
                    dropload.noData(false);
                }else{
                    // 锁定
                    dropload.lock('down');
                    dropload.noData();
                }
            }else if(curIndex == 112){
                if(!tab4LoadEnd){
                    // 解锁
                    dropload.unlock();
                    dropload.noData(false);
                }else{
                    // 锁定
                    dropload.lock('down');
                    dropload.noData();
                }
            }

            // 重置
            dropload.resetload();

        });

        var page = 1;

        // dropload
        var dropload = $('.il_lists').dropload({
            scrollArea : window,
            loadDownFn : function(me){
                // 加载菜单一的数据
                $.get('<?php echo Url::to(['wap/image/ajax-list']) ?>', {page:page, id:id}, function(data){
                    var result = '';
                    if (data.msg.length <= 0) {
                        // 数据加载完
//                        tab1LoadEnd = true;
                        // 锁定
                        me.lock();
                        // 无数据
                        me.noData();
                    } else {
                        for(var i = 0; i < data.msg.length; i++){
                            result += '<figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject"><a href="'+data.msg[i].thumb+'" itemprop="contentUrl" data-size="800x500"><img src="'+data.msg[i].thumb+'" itemprop="thumbnail" alt="Image description" /></a><figcaption itemprop="caption description" class="figcaption_text" style="display:none;">'+data.msg[i].title+'</figcaption></figure>';
                        }
                    }

                    $('.my-gallery').append(result);
                    page += 1;
                    offLists()
                    // 每次数据加载完，必须重置
                    me.resetload();
//                    tab3LoadEnd = true;


                }, 'json');

                return;


            }
        });

    });

    function offLists(){
        $(".il_lists").off();
    }

//    var arr = [
//        "图片SHOW>"+$('.js_index_'+curIndex).text(),
//        "图片SHOW>"+$('.js_index_'+curIndex).text(),
//        "图片SHOW>"+$('.js_index_'+curIndex).text(),
//        "图片SHOW>游戏截图"
//    ]
    var initPhotoSwipeFromDOM = function(gallerySelector) {

        // parse slide data (url, title, size ...) from DOM elements
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
            $(".pswp__header").text("图片SHOW>"+$('.js_index_'+curIndex).text());
            for (var i = 0; i < numNodes; i++) {

                figureEl = thumbElements[i]; // <figure> element
                // include only element nodes
                if (figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element
                //console.log(linkEl)
                size = linkEl.getAttribute('data-size').split('x');
                //console.log(size)
                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };

                if (figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }

                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el: closest(el.parentNode, fn));
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {

            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            // find root element of slide
            var clickedListItem = closest(eTarget,
                function(el) {
                    return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                });

            if (!clickedListItem) {
                return;
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if (index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};

            if (hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {

                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0],
                        // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    };
                }

            };
            //console.log(options)
            // PhotoSwipe opened from URL
            if (fromURL) {
                if (options.galleryPIDs) {
                    // parse real index when custom PIDs are used
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if (isNaN(options.index)) {
                return;
            }

            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll(gallerySelector);

        for (var i = 0,
                 l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;

        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };

    // execute above function
    initPhotoSwipeFromDOM('.my-gallery');

</script>
