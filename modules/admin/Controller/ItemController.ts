import { BaseAdminController } from './BaseAdminController';
import { AdminValidate,JsonCreatorValidate } from 'cgserver';
import { EErrorCode } from '../Config/_error_';
import { GItemCfgSer, ItemCfgItem } from '../Service/Config/ItemCfgService';
import { BagItemItem, GBagSer } from '../Service/BagService';
import * as _ from "underscore";

export class ItemController extends BaseAdminController
{
    @AdminValidate
    async showIndex()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onItemList()
    {
        let params=this.postData
        params.items = await GItemCfgSer.gets()
        params.count=params.items.length
        params.page = 1
        params.total_page = 1
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onUpdateState()
    {
        let params=this.postData
        let item_id = params.item_id
        let open = params.open
        let sr = await GItemCfgSer.updateOne({open},{id:item_id})
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
        let item_id = parseInt(params.item_id)
        let sr = await GItemCfgSer.deleteOne({id:item_id})
        this.showJson({})
    }
    @JsonCreatorValidate
    async onUpdate()
    {
        let params=this.postData
        let item = params.item as ItemCfgItem
        item.id=parseInt(item.id+"")
        item.coin=parseInt(item.coin+"")
        item.cost_coin=parseInt(item.cost_coin+"")
        item.can_give=parseInt(item.can_give+"")||0
        item.can_exchange=parseInt(item.can_exchange+"")||0
        item.can_buy=parseInt(item.can_buy+"")||0
        let sr = await GItemCfgSer.updateOne(item,{id:item.id})
        this.showJson({item})
    }
    @JsonCreatorValidate
    async onAdd()
    {
        let params=this.postData
        let item = params.item as ItemCfgItem
        item.id = _.random(1000,9999)
        while(true)
        {
            let pre_item = await GItemCfgSer.get({id:1},{id:item.id})
            if(!pre_item)
            {
                break
            }
            item.id = _.random(1000,9999)
        }
        let ici = new ItemCfgItem()
        ici.id=item.id
        ici.type=item.type
        ici.coin=parseInt(item.coin+"")
        ici.cost_coin=parseInt(item.cost_coin+"")
        ici.can_give=parseInt(item.can_give+"")||0
        ici.can_exchange=parseInt(item.can_exchange+"")||0
        ici.can_buy=parseInt(item.can_buy+"")||0
        ici.name=item.name
        ici.icon=item.icon
        ici.des=item.des
        await GItemCfgSer.updateOne(ici,{id:ici.id},true)
        this.showJson({item:ici})
    }
    @AdminValidate
    async showExchange()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onExchangeList()
    {
        let params=this.postData
        let items = await GBagSer.getAllExchange()
        params.items = items
        params.count=params.items.length
        params.page = 1
        params.total_page = 1
        let itemcfgs:ItemCfgItem[] = await GItemCfgSer.gets()
        for(let i=0;i<items.length;++i)
        {
            let item_id=items[i].exitems.item_id
            for(let j=0;j<itemcfgs.length;++j)
            {
                if(itemcfgs[j].id==item_id)
                {
                    items[i].exitems["itemname"]=itemcfgs[j].name
                    break
                }
            }
        }
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onChangeExchange()
    {
        let params=this.postData
        let user_id = params.user_id
        let id = params.id
        let errcode = await GBagSer.changeExtState(user_id,id)
        return this.showJson({errcode})
    }
    @AdminValidate
    async showBag()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onGetAllBagItem()
    {
        let params=this.postData
        let user_id = params.user_id
        let page = params.page||0
        let page_num = params.page_num
        let items = await GBagSer.getAllBags(user_id,page*page_num,page_num)
        let itemcfgs:ItemCfgItem[] = await GItemCfgSer.gets()
        for(let i=0;i<items.length;++i)
        {
            let item_id=items[i].items.item_id
            for(let j=0;j<itemcfgs.length;++j)
            {
                if(itemcfgs[j].id==item_id)
                {
                    items[i].items["itemname"]=itemcfgs[j].name
                    break
                }
            }
        }
        let total = await GBagSer.getAllCount(user_id)
        return this.showJson({items,page:page+1,total_page:Math.ceil(total/page_num),count:total})
    }
}