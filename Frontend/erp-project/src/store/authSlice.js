import { createSlice } from "@reduxjs/toolkit";

const initialState={
  Auth:false,
  user:null,
  isloading:true

}
const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    setUser:(state,action)=>{
      const user=action.payload
      state.user=user
      state.Auth=true
      state.isloading=false
    },
    logoutUser:(state)=>{
      state.Auth=false
      state.isloading=true
    }
  },
  setLoading:(state)=>{
    state.isloading=true
  },
  stopLoading:(state)=>{
    state.isloading=false
  }

})
export const {setUser,logoutUser,setLoading,stopLoading}=authSlice.actions
export default authSlice.reducer