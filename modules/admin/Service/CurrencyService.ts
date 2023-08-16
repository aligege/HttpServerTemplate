import { MongoBaseModel,MongoBaseService } from 'cgserver';
export enum ECrystalWhy
{
    InitZS=0,//初始赠送
    ShareZS=1,//分享赠送
    BindZS=2,//绑定赠送
    FromFriend=3,//好友赠送
    ToFriend=4,//赠送给好友
    FromCharge=5,//来自充值
    Game=10,//游戏消耗
}
export class CurrencyModel extends MongoBaseModel
{
    id:number=-1
    from_id:number=-1
    num:number=-1
    create_time:number=-1
    game_name:string=""
    why:ECrystalWhy=-1
}

export let GCurrencyService:CurrencyService = null
class CurrencyService extends MongoBaseService<CurrencyModel>
{
    async getAnalysis(crystal_type)
    {
        //let sr = await GMysqlMgr.query("select sum(num) as num,create_time as time from statistics_currency where why=? group by floor(create_time/(24*60*60*1000))",[crystal_type])
        return []
    }
}
GCurrencyService = new CurrencyService("currency",CurrencyModel)