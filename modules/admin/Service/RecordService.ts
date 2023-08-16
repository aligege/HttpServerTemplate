import { MongoBaseService,GLog,MongoBaseModel } from 'cgserver';

export class RecordModel extends MongoBaseModel
{
    id:number=-1//唯一编码
    game_name:string = "ddz"//游戏名称
    game_type:number = -1//子类型
    create_user_id:number = -1//创建者id
    table_id:number = -1//桌子id
    club_id:number=-1
    create_time:number = -1//创建时间
    table_end_time:number = -1//牌局时间
    table_info:string = ""//详细信息的json序列化字符串
    table_detail_info = ""//每一局详细信息
}

export class UserRecordModel extends MongoBaseModel
{
    user_id:number=-1
    items:{game_name:string,record_id:number,create_time:number}[]=[]
}
export let GUserRecordSer:UserRecordService = null
class UserRecordService extends MongoBaseService<UserRecordModel>
{

}
GUserRecordSer=new UserRecordService("user_record",UserRecordModel)

export let GRecordSer:RecordService = null
class RecordService extends MongoBaseService<RecordModel>
{
    protected _without_detail={id:1,game_name:1,game_type:1,create_user_id:1,table_id:1,create_time:1,table_end_time:1,table_info:1}
    async getMore(id:number)
    {
        let brm:RecordModel = await this.get(this._without_detail,{id:id})
        return brm
    }
    async getByUserIdAndGameName(user_id,game_name,begin?,num?)
    {
        let list = new Array<RecordModel>()
        return list
    }
}
GRecordSer = new RecordService("record",RecordModel)