<div class="site-about row" style="margin-top: 40px">
    <h1><?= $detail['title'] ?></h1>

    <p>
        <?php foreach ($detail['image_url'] as $img){?>
       <img src="<?php echo $img?>">
        <?php }?>
    </p>

</div>
<code><?= __FILE__ ?></code>