import { AdminValidate, JsonCreatorValidate } from 'cgserver';
import { EErrorCode } from '../Config/_error_';
import { AdModel, GAdService } from '../Service/AdService';
import { GNewsSer, NewsModel } from '../Service/NewsService';
import { BaseAdminController } from './BaseAdminController';

export class AdNewsController extends BaseAdminController
{
    @AdminValidate
    async showAd()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onAdList()
    {
        let params=this.postData
        params.items = await GAdService.gets(null,null,{create_time:-1})
        params.count=params.items.length
        params.page = 1
        params.total_page = 1
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onUpdateAdState()
    {
        let params=this.postData
        let _id = params._id
        let open = parseInt(params.open)||0
        let sr = await GAdService.updateOne({open},{_id:_id})
        if(sr.errcode||sr.rs.modifiedCount)
        {
            this.showJson({errcode:EErrorCode.Handle_Failed})
            return
        }
        this.showJson({})
    }
    @JsonCreatorValidate
    async onRemoveAd()
    {
        let params=this.postData
        let _id = params._id
        let rs = await GAdService.deleteOne({_id:_id})
        this.showJson({errcode:rs.errcode})
    }
    @JsonCreatorValidate
    async onUpdateAd()
    {
        let params=this.postData
        let item = params.item as AdModel
        item.open=parseInt(item.open+"")
        let sr = await GAdService.updateOne(item,{_id:item._id})
        this.showJson({item})
    }
    @JsonCreatorValidate
    async onAddAd()
    {
        let params=this.postData
        let am = params.item as AdModel
        am.open=parseInt(am.open+"")
        am.create_time=Date.now()
        let rs = await GAdService.insert(am)
        am._id=rs.rs.insertedId
        this.showJson({item:am})
    }
    @JsonCreatorValidate
    async onChangeStateAd()
    {
        let params=this.postData
        let _id = params._id
        let open = params.open||0
        let rs = await GAdService.updateOne({open},{_id:_id})
        this.showJson({errcode:rs.errcode})
    }
    @AdminValidate
    async showNews()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onNewsList()
    {
        let params=this.postData
        params.items = await GNewsSer.gets(null,null,{create_time:-1})
        params.count=params.items.length
        params.page = 1
        params.total_page = 1
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onUpdateNewsState()
    {
        let params=this.postData
        let _id = params._id
        let open = parseInt(params.open)||0
        let sr = await GNewsSer.updateOne({open},{_id:_id})
        if(sr.errcode||sr.rs.modifiedCount)
        {
            this.showJson({errcode:EErrorCode.Handle_Failed})
            return
        }
        this.showJson({})
    }
    @JsonCreatorValidate
    async onRemoveNews()
    {
        let params=this.postData
        let _id = params._id
        let sr = await GNewsSer.deleteOne({_id:_id})
        this.showJson({})
    }
    @JsonCreatorValidate
    async onUpdateNews()
    {
        let params=this.postData
        let nm = params.item as NewsModel
        nm.open=parseInt(nm.open+"")
        let sr = await GNewsSer.updateOne(nm,{_id:nm._id})
        this.showJson({item:nm})
    }
    @JsonCreatorValidate
    async onAddNews()
    {
        let params=this.postData
        let nm = params.item as NewsModel
        nm.open=parseInt(nm.open+"")
        nm.create_time=Date.now()
        let rs = await GNewsSer.insert(nm)
        nm._id=rs.rs.insertedId
        this.showJson({item:nm})
    }
    @JsonCreatorValidate
    async onChangeStateNews()
    {
        let params=this.postData
        let _id = params._id
        let open = params.open||0
        let rs = await GNewsSer.updateOne({open},{_id:_id})
        this.showJson({errcode:rs.errcode})
    }
}