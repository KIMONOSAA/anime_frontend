import React, { useEffect, useState } from 'react'
import { myinfo } from '../data/data';
import { date } from '../data/data';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { UserInfoForBackend } from '../utils/ApiFunction';
import { useNavigate } from 'react-router-dom';
import moment, { Moment } from 'moment';
import { AppDispatchs, AppSelectors } from '../store/hooks';
import { setIsUpdateUserInfo } from '../store/userSlice';




interface UserInfoMin{
  name: string;
  desc: string;
  sex: string;
  date: string;
  token:string;
}
function MyInfo() {
  const [getYear,setGetYear] = useState<number>(new Date().getFullYear());
  const [getMonth,setGetMonth] = useState<number>(new Date().getMonth());
  const [getUserClickDate,setGetUserClickDate] = useState<API.Date | null>(null);
  const [prevDate,setPrevDate] = useState<number>(0);
  const [nextDate,setNextDate] = useState<number>(0);
  const storeName = 'user_info';
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [successMessage,setSuccessMessage] = useState<string>('');
  const dispatch = AppDispatchs()
  const isUserInfoForUser = AppSelectors(state => state.user.isUserInfo)
  const [newUserInfo,setNewUserInfo] = useState<API.UserInfoMin>({
    name: '',
    desc: '',
    sex: '',
    date: '',
  });
  const [successUserInfo,setSuccessUserInfo] = useState({});
  const navigate = useNavigate(); 
  const [newInactiveDays,setNewInactiveDays] = useState<number[]>([]);
  const [showCalendar,setShowCalendar] = useState<boolean>(false)
  const [activeIndex,setActiveIndex] = useState<number | null>(null)
  const handleAddYear = () => {

  }

  const handleUserInfoSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // 确保变量名称一致

    if (token !== null && token !== '') {
        const updatedUserInfo = {...newUserInfo, token: token};
        UserInfoForBackend(updatedUserInfo).then((data) => {
            if (data.data) {
                dispatch(setIsUpdateUserInfo(!isUserInfoForUser))
                setSuccessMessage("提交成功");
                setSuccessUserInfo(data.data)
            } else {
                setErrorMessage("请到登录页面，令牌无效");
            }

            setTimeout(() => {
              setErrorMessage("")
              setSuccessMessage("")
            },3000)
        }).catch((error) => {
            setErrorMessage(error.message); // 确保使用 error.message
            setTimeout(() => {
              setErrorMessage("")
            },3000)
        });
    } else {
        navigate("/login");
    }
}


  const handleAddMonth = () => {

  }

  const handleSetYear = () => {

  }

  const handleSetMonth = () => {

  }

  const handleSubYear = () => {

  }

  const handleSubMonth = () => {

  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUserInfo({...newUserInfo, [name] : value});

  }
  const handleButtonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value;
    setNewUserInfo({...newUserInfo,[name] : value})

  }
  const handleTextAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUserInfo({...newUserInfo, [name] : value});
  }
  const handleButtonSetDate = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowCalendar(true)

  }
  const getYearAndMonth: () => [number,number,number[]]  = (): [number,number,number[]]  => {
    const currentYearFirstDay : number = new Date(getYear, getMonth,1).getDay();
    const prevYearLastDate: number = new Date(getYear, getMonth,0).getDate();
    const currentYearLastDate: number = new Date(getYear,getMonth + 1,0).getDate();
    const currentYearLastDay: number = new Date(getYear,getMonth,currentYearLastDate).getDay();
    const inactiveDays : number[] = [];
    
    
    for(let i = currentYearFirstDay; i > 0; i--) {
        inactiveDays.push(prevYearLastDate - i + 1)
    }
    for(let i = 1; i <= currentYearLastDate; i++){
       inactiveDays.push(i)
    }
    for(let i = currentYearLastDay; i < 6;i++){
        inactiveDays.push(i - currentYearLastDay + 1)
    }
    const newPrevDate : number = currentYearFirstDay;
    const newNextDate : number = currentYearFirstDay +  currentYearLastDate;
    return [newPrevDate, newNextDate, inactiveDays]
  }

  const handleLiClick = (index:number,item:number) => {
    setActiveIndex(index === activeIndex ? null : index)
    const originalDate:Moment = moment(`${getYear}-${getMonth + 1}-${item}`, "YYYY-M-D");  
    const formattedDate:string = originalDate.format("YYYY-MM-DD");  
    setNewUserInfo({...newUserInfo, date : formattedDate})
    const newGetMonth = getMonth < 10 ? `0${getMonth + 1}` : `${getMonth + 1}`;  
    const newDay = item < 10 ? `0${item}` : `${item}`; 
    setShowCalendar(false)
    setGetUserClickDate({year:getYear, month:parseInt(newGetMonth), day:parseInt(newDay)})
  }
  useEffect(() => {
      
    const [newPrevDate,newNextDate,inactiveDays] = getYearAndMonth();
    if (prevDate !== newPrevDate) {
      setPrevDate(newPrevDate);
    }
    if (nextDate !== newNextDate) {
      setNextDate(newNextDate);
    }
    setNewInactiveDays(inactiveDays)
    

  },[getYear,getMonth])

  useEffect(() => {
    const initialActiveIndex = newInactiveDays.findIndex((item,index) => item === new Date().getDate() && getMonth === new Date().getMonth())
    if(initialActiveIndex !== -1){
      setActiveIndex(initialActiveIndex)
    }

  },[newInactiveDays,getMonth,getYear])
  return (
    <div className='center'>
      
        {successMessage && <div className='success'>{successMessage}</div>}
        {errorMessage && <div className='error'>{errorMessage}</div>}
      
      <div className='myinfo'>
        <form onSubmit={handleUserInfoSubmit}>
          {myinfo.map((item,index) => (
             <div className='right-flex' key={index}>
                <div className='type'>
                  <label key={index}>{item.name}:</label>
                </div>
                {
                    item.type === 'text' && (
                      <div className='name'>
                        <input type="text" name={item.tragtname} className='input-border' value={item.tragtname === "name" ? newUserInfo.name : '' } onChange={handleInputChange}  />
                      </div>
                    )
                }
                {
                    item.type === 'sex' && (
                      <div className='name'>
                          <button type="button" name='sex' className={newUserInfo.sex === "男" ? 'btns' : '' } value="男" onClick={handleButtonClick} >男</button>
                          <button type="button" name='sex' className={newUserInfo.sex === "女" ? 'btns' : '' } value="女" onClick={handleButtonClick}  >女</button>
                          <button type="button" name='sex' className={newUserInfo.sex === "保密" ? 'btns' : '' } value="保密" onClick={handleButtonClick}  >保密</button>
                      </div>
                    )
                }
                {
                    item.type === 'area' && (
                      <div className='name'>
                          <textarea  name='desc' className='textarea-border' value={newUserInfo.desc} onChange={handleTextAreaChange}></textarea>
                      </div>
                    )
                }
                {
                    item.type === 'date' && (
                      <div className='name'>
                          {getUserClickDate ? (<button type='button' className='input-button' onClick={handleButtonSetDate}>{getUserClickDate?.year}-{getUserClickDate?.month}-{getUserClickDate?.day}</button>) : (<button  type='button' className='input-button' onClick={handleButtonSetDate}>请输入出生日期</button>)}
                          <div className='input-relative'>
                            <LuCalendarDays color='rgb(182, 181, 181)'/>
                          </div>
                      </div>
                    )
                }


                
             </div>

          ))}
          <button type='submit' className='save'>保存</button>
          <div className={`${showCalendar ? 'calendar-show' : '' } calendar`}>
              <div className='calendar-top'>
                  <div className='left-arrow'>
                    <div className='left-year' onClick={handleAddYear}><MdKeyboardDoubleArrowLeft size={25} color='rgb(201, 197, 197)'/></div>
                    <div className='left-month' onClick={handleAddMonth}><MdKeyboardArrowLeft size={25} color='rgb(201, 197, 197)'/ ></div>
                  </div>
                  <div className='center-text'>
                    <div className='year' onClick={handleSetYear}>{`${getYear && getYear}年`}</div>
                    <div className='month' onClick={handleSetMonth}>{`${getMonth && getMonth + 1}月`}</div>
                  </div>
                  <div className='right-arrow'>
                    <div className='right-year' onClick={handleSubYear}><MdOutlineKeyboardDoubleArrowRight color='rgb(201, 197, 197)' size={25}/></div>
                    <div className='right-month' onClick={handleSubMonth}>
                      <MdOutlineKeyboardArrowRight color='rgb(201, 197, 197)' size={25}/>
                    </div>
                  </div>
              </div>
              <div className='calendar-body'>
                  <ul>
                    {
                      
                        date.map((item,index) => (
                            <li className='day' key={index}>{item}</li>
                        ))
                      
                    }
                  </ul>
                  <div className='calendar-number'>
                    <ul className='calendar-number-ul'>
                    {
                        newInactiveDays.map((item,index) => (
                          <li key={index} className={`${((index + 1) <= prevDate) || ((index + 1) > nextDate)  ? 'inactive' : 'btn' } ${index === activeIndex ? 'active' : ''}`} onClick={() => handleLiClick(index,item)}>{item}</li>
                        ))
                    }
                    </ul>
                  </div>
              </div>
          </div> 
        </form>
      </div>
    </div>
  )
}

export default MyInfo