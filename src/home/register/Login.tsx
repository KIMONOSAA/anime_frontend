import React, { useEffect, useState } from 'react'
import { GetUserForInfoAvatar, userLogin } from '../../utils/ApiFunction';
import {Link, useNavigate } from 'react-router-dom';
import AutoSuccessMessage from '../../error/AutoSuccessMessage';
import AutoErrorMessage from '../../error/AutoErrorMessage';
import { AppDispatchs, AppSelectors } from '../../store/hooks';
import { setIsUpdateUserInfo, setUserInfo } from '../../store/userSlice';


function Login() {
  const navigate  = useNavigate();
  const [token,setToken] = useState<Function>(() => localStorage.getItem("token"));
  const [refertoken,setReferToken] = useState<Function>(() => localStorage.getItem("token"));
  const [isLoding, setIsLoding] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const dispatch = AppDispatchs()
  const userInfo = AppSelectors(state => state.user)
  const isUserInfoForUser = AppSelectors(state => state.user.isUserInfo)
  const [login,setLogin] = useState<API.LoginType>({
    email: "",
    password: ""
  })

  const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
    
        userLogin(login).then((data) => {
            if(data.code === 0){
              setIsLoding(true)
              setSuccessMessage(data.message)
              dispatch(setIsUpdateUserInfo(!isUserInfoForUser))
              setToken(() => localStorage.setItem("token",`${data.data.access_token}`))
              setReferToken(() => localStorage.setItem("refertoken",`${data.data.refersh_token}`))
              
              setTimeout(() => {
                  navigate('/',{state: {message : "欢迎来到小破站！"}})
              },3000)
            }else{
                setErrorMessage(data.message)
            }
          
        }).catch((error) => {
            setErrorMessage("你的信息有误，请检测后再尝试")
        })
        setTimeout(() => {
          setSuccessMessage('')
          setErrorMessage('')
      },3000)
    
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
  useEffect(() => {
    fetchUserInfo()
  },[isUserInfoForUser,isLoding])
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name.trim();
    let value : string = e.target.value.trim();
    setLogin({...login, [name] : value})
  } 

  return (
    <>
    {successMessage && (<AutoSuccessMessage message={successMessage}/>)}
    {errorMessage && (<AutoErrorMessage message={errorMessage}/>)}
      <div className='login'>
          <form onSubmit={handleLogin}>
              <div className='loginname'>登录</div>
              <div className='align'>
                <div className='center-border'>
                  <div className='lable-name'>
                    <label>邮箱:</label>
                    <label>密码:</label>
                  </div>
                  <div className='input-name'>
                    <input type='text' name='email' className='email' value={login.email} onChange={handleChange}></input>
                    
                    <input type='password' name='password' className='password' value={login.password} onChange={handleChange}></input>
                  </div>
                </div>
              </div>

              <div className='submit'>
                <button className='submit' type='submit'>登录</button>
                <Link className="no-underline" to={`/register`}>    
                    <button className='submit' type='submit'>注册</button>    
                </Link>
              </div>
          </form>
      </div>
    </>
  )
}

export default Login