import React, { ChangeEvent, useCallback, useState } from 'react'

function useChangeInput<T>(initialValue:T) {
    const [inputValue,setInputValue] = useState(initialValue)

    const handleChangeInput = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        setInputValue({...inputValue,[name] : (e.target.value as unknown) as T})
    },[]) 
  return {  
    inputValue,  
    setInputValue,  
    handleChangeInput,  
  };  
}

export default useChangeInput