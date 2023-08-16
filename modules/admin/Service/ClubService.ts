/*
    为了方便简单移植，，俱乐部模块就全部写在这里了，不按照功能分文件了虽然不规范，但是非常好用
*/
import * as _ from "underscore"
import { MongoBaseModel } from 'cgserver';
import { MongoBaseService } from 'cgserver';

export class ClubModel extends MongoBaseModel
{
    id:number=-1 //俱乐部id
    invite_code:string=""
    title:string=""//俱乐部名称
    url:string=""//俱乐部url
    icon=""
    ads:string[]=[]
    notice:string=""//俱乐部公告
    region:string=""
    provience:string=""
    //城市-南京
    city=""
    //地址-南京开河区
    address=""
    //消息地址 南京市开河区中三路365号
    address_detail=""
    //联系方式 18897324536(微信同号)
    service=""
    user_count=0
    create_time:number=-1
    open=0
    users:{[user_id:number]:ClubUser}
}

export class ClubUser
{
    user_id=-1
    create_time=-1
}

export let GClubSer:ClubService=null
class ClubService extends MongoBaseService<ClubModel>
{
    async getNewId()
    {
        while(true)
        {
            let id = _.random(126345,999999)
            let club = await this.getById(id)
            if(!club)
            {
                return id
            }
        }
    }
    async isInClub(user_id:number,club_id:number)
    {
        let user_key = `users.${user_id}`
        let model = {id:1}
        model[user_key]=1
        let club = await this.get(model,{id:club_id})
        if(!club||!club.users||!club.users[user_id])
        {
            return false
        }
        return true
    }
}
GClubSer = new ClubService("club",ClubModel)