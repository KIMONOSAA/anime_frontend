import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { addAnimeLink } from '../utils/ApiFunction';
import useChangeInput from '../utils/useChangeInput';
const AddVideoUrl = () => {

  const [successMessage,setSuccessMessage] = useState<string>("");  
  const [errorMessage,setErrorMessage] = useState<string>("");
  const [newAnime,setNewAnime] = useState<File>()
  const [responseInfo,setResponseInfo] = useState({
    name : "",
    uid: ""
  })   
  const {inputValue, setInputValue} = useChangeInput(0);
  const {urlId} = useParams();
  const handleVideoChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = handleFileChange(e)

 }
 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const files = e.target.files;
    if(files && files.length > 0){
        const file = files[0];
        setNewAnime(file)
        return file;
    }
}
  const handleSubmit = async(e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputValue <= 0){
        return;
    }
    await addAnimeLink({
        section : inputValue,
        uuid: urlId ? urlId : "error",
        videoFile: newAnime ? newAnime : null
    }).then((data) => {
        if(data){
            setSuccessMessage("successfully added");
            setResponseInfo(data)
        }else{
            setErrorMessage(data);
        }
    }).catch((error) => {
        setErrorMessage(error)
    })
  }
  return (
    <>
        <div className='adnim-link'>
            {responseInfo ?  (
                successMessage && (
                    <>
                        <div className=''>{responseInfo.name}</div>
                        <div>{responseInfo.uid}</div>
                    </>
                )
            ):(
                <div>{errorMessage}</div>
            )}
        </div>
        <form onSubmit={handleSubmit} className='file'>
            <label htmlFor='animeVideo' className='form-label'>选择集数：</label>
            <input type='text' name='animeVideoText' id='animeVideoText' className='form-text' required onChange={(e) => {setInputValue(Number(e.target.value))}}></input>
            <label htmlFor='animeVideo' className='form-label'>视频文件：</label>
            <input type='file' name='animeVideo' id='animeVideo' className='form-file' required onChange={handleVideoChange}></input>
            <button className='btn' type='submit'>添加视频源</button>
        </form>
        </>
  )
}

export default AddVideoUrl