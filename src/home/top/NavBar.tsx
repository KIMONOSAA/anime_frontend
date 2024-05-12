import React, { MutableRefObject, useEffect,useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { AppSelectors } from '../../store/hooks';
import { AppDispatchs } from '../../store/hooks'
import { setUserInfo, setUserRemove } from '../../store/userSlice';
import { GetUserForInfoAvatar, UserLogOut } from '../../utils/ApiFunction';
import { FiSearch } from 'react-icons/fi';




const NavBar = () => {
  const [hoverGravatar, setHoverGravatar] = useState<boolean>(false);
  const [hoverHistory, setHoverHistory] = useState<boolean>(false);
  const [hoverMessage, setHoverMessage] = useState<boolean>(false);
  const [hoverStar, setHoverStar] = useState<boolean>(false);
  const [showStar, setShowStar] = useState<boolean>(false);
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [isUserInfo, setIsUserInfo] = useState<boolean>(false);
  const [isEvent, setIsEvent] = useState<boolean>(false)
  const [leftX,setLeftX] = useState<number>(0)
  const [topY,setTopY] = useState<number>(0)
  const [bottomX,setBottomX] = useState<number>(0)
  const [rightY,setRightY] = useState<number>(0)
  const [clientY,setClientY] = useState<number>(0)
  const [clientX,setClientX] = useState<number>(0)
  const events: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const mouseEvents: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const navigate = useNavigate()
  const userInfo = AppSelectors(state => state.user)
  const INDEXDB_USER_INFO_DATABASE = "self";
  const dispatch = AppDispatchs()
  const isUserInfoForUser = AppSelectors(state => state.user.isUserInfo)
  // const { cursorGetDataAll,putData,cursorRemoveDataAll} = useIndexDB(INDEXDB_USER_INFO_DATABASE);
  const handleHoverMouseEnter = (e:React.MouseEvent<HTMLDivElement>) => {
      
      setHoverGravatar(true)
      if(events.current){
        setLeftX(events.current.getBoundingClientRect().left)
        setTopY(events.current.getBoundingClientRect().top)
        setBottomX(events.current.getBoundingClientRect().bottom)
        setRightY(events.current.getBoundingClientRect().right)
        setShowStar(true)
      }
  }

    const fetchUserInfo = () => {  
      // let data = await cursorGetDataAll('user_info');  
      // dispatch(setUserInfo(data));  
      // if (Object.keys(data).length === 0) {  
        if((!userInfo || !userInfo.userId || !userInfo.file) && localStorage.getItem("token") ){
          // if (localStorage.getItem("token")) { 

            GetUserForInfoAvatar().then((data) => {
              dispatch(setUserInfo(data.data));  
            }).catch(() => {
  
            })
        }
        
  };  



  const handleLogout = () => {
    UserLogOut().then((data) => {

      if(data.code === 0){
        setIsUserInfo(false)
        dispatch(setUserRemove());
        localStorage.removeItem("token")
        navigate("/")
      }else{
      }
      
    }).catch((error) => {
    })
    
    // removeDataAllForUser()
  }
  
  const handleXAndY = (e:React.MouseEvent<HTMLDivElement>) => {
    setHoverGravatar(true)
  }
  const handleHoverMouseLeave = () => {
    setIsTrue(false)
    setHoverGravatar(false); 
  };
  const handleMain = (e:React.MouseEvent<HTMLDivElement>) => {
    setClientY(e.clientY)
    setClientX(e.clientX)
    setIsEvent(!isEvent)
    if(clientX !== 0 && clientY !== 0 && leftX !== 0 && rightY !== 0){
      const isElementDistance = (clientX >= (leftX && (leftX - 5)) && clientX <= (rightY && (rightY + 5))) && showStar;
      if(isElementDistance){
        setIsTrue(true)
        
      }else{
        setIsTrue(false)
        
      }
      
    }
  }
  useEffect(() => {
    fetchUserInfo()
  },[isUserInfoForUser])
  useEffect(() => {
    if(isTrue){
      setHoverGravatar(true)
    }else{
      setHoverGravatar(false)
    }
    },[isTrue])
  return (
    <div className='main' ref={mouseEvents} >
      
      <div className='nav' >
          
          <ul>
          <div className='left'>
              <img style={{width : "36px", height: "36px"}} src='../../../public/asouli.png'/>
          </div>
              <Link className='no-underline' to={'/'}> 
                <li>首页</li>
              </Link>
              <Link className='no-underline' to={'/Japanese-anime'}>  
                <li>日漫番剧</li>
              </Link>
              {/* <li>日漫剧场</li>
              <li>游戏资源</li>
               */}
              <li>专栏</li>
              <Link className='no-underline' to={'/addAnime'}> 
                <li>添加</li>
              </Link>
          </ul>
          <div className='navbar-right' onMouseMove={handleMain}>
            <div ref={events} className={`avatar `} onMouseEnter={handleHoverMouseEnter}  >
              {/* <RxAvatar /> */}
              <RxAvatar size={25} color={hoverGravatar ? 'red' : 'rgb(189, 6, 6)'}/>
              
            </div>
            <div className='history' onMouseEnter={() => setHoverHistory(true)} onMouseLeave={() => setHoverHistory(false)}>
              <GoHistory  size={25} color={hoverHistory ? 'red' : 'rgb(189, 6, 6)'} />
            </div>
            <Link to={`/leaderboard`}>
              <div className='message' onMouseEnter={() => setHoverMessage(true)} onMouseLeave={() => setHoverMessage(false)}>
                <MdOutlineLeaderboard  size={25} color={hoverMessage ? 'red' : 'rgb(189, 6, 6)'} />
              </div>
            </Link>
            <Link to={'/search'}>
              <div className='star' onMouseEnter={() => setHoverStar(true)} onMouseLeave={() => setHoverStar(false)}>
                <FiSearch  size={25} color={hoverStar ? 'red' : 'rgb(189, 6, 6)'} />
              </div>
            </Link>
          </div>
          {localStorage.getItem("token") ? (
              <div>
                <div className={`login-show-big ${hoverGravatar ? 'avatar-show' : ''}`} onMouseMove={handleXAndY} onMouseLeave={handleHoverMouseLeave}>
                  <div className='user-info'>
                    {(userInfo.file || localStorage.getItem("token")) &&
                      (
                        <div>
                      <Link className="no-underline" to={'/owninfo'}>
                        {userInfo.file ? <img src={`data:image/png;base64, ${userInfo.file}`} alt="Selected Avatar" /> : <img src={`src/assets/images/cropped-2400-1280-1353172.jpg`} alt="Selected Avatar" />}
                        
                      </Link>
                      </div>
                      )
                    }
                  </div>
                  <div className='user-name'><p>{userInfo.name ? userInfo.name : ''}</p></div>
                  <Link className="no-underline" to={'/owninfo'}>
                    <div className='navbar-setting'>
                      <div className='person'>个人中心</div>
                    </div>
                  </Link>
                  <div className='logout' onClick={handleLogout}>
                    退出登录
                  </div>
                </div>
              </div>
          ) : (
              <div className={`login-show ${hoverGravatar ? 'avatar-show' : ''}`} onMouseMove={handleXAndY} onMouseLeave={handleHoverMouseLeave}>
                  {
                  <>
                    <p>登录后你可以:</p>
                    <p className='login-color'> 没有什么可以的,赶紧<Link className="no-underline" to={'/login'}>
                      登录
                    </Link></p>
                  </>
                  }
              </div>
          )
        }
        
      </div>
      
    </div>
  ) 
}

export default NavBar