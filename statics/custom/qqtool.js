/**
 * 获取Authorization Code
 * @param client_id 必须 申请QQ登录成功后，分配给应用的appid。
 * @param scope 可选	请求用户授权时向用户显示的可进行授权的列表。
                可填写的值是API文档中列出的接口，以及一些动作型的授权（目前仅有：do_like），如果要填写多个接口名称，请用逗号隔开。
                例如：scope=get_user_info,list_album,upload_pic,do_like
                不传则默认请求对接口get_user_info进行授权。
                建议控制授权项的数量，只传入必要的接口名称，因为授权项越多，用户越可能拒绝进行任何授权。
    * @param display 仅PC网站接入时使用。
                用于展示的样式。不传则默认展示为PC下的样式。
                如果传入“mobile”，则展示为mobile端下的样式。
    */
function getAuthCodeUrl(client_id,scope,display)
{
    //必须	成功授权后的回调地址，必须是注册appid时填写的主域名下的地址，建议设置为网站首页或网站的用户中心
    let redirect_uri = encodeURI("http://www.eryinet.com/qq/callback")
    //必须	授权类型，此值固定为“code”。
    let response_type="code"
    //必须	client端的状态值。用于第三方应用防止CSRF攻击，成功授权后回调时会原样带回。请务必严格按照流程检查用户与state参数状态的绑定。
    let state=Math.floor(Math.random()*1000000)
    //PC网站
    let url="https://graph.qq.com/oauth2.0/authorize?redirect_uri="+redirect_uri+"&response_type="+response_type+"&state="+state+"&client_id="+client_id
    if(scope)
    {
        url+="&scope="+scope
    }
    if(display)
    {
        url+="&display="+display
    }
    return url
}