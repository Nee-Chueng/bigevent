$(function () {
  let form=layui.form
  //密码表单校验功能
  form.verify({
   pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'] ,
  //校验原密码和新密码是否一致
    newpwd:function (value) {
      let oldpwd=$("[name=oldPwd]").val()
      if ( oldpwd===value ) {
        return "不能和新密码一致！"
      }
    },
    // 校验更改的密码是否输入一致
    samepwd:function (value) {
       let same=$("[name=newPwd]").val()
       if ( same!==value ) {
         return "两次密码不一致！！"
       }
    }
  }); 

  // 提交表单
  $("#pwdform").on("submit",function (e) {
     e.preventDefault()
     let data=$(this).serialize()
     // 发送请求
      $.ajax({
        type:"POST",
        url:"/my/updatepwd",
        data,
        success:function (res) {
           if ( res.status!==0 ) {
             return layer.msg("重置密码失败:"+res.message)
           }
           layer.msg(res.message)
          //  更新密码之后，重置表单内容
          $("#pwdform").get(0).reset()
        }
      })
  })
})
     