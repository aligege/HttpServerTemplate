import { GRedisMgr } from 'cgserver';
import { EErrorCode } from "../Config/_error_";
import * as _ from "underscore"

export class RIGModel
{
    user_id:any=0//角色id号,对于机器人是userid+gamecode+tableid
    is_leaving:number=0
    table_id:number=0
    server_name:string=""//所在游戏的名称
    game_host:string=""//所在游戏的ip
    game_port:number=0//所在游戏的port
    game_code:number=0//服务器唯一编码
}
export let GRIGSer:RIGService = null
class RIGService
{
    async get(user_id):Promise<RIGModel>
    {
        let rig = <RIGModel>await GRedisMgr.hgetall("table_rig_" + user_id)
        return rig
    }
    async remove(user_id)
    {
        if (!user_id)
        {
            return EErrorCode.No_Rig_Id
        }
        await GRedisMgr.del("table_rig_" + user_id)
    }
    async add(model:RIGModel)
    {
        let rs={rig:<RIGModel>null,errcode:null}
        rs.rig = <RIGModel>await GRedisMgr.hmset("table_rig_" + model.user_id, model)
        if(!rs.rig)
        {
            rs.errcode = EErrorCode.No_Rig
            return rs
        }
        return rs
    }
    updateIsLeaving(user_id:number,is_leaving:number)
    {
        GRedisMgr.hset("table_rig_" + user_id, "is_leaving",is_leaving)
    }
}
GRIGSer = new RIGService()