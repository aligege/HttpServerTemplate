import { BaseAdminController } from './BaseAdminController';
import { AdminValidate,core,JsonCreatorValidate } from 'cgserver';
import { GMatchSer, MatchModel } from '../Service/MatchService';
import { EMatchState, GMatchInsSer } from '../Service/MatchInstanceService';
import { GSubRedisSer } from '../Net/SubRedisServer';
import { GExtUserSer } from '../Service/ExtUserService';
import { GExtAccountSer } from '../Service/ExtAccountService';
import { EErrorCode } from '../Config/_error_';
import * as _ from "underscore";

export class MatchController extends BaseAdminController
{
    @AdminValidate
    async showIndex()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onMatchList()
    {
        let params=this.postData
        params.matches = await GMatchSer.gets()
        params.count=params.matches.length
        params.page = 1
        params.total_page = 1
        return this.showJson(params)
    }
    @AdminValidate
    showMatchins()
    {
        this.show()
    }
    @JsonCreatorValidate
    async onMatchinsList()
    {
        let params=this.postData
        let page=params.page||0
        let page_count=20
        var where = {state:{"$ne":EMatchState.Cancel},"$or":[{state:{"$ne":EMatchState.End}},{player_num:{"$gt":0}}]}
        params.matches = await GMatchInsSer.gets({id:1,"match.name":1,start_time:1,player_num:1,state:1},where,{start_time:-1},page*page_count,page_count)
        params.count=await GMatchInsSer.countDocuments(where)
        params.page=page+1
        params.total_page = Math.ceil(params.count/page_count)
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onMatchRanks()
    {
        let ins_id = this.postData.ins_id
        if(!ins_id)
        {
            this.showJson({players:[]})
            return
        }
        let rankinfo = await GMatchInsSer.getMatchRewards(ins_id)
        let players = rankinfo.players
        if(players.length==0)
        {
            this.showJson({players})
            return
        }
        let ids:number[] = []
        for(let i=0;i<players.length;++i)
        {
            ids.push(players[i].id)
        }
        let users = await GExtUserSer.gets({id:1,account_id:1,phone:1},{id:{"$in":ids}})
        let uid_aid={}
        let account_ids:number[]=[]
        for(let i=0;i<users.length;++i)
        {
            uid_aid[users[i].id]=users[i].account_id
            account_ids.push(users[i].account_id)
        }
        
        let accounts = await GExtAccountSer.gets({id:1,phone:1},{id:{"$in":account_ids}})
        let aid_phone={}
        for(let i=0;i<accounts.length;++i)
        {
            aid_phone[accounts[i].id]=accounts[i].phone
        }
        for(let i=0;i<players.length;++i)
        {
            let p = players[i]
            let aid = uid_aid[p.id]
            if(aid)
            {
                p["phone"]=aid_phone[aid]
            }
        }
        this.showJson({players})
    }
    @JsonCreatorValidate
    async onRemove()
    {
        let params = this.postData
        let match_id = parseInt(params.match_id)
        let sr = await GMatchSer.deleteOne({id:match_id})
        this.showJson({})
        GSubRedisSer.publish({cmd:"removematch",match_id:match_id})
    }
    @JsonCreatorValidate
    async onUpdate()
    {
        let params=this.postData
        let match = params.match as MatchModel
        match.id = parseInt(match.id+"")
        match.looptype = parseInt(match.looptype+"")
        match.blind_id = parseInt(match.blind_id+"")
        match.club_id = parseInt(match.club_id+"")
        match.coin = parseInt(match.coin+"")
        match.match_starttime = parseInt(match.match_starttime+"")
        match.reenter_blind_index = parseInt(match.reenter_blind_index+"")
        match.reenter_count = parseInt(match.reenter_count+"")
        match.dynamic_reward = parseInt(match.dynamic_reward+"")
        match.open = parseInt(match.open+"")
        match.end_player = parseInt(match.end_player+"")
        match.min_user = 2
        match.max_user = 999
        match.des=match.name
        if(!core.isArray(match.signup_cost)||!core.isArray(match.reward))
        {
            this.showJson({errcode:EErrorCode.Wrong_Params})
            return
        }
        try
        {
            for(let i=0;i<match.signup_cost.length;++i)
            {
                let sc = match.signup_cost[i]
                sc.id = parseInt(sc.id+"")
                sc.count = parseInt(sc.count+"")
            }
            for(let i=0;i<match.reward.length;++i)
            {
                let rd = match.reward[i]
                rd.id = parseInt(rd.id+"")
                rd.count = parseInt(rd.count+"")
            }
        }
        catch(e)
        {
            this.showJson({errcode:EErrorCode.Wrong_Params})
            return
        }
        let sr = await GMatchSer.updateOne(match,{id:match.id})
        this.showJson({match})
        GSubRedisSer.publish({cmd:"updatematch",match_id:match.id})
    }
    @JsonCreatorValidate
    async onAdd()
    {
        let params=this.postData
        let match = params.match as MatchModel
        match.id = _.random(10000,99999)
        while(true)
        {
            let m = await GMatchSer.get({id:1},{id:match.id})
            if(!m)
            {
                break
            }
            match.id = _.random(10000,99999)
        }
        match.club_id = parseInt(match.club_id+"")
        match.looptype = parseInt(match.looptype+"")
        match.blind_id = parseInt(match.blind_id+"")
        match.coin = parseInt(match.coin+"")
        match.match_starttime = parseInt(match.match_starttime+"")
        match.reenter_blind_index = parseInt(match.reenter_blind_index+"")
        match.reenter_count = parseInt(match.reenter_count+"")
        match.dynamic_reward = parseInt(match.dynamic_reward+"")
        match.open = parseInt(match.open+"")
        match.create_time=Date.now()
        match.end_player = parseInt(match.end_player+"")
        match.min_user = 2
        match.max_user = 999
        match.create_time=Date.now()
        match.des=match.name
        if(!core.isArray(match.signup_cost)||!core.isArray(match.reward))
        {
            this.showJson({errcode:EErrorCode.Wrong_Params})
            return
        }
        try
        {
            for(let i=0;i<match.signup_cost.length;++i)
            {
                let sc = match.signup_cost[i]
                sc.id = parseInt(sc.id+"")
                sc.count = parseInt(sc.count+"")
            }
            for(let i=0;i<match.reward.length;++i)
            {
                let rd = match.reward[i]
                rd.id = parseInt(rd.id+"")
                rd.count = parseInt(rd.count+"")
            }
        }
        catch(e)
        {
            this.showJson({errcode:EErrorCode.Wrong_Params})
            return
        }
        await GMatchSer.updateOne(match,{id:match.id},true)
        this.showJson({match:match})
    }
}