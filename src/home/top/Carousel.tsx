import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { datas } from './../../data/data';
const Carousel = () => {
    const carouselRef = useRef<HTMLUListElement>(null);
    const intervalRef = useRef<number | null>(null);
    const [current,setCurrent] = useState(1)
    const [translateX,setTranslateX] = useState(0)
    const slides = () => {
        if(datas.length > 1){
            let items = datas.map((data,index) => (
                <li key={index} className='slide'>
                    <img src={data.img} alt='nature' style={{width: '100%', height: '100%'}}/>
                </li>
            ))

            return [
                <li key={datas.length + 1} className='slide'>
                    <img src={datas[datas.length - 1].img} alt='nature' style={{width: '100%', height: '100%'}}/>
                </li>,
                ...items,
                <li key={datas.length + 2} className='slide'>
                    <img src={datas[0].img} alt='nature' style={{width: '100%', height: '100%'}}/>
                </li>,
            ]
        }

        return <li className='slide'><img src={datas[0].img}/></li>
    }

    const actionHandle = useCallback((mode: string) => {
        
        if(carouselRef.current !== null){
            carouselRef.current.style.transitionDuration = "400ms"
            if(mode === "prev"){
                if(current <= 1){
                    setTranslateX(0)
                    setCurrent(datas.length)
                }else{
                    setTranslateX(carouselRef.current.clientWidth * (current - 1))
                    setCurrent((prev) => --prev)
                }
                
            }else if(mode === "next"){
                if(current >= datas.length){
                    setTranslateX(carouselRef.current.clientWidth * (datas.length + 1))
                    setCurrent(1)
                }else{
                    setTranslateX((carouselRef.current.clientWidth ?? 0) * (current + 1))
                    setCurrent((next) => ++next)
                }
            }
        }
        
    },[current])

    useLayoutEffect(() => {
        if(carouselRef.current !== null){
        setTranslateX(carouselRef.current.clientWidth * current)
        }
    },[])
    useEffect(() => {
        const transitionEnd = () => {
            if(carouselRef.current !== null){
                if(current <= 1){
                    carouselRef.current.style.transitionDuration = "0ms"
                    setTranslateX(carouselRef.current.clientWidth * current)
                }
                if(current >= datas.length){
                    carouselRef.current.style.transitionDuration = "0ms"
                    setTranslateX(carouselRef.current.clientWidth * datas.length)
                }
            }
        }

        document.addEventListener("transitionend",transitionEnd)

        return () => {
            document.removeEventListener("transitionend",transitionEnd)
        }
    },[current])

    useEffect(() => {
        if(intervalRef.current !== null){
            clearInterval(intervalRef.current)
        }
        
        intervalRef.current = setInterval(() => {
            actionHandle("next")
        },3000)
        

        return () => {
            if(intervalRef.current){
                clearInterval(intervalRef.current)
            }
        }
    },[actionHandle])


    return (
        <>
            <div className='carousel'>
                <ul className='container'  ref={carouselRef} style={{transform: `translate3d(${-translateX}px,0,0)`}}>
                    {slides()}
                </ul>
                <button onClick={() => actionHandle("prev")} className={'Btn BtnLeft'}>{"<"}</button>
                <button onClick={() => actionHandle("next")} className={'Btn BtnRight'}>{">"}</button>
            </div>
            
        </>
    )
}

export default Carousel