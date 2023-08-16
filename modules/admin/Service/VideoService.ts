import { MongoBaseModel, MongoBaseService } from "cgserver";

export class VideoModel extends MongoBaseModel
{
    title=""
    icon=""
    url=""
    //价格
    coin=0
    sort=0
    create_time=0
    open=1
}

export class VideoService extends MongoBaseService<VideoModel>
{
}
export let GVideoSer=new VideoService("video",VideoModel)