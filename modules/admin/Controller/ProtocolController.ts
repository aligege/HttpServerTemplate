import { BaseAdminController } from './BaseAdminController';

export class ProtocolController extends BaseAdminController
{
    async showPrivacy()
    {
        return this.show()
    }
    async showUser()
    {
        return this.show()
    }
    async showSupport()
    {
        return this.show()
    }
    async showOfficial()
    {
        return this.show()
    }
}