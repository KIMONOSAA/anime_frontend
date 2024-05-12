import React, { useEffect, useState } from 'react'
import { MdThumbDownAlt } from "react-icons/md";
import { MdThumbDownOffAlt } from "react-icons/md";
import { MdThumbUpAlt } from "react-icons/md";
import { MdThumbUpOffAlt } from "react-icons/md";
import useChangeInput from '../../utils/useChangeInput';
import { AddCommentForLinkCount, AddCommentForVideoIdAndUrlIdAndUserId, GetAllCommentsForVideoIdInSon } from '../../utils/ApiFunction';
import { AppSelectors } from '../../store/hooks';
function Comment({data,videoId,item,isSon,parent,userName} : {data:API.GetAllCommentsForVideo,videoId : string,item: string,isSon?: boolean,parent?: number,userName? : string}) {
  const [thumbsUp,setThumbsUp] = useState<boolean>(false);
  const [thumbDown,setThumbDown] = useState<boolean>(false);
  const [pageNumber,setPageNumber] = useState<number>(0)
  const [size,setSize] = useState<number>(4)
  const [successMessage,setSuccessMessage] = useState<string>('');
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [isReply,setIsReply] = useState<boolean>(false);
  const [isRender,setIsRender] = useState<boolean>(false)
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [isFouces,setIsFocused] = useState<boolean>(false)
  const {inputValue, handleChangeInput, setInputValue} = useChangeInput<API.InputType>({context: '', videoUrlId : 0,parent : null });
  const [commentSonList, setCommentSonList] = useState<API.GetAllCommentsForVideo[]>([]);
  const userInfo = AppSelectors(state => state.user)
  const handleFocus = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(true);

  }

  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(!userInfo || !userInfo.file || !item){
        setErrorMessage("错误");
        return;
    }
    const urlId  = Number.parseInt(item);
    const videoUrlId = videoId;
    const parentId = parent ? parent : data.commentId;
    const formData : API.CommentsRequest = {
      context : inputValue.context,
      urlId: urlId,
      videoUrlId: videoUrlId,
      parent : String(parentId)
    }
    
    AddCommentForVideoIdAndUrlIdAndUserId(formData).then((data) => {
        if(data){
          setSuccessMessage("发布成功")
          setIsLoading(true)
          setIsRender(!isRender)
        }
    }).catch((error) => {
      setErrorMessage("发布失败")
    })
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {  
      setIsFocused(false);  
  }; 
  const handleReply = () => {
    setIsReply(!isReply)
  }
  const handleCommentSon = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }
  const handleUpLink = () => {
    AddCommentForLinkCount(data.commentId).then((data) => {
      if(data.code === 0){
        setThumbsUp(!thumbsUp)
      }
    }).catch((error) => {

    })
  }
    const handleDownLink = () => {
    AddCommentForLinkCount(data.commentId).then((data) => {
      if(data.code === 0){
        setThumbDown(!thumbDown)
      }
    }).catch((error) => {
    })
  }
  useEffect(() => {
    if(isLoading){
      setCommentSonList([])
    }
    GetAllCommentsForVideoIdInSon(videoId,String(data.commentId),item, pageNumber, size)
      .then((datas) => {
        setCommentSonList((prevVideos) => {
          return [...new Set([...prevVideos, ...datas.data])];
        });
        setIsLoading(false)
        setSuccessMessage("successfully");
      })
      .catch((error) => {
        setIsLoading(false)
        setErrorMessage("服务器异常");
      });
}, [pageNumber, videoId,item,isRender]);
  return (
    <>
      
      <div className='counterpart-comment'>
        <div className='counterpart-img'>
          <img className='img' src={`data:image/png;base64, ${data.avatar}`} style={{width: '35px',height: '35px'}}/>
        </div>
        <div className='counterpart-info'>
          <p className='counterpart-name'>{data.username}</p>
          <p className='counterpart-context'>{(data.parentName !== userName && data.parentName !== null) ? `回复@${data.parentName}:` + data.context : data.context}</p>
          <div className='counterpart-up'>
            <div className='time'>{`${data.createdAt[0]}-${Number.parseInt(data.createdAt[1]) < 10 ? `0${data.createdAt[1]}` : data.createdAt[1]}-${Number.parseInt(data.createdAt[2]) < 10 ? `0${data.createdAt[2]}` : data.createdAt[2]}-${Number.parseInt(data.createdAt[3]) < 10 ? `0${data.createdAt[3]}` : data.createdAt[3]}:${Number.parseInt(data.createdAt[4]) < 10 ? `0${data.createdAt[4]}` : data.createdAt[4]}`}</div>
            
          </div>
          <div className='bottwon'>
              <div className='icon'>
                {thumbsUp ? 
                    (
                    <div className='upoff-alt' onClick={handleUpLink}>
                      <MdThumbUpAlt color='#f81d96'/>
                      <p>{data.likeCount === 0 ? '' : data.likeCount}</p>
                    </div>
                  ):(
                    <div className='up-alt' onClick={handleUpLink}>
                      <MdThumbUpOffAlt />
                    </div>
                  )
                }

                {
                  thumbDown ? (
                    <div className='downoff-alt' onClick={handleDownLink}>
                      <MdThumbDownAlt color='#f81d96'/>
                    </div>
                  ):(
                    <div className='down-alt' onClick={handleDownLink}>
                      <MdThumbDownOffAlt />
                    </div>
                  )
                }
                
               
                <div className='replay' onClick={handleReply}>回复</div>
              </div>
              <div className='user-list-all'>
                {
                  commentSonList.map((comment: API.GetAllCommentsForVideo, index) => (
                    <div className='user-list' key={index}>
                      <Comment data={comment} videoId={videoId} item={item} isSon={true} parent={data.commentId} userName={data.username}/>
                    </div>
                  ))
                }
          </div>
              {isReply && (
                <>
                  <div className='top-son'>
                  <div className='counterpart-img'>
                    <img className='img' src={`data:image/png;base64, ${data.avatar}`} style={{width: '35px',height: '35px'}}/>
                  </div>
                  <input name='context' onBlur={handleBlur} onFocus={handleFocus} onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: (e.target.value) })} value={inputValue.context} className='self-text' type='text' placeholder={`回复@${data.username}`}></input>
                  </div>
                  <div className={`submit-input-son`}>
                    <button onClick={handleSubmit}>发布</button>
                  </div>
                </>
              )}
          </div>
          {isSon !== true && (
            
            <>
              <div className='click-h' onClick={handleCommentSon}>
                点击更多
              </div>

              <hr className='hr'/>
            </>
          )}
          
        </div>
        
      </div>
    </>
  )
}

export default Comment