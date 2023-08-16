import { SystemController } from "./Controller/SystemController";
import { UserController } from "./Controller/UserController";
import { LoginController } from './Controller/LoginController';
import { GAdminCfg } from './Config/AdminConfig';
import { IWebServer,GSmsTool,GCtrMgr } from 'cgserver';
import { ServerController } from "./Controller/ServerController";
import { MatchController } from "./Controller/MatchController";
import { ProtocolController } from "./Controller/ProtocolController";
import { ItemController } from "./Controller/ItemController";
import { ClubController } from "./Controller/ClubController";
import { GSubRedisSer } from "./Net/SubRedisServer";
import { OrderController } from "./Controller/OrderController";
import { AdNewsController } from "./Controller/AdNewsController";
import { BlindController } from "./Controller/BlindController";
import { VideoController } from "./Controller/VideoController";

//实现对controller的手动注册
export let GAdminServer:AdminServer=null
class AdminServer extends IWebServer
{
    constructor()
    {
        super()
        GAdminServer = this
    }
    start()
    {
        GAdminCfg.init()
        GSmsTool.init()
        GSubRedisSer.init()
        return super.start(GAdminCfg.webserver)
    }
    /**
     * 注册控制器
     * eg:GControllerMgr.registerController("Admin","System",SystemController)
     */
    protected _registerController()
    {
        GCtrMgr.registerController("Admin","System",SystemController)
        GCtrMgr.registerController("Admin","User",UserController)
        GCtrMgr.registerController("Admin","Login",LoginController)
        GCtrMgr.registerController("Admin","Server",ServerController)
        GCtrMgr.registerController("Admin","Match",MatchController)
        GCtrMgr.registerController("Admin","Protocol",ProtocolController)
        GCtrMgr.registerController("Admin","Item",ItemController)
        GCtrMgr.registerController("Admin","Club",ClubController)
        GCtrMgr.registerController("Admin","Order",OrderController)
        GCtrMgr.registerController("Admin","AdNews",AdNewsController)
        GCtrMgr.registerController("Admin","Blind",BlindController)
        GCtrMgr.registerController("Admin","Video",VideoController)
    }
    protected _registerRouter()
    {

    }
}
new AdminServer()