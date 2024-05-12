import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import NumberButton from '../anime/NumberButton';
import { AddCommentForScoring, ListGetAllCommentForScoring, listRecommendedVideos } from '../../utils/ApiFunction';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import StarScore from '../../utils/StarScore';


export const RecommendedVideos = (props: { videoDataAndVideoInfo: API.VideoDataAndVideoInfoInterface; }) => {
  const { videoDataAndVideoInfo } = props;
  const [datas,setDatas] = useState([]);
  const [isLoding,setIsLoding] = useState(false);
  const [successMessage,setSuccessMessage] = useState<string>();
  const [errorMessage,setErrorMessage] = useState<string>()
  const [isScoring,setIsScoring] = useState(false);
  const [sorce, setSorce] = useState<number>(0);
  const [scoringList,setScoringList] = useState([]);
  const [changeScore,setChangeScore] = useState<string>("");
  const [scoreCommended,setScoreCommended] = useState<API.CommentSoring>({
    videoId:  "",
    score: 0,
    comment :  ""
  });
  const num = 10;
  const handleContent = (dataDesc:string) => {
    let currentData = dataDesc.replace(/\n/g, "");

    if(currentData.length > 10){
        return currentData.slice(0,Math.ceil(10)) + '...'
    }else{
        return currentData
    }
}
const handleScoring = () => {
  setIsScoring(!isScoring);
}

const handleChangeScoring = () => {
    
    if(sorce <= 0){
      setErrorMessage("你还没有进行评分并且评分不能为零！")
      return;
    }
    if(changeScore === "" || changeScore.length <= 5){
      setErrorMessage("你的评分字数为空及你的字数不能少等于5")
      return;
    }
    if(videoDataAndVideoInfo.dataId === undefined || !videoDataAndVideoInfo.dataId){
      setErrorMessage("要在当前视频评分")
      return;
    }
    setScoreCommended({
      videoId: videoDataAndVideoInfo.dataId,
      score : sorce,
      comment: changeScore
    })
    AddCommentForScoring(scoreCommended).then((data) => {
        if(data.code === 'ok'){
          setSuccessMessage("提交成功")
          setChangeScore('');
          setSorce(0);
        }else{
          setErrorMessage("提交失败")
        }
    }).catch((error) => {
      setErrorMessage("网络请求失败")
    })
}
const handleScoringChange = (store : number) => {
    setSorce(store);
}
const handleChangeInput = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setChangeScore(e.target.value);
}
  useEffect(() => {
    setIsLoding(false)
    if(videoDataAndVideoInfo.dataId)
    {
      listRecommendedVideos(num,videoDataAndVideoInfo.dataId).then((data) => {
        setDatas(data.data)
        setSuccessMessage("获取成功")
        setIsLoding(true)
      }).catch(() => {
          setErrorMessage("获取失败")
          setIsLoding(false)
      })
      ListGetAllCommentForScoring(videoDataAndVideoInfo.dataId).then((data) => {
        setScoringList(data.data);
      }).catch(() => {
        setErrorMessage("获取失败")
      })
    }

  },[])

  return (
    <div className='video-info'>
      <div className='video-info-text'>
        <p onClick={handleScoring}>视频</p>
        <p onClick={handleScoring}>评分</p>
      </div>
      <p className={`horizon ${isScoring ? 'move-right' : ''}`}></p>
      <div className='video-info-number'>
        {
          !isScoring ? (
              <>
                  <h1>{videoDataAndVideoInfo?.name}</h1>
                  <div className='video-info-info'><p>{videoDataAndVideoInfo.date}</p><p> · </p><div className='video-info-info-info'><p>详情</p><MdKeyboardArrowRight /></div></div>
                  <hr></hr>
                  <div className='video-info-list'>
                    <div className='video-info-center'>
                      <h1>资源列表</h1>
                      {videoDataAndVideoInfo.videoNumber ? (
                            <ul>
                                {
                                  videoDataAndVideoInfo.videoNumber.map((item,index) => (
                                      <NumberButton key={index} index={index} item={item} info={videoDataAndVideoInfo.info} dataId={videoDataAndVideoInfo.dataId} videoNumber={videoDataAndVideoInfo.videoNumber}/>
                                  ))
                                }
                            </ul>
                        ): (
                            <button className='nums'>
                                预告片
                            </button>
                        )}
                    </div>
                  </div>
              </>
          ) : (
            <div className='video-score'>
              <StarScore handleScoringChange={handleScoringChange}/>
              <div className='socre-top'>
                  <h1>提交评分</h1>
                  <p>还可以输入300字</p>
              </div>
              <div>
                <textarea onChange={handleChangeInput} placeholder='一个用户只能评分一次，请慎重评分'></textarea>
              </div>
              <button onClick={handleChangeScoring}>开喷</button>
              <div className='user-list-all'>

                { scoringList ?
                   (
                    scoringList.map((data : API.ScoringType, index) => (
                      <div className='user-list' key={index}>
                        <div className='counterpart-comment'>
                            <div className='counterpart-img'>
                              <img className='img' src={`data:image/png;base64, ${data.avatar}`} style={{width: '35px',height: '35px'}}/>
                            </div>
                            <div className='counterpart-info'>
                              <p className='counterpart-name'>{data.username}</p>
                              <p className='counterpart-context'>{data.context}</p>
                              <div className='counterpart-up'>
                                {/* <div className='time'>{`${data.createdAt[0]}-${Number.parseInt(data.createdAt[1]) < 10 ? `0${data.createdAt[1]}` : data.createdAt[1]}-${Number.parseInt(data.createdAt[2]) < 10 ? `0${data.createdAt[2]}` : data.createdAt[2]}-${Number.parseInt(data.createdAt[3]) < 10 ? `0${data.createdAt[3]}` : data.createdAt[3]}:${Number.parseInt(data.createdAt[4]) < 10 ? `0${data.createdAt[4]}` : data.createdAt[4]}`}</div>  */}
                                
                               </div>
                            </div>
                          </div>
                      </div>
                    ))
                   ) : (
                    <p >暂无人评分</p>
                   )
                }
              </div>
            </div>
          )
        }
        
        <div className='video-info-recommend'>
          <div className='recommend'><h1>推荐视频</h1></div>
          <div className='video-info-recommend-list'>
                {
                  datas && (
                    datas.map((item : API.RecommendedVideos,index) => (
                      <div key={item.id} className='imglists'>
                        <div className='flex-imgs'>
                            <Link to={`/animeInfo/${item.id}`} >
                                <div className='image-containers'>
                                    <img src={`data:image/png;base64, ${item.photo}`} alt='Room Photo' style={{width: "200px", maxWidth: "200px", height: "300px"}} />
                                    <div className="circle-buttons">
                                        {/* 你可以在这里放置按钮图标或文本 */}
                                        <FaPlay color='white' size='12'  />
                                    </div>
                                </div>
                                <p>{handleContent(item.name)}</p>
                            </Link>
                            <span>{handleContent(item.description)}</span>
                        </div>
                      </div>
                    ))
                  )
                }
          </div>
        </div>
      </div>
    </div>
  )
}
