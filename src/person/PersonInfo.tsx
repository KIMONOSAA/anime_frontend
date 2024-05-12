import React, { useState } from 'react'
import { personalCenter } from '../data/data';
import MyInfo from '../setting/MyInfo';
import MyAvatar from '../setting/MyAvatar';
import MyHome from '../setting/MyHome';
function PersonInfo() {

  const [indexName, setIndexName] = useState<number>(1)

  const handleClickDom = (index:number) => {
    setIndexName(index)
  }
  return (
    <div className='overall'>
    <img className='image' src='src/assets/images/cropped-2400-1280-1353172.jpg'  />
    <div className='user'>
      
      <div className='user-info'>
        <div className='label'>
          
            {personalCenter.map((item,index) => (
                <div className='setting'>
                    <div className='name' onClick={() => handleClickDom(index)}>
                      <p>{item.name}</p>
                    </div>
                </div>
            ))}
          
        </div>
        <div className='info'>
          {indexName === 2 ? <MyInfo /> : ''}
          {indexName === 3 ? <MyAvatar /> : ''}
          {indexName === 1 ? <MyHome /> : ''}
        </div>
    </div>
    </div>
    </div>
  )
}

export default PersonInfo