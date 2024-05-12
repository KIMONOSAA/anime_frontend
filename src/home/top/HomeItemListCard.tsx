import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import HomeAnimeCard from '../anime/HomeAnimeCard';
function HomeItemListCard({loading,videoData} : {loading : boolean, videoData : API.AnimeInfo[]}) {
  const carousel : MutableRefObject<HTMLUListElement | null> = useRef(null);
  const [firstChildWidth, setFirstChildWidth] = useState(0); // 使用 state 来保存宽度  
  const [isClicks,setIsClicks] = useState(false);
  const len = videoData.length;
  // 创建一个 ref 来引用 DOM 元素  
  const handleRightCard = () => {
      setIsClicks(!isClicks)
      if(carousel.current && firstChildWidth != 0){
        carousel.current.scrollLeft += firstChildWidth;
            }
  }
  const handleLeftCard = () => {
    setIsClicks(!isClicks)
    if(carousel.current && firstChildWidth != 0){
      carousel.current.scrollLeft -= firstChildWidth;
    }
  }
  useEffect(() => {  
    if (videoData.length > 0 && carousel.current) {  
      // 假设第一个 <li> 元素的宽度就是所有卡片的宽度  
      const firstCard = carousel.current.querySelector<HTMLElement>('.card');  
      if (firstCard) {  
        setFirstChildWidth((firstCard.offsetWidth + 26));  
      }  
    }  
  }, [videoData,isClicks]); // 依赖 videoData，以便在 videoData 变化时重新计算宽度  
  return (
    <div className='wrapper-son'>  
      {len < 6 ? <></> : <i onClick={handleLeftCard}>
        <IoIosArrowBack />
      </i>}
      <ul className='carousel-son' ref={carousel}>
        {
          videoData && (
            videoData.map((data : API.AnimeInfo,index) => (
            
                <li className='card' key={index}>
                  <HomeAnimeCard data={data}/>
                </li>
              
            ))
          )
        }
      </ul>
      {len < 6 ? <></> : <i onClick={handleRightCard}>
        <IoIosArrowForward />
      </i>}
      </div>
  )
}

export default HomeItemListCard