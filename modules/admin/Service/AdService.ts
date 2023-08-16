import { MongoBaseModel, MongoBaseService } from 'cgserver';

export class AdModel extends MongoBaseModel
{
    title=""
    icon=""
    url=""
    info=""
    create_time=-1
    open=1
}

export let GAdService:AdService=null
class AdService extends MongoBaseService<AdModel>
{
}
GAdService = new AdService("ad",AdModel)