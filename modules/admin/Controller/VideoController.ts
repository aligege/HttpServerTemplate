import { AdminValidate, JsonCreatorValidate } from 'cgserver';
import { EErrorCode } from '../Config/_error_';
import { GVideoSer, VideoModel } from '../Service/VideoService';
import { BaseAdminController } from './BaseAdminController';

export class VideoController extends BaseAdminController
{
    @AdminValidate
    async showVideo()
    {
        return this.show()
    }
    @JsonCreatorValidate
    async onVideoList()
    {
        let params=this.postData
        params.items = await GVideoSer.gets(null,null,{create_time:-1})
        params.count=params.items.length
        params.page = 1
        params.total_page = 1
        return this.showJson(params)
    }
    @JsonCreatorValidate
    async onUpdateVideoState()
    {
        let params=this.postData
        let _id = params._id
        let open = parseInt(params.open)||0
        let sr = await GVideoSer.updateOne({open},{_id:_id})
        if(sr.errcode||sr.rs.modifiedCount)
        {
            this.showJson({errcode:EErrorCode.Handle_Failed})
            return
        }
        this.showJson({})
    }
    @JsonCreatorValidate
    async onRemoveVideo()
    {
        let params=this.postData
        let _id = params._id
        let sr = await GVideoSer.deleteOne({_id:_id})
        this.showJson({})
    }
    @JsonCreatorValidate
    async onUpdateVideo()
    {
        let params=this.postData
        let nm = params.item as VideoModel
        nm.coin=parseInt(nm.coin+"")
        nm.sort=parseInt(nm.sort+"")
        nm.open=parseInt(nm.open+"")
        let sr = await GVideoSer.updateOne(nm,{_id:nm._id})
        this.showJson({item:nm})
    }
    @JsonCreatorValidate
    async onAddVideo()
    {
        let params=this.postData
        let nm = params.item as VideoModel
        nm.coin=parseInt(nm.coin+"")
        nm.sort=parseInt(nm.sort+"")
        nm.open=parseInt(nm.open+"")
        nm.create_time=Date.now()
        let rs = await GVideoSer.insert(nm)
        nm._id=rs.rs.insertedId
        this.showJson({item:nm})
    }
    @JsonCreatorValidate
    async onChangeStateVideo()
    {
        let params=this.postData
        let _id = params._id
        let open = params.open||0
        let rs = await GVideoSer.updateOne({open},{_id:_id})
        this.showJson({errcode:rs.errcode})
    }
}