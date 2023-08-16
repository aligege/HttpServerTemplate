import { FrameworkConfig, WebServerConfig,GLog, ServerConfig } from "cgserver";
export class SlotGame
{
    id=-1
    name=""
    show_name=""
    show_tip=""
    is_vip_room=false
    jackpot_config:Array<number>=null
    unlock_lvl=-1
    priority=-1
    type=-1
    status=-1
    line=-1
    degree=-1
    icon_name=""
    bet_option:Array<number>=null
    ext_bet_percent:Array<number>=null
}
export let GAdminCfg:AdminConfig = null
class AdminConfig extends ServerConfig
{
    webserver:WebServerConfig=null
    protected games:Map<string,SlotGame>=null
    getGame(room_level:number):SlotGame
    {
        let game = this.games[room_level]
        if(!game)
        {
            GLog.error("no game cfg room_level="+room_level)
        }
        return game
    }
    get allGames()
    {
        return this.games
    }
}
GAdminCfg = new AdminConfig("Admin")