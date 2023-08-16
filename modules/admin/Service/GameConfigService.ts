import { GRedisMgr } from 'cgserver';
import * as _ from "underscore"

export let GGameConfigSer:GameConfigService = null
class GameConfigService
{
    async get(game_name)
    {
        let config = await GRedisMgr.get("gameconfig_"+game_name)
        config = JSON.parse(config)
        return config
    }
    async getByList(games)
    {
        let list = new Array<any>()
        for(let i=0;i<games.length;++i)
        {
            let config = await this.get(games[i])
            list.push({name:games[i],list:config})
        }
        return list
    }
    update(game_name,config:string)
    {
        GRedisMgr.set("gameconfig_" + game_name, config)
    }
}
GGameConfigSer=new GameConfigService()