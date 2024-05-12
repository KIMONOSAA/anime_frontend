import React from 'react'
import AnimeCard from './AnimeCard'

function ItemListCard({loading,videoData,lastCommentElementRef} : {loading : boolean, videoData : API.AnimeInfo[],lastCommentElementRef? : (node: Element | null) => void}) {
  const internalLastCommentRef = React.useRef<null | HTMLDivElement>(null);  
  // 如果传入了lastCommentElementRef，则使用它，否则使用internalLastCommentRef  
  const refToUse = lastCommentElementRef || internalLastCommentRef;  
  return (
    <div className='itemlist'>  
        {loading ? (
            videoData && (
              videoData.map((data : API.AnimeInfo,index) => (
                videoData.length === index + 1 ?
                  <div  ref={refToUse} key={index} >
                    <AnimeCard data={data}/>
                  </div>
                :
                  <AnimeCard data={data} key={index}/>
              ))
            )
        ) : (
          <span>正在加载中....</span>
        )}
      </div>
  )
}

export default ItemListCard