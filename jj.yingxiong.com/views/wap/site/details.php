
<div class="d_body">
    <!-- 下载 -->
    <?php use yii\helpers\Url;

    echo $this->render('@app/views/layouts/wap/download.php');?>

    <div class="d_top_H"></div>
    <div class="d_title">
        <?php echo $data['title']; ?>
    </div>
    <div class="d_t_int">
        《九剑魔龙传》 官网 时间 <?php echo date('Y-m-d H:i:s', $data['created_at']) ?>
    </div>

    <div id="new_details">
        <?php echo $data['body']; ?>
    </div>

    <div class="d_t_return return_list">返回列表</div>
    <div class="d_t_return return_index">返回首页</div>
    <div class="d_t_black"></div>
</div>
<script>
    $(".return_list").on("click",function(e){
        e.stopPropagation();
        location.href="<?php echo Url::to(['m/site/news']) ?>";
    });
    $(".return_index").on("click",function(e){
        e.stopPropagation();
        location.href="<?php echo Url::to(['m/site/index']) ?>";
    });
</script>
