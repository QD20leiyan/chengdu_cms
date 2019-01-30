<?php
/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/12
 * Time: 18:09
 */ ?>
<?php if ($link) {
    foreach ($link as $l) { ?>
        <a target="_blank" href="<?php echo $l['url'] ?>" title="<?php echo $l['description'] ? $l['description'] : $l['name'] ?>">
            <?php echo $l['logo'] ? '<img src="' . $l['logo'] . '">' : $l['name'] ?>
        </a>
    <?php }
} ?>