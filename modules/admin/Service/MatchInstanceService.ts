import { MongoBaseService,MongoBaseModel } from "cgserver";
import _ from "underscore";
import { ExtUserModel } from "./ExtUserService";
import { GMatchSer, MatchModel } from "./MatchService";

export class MatchPlayer
{
    user_id=-1      //用户id
    nickname=""     //名称
    logo=""         //头像
    sex=-1          //性别
    ip=""           //登陆ip
    point=0         //当前分数
    reenter_time=0
    reward:MatchPlayer=null
    constructor(user:ExtUserModel)
    {
        this.user_id=user.id
        this.nickname=user.nickname
        this.logo=user.logo
        this.sex=user.sex
        this.ip=""
    }
}
export enum EMatchState
{
    Waiting,
    Playing,
    PlayingEnd,
    Cancel,
    End
}
export class MatchInsModel extends MongoBaseModel
{
    //instance_id match_id+"_"+time
    id=""
    match_id=0
    /**
     * 这个是用来记录的，开赛的时候在赋值，
     */
    match:MatchModel=null
    start_time=0
    end_time=0
    players:MatchPlayer[]=[]
    blind_level=0//当前的盲注级别
    state=EMatchState.Waiting
}
export class CreateMatchInsInfo
{
    id=""
    start_time=0
    match_id=0
}
export class PlayerInfo
{
    id=-1           //用户id
    nickname=""     //名称
    logo=""         //头像
    sex=-1          //性别
    ip=""           //登陆ip
    with_point=0    //带入分数
    point=0         //当前分数
    crystal=0
    is_robot=0
}
export class MatchInsService extends MongoBaseService<MatchInsModel>
{
    async getMatchRankInfo(ins_id:string,skip=0,limit=1000)
    {
        let datas = await this.aggregate(<any>[
            {"$match":{id: ins_id}}
            ,{"$project":{data: {"$objectToArray": "$players"},player_num:1}}
            ,{"$project":{items:"$data.v",player_num:1}}
            ,{"$unwind":"$items"}
            ,{"$sort":{"items.point":-1,"items.drop_time":-1}}
            ,{"$skip":skip}
            ,{"$limit":limit}
            ]).toArray()
        let rankinfo={ins_id:ins_id,player_num:0,players:<PlayerInfo[]>[]}
        if(datas.length<=0)
        {
            return rankinfo
        }
        rankinfo.player_num=datas[0].player_num
        for(let i=0;i<datas.length;++i)
        {
            rankinfo.players.push(datas[i].items)
        }
        return rankinfo
    }
    async getMatchRewards(ins_id:string)
    {
        let datas = await this.aggregate(<any>[
            {"$match":{id: ins_id}}
            ,{"$project":{data: {"$objectToArray": "$players"},player_num:1}}
            ,{"$project":{items:"$data.v",player_num:1}}
            ,{"$unwind":"$items"}
            ,{"$match":{"$exists":{"items.reward":1}}}
            ,{"$sort":{"items.rank":1}}
            ]).toArray()
        let rankinfo={ins_id:ins_id,player_num:0,players:<PlayerInfo[]>[]}
        if(datas.length<=0)
        {
            return rankinfo
        }
        rankinfo.player_num=datas[0].player_num
        for(let i=0;i<datas.length;++i)
        {
            rankinfo.players.push(datas[i].items)
        }
        return rankinfo
    }
}
export let GMatchInsSer=new MatchInsService("match_ins",MatchInsModel)