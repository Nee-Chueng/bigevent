$(function () {
    let form = layui.form
    let layer = layui.layer
    // 一开始调用获取用户信息的函数
    getinfo()
    // 发送ajax获取用户信息封装
    function getinfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                // console.log( res );
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！！！")
                }
                //给表单赋值
                //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                form.val("userform", res.data);
            }
        })
    }
    //重置
    $("#resetBtn").on("click", function (e) {
        e.preventDefault()
        getinfo()
    })
    // 修改
    $("#user-form").submit(function (e) {
        e.preventDefault()
        //  获取表单数据
        //获取表单数据的时候，因为页面中不存在name是id的表单，所以需要在页面form表单中加入一个name是id的表单，在获取数据，此时就有id值
        let data = $(this).serialize()
        // 发送ajax请求
        $.ajax({
            url: "/my/userinfo",
            type: "POST",
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改信息失败！！")
                }
                layer.msg("修改信息成功！！")
                // window.parent获取到index页面,调用在index中封装的获取用户信息的Ajax请求的函数，吧修改的信息直接显示在index中
                window.parent.getAvatarAndName()
            }
        })
    })
    // 表单校验，昵称长度在1-6个字符
    form.verify({
        nickname: function (value) {
            if ( value.length>6) {
                return ("昵称长度需在1-6个字符")
            }
        }
    })
})
