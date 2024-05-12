import React, { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { registration } from '../../utils/ApiFunction';
import VerificationEmail from './VerificationEmail';
import { userInfo } from 'os';
import SliderVerify from '../../utils/SliderVerify';
import AutoErrorAndSuccessMessage from '../../error/AutoErrorMessage';
import AutoSuccessMessage from '../../error/AutoSuccessMessage';
import AutoErrorMessage from '../../error/AutoErrorMessage';



function UserRegister() {

    const navigate  = useNavigate();
    const [isVerification, setIsVerification] = useState<boolean>(false)
    const [sliderVerifyFial, setSliderVerifyFial] = useState<boolean>(false);
    const [sliderVerifySuccess, setSliderVerifySuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isVerify, setIsVerify] = useState<boolean>(false)
    const [isFetchLoading,setIsFetchLoading] = useState<boolean>(false)
    const [register,setRegister] = useState<API.Register>({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role:"USER"
    })
    const [saveUserId,setSaveUserId] = useState<string>("");
  
    const SliderVerifyHnadler = (e: React.FormEvent) => {
      e.preventDefault();
      setSliderVerifyFial(true)
      setIsVerify(true)
    }
    const SliderVerifyHnadlerFail = () => {
      setSliderVerifyFial(false)
    } 
   
    

    const handleRegistration = (e?: React.FormEvent) => {
        if(e){
          e.preventDefault()
        }
        // setIsVerification(true)
        registration(register).then((data) => {
              if(data.code === 0){
                localStorage.setItem("userId",data.data)
                setSaveUserId(data.data)
                setIsFetchLoading(true)
                setIsVerification(true)
                setSuccessMessage("注册成功！")
              }else{
                setErrorMessage("注册失败")
              }

              // setTimeout(() => {
              //   setIsFetchLoading(false)
              //   navigate('/login',{state: {message : "请登录！"}})
              // },3000)

          }).catch((error) => {
              setIsFetchLoading(true)
              setErrorMessage("你的用户信息有误，检查是否邮箱错误？ 或者有无空格等等， 请检测后再尝试")
              setIsVerification(false)
          })
          setTimeout(() => {
            setIsFetchLoading(false)
            setSuccessMessage('')
            setErrorMessage('')
            setIsVerify(false)
          },3000)
    }
    const SliderVerifyHnadlerSuccess = () => {
      setSliderVerifySuccess(true)

    } 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target; // 解构出 name 和 value
      setRegister(prevRegister => ({
        ...prevRegister,
        [name]: value
      }));
    };

    useEffect(() => {
        if(sliderVerifySuccess){
          handleRegistration()
        }
    },[sliderVerifySuccess])

  return (
    <>
    {successMessage && (<AutoSuccessMessage message={successMessage}/>)}
        {errorMessage && (<AutoErrorMessage message={errorMessage}/>)}
    <div className='register'>
        {!sliderVerifySuccess  && <div id="cover" style={{display : sliderVerifyFial ? "block" : "none"}}></div>}
        <form className='user-register' onSubmit={SliderVerifyHnadler}>  {/* handleRegistration */}
            <div className='loginname'>注册</div>
              <div className='align'>
                <div className='center-border'>
                  <div className='lable-name'>
                    <label>用户名:</label>
                    <label>邮箱:</label>
                    <label>密码:</label>
                    <label>确认密码:</label>
                  </div>
                  <div className='input-name'>
                  <input type='text' className='username' name='username' value={register.username} onChange={handleChange}></input>
                    
                  <input type='text' className='email' name='email' value={register.email} onChange={handleChange}></input>

                  <input type='password' className='password' name='password' value={register.password} onChange={handleChange}></input>

                  <input type='password' className='password' name='confirmPassword' value={register.confirmPassword} onChange={handleChange}></input>
                  </div>
                </div>
              </div>
              {/* {isVerification && <VerificationEmail userId={saveUserId} handleRegistration={handleRegistration}/>} */}
              {isVerification && <VerificationEmail isVerification={isVerification} userId={saveUserId} />}
              <div className='submit'>
                  <button type='submit'>提交</button>
              </div>
            <div>
                {/* <p>注册</p>
                <label>用户名：</label>
                <input type='text' className='username' name='username' value={register.username} onChange={handleChange}></input>
                <label>邮箱：</label>
                <input type='text' className='email' name='email' value={register.email} onChange={handleChange}></input>
                <label>密码：</label>
                <input type='password' className='password' name='password' value={register.password} onChange={handleChange}></input>
                <button type='submit'>提交</button> */}
            </div>
            {!sliderVerifySuccess && (
              <div className={`slider-verify ${isVerify ? 's' : ''}`}>
                <SliderVerify status={sliderVerifyFial} SliderVerifyHnadlerFail={SliderVerifyHnadlerFail} SliderVerifyHnadlerSuccess={SliderVerifyHnadlerSuccess} />
              </div>
            )}
        </form>
        
    </div>
    </>
  )
}

export default UserRegister