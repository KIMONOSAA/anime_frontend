import React, {  useCallback, useEffect, useRef, useState } from 'react'
import { AddCommentForVideoIdAndUrlIdAndUserId, GetAllCommentsForVideoId } from '../../utils/ApiFunction'
import Comment from './Comment';
import useChangeInput from '../../utils/useChangeInput';
import { AppSelectors } from '../../store/hooks';
import { AppDispatchs } from '../../store/hooks'



function VideoComments({videoId,item} : {videoId : string,item: string}) {
  const [successMessage,setSuccessMessage] = useState<string>('')
  const [errorMessage,setErrorMessage] = useState<string>('')
  const [pageNumber,setPageNumber] = useState<number>(0)
  const [loading,setLoading] = useState<boolean>(true)
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const [isFouces,setIsFocused] = useState<boolean>(false)
  const [size,setSize] = useState<number>(4)
  const [ hasMore, setHasMore ] = useState(false)
  const videoIdT = videoId;
  const itemT = item;
  const [isRender,setIsRender] = useState<boolean>(false)
  const [commentList, setCommentList] = useState<API.GetAllCommentsForVideo[]>([]);
  const observer = useRef<API.IntersectionObserverInstance | null>(null)
  const {inputValue, handleChangeInput, setInputValue} = useChangeInput<API.InputType>({context: '', videoUrlId : 0,parent : null });
  const dispatch = AppDispatchs(); 
  const userInfo = AppSelectors(state => state.user)
  const lastCommentElementRef = useCallback((node: Element | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  const handleFocus = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(true);

  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {  
      setIsFocused(false);  
  }; 
  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(!userInfo || !userInfo.file || !item){
        setErrorMessage("错误");
        return;
    }
    const urlId  = Number.parseInt(item);
    const videoUrlId = videoId;
    const formData : API.CommentsRequest = {
      context : inputValue.context,
      urlId: urlId,
      videoUrlId: videoUrlId,
      parent : null
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

  useEffect(() => {
      setLoading(true);
      if(isLoading){
        setCommentList([])
      }
      GetAllCommentsForVideoId(videoId,item, pageNumber, size)
        .then((datas) => {
          setCommentList((prevVideos) => {
            return [...new Set([...prevVideos, ...datas.data])];
          });
          
          setLoading(false);
          setHasMore(datas.data.length > 0);
          setIsLoading(false)
          setSuccessMessage("successfully");
        })
        .catch((error) => {
          setIsLoading(false)
          setErrorMessage("服务器异常");
        });
  }, [pageNumber, videoId,item,isRender]);
  return (
    <div className='video-comments'>
        <div className='comments'>
            <div className='all-comments'>
              <div className='self-comments'>
                <h1>评论</h1>
                <div>最新</div>
                <div>最热</div>
              </div>
                <div className='top'>
                
                <div className='self-user'>
                  {userInfo && <img className='self-img' src={`data:image/png;base64, ${userInfo.file ? userInfo.file : ''}`} alt="Selected Avatar" />}
                </div>
                <input name='context' onBlur={handleBlur} onFocus={handleFocus} onChange={(e) => setInputValue({ ...inputValue, [e.target.name]: (e.target.value) })} value={inputValue.context} className='self-text' type='text' placeholder='你渴望力量吗，来吧分享你的知识吧'></input>
                
                </div>

                <div className={`submit-input`}>
                  <button onClick={handleSubmit}>发布</button>
                </div>

              <div className='user-list-all'>
                {
                  commentList.map((comment: API.GetAllCommentsForVideo, index) => (
                    commentList.length === index + 1 ? 
                    <div className='user-list' key={index} ref={lastCommentElementRef}>
                      <Comment data={comment} videoId={videoIdT} item={itemT}/>
                    </div> :
                    <div className='user-list' key={index}>
                      <Comment data={comment} videoId={videoIdT} item={itemT}/>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default VideoComments