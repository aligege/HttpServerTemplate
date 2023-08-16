// JavaScript 日历

$(document).ready(function () {

    //当前时间

    $now = new Date();                      //当前的时间

    $nowYear = $now.getFullYear();          //当前的年

    $nowMonth = $now.getMonth();            //当前的月

    $nowDate = $now.getDate();              //当前的日

    $nowMonthCn = monthCn($nowMonth);       //格式化后的月

    //第一次设置当前时间

    calOpt($now);

    //上个月鼠标点击事件

    $('#prevMonth').on('click', function () {

        var year_text = $('.thisYear').text();

        var month_text = $('.thisMonth').text() - 2;

        var date_text = $('.thisDate').text();

        $('#cal').html('');

        var d = new Date(year_text, month_text, date_text);

        calOpt(d);

        return false;

    });

    //下个月鼠标点击事件

    $('#nextMonth').on('click', function () {

        var year_text = $('.thisYear').text();

        var month_text = $('.thisMonth').text();

        var date_text = $('.thisDate').text();

        $('#cal').html('');

        var d = new Date(year_text, month_text, date_text);

        calOpt(d);

        return false;

    });

    //关闭日历鼠标点击事件

    $('#cal_close').on('click', function () {

        $('#cal').html('');

        $('#cal').hide();

        return false;

    });

});

//是否在数组中？返回下标+1

function inArray(val, arr) {

    for (var index = 0; index < arr.length; index++) {

        if (val == arr[index]) {

            return index + 1;

        }

    }

    return false;

}

//获取月份对应中文

function monthCn(month) {

    var m = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);

    return m[month];

}

//获取星期对应中文

function dayCn(day) {

    var w = new Array('日', '一', '二', '三', '四', '五', '六');

    return w[day];

}

//获取选择月对应的实际天数（也是本月的最后一天）

function getDates(year, month) {

    var d = new Date(year, month, 0).getDate();

    return d;

}

//选择月的上个月的记录第几天

function prevDay(year, month, date) {

    var y = year;

    var m = month - 1;

    var d = -(date - 2);

    var p = new Date(y, m, d).getDate();

    return p;

}

//选择月的下个月的记录第几天

function nextDay(year, month, date) {

    var y = year;

    var m = month;

    var d = 1;

    var p = new Date(y, m, d).getDate();

    return p;

}

//活动数组数据解析--日期

function jsonDate(data) {

    var j = new Array();

    for (var i = 0; i < data.length; i++) {

        j.push(data[i].hDongD);

    }

    return j;

}

//活动数组数据解析--网址

function jsonUrl(data) {

    var j = new Array();

    for (var i = 0; i < data.length; i++) {

        j.push(data[i].hDongUrl);

    }

    return j;

}

//设置日历参数

function calOpt(date) {

    //获取选择系统时间

    var $year = date.getFullYear();         //年

    var $month = date.getMonth();           //月

    var $date = date.getDate();             //日

    var $day = date.getDay();               //星期

    var $monthCn = monthCn($month);         //格式化后的月

    //获取选择月的第一天对应的星期数+1

    var $fDay = new Date($year, $month, 1).getDay() + 1;

    //获取选择月对应的实际天数（也是本月的最后一天）

    var $lDate = getDates($year, $monthCn);

    //  alert('年：'+$year+'\n月：'+$monthCn+'\n日：'+$date+'\n选择月的第一天对应的星期数：'+$fDay+'\n选择月的最后一天：'+$lDate);

    //获取活动数组数据并输出日历

    //var test = new Array(

    //    { hDongD: 4, hDongUrl: 'http://www.bing.com' },

    //    { hDongD: 14, hDongUrl: 'http://www.baidu.com' }

    //);

    $.ajax({

        type: 'post',

        url: getRootPath()+"/User/GetCalandDay",
        
        data: { 'year': $year, 'month': $monthCn },

        dataType: 'json',

        success: function (result) {

            if (result == null) {     //如果无活动数组数据，则声明一个空数据

                result = new Array();

            }

            calShow($fDay, $lDate, $date, $monthCn, $year, eval(result));

        },

        error: function (XMLHttpRequest, textStatus, errorThrown) { //发送失败事件

            alert(textStatus);

        }

    });

}

/*

输出日历

参数1：选择月的第一天对应的星期数+1;

参数2：选择月的最后一天;

参数3：选择的日;

参数4：选择的月;

参数5：选择的年;

参数6：活动数组数据;

*/

function calShow(fDay, lDate, date, monthCn, year, data) {

    var $dayN = 1;      //记录第几天

    var $dayTd = 1;     //记录第几天的TD

    var $rowMax = Math.ceil((lDate + fDay - 1) / 7);  //总行数

    var $prev_dayN = prevDay(year, monthCn, fDay);//选择月的上个月的记录第几天

    var $next_dayN = nextDay(year, monthCn, fDay);//选择月的上个月的记录第几天

    //显示table>tr>th

    html = '<table>';

    html += '<tr><th colspan=7>';

    html += '<a id="prevMonth" href=""> << </a>        ';

    html += '<span class="thisYear">' + year + '</span>年' + '<span class="thisMonth">' + monthCn + '</span>月<span class="thisDate">' + date + '</span>';

    html += '        <a id="nextMonth" href=""> >> </a></th></tr>';

    html += '</th></tr>';

    //显示星期标题

    html += '<tr>';

    for (var i = 0; i < 7; i++) {

        html += '<td>' + dayCn(i) + '</td>';

    }

    html += '</tr>';

    //显示日

    for (var row = 1; row <= $rowMax; row++) {

        html += '<tr>';

        for (var col = 1; col <= 7; col++) {

            if ($dayTd < fDay) {

                html += '<td class="prev_dayN" dayn="' + $prev_dayN + '">' + $prev_dayN + '</td>';

                $dayTd++;

                $prev_dayN++;

            } else {

                var dayIndex = inArray($dayN, jsonDate(data));

                var urlIndex = jsonUrl(data)[dayIndex - 1];

                //如果有活动则使用活动样式并加上活动链接

                if (dayIndex) {

                    //如果日期为当天则用红色加粗显示

                    if ($dayN == date && $nowMonth + 1 == monthCn && $nowYear == year) {

                        html += '<td class="activity now_date" dayn="' + $dayN + '" title="点击查看当天活动"><a href="' + urlIndex + '">' + $dayN + '</a></td>';

                    } else {

                        html += '<td class="activity" dayn="' + $dayN + '" title="点击查看当天活动"><a href="' + urlIndex + '">' + $dayN + '</a></td>';

                    }

                } else {

                    //如果日期为当天则用红色加粗显示

                    if ($dayN == date && $nowMonth + 1 == monthCn && $nowYear == year) {

                        html += '<td class="now_date" dayn="' + $dayN + '">' + $dayN + '</td>';

                    } else {

                        html += '<td dayn="' + $dayN + '">' + $dayN + '</td>';

                    }

                }

                $dayN++;

            }

            if ($dayN > lDate) {

                var $next_dayNum = (row * 7 - ($dayN - 1)) - ($dayTd - 1);

                for (var i = 0; i < $next_dayNum; $next_dayNum--) {

                    html += '<td class="next_dayN" dayn="' + $next_dayN + '">' + $next_dayN + '</td>';

                    $next_dayN++;

                }

                break;

            }

        }

        html += '</tr>';

    }

    //结束输出table

    html += '</table>';

    //html += '<div id="cal_bottom"><a id="cal_close" href="">关闭</a></div>';

    $('#cal').append(html);

}
function getRootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.lastIndexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return prePath
}
