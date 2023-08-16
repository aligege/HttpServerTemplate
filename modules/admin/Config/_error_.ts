import { FrameworkErrorCode } from "cgserver";

export let EErrorCode:CommonErrorCode =null

export class CommonErrorCode extends FrameworkErrorCode
{
    //0以下
    No_Normal_Game_Server={id:-6,des:"服务器故障，无可用游戏服务器"}
    No_Normal_Match_Server={id:-5,des:"服务器故障，无可用匹配服务器"}
    No_Normal_Battle_Server={id:-4,des:"服务器故障，无可用战斗服务器"}
    No_Normal_Hall_Server={id:-3,des:"服务器故障，无可用逻辑服务器"}
    //101-10000
    Handle_Failed={id:101,des:"处理失败"}
    User_Name_No_Empty={id:102,des:"用户名不能为空"}
    Password_No_Empty={id:102,des:"密码不能为空"}
    User_Not_Exist={id:103,des:"账户不存在"}
    User_User_Not_Exist={id:104,des:"用户档案不存在"}
    User_Name_Or_Password_Not_Correct={id:105,des:"用户名或密码不正确"}
    User_Name_Len_Not_Correct={id:106,des:"用户名长度不对"}
    Password_Len_Not_Correct={id:107,des:"密码长度不对"}
    No_User_Id={id:108,des:"角色信息不存在"}
    No_Account_Id={id:109,des:"账户id不存在"}
    No_Rig={id:110,des:"没有rig信息"}
    No_Rig_Id={id:111,des:"根据id查找rig失败"}
    No_Table_Id={id:112,des:"根据id查找table失败"}
    No_Server_By_Code={id:113,des:"相应服务器查找失败"}
    No_BattleRecord={id:114,des:"没有战斗记录"}
    No_BattleRecord_Id={id:115,des:"根据id查找战斗记录失败"}
    Mysql_Error={id:116,des:"mysql异常"}
    Wrong_Param={id:117,des:"错误的参数"}
    GetAccessToken_Failed={id:118,des:"获取AccessToken失败！"}
    GetUsetInfo_Failed={id:119,des:"获取微信用户信息失败！"}
    Not_In_Game={id:120,des:"不在子该游戏中！"}
    Password_Not_Correct={id:121,des:"密码不正确"}
    Account_Be_Ban={id:122,des:"账号已被封禁，详情请联系管理员！"}
    Has_Checked={id:123,des:"已经签过到了！"}
    User_Be_Ban: {id: 124, des: "角色已被封禁，详情请联系管理员！" }
    Wrong_Phone: {id: 125, des: "手机号不正确！" }
    Verify_Code_Failed: {id: 126, des: "验证码过期或者不存在！" }
    Wrong_Verify_Code: {id: 127, des: "验证码不正确！" }
    Account_Exist={ id:128, des:"账户已存在" }
    Account_Not_Exist={ id:129, des:"账户不存在" }
    Phone_No_Empty={id:130,des:"手机号不能为空"}
    Phone_Or_Password_Not_Correct={id:131,des:"手机号或密码不正确"}
    Account_Name_Exist={id:132,des:"账户名已存在"}
    Phone_Exist={id:133,des:"手机号已存在"}
    Bank_Coin_Not_Enough={id:134,des:"银行中的存款不足"}
    Account_Create_Failed={id:135,des:"账号创建失败"}
    User_Create_Failed={id:136,des:"角色创建失败"}
    Server_Error={id:137,des:"服务器内部错误"}
    //11000开头的邮件
    No_Email={id:11000,des:"邮件不存在"}
    Can_Not_Remove_For_Att={id:11001,des:"附件未领取，不能删除！"}
    No_Attachment={id:11002,des:"没有附件！"}
    Has_Got_Attachment={id:11003,des:"附件已被领取！"}
    //10001开头
    Wrong_Token={id:10001,des:"token验证失败"}
    Aready_In_Table={id:10002,des:"已经在桌内"}
    Aready_Table_Ended={id:10003,des:"已经结束"}
    //20001开头
    No_User={id:20001,des:"角色信息不存在"}
    Enter_Game_CMD_First={id:20002,des:"请先发送进入游戏的命令"}
    Add_Friend_Failed={id:20003,des:"用户添加失败"}
    Remove_Friend_Failed={id:20004,des:"好友删除失败"}
    Email_Not_Exist_Or_Expire={id:20005,des:"邮件不存在或者过期"}
    Email_Attachment_Not_Exist_Or_Expire={id:20006,des:"附件不存在"}
    Table_Not_Exist={id:20007,des:"桌子不存在"}
    No_Enougth_Crystal={id:20008,des:"钻石不足"}
    No_Order={id:20009,des:"订单不存在"}
    Order_Not_Yours={id:20010,des:"不是您的订单"}
    Order_Verify_Failed={id:20011,des:"订单验证失败"}
    Order_Complete={id:20012,des:"订单已经完成"}
    No_Enougth_Coin={id:20013,des:"金币不足"}
    //30001---代理
    Was_Proxy={id:30001,des:"已经是代理了"}
    Proxy_Level_Too_High={id:30002,des:"授权等级不能大于等于自身等级"}
    Proxy_Code_Not_Exist={id:30003,des:"推广码不存在"}
    Proxy_Binded={id:30003,des:"推广码不能重复绑定"}
    Proxy_Not_Bind_Self={id:30003,des:"不能绑定自己"}
    Was_Binded={id:30004,des:"已经绑定过了"}
    //40001---俱乐部
    No_Club_By_Id={id:30001,des:"根据id查找俱乐部失败"}
    Club_Title_Exist={id:30002,des:"俱乐部的名称已经存在"}
    Not_Club_Creator={id:30003,des:"不是俱乐部创建者"}
    Club_Title_Not_Null={id:30004,des:"俱乐部名称不能为空"}
    Not_Club_Admin={id:30005,des:"非俱乐部管理员"}
    No_Apply_Join_Club={id:30006,des:"申请数据不存在"}
    Shield_By_Club={id:30007,des:"您已经被该俱乐部屏蔽了"}
    Not_In_Club={id:30008,des:"该用户不在当前俱乐部"}
    Add_Member_Failed={id:30009,des:"该用户不在当前俱乐部"}
    //50001---充值相关
    Not_Enough_Item={id:50001,des:"道具数量不足!"}

    //60001---QA相关
    No_QA={id:60001,des:"问题不存在"}
    QA_Closed={id:60002,des:"问题已关闭"}
    QA_Reply_Failed={id:60003,des:"回复失败"}
    QA_Read_Failed={id:60004,des:"阅读失败"}
    QA_Remove_Failed={id:60005,des:"删除失败"}
}
EErrorCode=new CommonErrorCode()