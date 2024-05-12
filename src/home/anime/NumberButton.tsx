
import { Link } from 'react-router-dom'



const NumberButton = ({index,item,info,dataId,videoNumber} : {index: number,item : number ,info: API.VideoInfo,dataId:string | undefined,videoNumber: number[]}) => {
  const videoDataAndVideoInfo : API.VideoDataAndVideoInfoInterface = {
        id : index,
        // data: videoUrl[index].data,
        dataId: dataId,
        info:info,
        videoNumber: videoNumber,
        item: item,
        photo: info.photo,
        name: info.name,
        date: info.date,
        animeCompany: info.animeCompany,
        directorName: info.directorName,
        voiceActor: info.voiceActor,
        type: info.type,
        comicBookAuthor: info.comicBookAuthor, 
        description : info.description
  }
  return (
    <>
        <Link to={`/animePlayers/${dataId}/${item}` } state={{ videoDataAndVideoInfo }}>
            <li className='num' key={index}>第{item < 10 ? `0${item}` : item}集</li>
        </Link>
    </>
  )
}

export default NumberButton