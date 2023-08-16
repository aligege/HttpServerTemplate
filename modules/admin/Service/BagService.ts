import { GLog, MongoBaseService } from "cgserver";
import { MongoBaseModel } from "cgserver";
import _ from "underscore";
import { GItemCfgSer, ItemCfgItem } from "./Config/ItemCfgService";
import { ExtUserModel } from "./ExtUserService";

export enum EBagItemState
{
    None,
    Exchanging,//兑换中
    ExOk,//兑换成功
    TransOk//已转增
}

export class BagItemItem
{
    //实例id user_id+"_"+item.id+"_"+random
    id=""
    item_id=-1
    start_nickname=""
    start_userid=-1

    give_nickname=""
    give_userid=-1

    to_nickname=""
    to_userid=-1
    /**
     * 数量
     */
    count:number=1
    create_time=-1
    /**
     * 赠送的时间
     */
    give_time=-1
    state=EBagItemState.None
}

export class ExchangeItemItem extends BagItemItem
{
    state=EBagItemState.None
    //用户申请兑换的时间
    apply_time=-1
    //后台客服处理完成的时间
    ok_time=-1
}

export class BagModel extends MongoBaseModel
{
    user_id:number=-1
    items:Array<BagItemItem>=null
    exitems:Array<BagItemItem>=null
}

export let GBagSer:BagService=null
export class BagService extends MongoBaseService<BagModel>
{
    async getAllExchange()
    {
        let bags:any = await this.aggregate(<any>[
            {"$match":{"$or":[{"exitems.state":EBagItemState.Exchanging},{"exitems.state":EBagItemState.ExOk}]}},
            {"$project":{"user_id":1,"exitems":1}},
            {"$unwind":"$exitems"},
            {"$match":{"$or":[{"exitems.state":EBagItemState.Exchanging},{"exitems.state":EBagItemState.ExOk}]}},
            {
                "$lookup":{
                    from:"user",
                    localField:"user_id",
                    foreignField:"id",
                    as:"user"
                }
            },
            {"$unwind":"$user"},
            {"$project":{"user.id":1,"user.nickname":1,"user.account_id":1,exitems:1}},
            {
                "$lookup":{
                    from:"account",
                    localField:"user.account_id",
                    foreignField:"id",
                    as:"account"
                }
            },
            {"$unwind":"$account"},
            {"$project":{"user":1,"account.phone":1,exitems:1}},
        ]).toArray()
        return bags as {user:{id:number,nickname:string,account_id:number},account:{phone:string},exitems:ExchangeItemItem}[]
    }
    async getAllBags(user_id:-1,skip=0,len=20)
    {
        let aggs:any[]=<any>[
            {"$project":{"user_id":1,"items":1}},
            {"$unwind":"$items"},
            {
                "$lookup":{
                    from:"user",
                    localField:"user_id",
                    foreignField:"id",
                    as:"user"
                }
            },
            {"$unwind":"$user"},
            {"$project":{"user.id":1,"user.nickname":1,"user.account_id":1,items:1}},
            {
                "$lookup":{
                    from:"account",
                    localField:"user.account_id",
                    foreignField:"id",
                    as:"account"
                }
            },
            {"$unwind":"$account"},
            {"$project":{"user":1,"account.phone":1,items:1}},
        ]
        if(user_id>0)
        {
            aggs.unshift({"$match":{"user_id":user_id}})
        }
        let bags:any = await this.aggregate(aggs).sort({"items.create_time":-1}).skip(skip).limit(len).toArray()
        return bags as {user:{id:number,nickname:string,account_id:number},account:{phone:string},items:BagItemItem}[]
    }
    async getAllCount(user_id:-1)
    {
        let aggs:any[] = <any>[
            {"$project":{"user_id":1,"items":1}},
            {"$unwind":"$items"},
            {
                "$count":"count"
            }
        ]
        if(user_id>0)
        {
            aggs.unshift({"$match":{"user_id":user_id}})
        }
        let bags:any = await this.aggregate(aggs).toArray()
        if(bags.length==0)
        {
            return 0
        }
        return bags[0].count
    }
    async changeExtState(user_id:number,id:string)
    {
        let ret = await this.updateOne({'exitems.$.state': EBagItemState.ExOk,'exitems.$.ok_time': Date.now()},{"user_id":user_id,"exitems.id":id})
        if(ret.errcode)
        {
            return ret.errcode
        }
        return
    }
}
GBagSer=new BagService("bag",BagModel)