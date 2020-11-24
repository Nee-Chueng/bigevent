$(function () {
    //  去注册
    $("#toregist").on("click", function () {
        $(".regist").show()
        $(".login").hide()
    })
    // 去登录
    $("#tologin").on("click", function () {
        $(".regist").hide()
        $(".login").show()
    });

    let form = layui.form;
    // 表单校验
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repass: function (value, item) {
            let pwd = $(".regist input[name=password]").val()
            if (value !== pwd) {
                return "两次密码不一致！！！"
            }
        }
    })
    //发送ajax请求=====注册
    $("#registForm").on("submit", function (e) {
        e.preventDefault()
        // 表单数据收集
        let data = $(this).serialize()
        console.log(data);
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message,
                    {
                        time: 1000
                    },
                    function () {
                        $("#tologin").click()
                    });
            }
        })
    })
    // 发送ajax请求====登录
    $("#loginForm").on("submit", function (e) {
        e.preventDefault()
        // 收集表单数据
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/api/login",
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //设置本地存储
                localStorage.setItem("token", res.token)
                // 登录成功后
                layer.msg(res.message,
                    {
                        time: 1000
                    },
                    function () {
                        // 跳转后台主页
                        location.href = "index.html"
                    });
            }
        })
    })
}) 
