import { MongoBaseService,MongoBaseModel } from "cgserver";
import _ from "underscore";

export enum EMatchLoopType
{
    //不循环
    None,
    //每日循环
    Day,
    //每周循环
    Week
}
export class MatchItemInfo
{
    id=0
    count=0
}
export class MatchModel extends MongoBaseModel
{
    id=0
    /**
     * 所属俱乐部id，小于等于0为全局的
     */
    club_id=-1
    name=""
    des=""
    icon=""
    looptype=EMatchLoopType.None
    blind_id=0
    coin=0
    //报名开始时间
    singup_starttime=0
    //游戏正式开始的时间
    match_starttime=0
    //最低开赛人数
    min_user=2
    max_user=999
    //报名花费
    signup_cost:MatchItemInfo[]=[]
    //奖励
    reward:MatchItemInfo[]=[]
    //多少盲注级别以内，还可以进入
    reenter_blind_index=0
    //可以重新进入的次数
    reenter_count=0
    open=0//大于1开放
    end_player=1//剩多少人的时候结束比赛
    create_time=Date.now()
    /**
     * 是否动态奖励
     */
    dynamic_reward=0
}
export let GMatchSer:MatchService=null
export class MatchService extends MongoBaseService<MatchModel>
{
}
GMatchSer=new MatchService("match",MatchModel)