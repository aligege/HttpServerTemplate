import * as _ from "underscore";
import { MongoUserService,ERoleGroup,GLog,MongoUserModel } from 'cgserver';

export class ExtUserModel extends MongoUserModel
{
    idcard_no=""
    idcard_time=0
}
let UserUpdateModel=["nickname","ip","sex","logo"]

export let GExtUserSer:ExtUserService = null
export class ExtUserService extends MongoUserService<ExtUserModel>
{
    protected async _createNewUser(account_id:number,nickname:string,sex:number,logo:string,group?:ERoleGroup)
    {
        let rm = await super._createNewUser(account_id,nickname,sex,logo,group)
        let ext_rm = new ExtUserModel()
        for(let k in ext_rm)
        {
            if(rm[k]==undefined)
            {
                rm[k]=ext_rm[k]
            }
        }
        return rm
    }
    async getSimple(id)
    {
        let rm = await this.get(id)
        if(!rm)
        {
            return null
        }
        return {
            id:rm.id,
            logo:rm.logo,
            sex:rm.sex,
            nickname:rm.nickname
        }
    }
    async getTotalNum(where:string,ps:Array<any>)
    {
        
    }
    async getPage(page_index:number,page_num:number)
    {
        let begin = page_index*page_num
        let list:ExtUserModel[] = await this.gets(null,null,{account_id:1},begin,page_num)
        return list
    }
    async getPageWithAccount(page_index:number,page_num:number,where:{[key:string]:any}={})
    {
        let begin = page_index*page_num
        let end = page_num
        let list = await this.aggregate(<any>[
            {
                "$lookup":{
                    from:"account",
                    localField:"account_id",
                    foreignField:"id",
                    as:"account"
                }
            },
            {
                "$match":where
            },
            {
                "$project":{"account.login_time":1,"account.login_ip":1,"account.create_time":1,id:1,nickname:1,role_group:1,coin:1,account_id:1,idcard_no:1}
            }
        ]).sort({account_id:1}).skip(page_index*page_num).limit(page_num).toArray()
        for(let i=0;i<list.length;++i)
        {
            let item = list[i]
            if(item.account&&item.account.length>0)
            {
                let account = item.account[0]
                delete item.account
                item.login_time=account.login_time
                item.create_time=account.create_time
                item.login_ip=account.login_ip
            }
        }
        return list
    }
    async updateState(user_id,state)
    {
        let sr = await this.updateOne({state:state},{id:user_id})
        if(sr.errcode||sr.rs.modifiedCount<=0)
        {
            return "修改失败"
        }
        return
    }
}
GExtUserSer = new ExtUserService(ExtUserModel)