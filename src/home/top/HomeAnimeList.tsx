import React, { useEffect, useState } from 'react'
import { getAllCurrentChase, getAllVideoForJapan } from '../../utils/ApiFunction';
import HomeItemListCard from './HomeItemListCard';
import { datetwo } from '../../data/data';

function HomeAnimeList() {
    const arrayNumber: number[] = Array.from({length: 7}, (_, index) => index + 1);

    const [videoDataForJap,setVideoDataForJap] = useState<API.AnimeInfo[]>([

    ])
    const [currentAnimeList,setCurrentAnimeList] = useState<API.AnimeInfo[]>([]);
    const now = new Date();  
    const [dayState, setDayState] = useState<number>(now.getDay())
    let day = now.getDay();
    let date = now.getDate();
    let year = now.getFullYear();  
    let month = now.getMonth(); // 注意月份是从0开始的  
    const typeJpa = "日漫番剧"
    const typeThe = "日漫剧场"
    const [videoDataForTheater,setVideoDataForTheater] = useState<API.AnimeInfo[]>([

    ])
    const formattedDate = `${year}-${month < 10 ? '0' + (month + 1) : (month + 1)}-${date < 10 ? '0' + date : date}`;  
    const [errorMessage,setErrorMessage] = useState<string>("")
    const [successMessage,setSuccessMessage] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false);
    useEffect(() => {
    getAllVideoForJapan(typeJpa).then(data => {
        setVideoDataForJap((prevVideo) => {
            return [...prevVideo,...data.data]
        })
        setSuccessMessage("success")
        setLoading(true)
    }).catch((error : any) => {
        setErrorMessage(error)
        setLoading(false)
    });
    getAllVideoForJapan(typeThe).then(data => {
        setVideoDataForTheater((prevVideo) => {
            return [...prevVideo,...data.data]
        })
        setSuccessMessage("success")
        setLoading(true)
    }).catch((error : any) => {
        setErrorMessage(error)
        setLoading(false)
    });
    getAllCurrentChase(formattedDate).then((data) => {
        if(data.code === 0){
            setCurrentAnimeList(data.data)
        }else{
            
        }
    }).catch((error) => {
        
    })

    },[])

    function handleClick(item: number) {
        let prevDate = 0;
        if(day === 0){
            day = 7;
        }
        setDayState(item);

        const currentDay = day - item;
        const currentDate = (date - (currentDay));
        if(currentDate <= 0){
            prevDate =  Number(new Date(year, month,0).getDate())
            prevDate = prevDate - Math.abs(currentDate);
        }
        if(currentDate > Number(new Date(year, month + 1,0).getDate())){
            prevDate = Number(new Date(year, month + 1,0))
            prevDate = currentDate - prevDate;
            month = month + 2;
        }
        if(currentDate > 0 && currentDate <= Number(new Date(year, month + 1,0).getDate())){
            prevDate = currentDate;
            month = month + 1;
        }
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${prevDate < 10 ? '0' + prevDate : prevDate}`;  
        getAllCurrentChase(formattedDate).then((data) => {
            if(data.code === 0){
                setCurrentAnimeList(data.data)
            }else{
                
            }
        }).catch((error) => {
            
        })

    }

  return (
    <>
        <div className='jap'>
            <div className='japone-t'>
                <div className='japthree'>
                    <h1>每日追番表</h1>
                    <ul>
                        {datetwo.map((item,index) => (
                            <li className={`${((dayState === 0) && (index + 1 === 7)) ? 'btn' : '' } ${dayState === index + 1 ? 'btn' : ''}`} onClick={() => {handleClick(index + 1)}} key={index}>
                                {`星期${item}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='japtwo'>
            {/* <HomeItemListCard loading={loading} videoData={currentAnimeList} /> */}
            <HomeItemListCard loading={loading} videoData={currentAnimeList} />
            </div>
            {/* <h1>日漫剧场</h1>
            <HomeItemListCard loading={loading} videoData={videoDataForTheater} /> */}
        </div>
        <div className='jap'>
            <div className='japone-t'>
                <div className='japthree'>
                    <h1>日漫番剧</h1>
                </div>
            </div>
            <div className='japtwo'>
            <HomeItemListCard loading={loading} videoData={videoDataForJap} />
            </div>
        </div>
        <div className='jap'>
            <div className='japone-t'>
                <div className='japthree'>
                    <h1>日漫剧场</h1>
                </div>
            </div>
            <div className='japtwo'>
            <HomeItemListCard loading={loading} videoData={videoDataForTheater} />
            </div>
            {/* <h1>日漫剧场</h1>
            <HomeItemListCard loading={loading} videoData={videoDataForTheater} /> */}
        </div>
        
    </>
  )
}

export default HomeAnimeList