// slices/userSlice.js  
import { createSlice, PayloadAction } from '@reduxjs/toolkit';  
import { RootState } from './store';
  

  
// 初始状态应该是一个UserInfo对象  
const initialState: API.IsUserAndInfo = {  
  name: '',  
  description: '',  
  sex: '',  
  date: '',  
  userId: '',  
  file: null,  
  isUserInfo: false,
}; 

const userSlice = createSlice({  
  name: 'user',  
  initialState,  
  reducers: {  
    // 在setUserInfo reducer中，我们应该使用spread操作符(...)来合并旧状态和新状态  
    setUserInfo: (state, action:PayloadAction<API.UserInfo>) => {  
      // 使用spread操作符避免直接修改state对象  
      return {  
        ...state,  
        ...action.payload,  
      };  
    },
    setUserRemove: () => {
      return{
        ...initialState
      }
    },
    setIsUpdateUserInfo: (state,action:PayloadAction<boolean>) => {
        return {
          ...state,
          isUserInfo : action.payload
        }
    }  
  },  
});  
  
// 导出actions  
export const { setUserInfo, setUserRemove, setIsUpdateUserInfo } = userSlice.actions;  
  
// 导出selector，这里我们应该是选择state.user而不是state.user.initialState  
export const selectUserInfo = (state:RootState) => state.user;  

export const selectIsUpdateUserInfo = (state: RootState) => state.user.isUserInfo;
// 导出reducer  
export default userSlice.reducer;