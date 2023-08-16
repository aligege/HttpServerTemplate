/*!@preserve
* TinyTS     : Free Web,Native Server
* Copyright : muma <chengang01@live.com>
*/

import { GAdminServer } from "./modules/admin/AdminServer";
import { IWebServer } from "cgserver";
import { GBagSer } from "./modules/admin/Service/BagService";

GAdminServer.start()
let server:IWebServer=GAdminServer
for(let i=0;i<process.argv.length;++i)
{
    let str = process.argv[i]
    if(str.indexOf("@")==0)
    {
        process.title = str
        break
    }
}

setTimeout(()=>
{
},5000)