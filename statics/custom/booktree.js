var _bookId = ""

function initBookTree() {
    _bookId = $("#booktree").attr("bookid")
    jQuery("head").append("<link href=\"" + getRootPath() + "/res/css/custom/treeview.css\" rel=\"stylesheet\" type=\"text/css\" />");
}

function updateBookTree(startNum, num) {
    $.ajax({
        type: 'post',
        url: getRootPath()+"/User/GetBookTree",
        data: { 'bookid': _bookId },
        dataType: 'json',
        success: function (data) {
            $("#booktree").empty();
            var tree = "<div class=\"panel panel-default\"><div class=\"panel-heading\">";
            tree = tree + "<a href=\""+getRootPath()+"/User/Book?id="+data["id"]+"\">" + data["title"] + "</a></div>";
            tree = tree + "<div class=\"panel-body\">";
            tree = tree + "<div class=\"tree\">";
            tree = tree + "<ul>";
            $.each(data["chapters"], function (i, chapter) {
                tree = tree + "<li>";
                if (chapter["count"] > 0)
                {
                    tree = tree + "<span><i class=\"icon-minus-sign\"></i>" + chapter["title"] + "</span>";
                }
                else
                {
                    tree = tree + (i+1) + "." + chapter["title"];
                }
                tree = tree + "<ul>";
                $.each(chapter["articles"], function (i, article) {
                    tree = tree + "<li>";
                    tree = tree + "<a href=\"" + getRootPath() + "/User/Article/?id=" + article["id"] + "\">" + (i+1) + "." + article["title"] + "</a>";
                    tree = tree + "</li>";
                });
                tree = tree + "</ul>";
                tree = tree + "</li>";
            });

            $.each(data["articles"], function (i, article) {
                tree = tree + "<li>";
                tree = tree + "<a href=\"" + getRootPath() + "/User/Article/?id=" + article["id"] + "\">" + (i+1) + "." + article["title"] + "</a>";
                tree = tree + "</li>";
            });
            tree = tree + "</ul>";
            tree = tree + "</div>";//tree well
            tree = tree + "</div>";//panel-body
            tree = tree + "</div>";//panel
            $(tree)
                .appendTo($("#booktree"));

            $(function () {
                $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
                $('.tree li.parent_li > span').on('click', function (e) {
                    var children = $(this).parent('li.parent_li').find(' > ul > li');
                    if (children.is(":visible")) {
                        children.hide('fast');
                        $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                    } else {
                        children.show('fast');
                        $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                    }
                    e.stopPropagation();
                });
            });
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) { //发送失败事件
            alert(textStatus);
        }

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


$(document).ready(function () {
    initBookTree();
    updateBookTree();
});