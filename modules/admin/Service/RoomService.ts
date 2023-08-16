import { MongoBaseService,MongoBaseModel } from "cgserver";

export class RoomModel extends MongoBaseModel
{
    id:number = -1
    game_name:string = ""
    club_id:number=-1
    level:number = 0
    base:number = 0
    min:number = 0
    max:number = -1
    base_mul:number = 15
    fee:number = 30
    max_point:number = 20000
}

export let GRoomSer:RoomService=null
class RoomService extends MongoBaseService<RoomModel>
{
}
GRoomSer = new RoomService("room",RoomModel)