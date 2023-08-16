import { GCgServer, MongoBaseModel, MongoBaseService } from "cgserver";
export class BaseCfgModel extends MongoBaseModel
{
    id:string|number
}
export class BaseCfgService<T extends BaseCfgModel> extends MongoBaseService<T>
{
}