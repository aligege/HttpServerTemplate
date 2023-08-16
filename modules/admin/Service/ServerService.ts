import { MongoBaseService } from "cgserver"
import { MongoBaseModel } from "cgserver"
import { GCacheTool } from "cgserver"
import _ from "underscore"

// 区域
export class ServerModel extends MongoBaseModel
{
    id: number = -1
    name: string = ""
    info: string = ""
    is_show: number = 1
    sort_num: number = 1
    create_time: number = Date.now()
    servers=new Array<ServerItem>()
}
// 服务器
export class ServerItem
{
    id: number = -1
    sort_num: number = -1
    host: string = ""
    port: number = -1
    gmhost: string = ""
    gmport: number = -1
    name: string = ""
    info: string = ""
    is_show: number = 1
    state: number = 1 // 1绿色流畅 2黄色普通 3红色拥挤 4紫色爆满
    create_time: number = Date.now()
}

export let GServerSer: ServerService = null
class ServerService extends MongoBaseService<ServerModel>
{
}
GServerSer = new ServerService("server",ServerModel)