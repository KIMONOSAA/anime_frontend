import React, { useEffect, useState } from 'react'
import usePageList from '../utils/usePageList';
import { ListGetAllVideoForSearchText } from '../utils/ApiFunction';
import ItemListCard from '../home/anime/ItemListCard';

function Search() {
    const [videoDataSearchText,setVideoDataSearchText] = useState<API.AnimeInfo[]>([])
    const [errorMessage,setErrorMessage] = useState<string>("")
    const [successMessage,setSuccessMessage] = useState<string>("")
    const [loading,setLoading] = useState<boolean>(false);
    const [size,setSize] = useState<number>(24)
    const [ hasMore, setHasMore ] = useState(false)
    const [pageNumber,setPageNumber] = useState<number>(0)
    const {lastCommentElementRef} = usePageList({loading,hasMore,setPageNumber})
    const [searchText,setSearchText] = useState<string>('');

    const handleChangeSearchText = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }
    const handleSearchSubmit =(e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setVideoDataSearchText([])
        setPageNumber(0);
        setLoading(true)
        // if(videoDataSearchText.length <= 0){
        //     ListGetAllVideoForSearchText(pageNumber,size,searchText).then((data) => {
        //         setVideoDataSearchText([...videoDataSearchText,...data])
        //         setSuccessMessage("success")
                

        //         setHasMore(data.length > 0);
    
        //     }).catch((error) => {
        //           setErrorMessage(error)
        //     })
        // }
        
    }
    useEffect(() => {
            
            ListGetAllVideoForSearchText(pageNumber,size,searchText).then((data) => {
                setVideoDataSearchText([...videoDataSearchText,...data.data])
                setSuccessMessage("success")
                setLoading(true)
                setHasMore(data.data.length > 0);

            }).catch((error) => {
                  setErrorMessage(error)
            })
             
      },[pageNumber,loading]) 
  return (
    <div className='video-search'>
        <div className='search-input'>
            <div className='search-body'>
                <input onChange={handleChangeSearchText}/>
                <button onClick={handleSearchSubmit}>搜索</button>
            </div>
        </div>
        <div className='video-list'>
            {loading && <ItemListCard loading={loading} videoData={videoDataSearchText} lastCommentElementRef={lastCommentElementRef}/>}
        </div>
    </div>
  )
}

export default Search