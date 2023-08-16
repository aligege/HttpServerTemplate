import { MongoBaseModel,MongoBaseService } from 'cgserver';

export class RecordLoginModel extends MongoBaseModel
{
    id:number=-1
    account_id:number=-1
    login_time:number=-1
    login_ip:string=""
}

export let GRecordLoginSer:RecordLoginService=null
class RecordLoginService extends MongoBaseService<RecordLoginModel>
{
    async getLoginDataAnalysis()
    {
        let one_day_minisec = 24*60*60*1000
        // let sr = await GMysqlMgr.query("select count(*) as num,any_value(login_time) as time from \
        //     (select any_value(login_time) as login_time from statistics_login group by floor(login_time/?),account_id) as t \
        //     group by floor(login_time/?)",[one_day_minisec,one_day_minisec])
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
    async getStay(day_num)
    {
        let one_day_minisec = 24*60*60*1000
        // let rs = await GMysqlMgr.query("select floor(day_t.num/a_t.num)*100 as rate,day_t.time as time from\
        //         (select count(*) as num, (any_value(t.login_time)-?) as time from \
        //             (select any_value(login_time) as login_time,any_value(login_day) as login_day from \
        //                 (select account_id,floor(login_time/?) as login_day,login_time from statistics_login) as sl,\
        //                 (select id,floor(create_time/?) as register_day from account) as at \
        //                 where sl.account_id=at.id and sl.login_day=(at.register_day+?) group by sl.account_id,sl.login_day) as t \
        //             group by t.login_day) as day_t,\
        //         (select count(*) as num,floor(create_time/?) as register_day from account group by register_day) as a_t \
        //     where a_t.register_day=floor(day_t.time/?-?)",[one_day_minisec,one_day_minisec,one_day_minisec,day_num,one_day_minisec,one_day_minisec,day_num])
        // if(rs.error)
        // {
        //     return {}
        // }
        // if(rs.results.length<=0)
        // {
        //     return {}
        // }
        let map = new Map<number,number>()
        return map
    }
    async get24hoursLoginNum()
    {
        let time = 0//new Date().getTime() - 24*60*60*1000
        let one_day = 24*60*60*1000
        let list = await this.aggregate().group({"_id":{"login_time":{"$floor":{"$divide":["$login_time",60*60*1000]}},"account_id":"$account_id"}})
            .group({"_id":{"login_time":"$_id.login_time"},"num": { "$sum":	1 }})
            .project({"time":{"$multiply":["$_id.login_time",60*60*1000]},"num":1})
            .sort({"time":1}).toArray()
        return list
    }
}
GRecordLoginSer = new RecordLoginService("statistics_login",RecordLoginModel)