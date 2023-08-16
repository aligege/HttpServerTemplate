import { MongoBaseService } from 'cgserver';
import { ns_admin } from '../Config/_ini_';

export class CardRecordModel
{
    id:number=-1//唯一编码
    game_name:string = "default"//游戏名称
    club_id:number = -1
    game_type:number = -1//子类型
    create_user_id:number = -1//创建者id
    room_id:number=-1//
    table_id:number = -1//桌子id
    cur_num:number = -1//当前局数
    create_time:number = -1//创建时间
    begin_time:number = -1//牌局开始时间
    end_time:number = -1//牌局结束时间
    table_type:ns_admin.ETableType=-1
    base_point:number=1
    min_point:number=-1
    max_user:number=-1
    min_user:number=-1
    total_num:number=-1
    fee_type:ns_admin.EFeeType=-1
    can_enter_after:number = 0
    can_leave:number = 0
    auto_prepare:number = 0
    auto_sitdown:number = 0
    prepare_timeout_type:ns_admin.EPrepareTimeOutType = ns_admin.EPrepareTimeOutType.None
    random_seat:number=1
    carry_coin:number=0
    virtual_coin:number = -1
    //其他字段，扩展使用
    ext_param_string:string = ""
    //牌局结束的信息字符串对应相应游戏的BattleRecordModel
    record_info:string = ""
}
export class UserCardRecordModel
{
    id:number=-1//唯一编码
    user_id:number=-1//
    game_name:string = "default"
    card_record_id:number=-1//
    create_time:number=-1//
}
export let GCardRecordSer:CardRecordService = null
class CardRecordService extends MongoBaseService<CardRecordModel>
{
}
GCardRecordSer = new CardRecordService("card_record",CardRecordModel)