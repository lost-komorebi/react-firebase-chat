import "./AddUser.css";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../lib/userStore";

const AddUser = () => {
  const { currentUser } = useUserStore();
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    // search user by username
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      // https://firebase.google.com/docs/firestore/query-data/queries#simple_queries
      // Create a reference to the cities collection
      const userRef = collection(db, "users");

      // Create a query against the collection.
      const q = query(userRef, where("username", "==", username));
      // Execute a query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAdd = async () => {
    // create a new chat
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    try {
      const newChatRef = doc(chatRef);
      // insert new chat into chats doc
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      // update userchats
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {/* show user searching results */}
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
