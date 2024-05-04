import "./addUser.css";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { useUserStore } from "../../lib/userStore";

const AddUserm = () =>{
const {user,setUser} =useState(null)
    const handleSearch =async e=>{
e.preventDefault()
const formData = new FormData(e.target);
const {currentUser} =useUserStore()
const username = formData.get("username");

try{
    const userRef = collection(db, "users");
    

// Create a query against the collection.
const q = query(userRef, where("username", "==", username));
const querySnapShot = await getDocs(q)

if(!querySnapShot.empty){
setUser(querySnapShot.docs[0].data());
}
}catch(err){
    console.log(err);
} 
    };
const handleAdd = async () =>{

    const chatRef =collection (db,"chats")
    const userChatRef =collection (db,"userchats")
    try {
   const newChatRef = doc(chatRef)

       await setDoc (newChatRef.id,{
            createdAt:serverTimestamp(),
            messages:[],
        });
await updateDoc(doc(userChatRef,user.id),{
    chats:arrayUnion({
        chatId:newChatRef.id,
        lastMessage:"",
        receiverId:currentUser.id,
        updatedAt :Date.now(),
    }),
});

await updateDoc(doc(userChatRef,currentUser.id),{
    chats:arrayUnion({
        chatId:newChatRef.id,
        lastMessage:"",
        receiverId:user.id,
        updatedAt :Date.now(),
    }),
});

        
    } catch (err) {
        console.log(err);
    }
};

    return (
        <div className ="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username"/>
                <button>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>}
        </div>
    )
}
export default AddUserm;