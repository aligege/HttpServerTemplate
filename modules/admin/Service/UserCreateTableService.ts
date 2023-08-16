import { GRedisMgr } from 'cgserver';
/*
    用来记录角色创建的桌子关联，方便首页出来之后还能看见自己创建了哪些桌子
*/
export let GUserCreateTableService:UserCreateTableService=null 
class UserCreateTableService
{
    add(user_id,table_id)
    {
        return GRedisMgr.hset("table_user_create_table_"+user_id,table_id,1)
    }
    remove(user_id,table_id)
    {
        return GRedisMgr.hdel("table_user_create_table_"+user_id,table_id)
    }
    async getAll(user_id)
    {
        let list = []
        let map = await GRedisMgr.hgetall("table_user_create_table_"+user_id)
        if(!map)
        {
            return
        }
        let muti = GRedisMgr.multi()
        for(let table_id in map)
        {
            muti.hgetall("table_table_"+table_id)
        }
        let temp_list = await GRedisMgr.exec(muti)
        temp_list = temp_list||[]
        for(let item of temp_list)
        {
            if(item)
            {
                list.push(item)
            }
        }
        let removes=[]
        for(let table_id in map)
        {
            let find = false
            for(let item of list)
            {
                if(item.table_id==table_id)
                {
                    find = true
                    break
                }
            }
            if(!find)
            {
                removes.push(table_id)
            }
        }
        for(let table_id of removes)
        {
            this.remove(user_id,table_id)
        }
        return list
        
    }
}
GUserCreateTableService = new UserCreateTableService()