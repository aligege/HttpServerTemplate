import { BaseCfgModel, BaseCfgService } from "./BaseCfgService";
export enum EItemType
{
    ExchangeItem,
    PhoneFee,
    MatchItem
}
export class ItemCfgItem extends BaseCfgModel
{
    type=EItemType.ExchangeItem
    coin=0
    cost_coin=0
    name=""
    icon=""
    des=""
    //是否可以赠送
    can_give=0
    //是否可以兑换
    can_exchange=0
    //是否可以售卖
    can_buy=0
}
class ItemCfgService extends BaseCfgService<ItemCfgItem>
{
    
}
export let GItemCfgSer=new ItemCfgService("itemcfg",ItemCfgItem)
