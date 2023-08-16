import { core, GServerCfg } from "cgserver"
import { RedisManager } from "cgserver"
import { GLog } from "cgserver"
import _, { uniqueId } from "underscore"
import { EErrorCode } from "../Config/_error_"
export class PSReturn
{
    cmd:string
    _id:string
    ret:any
    return:boolean
    errcode:{id:number,des:string}
}
export let GPSRedisTool:PSRedisTool=null
class PSRedisTool
{
    protected _publishRedisMgr:RedisManager=null
    protected _subscribeMgr:RedisManager=null
    async init()
    {
        this._publishRedisMgr = new RedisManager()
        this._subscribeMgr= new RedisManager()
        await this._publishRedisMgr.init(GServerCfg.db.redis)
        await this._subscribeMgr.init(GServerCfg.db.redis)
    }
    onMessage(cb:Function)
    {
        this._subscribeMgr.on("message",cb)
    }
    async publish(channel:string,msg:string)
    {
        let ret = await this._publishRedisMgr.publish(channel,msg)
        return ret
    }
    async subscribe(channel:string)
    {
        let ret = await this._subscribeMgr.subscribe(channel)
        return ret
    }
}
GPSRedisTool = new PSRedisTool()

export class BaseSubRedis
{
    protected _sub_channel="hall"
    protected _pub_channel="texas"
    protected _id_cbs:{[_id:string]:Function}={}
    //是否把消息输出到文件日志
    protected _msg2file=false
    async init()
    {
        await GPSRedisTool.init()
        GPSRedisTool.subscribe(this._sub_channel)
        GPSRedisTool.onMessage(this.onMessage.bind(this))
    }
    async onMessage(channel:string,msg:string)
    {
        let jsonData = JSON.parse(msg)
        if(jsonData._id&&this._id_cbs[jsonData._id])
        {
            let func = this._id_cbs[jsonData._id]
            delete this._id_cbs[jsonData._id]
            if(func)
            {
                core.safeCall(func,null,jsonData)
            }
            return
        }
        if(jsonData.return)
        {
            //订阅者的返回消息，返回到了不正确的发布者身上（redis多发布，多监听）
            return
        }
        let cmd:string = jsonData.cmd
        if(!cmd)
        {
            GLog.error(" subredis no cmd:"+msg)
            return
        }
        cmd = cmd.toLowerCase()
        let func = this["on"+cmd]
        if(func)
        {
            let ret = await core.safeCall(func,this,jsonData)
            let msg:{cmd:string,_id:string,ret:any,return:boolean} = jsonData
            msg.ret=ret
            msg.return=true
            this.publish(msg)
        }
        else
        {
            //大概率是订阅者的返回消息，返回到了不正确的发布者身上（redis多发布，多监听）
            return
        }
    }

    protected _getNewMsg(cmd:string,_id?:string)
    {
        let msg:any=
        {
            _id:_id||_.uniqueId(),
            cmd:cmd
        }
        return msg
    }
    async publish(msg:any,channel?:string):Promise<PSReturn>
    {
        if(!core.isObject(msg))
        {
            GLog.error("redis pub msg must be an object")
            msg.errcode={id:1008611,des:"redis pub msg must be an object"}
            return
        }
        if(!msg.cmd||!core.isString(msg.cmd))
        {
            GLog.error("redis pub msg must have cmd(string)")
            msg.errcode={id:1008612,des:"redis pub msg must have cmd(string)"}
            return msg
        }

        GLog.info("sub send------------")
        //GLog.info(msg,msg.cmd!="round")
        if(this._msg2file)
        {
            GLog.info({des:"pspublish",msg})
        }
        //原本回给别人的消息，没必要回调
        if(msg._id)
        {
            let _msg = JSON.stringify(msg)
            GPSRedisTool.publish(channel??this._pub_channel,_msg)
            return msg
        }
        //主动发出去的消息
        return new Promise((resolve,reject)=>
        {
            msg._id=_.uniqueId()+"_"+_.random(1008611,9999999)
            let handler = setTimeout(()=>
            {
                let error = {errcode:EErrorCode.Handle_Failed}
                let func = this._id_cbs[msg._id]
                delete this._id_cbs[msg._id]
                if(func)
                {
                    core.safeCall(func,null,error)
                }
            },3000)
            this._id_cbs[msg._id]=(jsonData)=>
            {
                resolve(jsonData)
                clearTimeout(handler)
            }
            let _msg = JSON.stringify(msg)
            GPSRedisTool.publish(channel??this._pub_channel,_msg)
        })
    }
}