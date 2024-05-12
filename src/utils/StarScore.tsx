import React, { useState } from 'react';
import star from '../assets/images/star.png'
interface StarScoreProps {  
    handleScoringChange: (store: number) => void;  
  }  
// 渲染5颗星得分方法
const StarScore = ({handleScoringChange} :  StarScoreProps) =>  {
    const scores = 0;
    const [startIndex, setStartIndex] = useState(0); // 初始化startIndex为0  
  
    /**  
     * 点击评分  
     */  
    const doEva = (i) => {  
        setStartIndex(i + 1);  
        handleScoringChange(i + 1);
    };  
    
    const renderScore = () => {
        let wm_poi_score : number = scores ;
        let score = wm_poi_score.toString();
        let scoreArray = score.split('.');
        // 满星个数
        let fullstar = parseInt(scoreArray[0]);
        // 半星个数
        let halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;
        // 灰色星个数
        let nullstar = 5 - fullstar - halfstar;
        let starjsx = [];
    
        // 渲染满星
        for (let i = 0; i < fullstar; i++) {
          starjsx.push(<div key={i + 'full'} className="star fullstar"></div>)
        }
        // 渲染半星
        if (halfstar) {
          for (let j = 0; j < halfstar; j++) {
            starjsx.push(<div key={j + 'half'} className="star halfstar"></div>)
          }
        }
        // 渲染灰色星
        if (nullstar) {
          for (let k = 0; k < nullstar; k++) {
            starjsx.push(<div key={k + 'null'} className="star nullstar"></div>)
          }
        }
        return starjsx;
    }

    return (
        <>
        <div className="star-score">
            {renderScore().map((star,index) => (
                <div key={index} onClick={() => doEva(index)} className={index < startIndex ? "star-item" : "star-item light"}>{star}</div>
            ))}
        </div>
        </>
    )
  
}

export default StarScore;