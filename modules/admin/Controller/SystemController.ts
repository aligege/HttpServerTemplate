import { BaseAdminController } from './BaseAdminController';
import { AdminValidate,JsonCreatorValidate,JsonAdminValidate,CreatorValidate,ERoleGroup } from 'cgserver';
import { GExtAccountSer } from '../Service/ExtAccountService';
import { GExtUserSer } from '../Service/ExtUserService';
import { GAdService } from '../Service/AdService';
import { GStatisticsLogin } from '../Service/StatisticsLogin';

export class SystemController extends BaseAdminController
{
    @AdminValidate
    async showIndex()
    {
        return this.show()
    }
    @AdminValidate
    async showMain()
    {
        let data = this._request.params||{}
        let p_total=GExtUserSer.countDocuments({is_robot:0})
        let p_trn=GExtAccountSer.getTodayRegisterNum()
        let p_tln=GExtAccountSer.getTodayLoginNum()

        data.system = {}
        data.system.total_num = (await p_total)||0
        data.system.today_register = (await p_trn)||0
        data.system.today_login = (await p_tln)||0


        
        return this.show(data)
    }
    @AdminValidate
    async showModifyPwd()
    {
        this.show()
    }
    @JsonAdminValidate
    async onModifyPwd()
    {
        let params = this.postData||{}
        let am = await GExtAccountSer.getById(this._self_user.account_id)
        if(!am)
        {
            params.err="账号查找失败"
        }
        else if(params.new_pwd.length<6)
        {
            params.err="新密码过短"
        }
        if(params.err)
        {
            this.showJson({err:params.err})
        }
        else
        {
            let rs = await GExtAccountSer.updatePwd(am.phone, am.password,params.new_pwd)
            if(rs.errcode)
            {
                this.showJson({err:JSON.stringify(rs.errcode)})
                return
            }
            this.showJson({})
        }
    }
    @CreatorValidate
    async showAdminList()
    {
        this.show()
    }
    @JsonCreatorValidate
    async onAdminList()
    {
        let params=this.postData
        let where={role_group:ERoleGroup.Admin}
        params.users = await GExtUserSer.getPageWithAccount(0,1000,where)
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onAddAdmin()
    {
        let user_id = this.postData.user_id
        let user = await GExtUserSer.get(user_id)
        if(!user)
        {
            this.showJson({err:"用户不存在"})
            return
        }
        if(user.role_group!=ERoleGroup.Common)
        {
            this.showJson({err:"该用户不是普通用户"})
            return
        }
        let err = await GExtUserSer.updateOne({role_group:ERoleGroup.Admin},{user_id:user_id})
        if(err)
        {
            this.showJson({err:err})
            return
        }
        user = await GExtUserSer.get(user_id)
        this.showJson({user})
    }
    @JsonCreatorValidate
    async onRemoveAdmin()
    {
        let user_id = this.postData.user_id
        let user = await GExtUserSer.get(user_id)
        if(!user)
        {
            this.showJson({err:"用户不存在"})
            return
        }
        if(user.role_group!=ERoleGroup.Admin)
        {
            this.showJson({err:"该用户不是管理员"})
            return
        }
        let err = await GExtUserSer.updateOne({role_group:ERoleGroup.Common},{user_id:user_id})
        if(err)
        {
            this.showJson({err:err})
            return
        }
        this.showJson({user_id})
    }
    @AdminValidate
    async onAdminLoginList()
    {
        let params=this.postData
        let page = params.page||0
        let num_per_page = params.page_num||20

        let p_total=GStatisticsLogin.countDocuments({account_id:this.selfUser.account_id})
        let p_list=GStatisticsLogin.aggregate()
            .match({account_id:this.selfUser.account_id})
            .skip(page*num_per_page)
            .limit(num_per_page)
            .toArray()

        params.total_num = await p_total
        params.datas = await p_list
        params.page = page+1
        params.total_page = Math.ceil(params.total_num/num_per_page)
        return this.showJson(params)
    }
}