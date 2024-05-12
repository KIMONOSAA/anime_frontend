import React from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
function Iterate({data} : {data : never[]}) {

  return (
    <div>
        {data && (
          data.map((item,index) => (
            // <Link to={`/animeInfo/${item.id}`}>
                <div key={item.id} className='imglist-leaderboard' style={{textDecoration: 'none'}}>
                  <div className={`right ${index + 1 === 1 ? 'red' : ''  } ${index + 1 === 2 ? 'two' : ''} ${index + 1 === 3 ? 'thr' : ''} `}  >
                          <h1 >{index + 1}</h1>
                    </div>
                    <div className='flex-img-leaderboard'>
                        <Link to={`/animeInfo/${item.id}`} >
                            <div className='image-container-leaderboard'>
                                <img src={`data:image/png;base64, ${item.photo}`} alt='Room Photo' style={{width: "100px", maxWidth: "100px", height: "130px"}} />
                            </div>
                        </Link>
                        <div className='left'>
                          <p>{item.name}</p>
                          <p className='btn'>共{item.numberOfSections}集</p>
                          <p className='cols'>{item.alias}</p>
                        </div>
                      
                    </div>
                    <div className='test'>
                      <div className='left-text'>
                        <div className='eye'>
                          <FaEye size={25} color={`${index + 1 === 1 ? '#FF7340' : ''  } ${index + 1 === 2 ? '#0aa770' : ''} ${index + 1 === 3 ? '#f08080' : ''}`}/>
                          <h1>{item.totalScore}</h1>
                        </div>
                            <h3>综合热度</h3>
                            
                      </div>
                    </div>
                </div>
            // </Link>
          ))
        )}
    </div>
  )
}

export default Iterate