import React, { useState } from 'react'
import { addAnime, AddFile } from '../utils/ApiFunction';
import AutoErrorMessage from '../error/AutoErrorMessage';
import AutoSuccessMessage from '../error/AutoSuccessMessage';

const AddAnime = () => {
    
    const [successMessage,setSuccessMessage] = useState<string>("");
    const [errorMessage,setErrorMessage] = useState<string>("");
    const [inputName,setInputName] = useState<string>("");
    const [inputTypeName,setInputTypeName] = useState<string>("");
    const [addListName,setAddListName] = useState<string[]>([]);
    const [addListType,setAddListType] = useState<string[]>([]);
    const [imagePreview, setImagePreview] = useState<string>("")
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [imageBannerFilePreview, setBannerFilePreview] = useState<string>("")

    const [newAnime,setNewAnime] = useState<API.Anime>({
        animeName : "",
        animeAlias : "",
        animeDescription : "",
        animeNumberOfSection: 0,
        animePhoto : null,
        animeDate : "",
        animeCompany : "",
        animeDirectorName : "",
        animeVoiceActor : [],
        animeComicBookAuthor : "",
        animeTypeList: [],
        animeType: ""
    })



    const handleSubmit = async(e:React.ChangeEvent<HTMLFormElement>) => {
        
        e.preventDefault()
        try {
            const success = await addAnime({
                animeName : newAnime.animeName,
                animeAlias: newAnime.animeAlias,
                animeDescription: newAnime.animeDescription,
                animeNumberOfSection: newAnime.animeNumberOfSection,
                animePhoto : newAnime.animePhoto,
                animeDate : newAnime.animeDate,
                animeCompany : newAnime.animeCompany,
                animeDirectorName : newAnime.animeDirectorName,
                animeVoiceActor: newAnime.animeVoiceActor,
                animeComicBookAuthor: newAnime.animeComicBookAuthor,
                animeTypeList: newAnime.animeTypeList,
                animeType: newAnime.animeType
            })
            if(success.data.code === 0 ){
                setSuccessMessage(success.data.message)
            }else{
                setErrorMessage(success.data.message)
            }
            setInputName("")
            setInputTypeName("")
            setAddListName([])
            setAddListType([])
            setImagePreview("")
            setNewAnime({
                animeName : "",
                animeAlias : "",
                animeDescription : "",
                animeNumberOfSection: 0,
                animePhoto : null,
                animeDate : "",
                animeCompany : "",
                animeDirectorName : "",
                animeVoiceActor : [],
                animeComicBookAuthor : "",
                animeTypeList: [],
                animeType:""
            })
            
        } catch (error) {
            setErrorMessage("动漫添加失败！")
        }
        
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        },3000)
    }

    const addType = () => {
        if(inputTypeName.trim() !== ''){
            setAddListType([...addListType,inputTypeName.trim()]);
        }
        setNewAnime({...newAnime, animeTypeList : [...addListType,inputTypeName.trim()]})
        
        setInputTypeName("");
    }

    const addName = () => {
        if(inputName.trim() !== ''){
            setAddListName([...addListName,inputName.trim()]);
        }
        setNewAnime({...newAnime, animeVoiceActor : [...addListName,inputName.trim()]})
        setInputName("");
    }
 
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        let value : string | number = e.target.value
        if(name === "animeNumberOfSection"){
            if(!isNaN(parseInt(value))){
                value = parseInt(value)
            }else{
                value = ""
            }
        }
        setNewAnime({...newAnime, [name] : value});
    }
    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = handleFileChange(e)
        
        if(file !== undefined){
            setImagePreview(URL.createObjectURL(file)) 
        }
        
    }
    const handleBannerFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setBannerFile(e.target.files[0])
            setBannerFilePreview(URL.createObjectURL(e.target.files[0]))
        }

    }

    const handleBannerFileUpload = async(e:React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if(bannerFile === null){
                return;
            }
            const success = await AddFile(bannerFile).then((data) => {
                if(data.code === 0){
                    setSuccessMessage(data.data.message)
                }else{
                    setErrorMessage(data.data.message)
                }
            })
            setBannerFile(null)
            setBannerFilePreview("")
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const files = e.target.files;
        if(files && files.length > 0){
            const file = files[0];
            setNewAnime({...newAnime,[name] : file})
            return file;
        }
        
        

    }

    return (
        <>
        {successMessage && (<AutoSuccessMessage message={successMessage}/>)}
        {errorMessage && (<AutoErrorMessage message={errorMessage}/>)}
        <div className='add'>
            
            <h1>Add anime</h1>
            
            

            <label htmlFor='animeVoiceActor'>声优：</label>
            <input type='text' name='animeVoiceActor' className='form-input' id='animeVoiceActor' value={inputName} onChange={(e) => setInputName(e.target.value)}></input>
            
            <button onClick={addName}>增加名字</button>


            <label htmlFor='animeTypeList'>类型：</label>
            <input type='text' name='animeTypeList' className='form-input' id='animeTypeList' value={inputTypeName} onChange={(e) => setInputTypeName(e.target.value)}></input>
            
            <button onClick={addType}>添加类型</button>
            <hr />
            <form onSubmit={handleSubmit} className=''>
                <label htmlFor='animeName' className='form-label'>动漫名：</label>
                <input type='text' name='animeName' className='form-input' required id='animeName' placeholder='输入动漫名字....' onChange={handleInputChange} value={newAnime.animeName} />
                <hr />
                <label htmlFor='animeAlias' className='form-label'>系列名：</label>
                <input type='text' name='animeAlias' className='form-input' required id='animeAlias' placeholder='输入系列名...' onChange={handleInputChange} value={newAnime.animeAlias}/>
                <hr />
                <label htmlFor='animeType' className='form-label'>日漫类型：</label>
                <input type='text' name='animeType' className='form-input' required id='animeType' placeholder='输入动漫名字....' onChange={handleInputChange} value={newAnime.animeType} />
                <hr />
                <label htmlFor='animeDescription' className='form-label'>描述：</label>
                <textarea name='animeDescription' className='form-textarea' id='animeDescription' placeholder='输入动漫简介...' onChange={handleInputChange} value={newAnime.animeDescription}></textarea>
                <hr />
                <label htmlFor='animeNumberOfSection' className='form-label'>总集目：</label>
                <input type='number' name='animeNumberOfSection' className='form-number' required id='animeNumberOfSection' onChange={handleInputChange} value={newAnime.animeNumberOfSection}></input>
                <hr />
                <label htmlFor='animePhoto' className='form-label'>封面：</label>
                <input type='file' name='animePhoto' className='form-file' id='animePhoto' required onChange={handleImageChange}></input>
                {imagePreview && (<img src={imagePreview} alt='photo' style={{maxWidth: "400px", maxHeight: "400px"}} />)}
                <hr />
                <label htmlFor='animeDate' className='form-label'>开播时间：</label>
                <input type='text' name='animeDate' className='form-date' id='animeDate' required onChange={handleInputChange} value={newAnime.animeDate}></input>
                <hr />
                <label htmlFor='animeVideo' className='form-label'>视频文件：</label>
                <hr />
                <label htmlFor='animeCompany'>动画公司名称：</label>
                <input type='text' name='animeCompany' className='form-input' id='animeCompany' required onChange={handleInputChange} value={newAnime.animeCompany}></input>
                <hr />
                <label htmlFor='animeDirectorName'>视频导演：</label>
                <input type='text' name='animeDirectorName' className='form-input' id='animeDirectorName' required onChange={handleInputChange} value={newAnime.animeDirectorName}></input>
                <hr />
                <div>
                    
                    {addListName.map((name,index) => (
                        <div key={index}>{name}</div>
                    ))}
                </div>
                <hr />
                <div>
                    
                    {addListType.map((name,index) => (
                        <div key={index}>{name}</div>
                    ))}
                </div>
                <label htmlFor='animeComicBookAuthor'>漫画作家：</label>
                <input type='text' name='animeComicBookAuthor' className='form-input' id='animeComicBookAuthor' required onChange={handleInputChange} value={newAnime.animeComicBookAuthor}></input>
                
                
                <hr />
                <button type='submit' className='btn'>提交</button>
            </form>
            <div>  
                <input type="file" onChange={handleBannerFileChange} />  
                {bannerFile && (<img src={imageBannerFilePreview} alt='photo' style={{maxWidth: "400px", maxHeight: "400px"}} />)}
                <button onClick={handleBannerFileUpload}>  
                    上传Banner文件  
                </button>  
            </div>  
        </div>


        
        </>
    )
}

export default AddAnime