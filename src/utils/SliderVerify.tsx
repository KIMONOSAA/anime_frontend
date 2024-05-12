import React, { useEffect, useRef, useState } from 'react'
import { getRandomNumberByRange, square, sum } from './tool';
import './index.css';

function SliderVerify({status,SliderVerifyHnadlerFail,SliderVerifyHnadlerSuccess} : {status : boolean,SliderVerifyHnadlerFail : () => void,SliderVerifyHnadlerSuccess : () => void}) {
    const [isLoading,setLoading] = useState<boolean>(false);
    const [sliderLeft, setSliderLeft] = useState(0);
    const [sliderClass, setSliderClass] = useState('sliderContainer');
    const [textTip, setTextTip] = useState("向右滑动");
    const imgRef = useRef<any>(null);
    const canvasRef = useRef<any>(null);
    const blockRef = useRef<any>(null);
    const xRef = useRef<number>();
    const yRef = useRef<number>();
    const isMouseDownRef = useRef<boolean>(false);
    const trailRef = useRef<number[]>([]);
    const originXRef = useRef<number>(0);
    const originYRef = useRef<number>(0);
    const PI = Math.PI;
    const width = 320;
    const height = 160;
    const l = 42;
    const r = 9;
    const L = l + r * 2 + 3;
    const onCustomVertify = (arg: API.VertifyType) => { };
    const visible = true;
    const refreshIcon = 'http://cdn.dooring.cn/dr/icon12.png'
    const drawPath = (
        ctx: any,
        x: number,
        y: number,
        operation: 'fill' | 'clip',
        ) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
        ctx.lineTo(x + l, y);
        ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
        ctx.lineTo(x + l, y + l);
        ctx.lineTo(x, y + l);
        ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
        ctx.lineTo(x, y);
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.stroke();
        ctx.globalCompositeOperation = 'destination-over';
        operation === 'fill' ? ctx.fill() : ctx.clip();
        };


    const getRandomImgSrc = () => {
        return (
            `/src/assets/images/cropped-2400-1280-1353172.jpg`
          );
    }

    const createImage = (onload:VoidFunction) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = onload;
        img.onerror = () => {
            img.src = getRandomImgSrc();   // 图片加载失败的时候重新加载其他图片
        };

      (img as any).src = getRandomImgSrc();
      return img;
    }


    const drawImg = (img: HTMLImageElement) => {
      const canvasCtx = canvasRef.current.getContext('2d');
      const blockCtx = blockRef.current.getContext('2d');
      // 随机位置创建拼图形状
      xRef.current = getRandomNumberByRange(L + 10, width - (L + 10));
      yRef.current = getRandomNumberByRange(10 + r * 2, height - (L + 10));
      drawPath(canvasCtx, xRef.current, yRef.current, 'fill');
      drawPath(blockCtx, xRef.current, yRef.current, 'clip');

      // 画入图片
      canvasCtx.drawImage(img, 0, 0, width, height);
      blockCtx.drawImage(img, 0, 0, width, height);

      // 提取滑块并放到最左边
      const y1 = yRef.current - r * 2 - 1;
      const ImageData = blockCtx.getImageData(xRef.current - 3, y1, L, L);
      blockRef.current.width = L;
      blockCtx.putImageData(ImageData, 0, y1);
    }


    const canvasInit = () => {
        const img = createImage(() => {
            setLoading(false);
            drawImg(img);
          });
          imgRef.current = img;
    }

    const verify = () => {
        const arr = trailRef.current; // 拖动时y轴的移动距离
        const average = arr.reduce(sum) / arr.length;
        const deviations = arr.map((x) => x - average);
        const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
        const left = parseInt(blockRef.current.style.left);
        return {
          spliced: Math.abs(left - xRef.current) < 10,
          verified: stddev !== 0, // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
          left,
          destX: xRef.current,
        };
      };
  
      const handleDragStart = function (e: any) {
        originXRef.current = e.clientX || e.touches[0].clientX;
        originYRef.current = e.clientY || e.touches[0].clientY;
        isMouseDownRef.current = true;
      };
  
      const handleDragMove = (e: any) => {
        if (!isMouseDownRef.current) return false;
        e.preventDefault();
        const eventX = e.clientX || e.touches[0].clientX;
        const eventY = e.clientY || e.touches[0].clientY;
        const moveX = eventX - originXRef.current;
        const moveY = eventY - originYRef.current;
        if (moveX < 0 || moveX + 38 >= width) return false;
        setSliderLeft(moveX);
        const blockLeft = ((width - 40 - 20) / (width - 40)) * moveX;
        blockRef.current.style.left = blockLeft + 'px';
  
        setSliderClass('sliderContainer sliderContainer_active');
        trailRef.current.push(moveX);
      };
  
      const handleDragEnd = (e: any) => {
        if (!isMouseDownRef.current) return false;
        isMouseDownRef.current = false;
        const eventX = e.clientX || e.changedTouches[0].clientX;
        if (eventX === originXRef.current) return false;
        setSliderClass('sliderContainer');
        const { spliced, verified } =  verify();
        if (spliced) {
          if (verified) {
            setSliderClass('sliderContainer sliderContainer_success');
            SliderVerifyHnadlerSuccess()
          } else {
            setSliderClass('sliderContainer sliderContainer_fail');
            setTextTip('请再试一次');
            SliderVerifyHnadlerFail()
            reset();
          }
        } else {
          setSliderClass('sliderContainer sliderContainer_fail');
          SliderVerifyHnadlerFail()
          reset();
        }
      };
      const handleRefresh = () => {
        reset();
      };
      const reset = () => {
        const canvasCtx = canvasRef.current.getContext('2d');
        const blockCtx = blockRef.current.getContext('2d');
        // 重置样式
        setSliderLeft(0);
        setSliderClass('sliderContainer');
        blockRef.current.width = width;
        blockRef.current.style.left = 0 + 'px';
  
        // 清空画布
        canvasCtx.clearRect(0, 0, width, height);
        blockCtx.clearRect(0, 0, width, height);
  
        // 重新加载图片
        setLoading(true);
        imgRef.current.src = getRandomImgSrc();
      };
      useEffect(() => {
          imgRef.current ? reset() : canvasInit();
      }, []);
    

    return (
    <div className='slider'>
        <div
        className="vertifyWrap"
        style={{
          width: width + 'px',
          margin: '0 auto',
          display: status ? 'block' : 'none',
        }}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
            <div className="canvasArea">
              
                <canvas ref={canvasRef} width={width} height={height}></canvas>
                <canvas
                    ref={blockRef}
                    className="block"
                    width={width}
                    height={height}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                ></canvas>
            </div>
            <div
          className={sliderClass}
          style={{
            pointerEvents: isLoading ? 'none' : 'auto',
            width: width + 'px',
          }}
        >
          <div className="sliderMask" style={{ width: sliderLeft + 'px' }}>
            <div
              className="slider"
              style={{ left: sliderLeft + 'px' }}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              <div className="sliderIcon">&rarr;</div> 
            </div>
          </div>
          <div className="sliderText">{textTip}</div>
        </div>
        <div
          className="refreshIcon"
          onClick={handleRefresh}
          style={{ backgroundImage: `url(${refreshIcon})` }}
        ></div>
        <div
          className="loadingContainer"
          style={{
            width: width + 'px',
            height: height + 'px',
            display: isLoading ? '' : 'none',
          }}
        >
          <div className="loadingIcon"></div>
          <span>加载中...</span>
        </div>
        </div>
    
    </div>
  )
}

export default SliderVerify