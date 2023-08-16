import { BaseSubRedis } from "./PSRedisTool";

class SubRedisServer extends BaseSubRedis
{
    constructor()
    {
        super()
        this._sub_channel="texas"
        this._pub_channel="hall"
    }
}
export let GSubRedisSer=new SubRedisServer()