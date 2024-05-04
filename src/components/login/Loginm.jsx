import "./login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
import { auth ,db} from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore"; 
import upload from "../../lib/upload";



const Loginm = () =>{
    const [avatar,setAvatar]=useState({
        file:null,
        
        url:""
    });
    
const [loading,setLoading]=useState(false)

  
const handleRegister= async(e)=>{
    e.preventDefault();
    setLoading(true)
    const formData =new FormData(e.target);

    const {username ,email ,password} =Object.fromEntries(formData);
    console.log(username,email,password)

   try{
   const res =await createUserWithEmailAndPassword(auth,email,password);
  console.log(res)
const imgUrl = await upload(avatar.file)
console.log(imgUrl)

await setDoc(doc(db,"users", res.user.uid),{
    username,
    email,
    avatar:imgUrl,
    id: res.user.uid,
    blocked:[],
});

await setDoc(doc(db,"userchats", res.user.uid),{
    chats:[],
});
toast.success("Account created")
        
        
    }
   catch(err){
  console.log(err)
  toast.error(err.message)
   }finally{
    setLoading(false);
   }
};
const handleLogin = async (e)=>{
    e.preventDefault();
  setLoading(true);
    const formData =new FormData(e.target);

    const {email ,password} =Object.fromEntries(formData);

    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(err) {
        console.log(err);
        toast.error(err.message);

    }finally{
        setLoading(false);
    }

};
    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button disabled={loading}>{loading ? "Loading" : "Sign IN"}</button>
                </form>
            </div>
            <div className="separator"></div>
            <div className="item">
                <h2>Create an account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url|| "avatar.png"}alt="" />
                        Upload an image</label>
                    <input type="file" id="file" style={{display:"none"}} />
                <input type="text" placeholder="Username" name="username"/>
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <button disabled={loading}>{loading ? "Loading" : "Sign UP"}</button>
                </form>
            </div>
        </div>
    )
}

export default Loginm;