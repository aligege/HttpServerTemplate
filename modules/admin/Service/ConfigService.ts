import { MongoBaseModel,MongoBaseService } from "cgserver";

export class ConfigModel extends MongoBaseModel
{
    id:number=-1
    game_name:string=""
    game_str:string=""
    svr_str:string=""
    create_time:number=0
}
export let GConfigSer:ConfigService=null
class ConfigService extends MongoBaseService<ConfigModel>
{
}
GConfigSer = new ConfigService("config",ConfigModel)