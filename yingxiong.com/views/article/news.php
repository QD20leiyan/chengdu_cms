<div class="container">
	<div class="wrap">
		<!--title_main01-->
		<div class="title_main01">
			<h3>公司新闻</h3>
			<div class="title">
				<p>您所在的位置：<a href="#">首页</a>>公司新闻</p>
			</div>
			<div class="t_main">
				<div class="main01_wrap01">
	       	  	 	<ul>
                        <?php if($tuijian){
                            foreach($tuijian as $vv){
                                ?>
                                <li><a <?php if(empty($vv->link_url)) echo " href='javascript:void(0)'";else echo "href='".$vv->link_url."'"." target='_blank'" ;?> ><img src="<?php echo $vv->image_url;?>"></a></li>
                            <?php
                            }
                        }
                        ?>
	       	  	 	</ul>
	       	  	 </div>
	       	  	 <div class="clear"></div>
			</div>
		</div>
		<!--n_main02-->

		<div class="n_main02">
            <?php $i=0;?>
            <?php foreach($articleData->getData() as $v) {?>

                    <div class="n_list">
                        <a href="/news/<?php echo $v->article_id;?>.html"><img src="<?php echo $v->image_url?>" width="300px" height="180px" /></a>
                        <div class="n_lmain">
                            <h3><a href="/news/<?php echo $v->article_id;?>.html"><?php echo $v->title?></a></h3>
                            <p><a href="/news/<?php echo $v->article_id;?>.html"><?php  echo $v->summary; ?></a></p>
                            <span>发布时间：<?php echo date('Y-m-d',$v->pub_time)?></span>
                        </div>
                        <div class="clear"></div>
                    </div>

            <?php $i++;}?>
			<div class="page">
				<div class="number">
                    <?php $this->widget('CLinkPager', Page::go($articleData->getPagination())) ?>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</div>
<style>
    .number {
        margin: 0 auto;
        text-align: center;
    }
    ul#yw0 {
        display: inline-block;
    }
    .number ul li {
        display: inline-block;
        float: left;
    }
    .number a {
        background: #dbdbdb none repeat scroll 0 0;
        color: #1c1c1c;
        display: inline-block;
        font-size: 18px;
        margin: 2px;
        padding: 1px 6px;
    }
    .number a.nub_on, .number a:hover, .active a {
        color: #fff;
        background: #a9a9a9 none repeat scroll 0 0;
    }
    .number .next {background: none;}
</style>
