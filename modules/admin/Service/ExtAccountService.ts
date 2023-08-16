import { core,EAccountFrom,MongoAccountService,MongoAccountModel } from "cgserver";

export class ExtAccountModel extends MongoAccountModel
{
    is_robot=0
}
let expire_seconds=365*24*60*60//一年
export let GExtAccountSer:ExtAccountService=null
class ExtAccountService extends MongoAccountService
{
    protected _getNewModel()
    {
        return new ExtAccountModel()
    }
    async login(unionid:string,openid:string,ip:string,from:EAccountFrom,access_token?:string,extra?:{nickname:string,sex:number,logo:string})
    {
        let rs = {errcode:null,account:<ExtAccountModel>null,token:<string>null,is_new:false}
        let res = await super.login(unionid+"",openid+"",ip,from,access_token,extra)
        if(res.errcode)
        {
            rs.errcode = res.errcode
            return rs
        }
        rs.is_new=res.is_new
        rs.account = res.account as ExtAccountModel
        let key = "account_login_token_"+res.account.id
        let token = core.md5(res.account.id+""+res.account.login_time)
        rs.token = token
        return rs
    }
    async getRegisterDataAnalysis(game:string)
    {
        let one_day = 24*60*60*1000
        let one_hour = 8*60*60*1000
        // let sr = await GMysqlMgr.query("select any_value(create_time) as time,count(*) as num from account group by floor((create_time+?)/?)",[one_hour,one_day])
        // if(sr.error)
        // {
        //     return []
        // }
        // if(sr.results.length<=0)
        // {
        //     return []
        // }
        let list = new Array<{time:number,num:number}>()
        return list
    }
    async getTodayRegisterNum()
    {
        let time = core.getTodayStartTime()
        let num = await this.countDocuments({create_time:{$gte:time},is_robot:0})
        return num
    }
    async getTodayLoginNum()
    {
        let time = core.getTodayStartTime()
        let num = await this.countDocuments({login_time:{$gte:time},is_robot:0})
        return num
    }
}
GExtAccountSer = new ExtAccountService()