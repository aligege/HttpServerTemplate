import { BaseAdminController } from "./BaseAdminController";
import { AdminValidate,GHttpTool,JsonAdminValidate } from "cgserver";
import * as _ from "underscore";

export class BaseGameController extends BaseAdminController
{
    protected _game_name:string=""
    @AdminValidate
    showRoomList()
    {
        this.show()
    }
    @AdminValidate
    async showRoomHot()
    {
        this.show()
    }
    @AdminValidate
    async showRoomCoin()
    {
        this.show()
    }
    @AdminValidate
    async showWhitelist()
    {
        this.show()
    }
    @JsonAdminValidate
    async onWhitelist()
    {
        let params = this.postData
        let page = params.page_index||0
        let num_per_page = params.page_num||20
        let p_wl=[]//GWhitelistSvc.getByGame(this._game_name,page,num_per_page)
        let p_tn=[]//GWhitelistSvc.getByGameTotal(this._game_name,page,num_per_page)
        params.whitelist=await p_wl
        params.total_num=await p_tn
        params.page = page+1
        params.total_page = Math.ceil(params.total_num/num_per_page)
        this.showJson(params)
    }
    @AdminValidate
    async showSetup()
    {
        this.show()
    }
    @AdminValidate
    async showOnline()
    {
        this.show()   
    }
    @JsonAdminValidate
    async onGetOnlineTables()
    {
        let params=this.postData
        let server = params.server

        let rs=await GHttpTool.httpPost("http://"+server.gmhost+":"+server.gmport+"/"+this._game_name+"/gm/GetDetailRoomInfo",{
            room_id:params.room_id,
            page:params.page,
            page_num:params.page_num
        })
        let tableInfos=[]
        let table_num=0
        if(!rs.error)
        {
            try{
                let body = JSON.parse(rs.response.body)
                tableInfos=body.tableInfos||[]
                table_num=body.table_num||0
            }catch(e){}
        }
        this.showJson({tableInfos,table_num})
    }
}