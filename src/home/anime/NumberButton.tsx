
import { Link } from 'react-router-dom'



const NumberButton = ({index,item,info,dataId,videoNumber} : {index: number,item :  {sectionId : number,urlId : number } ,info: API.VideoInfo,dataId:string | undefined,videoNumber: []}) => {
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
        <Link to={`/animePlayers/${dataId}/${item.urlId}` } state={{ videoDataAndVideoInfo }}>
            <li className='num' key={index}>第{item.sectionId < 10 ? `0${item.sectionId}` : item.sectionId}集</li>
        </Link>
    </>
  )
}

export default NumberButton