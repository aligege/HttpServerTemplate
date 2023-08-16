import { MongoBaseModel, MongoBaseService } from 'cgserver';

export class NewsModel extends MongoBaseModel
{
    title=""
    icon=""
    url=""
    subtitle=""
    info=""
    create_time=0
    type=""//赛事公告
    open=1
}

export class NewsService extends MongoBaseService<NewsModel>
{
    
}
export let GNewsSer=new NewsService("news",NewsModel)