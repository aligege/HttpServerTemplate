import { BaseAdminController } from './BaseAdminController';
import { AdminValidate,JsonCreatorValidate } from 'cgserver';
import { GServerSer, ServerItem, ServerModel } from '../Service/ServerService';
import { EErrorCode } from '../Config/_error_';

export class ServerController extends BaseAdminController
{
    @AdminValidate
    async showIndex()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onServerList()
    {
        let params=this.postData
        let sm:ServerModel[] = await GServerSer.gets()
        params.servers = sm[0].servers
        params.count=params.servers.length
        params.page = 1
        params.total_page = 1
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onUpdateState()
    {
        let params=this.postData
        let server_id = params.server_id
        let is_show = params.is_show
        let sr = await GServerSer.updateOne({"servers.$.is_show":is_show},{"servers.id":server_id})
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
        let server_id = params.server_id
        let sr = await GServerSer.updateOne({"$pull":{"servers":{id:server_id}}},{id:1})
        this.showJson({})
    }
    @JsonCreatorValidate
    async onUpdate()
    {
        let params=this.postData
        let server = params.server
        let sr = await GServerSer.updateOne({"$set":server},{id:1,"servers.id":server.id})
        this.showJson({server:server})
    }
    @JsonCreatorValidate
    async onAdd()
    {
        let params=this.postData
        let server = params.server
        let si = new ServerItem()
        si.id=await GServerSer.getNextId()
        si.sort_num=server.sort_num
        si.host=server.host
        si.port=server.port
        si.name=server.name
        si.info=server.info
        si.is_show=server.is_show
        si.state=1 // 1绿色流畅 2黄色普通 3红色拥挤 4紫色爆满
        si.create_time=Date.now()
        await GServerSer.updateOne({"$push":{"servers":si}},{id:1},true)
        this.showJson({server:server})
    }
}