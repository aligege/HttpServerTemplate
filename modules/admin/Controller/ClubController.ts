import { AdminValidate, JsonCreatorValidate } from 'cgserver';
import { EErrorCode } from '../Config/_error_';
import { ClubModel, GClubSer } from '../Service/ClubService';
import { BaseAdminController } from './BaseAdminController';
import * as _ from "underscore";

export class ClubController extends BaseAdminController
{
    @AdminValidate
    async showIndex()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onClubList()
    {
        let params=this.postData
        params.clubs = await GClubSer.gets()
        params.count=params.clubs.length
        params.page = 1
        params.total_page = 1
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onUpdateState()
    {
        let params=this.postData
        let club_id = params.club_id
        let open = params.open
        let sr = await GClubSer.updateOne({open},{id:club_id})
        if(sr.errcode||sr.rs.modifiedCount)
        {
            this.showJson({errcode:EErrorCode.Handle_Failed})
            return
        }
        this.showJson({})
    }
    @JsonCreatorValidate
    async onRemove()
    {
        let params=this.postData
        let club_id = parseInt(params.club_id)
        let sr = await GClubSer.deleteOne({id:club_id})
        this.showJson({})
    }
    @JsonCreatorValidate
    async onUpdate()
    {
        let params=this.postData
        let club = params.club
        club.invite_code+=""
        if(club.invite_code)
        {
            let _cb = await GClubSer.get({id:1},{invite_code:club.invite_code})
            if(_cb)
            {
                this.showJson({errcode:{id:10086,des:"邀请码不能重复!"}})
                return
            }
        }
        club.id=parseInt(club.id)
        club.open=parseInt(club.open+"")
        let sr = await GClubSer.updateOne(club,{id:club.id})
        this.showJson({club})
    }
    @JsonCreatorValidate
    async onAdd()
    {
        let params=this.postData
        let club_p = params.club as ClubModel
        club_p.open=parseInt(club_p.open+"")
        club_p.invite_code=club_p.invite_code+""
        if(club_p.invite_code)
        {
            let _cb = await GClubSer.get({id:1},{invite_code:club_p.invite_code})
            if(_cb)
            {
                this.showJson({errcode:{id:10086,des:"邀请码不能重复!"}})
                return
            }
        }
        let club = new ClubModel()
        while(true)
        {
            club.id=_.random(10000,99999)
            let cb = await GClubSer.get({id:1},{id:club.id})
            if(!cb)
            {
                break
            }
        }
        club.invite_code=club_p.invite_code
        club.title=club_p.title
        club.url=club_p.url
        club.city=club_p.city
        club.service=club_p.service
        club.open=club_p.open
        club.create_time=Date.now()
        let rs = await GClubSer.insert(club)
        if(rs.errcode)
        {
            this.showJson({errcode:rs.errcode})
            return
        }
        this.showJson({club})
    }
}