import { MongoBaseModel,MongoBaseService } from 'cgserver';

export enum EOrderState
{
    Init=0,//初始化
    Cancel,//用户取消
    Verifying,//验证中
    Failed,//验证失败
    Ok//验证成功，订单完成
}
export enum EOrderFrom
{
    Ios,//ios应用商店
    Wechat,//微信
    Alipay,//支付宝
    Android_Sft,//盛付通
    IOS_Sft//盛付通
}
export class OrderModel extends MongoBaseModel
{
    id:string=""//订单id，非自增（时间戳+角色id拼的字符串）
    user_id:number=-1
    product_id:string=""//商品id(mahjong@product@0)
    money:number=-1
    from:EOrderFrom=-1//充值来源
    create_time:number=-1
    state:EOrderState=EOrderState.Init
}
export let GOrderSer:OrderService = null
class OrderService extends MongoBaseService<OrderModel>
{
}
GOrderSer = new OrderService("orders",OrderModel)