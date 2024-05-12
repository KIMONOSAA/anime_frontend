import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { getAllVideo } from '../../utils/ApiFunction'
import { types,years,channels } from './../../data/data';
import usePageList from '../../utils/usePageList';
import ItemListCard from './ItemListCard';

const AnimeList = () => {
  const [videoData,setVideoData] = useState<API.AnimeInfo[]>([])
  const carousel : MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [listItem,setListItem] = useState<API.Item>({
    channel : '日漫番剧',
    type : '全部',
    year: "全部"
  })
  const [Ischannles,setIsChannles] = useState<API.Listltem>({
    index : 0,
    name : '日漫番剧'
  })
  const [IsTypes,setIsTypes] = useState<API.Listltem>({
    index : 0,
    name : '全部'
  })
  const [IsYears,setIsYears] = useState<API.Listltem>({
    index : 0,
    name : '全部'
  })
  
  const [loading,setLoading] = useState<boolean>(false);
  const [isClicks,setIsClicks] = useState<boolean>(false);
  const [size,setSize] = useState<number>(32)
  const [ hasMore, setHasMore ] = useState(false)
  const [isTagesType,setIsTagesType] = useState<boolean>(false)
  const [pageNumber,setPageNumber] = useState<number>(0)
  const [stScroll,setStScroll] = useState<boolean>(false)
  const [startX , setStartX ] = useState<number>()
  const [scrollHeight, setScorllHeight] = useState<number>()
  const {lastCommentElementRef} = usePageList({loading,hasMore,setPageNumber})
  const handleListltemClickChannels = (index:number,item:string) => { 
        if(stScroll)return;
        setIsChannles({index : index,name: item})
        setListItem({...listItem,channel: item})
        setIsTagesType(true)
        // item === "全部" ? setIsFilter(false) : setIsFilter(true)
  } 
  
  const handleListltemClickTypes = (index:number,item:string) => {
    if(isClicks)return;
    setIsTypes({index : index,name: item})
    setListItem({...listItem,type: item})
    setIsTagesType(true)

  }

  const handleListltemClickYears = (index:number,item:string) => {
    if(isClicks)return;
      setIsYears({index : index,name: item})
      setListItem({...listItem,year: item})
      setIsTagesType(true)

  }


  const startScroll = (e:React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if(carousel.current === null)return;
    
    setStScroll(true)
    setStartX(e.pageX)
    carousel.current.classList.add("dragging");
    setScorllHeight(carousel.current.scrollLeft)
}

const dragScroll = (e:React.MouseEvent<HTMLDivElement>) => {
  e.preventDefault()  
  if(!stScroll) return;
  setIsClicks(true)
    if(scrollHeight === undefined)return;
    if(startX === undefined)return;
    if(carousel.current === null)return;
    const scrollX = scrollHeight - (e.pageX - startX);
    carousel.current.scrollLeft = scrollX;
}
const stopScroll = () => {
    if(carousel.current === null)return;
    setTimeout( () => {
      setIsClicks(false)
    },100)
    setStScroll(false)
    carousel.current.classList.remove("dragging");
    
}

  useEffect(() => {
    setSize(32)
    if(isTagesType){
      setVideoData([])
      setPageNumber(0);
    }
    getAllVideo(pageNumber,size,listItem).then(data => {
        setVideoData((prevVideo) => {
          return [...prevVideo, ...data.data]
        })
        setLoading(true)
        setIsTagesType(false)
        setHasMore(data.data.length > 0);
    }).catch((error) => {
        console.log(error)
    });

  },[pageNumber,listItem])

  

  return (
    <div className='allanime' >
        
      <div className='label'>
          
          <div className='channles'>
            
          <span>频道</span>
          <div>
            <ul>
            <li className={`btn ${Ischannles.index == 0 ? 'btncolor' : '' }` } onClick={() => handleListltemClickChannels(0,'日漫番剧')}>日漫番剧</li>
              {channels.map((item,index) => (
                <li onClick={() => handleListltemClickChannels(index+1,item.name)} key={index} className={`btn ${(Ischannles.index == (index + 1) && !stScroll) ? 'btncolor' : '' }`}>{item.name}</li>
              ))}
            </ul>
          </div>
          </div>
          <div className='types'>
            <span>类型</span>
            <div>
                <ul>
                <li onClick={() => handleListltemClickTypes(0,'全部')} className={`btn ${IsTypes.index == 0 ? 'btncolor' : '' }`}>全部</li>
                  {types.map((item,index) => (
                    <li onClick={() => handleListltemClickTypes(index + 1,item.name)} key={index} className={`btn ${(IsTypes.index == (index + 1) && !stScroll) ? 'btncolor' : '' }`}>{item.name}</li>
                  ))}
                </ul>
            </div>
          </div>
          <div className='years'>
            <span>年份</span>
            <div className='scorll'  ref={carousel} onMouseDown={startScroll} onMouseUp={stopScroll} onMouseMove={dragScroll} onMouseLeave={stopScroll}>
                <div onClick={() => handleListltemClickYears(0,'全部')} className={`btn uldiv ${IsYears.index == 0 ? 'btncolor' : '' }`}>全部</div>
                {years.sort((a, b) => parseInt(b.name) - parseInt(a.name)).map((item,index) => (
                  <div onClick={() => handleListltemClickYears(index + 1,item.name)} key={index} className={`btn uldiv ${(IsYears.index == (index + 1) && !stScroll) ? 'btncolor' : '' }`}>{item.name}</div>
                ))}
            </div>
          </div>
      </div>
      <ItemListCard loading={loading} videoData={videoData} lastCommentElementRef={lastCommentElementRef}/>
    </div>
  )
}

export default AnimeList