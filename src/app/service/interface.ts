/**
 * 查詢分享資訊需要帶出的資訊
 */
export interface IReqShareInfo {
    //給後端查詢的objectId
    objectId: string
}

/**
 * 後端返回的分享資訊
 */
export interface IRespSahreInfo {
    title: string,
    imageUrl: string,
    targetUrl: string,
    description?: string,
}

