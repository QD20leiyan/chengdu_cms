var EcommerceUpload = function () {

    var handleImages = function(config) {
        var uploadUrl = config['uploadFile'];
        // see http://www.plupload.com/
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
             
            browse_button : document.getElementById('tab_images_uploader_pickfiles'), // you can pass in id...
            container: document.getElementById('tab_images_uploader_container'), // ... or DOM Element itself
             
            url : uploadUrl,
            multipart_params:{app:$("#app").val()},
             
            filters : {
                max_file_size : '500mb',
                mime_types: [
                    {title : "Image files", extensions : "jpg,gif,png"},
                    {title : "Zip files", extensions : "zip"},
                    {title : "doc files", extensions : "doc,xls,ppt,txt"},
                    {title : "video files", extensions : "flv,mp4"}
                ]
            },
         
            // Flash settings
            flash_swf_url : 'assets/global/plugins/plupload/js/Moxie.swf',
     
            // Silverlight settings
            silverlight_xap_url : 'assets/global/plugins/plupload/js/Moxie.xap',
         
            init: {
                PostInit: function() {
                    $('#tab_images_uploader_filelist').html("");
         
                    $('#tab_images_uploader_uploadfiles').click(function() {
                        uploader.start();
                        return false;
                    });

                    $('#tab_images_uploader_filelist').on('click', '.added-files .remove', function(){
                        var addFileObj = $(this).parent('.added-files');
                        uploader.removeFile(addFileObj.attr("id"));
                        $(this).parent('.added-files').remove();
                        var jsFileId = addFileObj.attr('data-id');
                        //删除表格数据
                        var delObj = $("#picContent .js_"+jsFileId);
                        var fileId = delObj.find('.js_remove').attr('data-id');
                        delObj.remove();
                    });
                    $('#picContent').on('click','.js_remove',function(){
                        var fileId = $(this).attr('data-id');
                        var tabObj = $(this).parents('.js_item');
                        var jsFileId = tabObj.attr('data-id')?tabObj.attr('data-id'):'';
                        if(jsFileId){
                            $("#uploaded_file_"+jsFileId).remove();
                        }
                        tabObj.remove();
                    });
                },
         
                FilesAdded: function(up, files) {
                    plupload.each(files, function(file) {
                        $('#tab_images_uploader_filelist').append('<div class="alert alert-warning added-files" data-id='+file.id+' id="uploaded_file_' + file.id + '">' + file.name + '(' + plupload.formatSize(file.size) + ') <span class="status label label-info"></span>&nbsp;<a href="javascript:;" style="margin-top:-5px" class="remove pull-right btn btn-sm red"><i class="fa fa-times"></i> 删除</a></div>');
                    });
                },
         
                UploadProgress: function(up, file) {
                    $('#uploaded_file_' + file.id + ' > .status').html(file.percent + '%');
                },

                FileUploaded: function(up, file, response) {
                    var response = $.parseJSON(response.response);

                    if (response && response.success == true) {
                        $('#tab_images_uploader_filelist').children().remove();
                        Metronic.alert({type: 'success', message: '上传成功', closeInSeconds: 10, icon: 'warning'});
                        dataObj.getDataTable().ajax.reload();
                    } else {
                        $('#uploaded_file_' + file.id + ' > .status').removeClass("label-info").addClass("label-danger").html('<i class="fa fa-warning"></i> 上传失败'); // set failed upload
                        Metronic.alert({type: 'danger', message: response.message, closeInSeconds: 10, icon: 'warning'});
                    }
                },
         
                Error: function(up, err) {
                    Metronic.alert({type: 'danger', message: err.message, closeInSeconds: 10, icon: 'warning'});
                }
            }
        });

        uploader.init();
    }


    return {

        //main function to initiate the module
        init: function (config) {
            handleImages(config);
        }

    };

}();