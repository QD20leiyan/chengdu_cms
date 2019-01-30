<?php foreach ($newslist as $nl):?>
<li>
    <a href="/m/news/<?=$nl['id']?>.html">
        <img src="<?=$nl['thumb']?>">
        <section>
            <div>
                <p><?=$nl['title']?></p>
                <span><?php echo date('m/d',$nl['created_at'])?></span>
            </div>
            <p><?=$nl['summary']?></p>
        </section>
    </a>
</li>
<?php endforeach; ?>
