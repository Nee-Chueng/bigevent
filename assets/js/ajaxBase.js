$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url
    if ( options.url.indexOf("/my/")!==-1 ) {
        options.headers = {
            Authorization: localStorage.getItem("token")
        }
    }
    //  用户的访问权限
     options.complete=function (xhr) {
         console.log( xhr );
         if (xhr.responseJSON.status===1 && xhr.responseJSON.message==="身份认证失败！") {
             localStorage.removeItem("token")
             location.href="login.html"
         }
    }
})