import React, { useEffect, useState } from 'react'
import { ListGetAllVideoForHotTop, ListGetAllVideoForScoring } from '../utils/ApiFunction'
import Iterate from '../utils/Iterate'


function Leaderboard() {
 const [successMessage,setSuccessMessage] = useState<string>(""
 )
 const [errorMessage,setErrorMessage] = useState<string>("")
 const [isLoding, setIsLoding] = useState<boolean>(false)
 const [scoringData,setScoringData] = useState([])
 const [hotTopScore,setHotTopScore] = useState([])

  useEffect(() => {
    setIsLoding(false)
    ListGetAllVideoForHotTop().then((data) => {
        setIsLoding(true)
        setHotTopScore(data.data)
        setSuccessMessage("获取成功")
    }).catch((error) => {
        setErrorMessage("获取失败")
        setIsLoding(false)
    })
    ListGetAllVideoForScoring().then((data) => {
        setIsLoding(true)
        setScoringData(data.data)
        setSuccessMessage("获取成功")
    }).catch((error) => {
        setErrorMessage("获取失败")
        setIsLoding(false)
    })
  },[])

  return (
    <div className='video-leaderboard'>
        <div className='leaderboard-mastar'>
            <h1>排行榜</h1>
        </div>
        <div className='leaderboard-card'>
            <div className='anime-leaderboard-hotTop'>
                <h1>日漫排行榜</h1>
                <div className='card-list'>
                    <Iterate data={hotTopScore}/>
                </div>
            </div>
            <div className='anime-scoring-hotTop'>
                <h1>剧场排行榜</h1>
                <div className='card-list'>
                    <Iterate data={scoringData}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Leaderboard