import { GRedisMgr } from 'cgserver';
import * as _ from "underscore"

export class GameStatisticsModel
{
    game_name:string=""//游戏名称
    game_code:number=-1//唯一编码，可能有多个服务器同时运行
    total_num:0//当前在线人数，延迟更新
    room_0:0
    room_1:0
    room_2:0
    room_3:0
    room_4:0
    room_5:0
    room_6:0
}
export let GGameStatisticsSer:GameStatisticsService =null
class GameStatisticsService
{
    async get(game_name)
    {
        let gsm = <GameStatisticsModel>await GRedisMgr.hgetall("gamestatistics_"+game_name)
        return gsm
    }
    async getByList(game_names)
    {
        let list=new Array<GameStatisticsModel>()
        let p_list=[]
        for(let i=0;i<game_names.length;++i)
        {
            let name = game_names[i]
            p_list.push(this.get(name))
        }
        for(let i=0;i<p_list.length;++i)
        {
            let gsm = await p_list[i]
            if(gsm)
            {
                list.push(gsm)
            }
        }
        return list
    }
    update(gsm:GameStatisticsModel)
    {
        GRedisMgr.hmset("gamestatistics_" + gsm.game_name, gsm)
    }
}
GGameStatisticsSer=new GameStatisticsService()