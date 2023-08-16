var selectedChapterId = "";
var selectedBookId = "";
var userId = ""
var books = []

function initChapterTree() {
    $("#chaptertree").empty();
    selectedChapterId = "";
    selectedBookId = "";
    books = [];
    userId = $("#chaptertree").attr("userid")
}
function onBookChange() 
{
    selectedBookId = $("#booklist").children('option:selected').val();
    $.each(books, function (i, book) {
        if (book.id == selectedBookId)
        {
            if ($('#chapterlist')){
                $('#chapterlist').remove();
            }
            $("<select name=\"ChapterId\" id=\"chapterlist\"></select>")
                    .appendTo($("#chaptertree"));
            $('#chapterlist').change(function () {
                selectedChapterId = $(this).children('option:selected').val();
            });
            if (book.chapters.length>0)
            { 
                $.each(book.chapters, function (i, chapter) {
                    $("<option value=\"" + chapter.id + "\">" + chapter.title + "</option>")
                        .appendTo($("#chapterlist"));
                });
            }
            else
            {
                $("<option value=\"\">无需章节...</option>")
                        .appendTo($("#chapterlist"));
            }
            return;
        }
    });

    if ($("#addchapter"))
    {
        $("#addchapter").remove();
    }
    $("<button id=\"addchapter\" class=\"btn btn-link\">新添章节</button>")
            .appendTo($("#chaptertree"));
    
}
function updateChapterTree() {
    $.ajax({
        type: 'post',
        url: getRootPath()+"/User/GetChapterTree",
        data: { userid: userId },
        dataType: 'json',
        success: function (data) {
            books = data;
            $("#chaptertree").empty();
            selectedChapterId = "";
            selectedBookId = "";
            $("<select name=\"BookId\" id=\"booklist\"></select>")
                .appendTo($("#chaptertree"))
            $.each(data, function (i, book) {
                $("<option name=\"BookId1\" id=\"BookId1_1\" value=\"" + book.id + "\">" + book.title + "</option>")
                    .appendTo($("#booklist"));
            });
            $('#booklist').change(onBookChange);
            onBookChange()
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
    initChapterTree();
    updateChapterTree();
});