<?php
/**
 * Created by yiicms.
 * User: Administrator
 * Author: druphliu@gmail.com
 * Date: 2015/6/12
 * Time: 18:09
 */ ?>


<div id="demo" class="m4_con">
    <div class="bot_link" id="indemo">
        <div id="demo1" class="friends">
            <ul>
                <?php if ($link) { $i=1;
                    foreach ($link as $l) { ?>
                        <li <?php if($i==1) echo "class='no_left'"?>>
                            <a target="_blank" href="<?php echo $l['url'] ?>" title="<?php echo $l['description'] ? $l['description'] : $l['name'] ?>">
                                <?php echo $l['logo'] ? '<img src="' . $l['logo'] . '">' : $l['name'] ?>
                            </a>
                        </li>
                    <?php $i++;}
                } ?>
                <div class="clear"></div>
            </ul>
        </div>
        <div id="demo2" class="friend_02"></div>
    </div>
</div>