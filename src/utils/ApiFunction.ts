import axios from 'axios';
import Header from './../home/top/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
let url = null;
if(process.env.NODE_ENV === 'production'){
    url = "https://com.kimokan.top:9193"
}else{
    url = "http://localhost:9193"
}

export const api = axios.create({
    baseURL: url
})

export const getHeaders = () : {
    Authorization: string;
} => {
    const token = localStorage.getItem('token')

    return {
        Authorization: `Bearer ${token}`
    }
}








export function isAuthenticated(){
    const token = localStorage.getItem('token')
    
    return !!token;
}

api.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response?.data.code === 400001){
        const navigate  = useNavigate();
    //   window.location.href = `/user/login?redirect=${redirectUrl}`
        navigate('/login')
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });


export async function addAnime({animeName,animeAlias,animeDescription,animeNumberOfSection,animePhoto,animeDate,animeCompany,animeDirectorName,animeVoiceActor,animeComicBookAuthor,animeTypeList,animeType} : API.Anime){
    
    // const formData = {
    //     videoName: animeName,
    //     videoAlias: animeAlias,
    //     videoDescription: animeDescription,
    //     videoNumberOfSections: animeNumberOfSection.toString(),
    //     photoFile: animePhoto,
    //     date: animeDate,
    //     videoAnimeCompany: animeCompany,
    //     videoDirectorName: animeDirectorName,
    //     videoVoiceActor: animeVoiceActor.join(","),
    //     videoComicBookAuthor: animeComicBookAuthor,
    //     animeTypeList: animeTypeList.join(","),
    //     animeType: animeType,
    // }
    const formData = new FormData();
        formData.append("videoName",animeName)
        formData.append("videoAlias",animeAlias)
        formData.append("videoDescription",animeDescription)
        formData.append("videoNumberOfSections",animeNumberOfSection.toString())
        formData.append("videoAnimeCompany",animeCompany)
        formData.append("videoDirectorName",animeDirectorName)
        formData.append("videoComicBookAuthor",animeComicBookAuthor)
        formData.append("videoVoiceActor",animeVoiceActor.join(","))
        formData.append("date",animeDate)
        formData.append("videoType",animeTypeList.join(","))
        formData.append("animeType",animeType)
        if(animePhoto){
            formData.append("photoFile",animePhoto)
        }
        const response = await api.post("/video/add/video",formData,{
            headers: getHeaders()
        });

        return response;

}   



export async function addAnimeLink({section,uuid,videoFile} : API.VideoInSection){
    const formData = new FormData();
        formData.append("videoId",uuid)
        formData.append("section",String(section))
        if(videoFile){
        formData.append("uploadFile",videoFile)
        }
        try {
            const response = await api.post("/video/add/url",formData,{
                headers: getHeaders()
            });

            return response.data
        } catch (error) {
            if(error instanceof Error){
                throw new Error(`网络请求错误：${error.message}`)
            }else{
                throw new Error(`连接失败`)
            }
        }
}   



export async function getVideoUrl(uuid:string,videoId:string){
    try {
        const response = await api.get(`video/getVideo/${uuid}/${videoId}`)
        return response.data;
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`网络请求错误：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function getRealVideoUrl(data: API.EncryptedUrlAndToken){
    try {
        const response = await api.post(`video/getVideoUrl`,data)
        return response.data;
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`网络请求错误：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}


export async function getVideoSection(uuid:string){
    try {
        const response = await api.get(`video/getVideoSection/${uuid}`)
        return response.data;
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`网络请求错误：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}


export async function deleteVideoById(videoId:string){
    try {
        const response = await api.delete(`/video/deleteVideo/${videoId}`);
        return response.data;
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`网络请求错误：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

// export async function getVideoById(videoId:string){
//     try {
//         const response = await api.get(`/video/get-video/${videoId}`)

//         return response.data;
//     } catch (error) {
//         if(error instanceof Error){
//             throw new Error(`网络请求错误：${error.message}`)
//         }else{
//             throw new Error(`连接失败`)
//         }
//     }
// }

export async function getVideoResponseInfoById(videoId:string){
    try {
        const response = await api.get(`/video/getVideoResponse/${videoId}`)

        return response.data;
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`网络请求错误：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function updateTheVideoById(videoId:string, video : API.Anime){
    try {
        
        const response = await api.put(`/video/updated/${videoId}`,JSON.stringify(video))

        return response.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`video id is null + ${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}


// export async function getAllVideoBySearch(searchTerm:string){
//     const data = {
//         search : searchTerm,

//     }
//     try {
//         const result = await api.post(`/video/search`,searchTerm)
//         return result.data;
        
//     } catch (error) {
//         if(error instanceof Error){
//             throw new Error(`${error.message}`)
//         }else{
//             throw new Error(`连接失败`)
//         }
//     }
// }


export async function getAllVideo(page : number,size : number,listItem:API.Item){
    const data = {
            current : page,
            pageSize : size,
            sortField : 'updateTime',
            channel : listItem.channel,
            type : listItem.type,
            year : listItem.year
        }
    try {
        const result = await api.post(`/video/list/allVideo`,data)
        return result.data;
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}



export async function getVideoTypeData(page : number,size : number,listItem:API.Item){
    const data = {
        current : page,
        pageSize : size,
        sortField : 'updateTime',
        channel : listItem.channel,
        type : listItem.type,
        year : listItem.year
    }
    try {
        const response = await api.post(`video/videoType`,
        data
        )

        return response.data;
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function ListGetAllVideoForSearchText(page: number, size: number, searchText:string){
    try {
        const result = await api.post(`video/search`,{  
            current: page,  
            pageSize: size, 
            sortField : 'updateTime', 
            search: searchText  
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}



export async function ListGetAllVideoForHotTop(){
    try {
        const result = await api.get(`video/getVideoHop`)
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function ListGetAllVideoForScoring(){
    try {
        const result = await api.get(`video/getVideoScore`)
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function getAllVideoForJapan(animeType: string){
    try {
        const result = await api.post(`video/listVideoAnimeType`,{
            animeType : animeType
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}




export async function getAllCurrentChase(animeDate: string){
    try {
        const result = await api.post(`video/getAllChase`,{
            animeDate : animeDate
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}



export async function listRecommendedVideos(num:number,videoId:string){
    try {
        const result = await api.post(`video/match`,{
            num: num,
            videoId: videoId
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}


export async function registration(userRegister:API.Register){
    try {
        const result = await api.post("users/register",userRegister)
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`用户注册失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function userLogin(userLogin:API.LoginType){
    try {
        const result = await api.post("users/authentication",userLogin)
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`用户登录失败`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

//注意
export async function publishEvent(id : string){
    try {
        const result = await api.post(`users/publishevent`,{
            id:id
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`用户邮箱验证错误：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}
//注意
export async function IsVerificationEmail(userRegisterInfo : API.Verification) {
    try {
        const result = await api.post("users/verificationEmail",userRegisterInfo)
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`用户邮箱验证错误：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function UserLogOut(){
    try {
        const result = await api.get("users/logout",{
            headers: getHeaders()
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`用户邮箱验证错误：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function UserInfoForBackend(userinfo:API.UserInfoMin){
    try {
            const result = await api.post("userinfos/info",userinfo,{
                headers : getHeaders()
            });
            return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`信息提交失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function UserInfoForAvatar(avatarFormDate:File | null){
    try {
        const formData = new FormData();
        if(avatarFormDate){
            formData.append("file",avatarFormDate);
            const result = await api.post("userinfos/file",formData,{
                headers : getHeaders()
            })
            return result.data
        }else{
            throw new Error('没有选择文件');
        }
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`图片提交失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function GetUserForInfoAvatar(){
    try {
        const result = await api.get("userinfos/userInfoAndAvatar",{
            headers : getHeaders()
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`用户数据获取失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}




export async function GetAllCommentsForVideoId(videoId:string,urlId:string,page:number,size:number){
    const data = {
        videoId : videoId,
        urlId : urlId,
        current : page,
        pageSize: size,
        sortField : 'likeCount'
    }
    try {
        const result = await api.post(`comments/list/parent`,data)
        return result.data
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`未登陆：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function GetAllCommentsForVideoIdInSon(videoed:string,parent : string,urlId:string,page:number,size:number){
    const data = {
        videoId : videoed,
        parentId: parent,
        urlId : urlId,
        current : page,
        pageSize: size,
        sortField : 'likeCount'
    }
    try {
        const result = await api.post(`comments/list/son`,data)
        return result.data
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`未登陆：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function AddCommentForLinkCount(commentId:number){
    try {
        const result = await api.put(`comments/like/${commentId}`)
        return result.data
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`未登陆：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

//有userID
export async function AddCommentForVideoIdAndUrlIdAndUserId(commentsRequest:API.CommentsRequest){
    try {
        const result = await api.post(`comments/addComments`,commentsRequest,{
            headers : getHeaders()
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}



//有userID
export async function AddCommentForScoring(commentSoring:API.CommentSoring){
    try {
        const result = await api.post(`scoring/addScore`,commentSoring,{
            headers : getHeaders()
        })
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}


export async function ListGetAllCommentForScoring(videoId:string){
    try {
        const result = await api.get(`scoring/all/comment/${videoId}`)
        return result.data
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`发布失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}


export async function AddFile(avatarFormDate:File | null){
    try {
        const formData = new FormData();
        if(avatarFormDate){
            formData.append("file",avatarFormDate);
            const result = await api.post("file/add",formData,{
                headers : getHeaders()
            })
            return result.data
        }else{
            throw new Error('没有选择文件');
        }
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`图片提交失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}

export async function GetListFile(){
    try {

        const result = await api.get("file/get/file",{
            headers : getHeaders()
        })
        return result.data
       
        
    } catch (error) {
        if(error instanceof Error){
            throw new Error(`图片提交失败：${error.message}`)
        }else{
            throw new Error(`连接失败`)
        }
    }
}