import { BaseAdminController } from "./BaseAdminController";
import { GExtUserSer } from "../Service/ExtUserService";
import * as _ from "underscore";
import { core,GCacheTool,GSmsTool,EAccountFrom,ERoleGroup, AdminValidate } from "cgserver";
import { EErrorCode } from "../Config/_error_";
import { GExtAccountSer } from "../Service/ExtAccountService";
import { GStatisticsLogin, StatisticsLoginModel } from "../Service/StatisticsLogin";

export class LoginController extends BaseAdminController
{
    async showLogout()
    {
        this._response.clearCookie("user_id")
        this.redirect(null,"Login")
    }
    async showIndex()
    {
        this.show()
    }
    async onLoginCode()
    {
        let phone = this.postData.phone
        if(!core.isPhoneNo(phone))
        {
            this.showJson({})
            return
        }
        let phone_get=GCacheTool.get(phone+"_code_get")
        if(phone_get)
        {
            this.showJson({errcode:EErrorCode.PhoneCode_Too_Quick})
            return
        }
        let code = _.random(1111,9999)
        let err = await GSmsTool.sendSMS(code,phone)
        if(err)
        {
            this.showJson({errcode:EErrorCode.Wrong_Param})
            return
        }
        //验证码五分钟有效
        GCacheTool.add(phone+"_code",code,5*60*1000)
        //一分钟内不能重复获取
        GCacheTool.add(phone+"_code_get",true,1*60*1000)
        this.showJson({})
    }
    async onLogin()
    {
        let params = this.postData
        let phone = params.phone
        let password = params.password
        let code = params.code
        let cache_code = GCacheTool.get(phone+"_code")
        if(!code||code!=cache_code)
        {
            //this.showJson({errcode:EErrorCode.Wrong_Phone_Code})
            //return
        }
        let ip = this.remoteHost
        let rs = await GExtAccountSer.login(phone, password,ip,params.from)
        let errcode = rs.errcode
        let error = null
        if (!errcode)
        {
            let user = await GExtUserSer.getByAccountId(rs.account.id)
            if(user)
            {
                //移除验证码
                GCacheTool.remove(phone+"_code")
                this._login(user)
                this.showJson({})
                let slm = new StatisticsLoginModel()
                slm.account_id = rs.account.id
                slm.login_ip = this.remoteHost
                slm.login_time = Date.now()
                GStatisticsLogin.insert(slm)
                return
            }
            else
            {
                error = "no user!"
            }
        }
        else
        {
            error = errcode.des
        }
        if(error)
        {
            this.showJson({errcode:{id:1,des:error}})
        }
    }
    async showOfficalLogin()
    {
        let ip = this.remoteHost
        let params = this.paramData
        let openid=params.openid
        let nickname=params.nickname
        let account = await GExtAccountSer.getByThird(openid,openid)
        if(!account)
        {
            account = await GExtAccountSer.add(openid,openid,ip,EAccountFrom.QQ)
            if(!account)
            {
                this.show({err:"账户创建失败"})
                return
            }
        }
        let user = await GExtUserSer.getByAccountId(account.id)
        if(!user)
        {
            user = await GExtUserSer.add(account.id,nickname,1,_.random(0,100)+"",ERoleGroup.Common)
            if(!user)
            {
                this.show({err:"用户创建失败"})
                return
            }
        }
        if(!user)
        {
            let rs = await GExtAccountSer.login(openid,openid,ip,EAccountFrom.OpenSocial)
            let errcode = rs.errcode
            
            if (!errcode)
            {
                user = await GExtUserSer.getByAccountId(rs.account.id)
            }
            else
            {
                this.show({err:errcode.des})
                return
            }
        }
        if(user)
        {
            this.show({err:"登陆失败"})
            return
        }
        this._login(user)
        this.show()
    }
}