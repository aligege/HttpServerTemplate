import { BaseAdminController } from './BaseAdminController';
import { AdminValidate } from 'cgserver';
import { ExtUserModel, GExtUserSer } from '../Service/ExtUserService';
import { GExtAccountSer } from '../Service/ExtAccountService';
import { GRecordLoginSer } from '../Service/RecordLoginService';

export class UserController extends BaseAdminController
{
    @AdminValidate
    async showList()
    {
        return this.show()
    }
    @AdminValidate
    async onList()
    {
        let params=this.postData
        let where=<any>{}
        if(params.user_id)
        {
            where.id=params.user_id
        }
        if(params.start_time)
        {
            where.account.create_time={$gte:params.start_time}
        }
        if(params.end_time)
        {
            where.account.create_time={$lte:params.end_time}
        }
        if(where=="")
        {
            where=null
        }

        let page = params.page||0
        let num_per_page = params.page_num||20

        let p_total=GExtUserSer.countDocuments(where)
        let p_list=GExtUserSer.getPageWithAccount(page,num_per_page,where)

        params.total_num = await p_total
        params.users = await p_list
        params.page = page+1
        params.total_page = Math.ceil(params.total_num/num_per_page)
        return this.showJson(params)
    }
    @AdminValidate
    async showLoginRegister()
    {
        return this.show()
    }
    async onGetRegister()
    {
        let registerData=await GExtAccountSer.getRegisterDataAnalysis(this.postData.game)
        return this.showJson(registerData)
    }
    async onGetLogin()
    {
        let loginData=await GRecordLoginSer.getLoginDataAnalysis()
        return this.showJson(loginData)
    }
    @AdminValidate
    async onUpdateState()
    {
        let params = this.postData
        let err = await GExtUserSer.updateState(params.user_id,params.state)
        if(err)
        {
            this.showJson({err:err})
            return
        }
        this.showJson({})
    }
    @AdminValidate
    async onVerify()
    {
        let user = this.postData.user as ExtUserModel
        user.id = parseInt(user.id+"")
        user.idcard_time=Date.now()
        if(!user.idcard_no)
        {
            user.idcard_time=-1
        }
        let rs = await GExtUserSer.updateOne(user,{id:user.id})
        if(rs.errcode)
        {
            this.showJson({errcode:rs.errcode})
            return
        }
        this.showJson({user})
    }
    
    @AdminValidate
    async showStay()
    {
        return this.show()
    }
    async onGetStay()
    {
        // let day_data=
        // {
        //     "1" : GLoginSer.getStay(1,this.postData.game),
        //     "3" : GLoginSer.getStay(3-1,this.postData.game),
        //     "5" : GLoginSer.getStay(5-1,this.postData.game),
        //     "7" : GLoginSer.getStay(7-1,this.postData.game),
        //     "30" : GLoginSer.getStay(30-1,this.postData.game)
        // }
        // let rs = new Map<number,{time:number,"1":number,"3":number,"5":number,"7":number,"30":number}>()
        // for(let index in day_data)
        // {
        //     for(let time in day_data[index])
        //     {
        //         let rate = day_data[index][time]
        //         if(!rs[time])
        //         {
        //             rs[time] = {time:time,"1":0,"3":0,"5":0,"7":0,"30":0}
        //         }
        //         for(let i in day_data)
        //         {
        //             rs[time][i] = day_data[i][time] || 0
        //         }
        //     }
        // }
        let list = new Array<{time:number,"1":number,"3":number,"5":number,"7":number,"30":number}>()
        // for(let time in rs)
        // {
        //     list.push(rs[time])
        // }
        // list.sort((a,b)=>
        // {
        //     return a.time-b.time
        // })
        return this.showJson(list)
    }
    @AdminValidate
    async onGetLoginNum()
    {
        let list = await GRecordLoginSer.get24hoursLoginNum()
        // let time = new Date().getTime()
        // time -= time %(60*60*1000)
        // let rs_list = []
        // for(let i=0;i<24;++i)
        // {
        //     let t = time - i*60*60*1000
        //     if(list.length>0&&list[list.length-1].time>t)
        //     {
        //         rs_list.push(list.pop())
        //         rs_list[rs_list.length-1].time = t
        //     }
        //     else
        //     {
        //         rs_list.push({time:t,num:0})
        //     }
        // }
        // rs_list.sort((i1,i2)=>
        // {
        //     return i1.time-i2.time
        // })
        return this.showJson(list)
    }
}