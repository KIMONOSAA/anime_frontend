import React, { useEffect, useRef, useState } from 'react'
import { GetUserForInfoAvatar, UserInfoForAvatar } from '../utils/ApiFunction';
import { AppDispatchs, AppSelectors } from '../store/hooks';
import { setIsUpdateUserInfo } from '../store/userSlice';
interface IndexedDBHookReturn {  
  putData: (storeName: string, data: any) => Promise<unknown>;  
  cursorGetDataAll: (storeName: string) => Promise<unknown>;  
  cursorSetDataAll: (storeName: string, data: any) => Promise<unknown>;  
  // 这里可以添加更多方法，如果有的话  
} 



function MyAvatar() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  
  const storeName = 'user_info';
  const [userInfo,setUserInfo] = useState<string | null>(null)
  const [updatedSelectedFile, setUpdatedSelectedFile] = useState<File | null>(null);
  const [isSelectedFile, setIsSelectedFile] = useState<boolean>(false);
  const formRef = useRef<HTMLInputElement>(null)
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [successMessage,setSuccessMessage] = useState<string>('');
  const dispatch = AppDispatchs()
  const isUserInfoForUser = AppSelectors(state => state.user.isUserInfo)
  const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        setSelectedFile(file)
  }
  const handleClick = (e:React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if(formRef.current){
      formRef.current.click();
    }
  }
  const handleSubmit = (e:React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      UserInfoForAvatar(selectedFile).then((data) => {
        
        dispatch(setIsUpdateUserInfo(!isUserInfoForUser))
        setIsSelectedFile(true)
        setUpdatedSelectedFile(data.data.file)
        
        setSuccessMessage("上传成功")
      }).catch((err) => {
        setErrorMessage("上传失败")
      })
      setTimeout(() => {
          setSuccessMessage('')
          setErrorMessage('')
      },2000)
  }

  useEffect(() => {
    GetUserForInfoAvatar().then((data) => {

      if(data.data && data.data.file){
        setUserInfo(data.data.userId)
        setUpdatedSelectedFile(data.data.file)
        setIsSelectedFile(true)
      }
    }).catch((error) => {
    })
  },[])
  return (
    <div className='myavatar'>
       {successMessage && <div className='success'>{successMessage}</div>}
        {errorMessage && <div className='error'>{errorMessage}</div>}
          <div className='avatar'>
            <div className='photo-img'>
              <form onSubmit={handleSubmit}>
                      <div className='upload'>
                          <input type='file' name='file' ref={formRef} onChange={handleChangeInput} className='uploadfile' />
                      </div>
                      <div className="default-avatar">  
                          {selectedFile ? (  
                            <img src={`${URL.createObjectURL(selectedFile)}`} alt="Selected Avatar" />  
                          )  :  (  
                             isSelectedFile ? (
                              <img src={`data:image/png;base64, ${updatedSelectedFile}`} alt="Selected Avatar" />
                             )
                             :(
                              <img src="/cropped-2400-1280-1353172.jpg" alt="Selected Avatar" />
                             )
                          ) }  
                        </div>  
                      <button type='submit' className='btn'>提交</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default MyAvatar