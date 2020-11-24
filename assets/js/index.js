$(function () {
    let layer = layui.layer;
     $.ajax({
         url:"/my/userinfo",
        //  headers:{
        //     Authorization:localStorage.getItem("token")
        //  },
         success:function (res) {
            //   console.log( res );
            if ( res.status!==0 ) {
                return layer.msg("获取用户信息失败");
            }
            // 获取成功
            // 短路，当有昵称的时候，首先展示昵称
            let name =res.data.nickname||res.data.username
            // 名字的首字母大写
            let first=name[0].toUpperCase()
            $("#welcome").text("欢迎 "+name)
            // 当有头像时候，首先展示头像
            if ( res.data.user_pic ) {
                // 有头像的时候，展示头像，隐藏初始头像
               $(".layui-nav-img").show().attr("src",res.data.user_pic) 
               $(".text-avatar").hide()
            }else{
                // 没有头像的时候，展示初始头像，隐藏用户头像框
                $(".layui-nav-img").hide()
                $(".text-avatar").text(first).show()
            }
         },
        // //  用户的访问权限
        //  complete:function (xhr) {
        //       console.log( xhr );
        //       if (xhr.responseJSON.status===1 && xhr.responseJSON.message==="身份认证失败！") {
        //           localStorage.removeItem("token")
        //           location.href="login.html"
        //       }
        //  }
     })


    //  点击关闭
    $("#closeBtn").on("click",function () {
        layer.confirm('确认关闭？', {icon: 3, title:'提示'}, function(index){
            // 点击关闭确认之后，删除存储在本地的信息
            localStorage.removeItem("token")
            //跳转到登录界面
            location.href="login.html"
            layer.close(index);
          });
    })
})