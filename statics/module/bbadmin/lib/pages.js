let pages=
[
    {
        title:"主页",
        class:"menu-icon glyphicon glyphicon-home",
        src:"/System/Main"
    },
    // {
    //     title:"游戏问题&反馈",
    //     class:"menu-icon glyphicon glyphicon-question-sign",
    //     src:"/qa/qalist"
    // },
    {
        title:"系统功能",
        class:"menu-icon glyphicon glyphicon-cog",
        sub_pages:
        [
            {
                src:"/system/modifypwd",
                title:"修改密码"
            },
            {
                src:"/system/adminlist",
                title:"管理员"
            },
            {
                src:"/server/index",
                title:"服务器"
            }
        ]
    },
    {
        title:"用户数据",
        class:"menu-icon glyphicon glyphicon-user",
        sub_pages:
        [
            {
                src:"/user/list",
                title:"用户列表"
            }
        ]
    },
    {
        title:"Banner&新闻&视频",
        class:"menu-icon glyphicon glyphicon-file",
        sub_pages:
        [
            {
                src:"/adnews/ad",
                title:"Banner轮播"
            },
            {
                src:"/adnews/news",
                title:"新闻列表"
            },
            {
                src:"/video/video",
                title:"视频列表"
            }
        ]
    },
    {
        title:"账单数据",
        class:"menu-icon glyphicon glyphicon-file",
        sub_pages:
        [
            {
                src:"/order/OrderRecords",
                title:"充值记录"
            },
            {
                src:"/order/coinrecords",
                title:"积分记录"
            }
        ]
    },
    {
        title:"道具背包",
        class:"menu-icon glyphicon glyphicon-file",
        sub_pages:
        [
            {
                src:"/item/index",
                title:"道具配置"
            },
            {
                src:"/item/exchange",
                title:"道具兑换处理"
            },
            {
                src:"/item/bag",
                title:"背包统计"
            }
        ]
    },
    {
        title:"竞技德洲",
        class:"menu-icon fa fa-bar-chart-o",
        sub_pages:
        [
            {
                src:"/match/index",
                title:"比赛配置列表"
            },
            {
                src:"/match/matchins",
                title:"比赛实例列表"
            },
            {
                src:"/club/index",
                title:"俱乐部配置"
            }
        ]
    },
    {
        title:"盲注表",
        class:"menu-icon glyphicon glyphicon-home",
        src:"/blind/index"
    },
]