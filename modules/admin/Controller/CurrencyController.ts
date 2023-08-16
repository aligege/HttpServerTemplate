import { ECrystalWhy,GCurrencyService } from '../Service/CurrencyService';
import { BaseAdminController } from './BaseAdminController';
import { AdminValidate } from 'cgserver';
export class CurrencyController extends BaseAdminController
{
    @AdminValidate
    async showGame()
    {
        return this.show()
    }
    @AdminValidate
    async onGetGame()
    {
        let list = await GCurrencyService.getAnalysis(ECrystalWhy.Game)
        this.showJson(list)
    }
    @AdminValidate
    async showCharge()
    {
        return this.show()
    }
    async onGetCharge()
    {
        let list = await GCurrencyService.getAnalysis(ECrystalWhy.FromCharge)
        this.showJson(list)
    }
    @AdminValidate
    async showShare()
    {
        return this.show()
    }
    @AdminValidate
    async onGetShare()
    {
        let list = await GCurrencyService.getAnalysis(ECrystalWhy.ShareZS)
        this.showJson(list)
    }
}