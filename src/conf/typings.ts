declare namespace API {
    interface UserInfo {
        name: string;
        description: string;
        sex: string;
        date: string;
        userId: string;
        file: File | null;
    }
    interface IsUserAndInfo {
        name: string;
        description: string;
        sex: string;
        date: string;
        userId: string;
        file: File | null;
        isUserInfo : boolean;
    }
    interface Token {
        access_token: string;
        refersh_token: string;
    }
    interface Info {
        name: string;
        id: number;
        key: string;
        sex: string;
        date: Date;

    }
    interface IntersectionObserverInstance {
        disconnect: () => void;
        observe: (target: Element) => void;

    }
    interface Date {
        year: number;
        month: number;
        day: number;
    }
    interface UserInfoMin {
        name: string;
        desc: string;
        sex: string;
        date: string;
    }
    interface LoginType {
        email: string;
        password: string;
    }
    interface Register {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        role: string;
    }
    interface Data {
        code: null | number;
        message: null | string;
        description: null | string;
    }
    interface VertifyType {
        spliced: boolean;
        verified: boolean; // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
        left: number; // 滑块的移动位置
        destX: number; // 滑块的目标位置
    }
    interface Verification {
        userId: string | null;
        code: string;
    }
    interface VerificationProps {
        isVerification: boolean;
        userId: string;
    }
    interface IsUserInfo {
        isUserInfo : boolean;
    }


    interface Anime {
        animeName: string;
        animeAlias: string;
        animeDescription: string;
        animeNumberOfSection: number;
        animePhoto: File | null;
        animeDate: string;
        animeCompany: string;
        animeDirectorName: string;
        animeVoiceActor: string[];
        animeComicBookAuthor: string;
        animeTypeList: string[];
        animeType: string;
    }

    interface AnimeInfo {
        id: number;
        alias: string;
        description: string;
        name: string;
        photo: File | null;
        type: string[];
    }

    interface VideoInfo {
        photo?: string;
        name: string;
        date: number[];
        animeCompany: string;
        directorName: string;
        voiceActor: string[];
        type: string[];
        comicBookAuthor: string;
        description: string;
    }
    interface EncryptedUrlAndToken{
        token : string;
        videoId : string;
        section : string;
        encryptedString : string;
        encryptedIvString : string;
    }
    interface IndexedDBHookReturn {
        putData: (storeName: string, data: any) => Promise<unknown>;
        cursorGetDataAll: (storeName: string) => Promise<unknown>;
        cursorSetDataAll: (storeName: string, data: any) => Promise<unknown>;
    }
    interface GetAllCommentsForVideo {
        parentName : String;
        context: string;
        commentId: number;
        SonCount: number;
        username: string;
        avatar: string;
        createdAt: string;
        likeCount : number;
    }
    interface IntersectionObserverInstance {
        disconnect: () => void;
        observe: (target: Element) => void;

    }

    interface CommentsRequest {
        context: string;

        urlId: number;

        videoUrlId: string;

        parent: string | null;

    }

    interface InputType {
        context: string;
        videoUrlId: number;
        parent: number | null;
    }
    interface VideoDataAndVideoInfoInterface {
        id: number;
        dataId: string | undefined;
        // data: string;
        info: API.VideoInfo;
        photo?: string;
        name?: string;
        item: number;
        videoNumber: number[];
        date: number[];
        animeCompany: string;
        directorName: string;
        voiceActor: string[];
        type: string[];
        comicBookAuthor: string;
        description: string;
    }
    interface Listltem {
        index: number,
        name: string
    }
    interface Item {
        channel: string,
        type: string,
        year: string
    }
    interface CommentSoring {
        videoId: string;
        score: number;
        comment: string;
    }
    interface RegisterMin {
        username: string;
        email: string;
        password: string;
        role: string;
    }
    interface Video {
        uuid: string;
        videoFile: File | null;
    }
    interface VideoInSection {
        section: number;
        uuid: string;
        videoFile: File | null;
    }
    interface ScoringType{
        context : string;

        videoId : string;
    
        userId : string;
    
    
        username : string;
    
        avatar : File | null;
    
        createdAt : Date ;
    }
    interface GobalData{
        code : number;
        message : string;
        data : any;
        description : string;
    }
    interface RecommendedVideos {
        id : string;
        alias: string;
        name : string;
        description : string;
        photo :  File | null;
        type : string[];
        date : string ;
        animeCompany : string;
        directorName : string;
        voiceActor : string[];
        comicBookAuthor : string;
    }

}