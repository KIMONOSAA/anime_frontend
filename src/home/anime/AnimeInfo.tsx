import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getVideoResponseInfoById, getVideoSection } from '../../utils/ApiFunction';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import NumberButton from './NumberButton';
import { convertArrays } from '../../utils/tool';

const AnimeInfo = () => {
    const {dataId} = useParams();
    const urlId = dataId;
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [inFo,setInfo] = useState<API.VideoInfo | null>(null)
    const [videoNumber,setVideoNumber] = useState<[]>();
    const [isVideoUrl,setIsVideoUrl] = useState<boolean>(false);
    
    
    
    
    
    useEffect(() => {
        try {
            if(dataId !== undefined){
                getVideoResponseInfoById(dataId).then((data) => {
                    setInfo(data.data)
                    setIsLoading(true)
                }).catch((error) => {
                    console.log(error)
                }); 
                getVideoSection(dataId).then((datas) => {
                    if(datas.data.length > 0){
                    
                        setVideoNumber(datas.data)
                        setIsVideoUrl(true);
                    }else{
                        setIsVideoUrl(false);
                    }
                })

            }
        } catch (error) {
            console.log(error)
        }
        
    },[])

    
    
    return (
        <>
            {isLoading ? (
                inFo &&  (
                    <>
                        <div className='info-img'>
                            <div className='context'>
                                        <div className='context-top'>
                                            <div className='img'>
                                            {inFo.photo && <img src={`data:image/png;base64, ${inFo.photo}`} alt='Anime Photo' />}
                                            </div>
                                            <div className='info'>
                                                <h1>{inFo.name}</h1>
                                                <ul>
                                                    <li className='btninfo'>{`${inFo.date}`}</li>
                                                    <li>{inFo.animeCompany}</li>
                                                </ul>
                                                <div className='info-font'>
                                                    <div className='top'>
                                                        <span>导演</span> : <span>{inFo.directorName}</span>
                                                    </div>
                                                    
                                                    <div className='centers'>
                                                        <span>声优</span> : <ul>
                                                            {convertArrays(inFo.voiceActor).map((actor,index) => (
                                                            <li key={index} className='shenyou'>
                                                                    {actor}
                                                            </li> 
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className='bottwon'>
                                                            <span>画家</span> : <span>{inFo.comicBookAuthor}</span>
                                                        </div>
                                                    <div className='btnlist'>
                                                        <div className='btn'>
                                                            <button><FaPlay color='white' size='12'  />立即播放</button>
                                                        </div>
                                                        <Link to={`/addVideoUrl/${urlId}`}>
                                                            <div className='btn2'>
                                                                <button><FaPlay color='white' size='12'  />添加链接</button>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='jianjie'>
                                            <button>简介</button>
                                            <div className='description'>
                                                {inFo.description}
                                            </div>
                                        </div>
                                        <div className='type'>
                                            {convertArrays(inFo.type).map((item,index) => (
                                                    <span key={index}>#{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='list'>
                                        <h1>资源列表</h1>
                                    </div>
                                    <div className='context-xian'>
                                        
                                        <span>本地线路</span>
                                        <div className="horizontal-line"></div>
                                        {videoNumber ? (
                                            <ul>
                                                {isVideoUrl && 
                                                    (
                                                        videoNumber.map((item : {sectionId : number,urlId : number },index) => (
                                                            <NumberButton key={item.sectionId} index={index} item={item} info={inFo} dataId={dataId} videoNumber={videoNumber}/>
                                                        ))
                                                    )
                                                }
                                            </ul>
                                        ): (
                                            <button className='nums'>
                                                预告片
                                            </button>
                                        )}
                                        </div>
                                    
                                </div>
                            <div>
                        </div>
                    </>
                )              
            ): <span>信息加载中....</span>}
        </>
    );
        {/* <video controls>
            <source src="http://localhost:9193/video/get-video/3" type="video/mp4" />
            Your browser does not support the video tag.
        </video> */}
        
  
}

export default AnimeInfo