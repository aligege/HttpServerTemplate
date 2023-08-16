var _commentKey = "article"
var _keyId = ""
var _targetId = ""
var _targetAccountId = ""

//直接回复文章的id也就是comment的id号
var commentId = ""
//直接回复文章的人的id号，也就是comment的用户id
var commentAccountId = ""
//回复的对象的用户id号，可能是comment的用户id也可能是reply的用户id
var commentSrcAccountId = ""
//回复的对象的用户name，可能是comment的用户name也可能是reply的用户name
var commentSrcAccountName = ""

//主要处理回复框
function initComments()
{
    _commentKey = $("#Comments").attr("CommentKey")
    _targetId = $("#Comments").attr("TargetId")
    _keyId = _commentKey+"_"+_targetId
    _targetAccountId = $("#Comments").attr("TargetAccountId")

    $("<div id=\"CommentsBox\" name=\"CommentsBox\" style=\"padding:5px\"></div>")
                .appendTo($("#Comments"));

    var commentBox = "<div style=\"height:50px;width:100%\"></div>"
    commentBox = commentBox + "<div style=\"height:50px;width:100%\"><div style=\"font-size:26px;width:105px;float:left\">网友评论</div><div style=\"margin-top:15px;font-size:small;color:gray;width:330px;float:left\">文明上网理性发言，在这里向博主提问、赞赏、建议!</div></div>"
    commentBox = commentBox + "<textarea id=\"txt_comment\" name=\"txt_comment\" class=\"form-control\" rows=\"3\" placeholder=\"请在这里写下你的评论、疑问！博主会及时回答！\"></textarea>"
    $(commentBox)//style=\"border:1px solid red\"
        .appendTo($("#CommentsBox"));
    commentBox = "<button id=\"btn_comment\" name=\"btn_comment\" type=\"button\" class=\"btn btn-primary\" style=\"float:right;margin:10px\">发表</button>"
    $(commentBox)
        .appendTo($("#CommentsBox"));
    $("<br/><div id=\"CommentItems\" name=\"CommentItems\" style=\"margin-top:35px\"></div>")
                .appendTo($("#Comments"));


    $("#btn_comment").click(btn_comment_onClick);
}

//主要处理回复显示内容等
function updateComments(startNum,num)
{
    if(startNum>=0)
    {
        return    
    }
    var url = getRootPath() + "/widget/comment/getComments/?keyId=" +_keyId + "&targetAccountId=" + _targetAccountId
    $.getJSON(url, function (data)
    {
        $("#CommentItems").empty();
        var any = false
        $.each(data, function (i, item) {
            any = true
            $("<hr style=\"height:1px;border:none;border-top:1px dashed #0066CC;margin:6px\"/>")
                .appendTo($("#CommentItems"));
            //头部用户信息
            var commentItem = "<p style=\"\"><a href=\"" + getRootPath() + "/Account/User/Index/?id=" + item["AccountId"] + "\">" + item["Account"]["Name"] + "</a></p>"
            //详细内容信息
            commentItem = commentItem + "<div>" + item["Info"] + "</div>"
            //操作区域，例如回复之类的
            commentItem = commentItem + "<div style=\"margin-left:30;margin-top:10px;font-size:small\">" + getTimeFromTimeString(item["CreateTime"]) + "<button class=\"btn btn-link\" onclick=\"onReplyClick(this)\" href=\"#\" style=\"margin-left:15px;font-size:small\" "
            //直接回复文章的id也就是comment的id号
            commentItem = commentItem + " commentId=" + item["Id"]
            //直接回复文章的人的id号，也就是comment的用户id
            commentItem = commentItem + " commentAccountId=" + item["AccountId"]
            //回复的对象的用户id号，可能是comment的用户id也可能是reply的用户id
            commentItem = commentItem + " srcAccountId=" + item["AccountId"]
            //回复的对象的用户name，可能是comment的用户name也可能是reply的用户name
            commentItem = commentItem + " srcAccountName=" + item["Account"]["Name"]
            commentItem = commentItem + ">回复("+item["ReplyCount"]+")</button></div><div name=\"replyBox\" id=\"replyBox\"></div>"
            if (item["Replys"] && item["ReplyCount"]>0)
            {
                $.each(item["Replys"], function (j, subitem) {
                    commentItem = commentItem + "<div class=\"row\" style=\"margin-left:45px\">"
                    commentItem = commentItem + "<hr style=\"height:1px;border:none;border-top:1px dashed #0066CC;margin:6px\"/>"
                    //头部用户信息
                    commentItem = commentItem + "<p style=\"\"><a href=\"" + getRootPath() + "/Account/User/Index/?id=" + subitem["Account"]["Id"] + "\">" + subitem["Account"]["Name"] + "</a></p>"
                    //详细内容信息
                    commentItem = commentItem + "<div>" + subitem["Info"] + "</div>"
                    //操作区域，例如回复之类的
                    commentItem = commentItem + "<div style=\"margin-left:30;margin-top:10px;font-size:small\">" + getTimeFromTimeString(item["CreateTime"]) + "<button class=\"btn btn-link\" onclick=\"onReplyClick(this)\" href=\"#\" style=\"margin-left:15px;font-size:small\" "
                    //直接回复文章的id也就是comment的id号
                    commentItem = commentItem + " commentId=" + item["Id"]
                    //直接回复文章的人的id号，也就是comment的用户id
                    commentItem = commentItem + " commentAccountId=" + item["AccountId"]
                    //回复的对象的用户id号，可能是comment的用户id也可能是reply的用户id
                    commentItem = commentItem + " srcAccountId=" + subitem["Account"]["Id"]
                    //回复的对象的用户name，可能是comment的用户name也可能是reply的用户name
                    commentItem = commentItem + " srcAccountName=" + subitem["Account"]["Name"]
                    commentItem = commentItem + ">回复</button></div><div name=\"replyBox\" id=\"replyBox\"></div>"
                    commentItem = commentItem + "</div>"
                })
            }
            $(commentItem)
                .appendTo($("#CommentItems"));
        });

        if(any == false)
        {
            $("<div style=\"height:80px\"><br/><br/>快来第一个坐沙发吧！</div>")
                .appendTo($("#CommentItems"));
        }
    });
}

function btn_comment_onClick()
{
    var text = $("#txt_comment").val();
    if (text.length < 3 || text.length > 300) {
        return;
    }
    text = escape(text);
    var url = getRootPath() +"/widget/comment/create/?keyId=" + _keyId + "&info=" +text
    $.getJSON(url, function (data) {
        $("#txt_comment").val("");
        updateComments(0, 10);
    });
}

function getRootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath);
}

function getTimeFromTimeString(timeString)
{
    var milsec = parseInt(timeString.substr(6, 14))
    var nowTime = new Date()
    var localOffset = nowTime.getTimezoneOffset() * 60 * 1000
    var time = new Date(nowTime.getTime() + 2*localOffset - milsec)

    if (time.getFullYear() > 1970)
    {
        return (time.getFullYear() - 1970)+"年前"
    }
    if (time.getMonth() > 0)
    {
        return (time.getMonth() - 0) + "月前"
    }
    if (time.getDate() > 1)
    {
        return (time.getDate() - 1) + "天前"
    }
    if (time.getHours() > 0)
    {
        return (time.getHours() - 0) + "小时前"
    }
    if (time.getMinutes() > 0)
    {
        return (time.getMinutes() - 0) + "分钟前"
    }
    return "1分钟内"
}
function onReplyClick(node)
{
    if (!node)
    {
        return;
    }
    var id = node.getAttributeNode("id")
    if (id && id.value == "btn_cancel")
    {
        var subbox = node.parentNode
        if (subbox)
        {
            subbox = $(subbox)
            if (subbox.css('display') == 'none')
            {
                subbox.css('display', 'block')
            }
            else
            {
                subbox.css('display', 'none')
            }
            return;
        }
    }
//     else
//     {
//         var divSubbox = $(node.parentNode.nextSibling)
// 
//         var value = divSubbox.css('display')
//         if (value == 'none') {
//             value='block'
//         }
//         else {
//             value='none'
//         }
//         divSubbox.css('display', value)
//         if (divSubbox.nextSibling)
//         {
//             $(divSubbox.nextSibling).css('display', value)
//             return;
//         }
//     }
    
    var divSubbox = node.parentNode.nextSibling
    var subbox = divSubbox.children[0]
    if (subbox) {
        subbox = $(subbox)
        if (subbox.css('display') == 'none') {
            subbox.css('display', 'block')
        }
        else {
            subbox.css('display', 'none')
        }
        return;
    }

    //直接回复文章的id也就是comment的id号
    commentId = node.getAttributeNode("commentId").value
    //直接回复文章的人的id号，也就是comment的用户id
    commentAccountId = node.getAttributeNode("commentAccountId").value
    //回复的对象的用户id号，可能是comment的用户id也可能是reply的用户id
    commentSrcAccountId = node.getAttributeNode("srcAccountId").value
    //回复的对象的用户name，可能是comment的用户name也可能是reply的用户name
    commentSrcAccountName = node.getAttributeNode("srcAccountName").value
    
    var replyBox = "<div id=\"sub_replyBox\" class=\"row\" style=\"margin-left:50px;margin-right:20px\">"
    replyBox = replyBox + "<textarea id=\"txt_reply\" name=\"txt_reply\" class=\"form-control\" rows=\"3\" placeholder=\"回复 " + commentSrcAccountName + "\"></textarea>"
    replyBox = replyBox + "<button id=\"btn_reply\" name=\"btn_reply\" onclick=\"onReplyOkClick(this)\" type=\"button\" class=\"btn btn-primary\" style=\"float:right;margin:10px\" "
    //直接回复文章的id也就是comment的id号
    replyBox = replyBox + " commentId=" + commentId
    //直接回复文章的人的id号，也就是comment的用户id
    replyBox = replyBox + " commentAccountId=" + commentAccountId
    //回复的对象的用户id号，可能是comment的用户id也可能是reply的用户id
    replyBox = replyBox + " srcAccountId=" + commentSrcAccountId
    //回复的对象的用户name，可能是comment的用户name也可能是reply的用户name
    replyBox = replyBox + " srcAccountName=" + commentSrcAccountName
    replyBox = replyBox + ">回复</button>"
    replyBox = replyBox + "<button id=\"btn_cancel\" name=\"btn_cancel\" onclick=\"onReplyClick(this)\" type=\"button\" class=\"btn btn-link\" style=\"float:right;margin:10px\">取消</button>"
    replyBox = replyBox + "</div>"
    
    $(replyBox)
        .appendTo(divSubbox);
}

function onReplyOkClick(node)
{
    if (!node)
    {
        return;
    }
    //直接回复文章的id也就是comment的id号
    commentId = node.getAttributeNode("commentId").value
    //直接回复文章的人的id号，也就是comment的用户id
    commentAccountId = node.getAttributeNode("commentAccountId").value
    //回复的对象的用户id号，可能是comment的用户id也可能是reply的用户id
    commentSrcAccountId = node.getAttributeNode("srcAccountId").value
    //回复的对象的用户name，可能是comment的用户name也可能是reply的用户name
    commentSrcAccountName = node.getAttributeNode("srcAccountName").value

    if (commentId == ""
        || commentAccountId == ""
        || commentSrcAccountId == "")
    {
        return;
    }
    var txt_reply = $(node.parentNode).children("#txt_reply")
    var text = txt_reply.val();
    if (text.length < 3 || text.length > 300) {
        return;
    }
    text = "回复 " + commentSrcAccountName + ": " + text
    text = escape(text);
    var url = getRootPath() + "/widget/comment/create/?keyId=" + _keyId + "&targetAccountId" + _targetAccountId + "&info=" + text + "&commentId=" + commentId + "&commentAccountId=" + commentAccountId + "&commentSrcAccountId=" + commentSrcAccountId
    $.getJSON(url, function (data) {
        txt_reply.val("");
        updateComments(0, 10);
    });
}


$(document).ready(function () {
    initComments();
    updateComments(0, 10);
});