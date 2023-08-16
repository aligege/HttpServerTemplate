import { GCacheTool,MongoBaseModel,MongoBaseService } from "cgserver";

//单房间配置
export class RoomRobotCfgModel extends MongoBaseModel
{
    //房间id号
    room_id=-1
    /**
     * 俱乐部id方便查看
     */
    club_id=-1
    /**
     * 机器人的最低数量 
     */
    min_num=0
    /**
     * 机器人的最大数量,小于0为无限制，通常麻将这种必须凑桌的合适用这个 
     */
    max_num=0
    /**
     * 默认10%的几率主动离开积分场牌桌,百分制
     */
    leave_rate=80
    /**
     * 机器人自动玩耍的桌子最低数量
     */
    min_table=0
    /**
     * 机器人自动玩耍的桌子最高数量，通常-1就好，根据机器人数量来大概控制桌子
     */
    max_table=-1
    /**
     * 虚拟在线人数
     */
    virtual_num=0
    /**
     * 机器人的作弊率0-100
     */
    cheating_rate=0
}
export let GRoomRobotCfgSer:RoomRobotCfgService=null
class RoomRobotCfgService extends MongoBaseService<RoomRobotCfgModel>
{
    protected _dft=new RoomRobotCfgModel()
    /**
     * 该函数含有缓存不用担心过于消耗
     * @param room_id 
     */
    async getByRoomId(room_id):Promise<RoomRobotCfgModel>
    {
        let rrcm:RoomRobotCfgModel=GCacheTool.get("room_robot_cfg_"+room_id)
        if(rrcm)
        {
            return rrcm
        }
        let sr = await this.get({room_id:room_id})
        if(sr.error||sr.results.length<=0)
        {
            GCacheTool.add("room_robot_cfg_"+room_id,this._dft,1*60*60*1000)//缓存60分钟
            return this._dft
        }
        rrcm = sr.results[0]
        GCacheTool.add("room_robot_cfg_"+room_id,rrcm,1*60*60*1000)//缓存60分钟
        return rrcm
    }
    removeCache(room_id)
    {
        GCacheTool.remove("room_robot_cfg_"+room_id)
    }
}
GRoomRobotCfgSer=new RoomRobotCfgService("room_robot_cfg",RoomRobotCfgModel)