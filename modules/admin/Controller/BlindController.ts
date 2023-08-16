import { BaseAdminController } from './BaseAdminController';
import { AdminValidate } from 'cgserver';
import { BlindItem, BlindModel, GBlindSer } from '../Service/BlindService';
import { GSubRedisSer } from '../Net/SubRedisServer';

export class BlindController extends BaseAdminController
{
    @AdminValidate
    async showIndex()
    {
        return this.show()
    }
    @AdminValidate
    async onList()
    {
        let blinds=await GBlindSer.gets()
        return this.showJson({blinds})
    }
    @AdminValidate
    async onModify()
    {
        let id = this.postData.id
        let items:BlindItem[] = this.postData.items
        for(let i=0;i<items.length;++i)
        {
            let item = items[i]
            item.level=parseInt(item.level+"")
            item.small_blind=parseInt(item.small_blind+"")
            item.big_blind=parseInt(item.big_blind+"")
            item.ante=parseInt(item.ante+"")
            item.seconds=parseInt(item.seconds+"")
        }
        let rs = await GBlindSer.updateOne({items},{id:id})
        this.showJson({errcode:rs.errcode,blind:{id,items}})
        if(!rs.errcode)
        {
            GSubRedisSer.publish({cmd:"updateblind",blind_id:id})
        }
    }
    @AdminValidate
    async onAdd()
    {
        let id = parseInt(this.postData.id)
        let items:BlindItem[] = this.postData.items
        for(let i=0;i<items.length;++i)
        {
            let item = items[i]
            item.level=parseInt(item.level+"")
            item.small_blind=parseInt(item.small_blind+"")
            item.big_blind=parseInt(item.big_blind+"")
            item.ante=parseInt(item.ante+"")
            item.seconds=parseInt(item.seconds+"")
        }
        let model = new BlindModel()
        model.id=id
        model.items=items
        let bm = await GBlindSer.getById(id)
        if(bm)
        {
            this.showJson({errcode:{id:10086,des:"id冲突"}})
            return
        }
        let rs = await GBlindSer.insert(model)
        this.showJson({errcode:rs.errcode,blind:model})
    }
}