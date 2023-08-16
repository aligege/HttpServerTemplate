export namespace ns_admin
{
    export enum ETableType
    {
        Friend=0,//自建
        Score,//积分
        ClubFriend,//俱乐部自建
    }

    export enum EFeeType
    {
        Free=1,//免费
        AA,//AA制
        Creator,//房主付费
        Club,//俱乐部基金付费
    }

    export class ETableState
    {
        static WaitingGame=1//等待游戏开始
        static Prepare=2//准备阶段
        //
        static End=100//游戏结束
    }

    export enum EDismissResult
    {
        Dismiss,
        Waiting,
        Cancel,
        Error
    }

    export enum EPrepareTimeOutType
    {
        /**
         * 不做处理
         */
        None,
        /**
         * 踢出牌局
         */
        KickOut,
        /**
         * 自动准备
         */
        AutoPrepare
    }
}