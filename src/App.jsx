import List from "./components/list/List";
import Detail from "./components/detail/Detail";
import Chatm from "./components/chat/Chatm";
import React, { useEffect } from "react";
import Loginm from "./components/login/Loginm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import Notificationm from "./components/notification/Notificationm";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";



const App = () => {

  
const {currentUser,isLoading,fetchUserInfo} =useUserStore();
const { chatId}=useChatStore();

  

    useEffect(() =>{
      const unSub = onAuthStateChanged(auth,(user) =>{
       fetchUserInfo(user?.uid);
      });

      return ()=>{
        unSub();
      };
    },[fetchUserInfo]);
    
  
if (isLoading) return <div className ="loading">Loading...</div>


  return (
    <div className='container'>
     {
      currentUser ?(
        <>
        <List 
        />
       {chatId &&  <Chatm />}
        {chatId && <Detail />}
        </>
      ):(
        <Loginm/>
      )
     }
       <Notificationm/>
    </div>
  );
};

export default App