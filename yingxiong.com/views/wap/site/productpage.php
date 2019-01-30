<?php foreach ($gamelist as $key=>$g): ?>
    <li>
        <a href="<?= !empty($g['user_name']) ? $g['user_name'] : 'javascript:alert(\'敬请期待\')' ?>">
        <img src="<?= $g['thumb'] ?>" alt="<?= $g['title']; ?>"></a>
        <section>
            <section>
                <h1><?= $g['title']; ?></h1>

                    <img src="<?php echo STATIC_DOMAIN; ?>wap1.0/images/cp_img5_18.png?<?=VERSION?>">
            </section>

            <p><?= $g['sub_title']; ?></p>
            <div>
                <a target='_blank' href="<?= !empty($g['down_url']) ? $g['down_url'] : 'javascript:alert(\'敬请期待\')' ?>">立即下载</a>
                <a href="<?= !empty($g['user_name']) ? $g['user_name'] : 'javascript:alert(\'敬请期待\')' ?>">进入官网</a>
            </div>
        </section>
    </li>
<?php endforeach; ?>
