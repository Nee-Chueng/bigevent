$(function () {
    let layer = layui.layer
    //获取裁剪区域的 DOM 元素
    var $image = $('#image')
    //配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    //创建裁剪区域
    $image.cropper(options)

    // 点击上传按钮，选择文件
    $("#uploadBtn").click(function () {
        $("#file").click()
        // 监听文件域选择文件的变化
        $("#file").on("change", function (e) {
            // 获取用户选择的文件
            let file = this.files[0]
            // 根据选择的文件，创建一个对应的 URL 地址
            let newImgURL = URL.createObjectURL(file)
            //先销毁原图片
            $image.cropper('destroy')
            // 重新设置图片路径
            $image.attr("src", newImgURL)
            // 重新初始化裁剪区域
            $image.cropper(options)
            // console.log(newImgURL);
        })
    })

    //确定
    $("#sureBtn").click(function () {
        let i = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        });
        // 把图片转成base64格式
        let str = i.toDataURL(); 
        //  发送ajax请求
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data:{
                avatar:str
            },
            success:function (res) {
                if ( res.status!==0 ) {
                    return layer.msg("更新头像失败:"+res.message)
                }
                // 调用父页面的获取用户信息的函数
                window.parent.getAvatarAndName()           
                layer.msg(res.message)
            }
        })
    })
})