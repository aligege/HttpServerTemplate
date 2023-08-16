import { BaseAdminController } from './BaseAdminController';
import { AdminValidate,GHttpTool } from 'cgserver';
import { GMarqueeSer, MarqueeModel } from '../Service/MarqueeService';
import { GBulletinSer, BulletinModel } from '../Service/BulletinService';
import { GConfigSer } from '../Service/ConfigService';

export class NoticeController extends BaseAdminController
{
    @AdminValidate
    async showMarquee()
    {
        this.show()
    }
    @AdminValidate
    async onMarqueeList()
    {
        let params = this.postData
        let mq_list=await GMarqueeSer.gets()
        this.showJson({mq_list})
    }
    @AdminValidate
    async onAddMarquee()
    {
        let params = this.postData
        let mq = new MarqueeModel()
        mq.title=params.title
        mq.content=params.content
        mq.start_time=params.start_time
        mq.end_time=params.end_time
        let rs=await GMarqueeSer.insert(mq)
        if(rs.errcode)
        {
            this.showJson({err:"添加跑马灯失败"})
            return
        }
        let cfg = await GConfigSer.get({game_name:"hall"})
        if(cfg&&cfg.svr_str&&cfg.svr_str.host&&cfg.svr_str.gmport)
        {
            GHttpTool.httpPost("http://"+cfg.svr_str.host+":"+cfg.svr_str.gmport+"/hall/gm/marquee",{id:mq.id})
        }
        this.showJson({mq:mq})
    }
    @AdminValidate
    async onUpdateMarquee()
    {
        let params = this.postData
        let mq = new MarqueeModel()
        mq.id=params.id
        mq.title=params.title
        mq.content=params.content
        mq.start_time=params.start_time
        mq.end_time=params.end_time

        let rs=await GMarqueeSer.updateOne(mq,{id:params.id})
        if(rs.errcode)
        {
            this.showJson({err:rs.errcode.des})
            return
        }
        mq = await GMarqueeSer.get(params.id)
        let cfg = await GConfigSer.get({game_name:"hall"})
        if(cfg&&cfg.svr_str&&cfg.svr_str.host&&cfg.svr_str.gmport)
        {
            GHttpTool.httpPost("http://"+cfg.svr_str.host+":"+cfg.svr_str.gmport+"/hall/gm/marquee",{id:mq.id})
        }
        this.showJson({mq})
    }
    @AdminValidate
    async onRemoveMarquee()
    {
        let params = this.postData
        let err = await GMarqueeSer.deleteOne({id:params.id})
        if(err)
        {
            this.showJson({err:err})
            return
        }
        let cfg = await GConfigSer.get({game_name:"hall"})
        if(cfg&&cfg.svr_str&&cfg.svr_str.host&&cfg.svr_str.gmport)
        {
            GHttpTool.httpPost("http://"+cfg.svr_str.host+":"+cfg.svr_str.gmport+"/hall/gm/marquee",{id:params.id})
        }
        this.showJson({id:params.id})
    }
    @AdminValidate
    async showBulletin()
    {
        this.show()
    }
    @AdminValidate
    async onBulletinList()
    {
        let params = this.postData
        let bt_list=await GBulletinSer.gets()
        this.showJson({bt_list})
    }
    @AdminValidate
    async onAddBulletin()
    {
        let params = this.postData
        let bt = new BulletinModel()
        bt.id=await GBulletinSer.getNextId(),
        bt.title=params.title
        bt.content=params.content
        bt.start_time=params.start_time
        bt.end_time=params.end_time
        let rs=await GBulletinSer.insert(bt)
        if(rs.errcode)
        {
            this.showJson({err:"添加公告失败"})
            return
        }
        bt._id=rs.rs.insertedId
        this.showJson({bt})
    }
    @AdminValidate
    async onUpdateBulletin()
    {
        let params = this.postData
        let bt = 
        {
            id:params.id,
            title:params.title,
            content:params.content,
            start_time:params.start_time,
            end_time:params.end_time
        }
        let rs=await GBulletinSer.updateOne(bt,{id:params.id})
        if(rs.errcode)
        {
            this.showJson({err:rs.errcode.des})
            return
        }
        bt = await GBulletinSer.getById(params.id)
        this.showJson({bt})
    }
    @AdminValidate
    async onRemoveBulletin()
    {
        let params = this.postData
        let rs = await GBulletinSer.deleteOne({id:params.id})
        if(rs.errcode)
        {
            this.showJson({err:rs.errcode.des})
            return
        }
        this.showJson({id:params.id})
    }
}