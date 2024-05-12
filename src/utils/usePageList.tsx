import React, { useCallback, useRef, useState } from 'react'

function usePageList({loading,hasMore,setPageNumber} : {loading: boolean,hasMore: boolean,setPageNumber: React.Dispatch<React.SetStateAction<number>>}) {
const observer = useRef<API.IntersectionObserverInstance | null>(null)

const lastCommentElementRef = useCallback((node: Element | null) => {
    if (!loading) {
      return;
    };

    if (observer.current){
      observer.current.disconnect()
    };
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
    }); 
    if (node) observer.current.observe(node);
    }, [loading, hasMore]);
    return {   
        lastCommentElementRef,  
      };  
}

export default usePageList