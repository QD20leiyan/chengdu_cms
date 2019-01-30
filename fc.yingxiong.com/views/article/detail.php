<?php
$this->title = $detail['seo_title'];
$this->registerMetaTag(['name'=>'keywords', 'content'=>$detail['seo_keywords']]);
$this->registerMetaTag(['name'=>'description', 'content'=>$detail['seo_description']]);
?>

<div class="site-about row" style="margin-top: 40px">
    <h1><?= $detail['title'] ?></h1>

    <p>
        <?php echo $detail['body']?>
    </p>

</div>
<code><?= __FILE__ ?></code>