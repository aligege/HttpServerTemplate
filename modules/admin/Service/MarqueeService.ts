import { MongoBaseModel,MongoBaseService } from "cgserver";

export class MarqueeModel extends MongoBaseModel
{
    id:number=0
    club_id:number=-1
    title:string=""//备注用，客户端不显示
    content:string=""
    create_time:number=0
    start_time:number=0
    end_time:number=0//这个时间小于等于0表示，执行默认的循环两次
}
export let GMarqueeSer:MarqueeService=null
export class MarqueeService extends MongoBaseService<MarqueeModel>
{

}
GMarqueeSer=new MarqueeService("marquee",MarqueeModel)