import { MongoBaseModel, MongoBaseService } from 'cgserver';

export class AnnounceModel extends MongoBaseModel
{
    title:string=""
    info:string=""
    create_time:number=-1
}
export let GAnnounceSer:AnnounceService=null
class AnnounceService extends MongoBaseService<AnnounceModel>
{
}
GAnnounceSer = new AnnounceService("announce",AnnounceModel)