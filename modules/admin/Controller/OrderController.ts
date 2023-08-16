import { BaseAdminController } from "./BaseAdminController";
import { AdminValidate } from "cgserver";
import { GCoinRecordSer } from "../Service/CoinRecordService";
import { GOrderSer } from "../Service/OrderService";

export class OrderController extends BaseAdminController
{
    @AdminValidate
    async showCoinRecords()
    {
        this.show()
    }
    @AdminValidate
    async onGetCoinRecords()
    {
        let params=this.postData
        let where=<any>{}
        if(params.room_id)
        {
            where.room_id=params.room_id
        }
        if(params.user_id)
        {
            where.user_id=params.user_id
        }
        if(params.game_name&&params.game_name!="all")
        {
            where.game_name=params.game_name
        }
        if(params.start_time)
        {
            where.create_time={$gte:params.start_time}
        }
        if(params.end_time)
        {
            where.create_time={$lte:params.end_time}
        }
        let page = params.page||0
        let num_per_page = params.page_num||20

        let p_total=GCoinRecordSer.countDocuments(where)
        let p_records=GCoinRecordSer.aggregate()
            .match(where)
            .sort({create_time:-1})
            .skip(page*num_per_page)
            .limit(num_per_page)
            .lookup({
                from:"user",
                localField:"user_id",
                foreignField:"id",
                as:"user"
            })
            .unwind("$user")
            .project({"user.nickname":1,id:1,user_id:1,pre_coin:1,aft_coin:1,coin:1,create_time:1,type:1}).toArray()

        params.coin_records = await p_records
        params.total_num = await p_total
        params.page = page+1
        params.total_page = Math.ceil(params.total_num/num_per_page)
        return this.showJson(params)
    }
    @AdminValidate
    async showOrderRecords()
    {
        let params=this.postData
        this.show(params)
    }
    @AdminValidate
    async onOrderRecords()
    {
        let params=this.postData
        let where=<any>{}
        if(params.state>=0)
        {
            where.state=params.state
        }
        if(params.user_id)
        {
            where.user_id=params.user_id
        }
        if(params.game_name&&params.game_name!="all")
        {
            where.game_name=params.game_name
        }
        if(params.start_time)
        {
            where.create_time={$gte:params.start_time}
        }
        if(params.end_time)
        {
            where.create_time={$lte:params.end_time}
        }
        let page = params.page||0
        let num_per_page = params.page_num||20

        let p_total=GOrderSer.countDocuments(where)
        let p_records=GOrderSer.aggregate()
            .match(where)
            .sort({create_time:-1})
            .skip(page*num_per_page)
            .limit(num_per_page)
            .lookup({
                from:"user",
                localField:"user_id",
                foreignField:"id",
                as:"user"
            })
            .unwind("$user")
            .project({"user.nickname":1,id:1,user_id:1,product_id:1,money:1,from:1,create_time:1,state:1}).toArray()

        params.order_records = await p_records
        params.total_num = await p_total
        params.page = page+1
        params.total_page = Math.ceil(params.total_num/num_per_page)
        return this.showJson(params)
    }
}