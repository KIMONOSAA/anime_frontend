import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IsVerificationEmail, publishEvent } from '../../utils/ApiFunction';
import AutoSuccessMessage from '../../error/AutoSuccessMessage';
import AutoErrorMessage from '../../error/AutoErrorMessage';


const VerificationEmail:React.FC<API.VerificationProps> = ({isVerification,userId}) => {
    
    const [emailCode, setEmailCode] = useState<API.Verification>({
        userId : userId ? userId : null,
        code : ''
    })
    const navigate  = useNavigate();
    const [toggleButton,setToggleButton] = useState<boolean>(false)
    const [isPublish,setIsPublish] = useState<boolean>(false)
    const [canResend,setCanResend] = useState<boolean>(false)
    const [isCountDown, setIsCountDown] = useState<boolean>(false)
    const [test, setTest] = useState<boolean>(false)
    const [countDown,setCountDown] = useState<number>(60)
    const [isValid,setIsValid] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const handleVerificationEmail = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setEmailCode({...emailCode, [name] : value })
    }
    const handleFailure = () => {
        setIsCountDown(true);
        setCanResend(false);
        setCountDown(60); 
        setIsValid(true)
    };
    const handleToggleButton = () => {
        setToggleButton(true)
    }
    useEffect(() => {
        let timer : NodeJS.Timeout;
        if(isCountDown && countDown > 0){
            timer = setTimeout(() => {
                setCountDown((prev) => prev - 1)
            },1000)
        }else {
            setCanResend(true); 
            setIsCountDown(false); 
            setIsPublish(false)
            setIsValid(false)
        }

        return () => clearTimeout(timer);
    },[countDown,isCountDown])
    const handleEmailSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation();
        IsVerificationEmail(emailCode).then((data) => {
            if(data.code === 0){
                setSuccessMessage("验证成功")
                setTest(true)
                setTimeout(() => {
                navigate('/login',{state: {message : "请登录！"}})
              },3000)
            }else{
                setTest(false)
                setIsPublish(false)
                setErrorMessage("验证失败")
                handleFailure()
            }            
        }).catch((error) => {
        })
        setTimeout(() => {
            setSuccessMessage('')
            setErrorMessage('')
          },3000)
    }


    const handlePublishEvent = (userId:string) => {
        publishEvent(userId).then((data) => {
            if(data.code === 0){
                setIsPublish(true)
                setIsValid(true)
            }else{
                setIsValid(true)
            }
            
            setSuccessMessage("请查收邮箱！")
        }).catch((error) => {
            setIsPublish(false)
        })
        setTimeout(() => {
            setSuccessMessage('')
            setErrorMessage('')
          },3000)
    }


    return (
        <>
            {successMessage && (<AutoSuccessMessage message={successMessage}/>)}
        {errorMessage && (<AutoErrorMessage message={errorMessage}/>)}
        
        <div className='verification'>
           
            <div className='verification-email'>
                
                {!test && <input type='text' className='codeEmail' name='code' value={emailCode.code} onChange={handleVerificationEmail} />}
                
                {
                    !test ? (
                        !isPublish  ? (
                            (!isValid || canResend) ? (
                                <button type='submit' onClick={() => handlePublishEvent(userId)} >获取验证码</button>
                            ) : (
                                <button type='submit' disabled>{countDown}</button>
                            )
                        ) : (
                            <button className='btns' onClick={handleEmailSubmit}>发送</button>
                        )
                    ) : (
                        null
                    )
                }
            </div>  
        </div>
        </>
    )
}

export default VerificationEmail