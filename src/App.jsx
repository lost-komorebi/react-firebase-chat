import Chat from "./components/Chat/Chat";
import List from "./components/List/List";
import Detail from "./components/Detail/Detail";
import Login from "./components/Login/Login";
import Notification from "./components/Notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    // onAuthStateChanged can get current user based on auth states
    // https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user
    const unSub = onAuthStateChanged(auth, (user) => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      fetchUserInfo(user?.uid); // When the user is undefined or null, return undefined or null instead of throwing an error.
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
