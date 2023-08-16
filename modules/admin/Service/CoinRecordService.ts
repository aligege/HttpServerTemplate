import * as _ from "underscore";
import { MongoBaseModel,MongoBaseService } from "cgserver";

export enum ECoinRecord
{
    Test=0,
    Init,//初始
    Sign,//签到
    Match,//比赛报名
    Charge,//充值
    Exchange,//兑换
    Reward,//奖励
}
export enum ECRState
{
    None,
    //等待补偿
    WaitingCompensation,
    //补偿完成
    Done
}
export class CoinRecordModel extends MongoBaseModel
{
    id=-1
    user_id=-1
    game_name=""
    room_id=0
    club_id=-1
    pre_coin=0
    aft_coin=0
    type=ECoinRecord.Test
    coin=0
    create_time=-1
}
/**
 * 为了优化而存在的
 */
export class DRCoinRecordModel
{
    id=-1
    game_name=""
    room_id=0
    club_id=-1
    day_time=0
    coin=0
}
export let GCoinRecordSer:CoinRecordService = null
class CoinRecordService extends MongoBaseService<CoinRecordModel>
{
    
}
GCoinRecordSer = new CoinRecordService("coin_record",CoinRecordModel)