import { MongoBaseService } from "cgserver";
import { MongoBaseModel } from "cgserver";
import { GCacheTool } from "cgserver";
import _ from "underscore";

export class BlindItem
{
    level=0
    small_blind=0
    big_blind=0
    ante=0
    seconds=0
}
export class BlindModel extends MongoBaseModel
{
    id=0
    items=new Array<BlindItem>()
}
export let GBlindSer:BlindService=null
export class BlindService extends MongoBaseService<BlindModel>
{
}
GBlindSer=new BlindService("blind",BlindModel)