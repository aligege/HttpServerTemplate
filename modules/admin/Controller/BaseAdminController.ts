import { ExtUserModel } from '../Service/ExtUserService';
import { MongoBaseUserController,ERoleGroup } from 'cgserver';

export class BaseAdminController extends MongoBaseUserController<ExtUserModel>
{
    get isCreator()
    {
        return this._self_user&&(this._self_user.role_group==ERoleGroup.Creator||this._self_user.role_group==5)
    }
    get isAdmin()
    {
        return this._self_user&&(this._self_user.role_group==ERoleGroup.Admin||this._self_user.role_group==ERoleGroup.Creator||this._self_user.role_group==5)
    }
}