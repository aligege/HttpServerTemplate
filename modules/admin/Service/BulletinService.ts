import { MongoBaseModel,MongoBaseService } from "cgserver";

export class BulletinModel extends MongoBaseModel
{
    id:number=0
    club_id:number=-1
    title:string=""//备注用，客户端不显示
    content:string=""
    create_time:number=0
    start_time:number=0
    end_time:number=0//这个时间小于等于0表示，永久显示
}
export let GBulletinSer:BulletinService=null
export class BulletinService extends MongoBaseService<BulletinModel>
{
}
GBulletinSer=new BulletinService("bulletin",BulletinModel)