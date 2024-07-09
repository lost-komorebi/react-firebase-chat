import "./UserInfo.css";
import { useUserStore } from "../../../lib/userStore";
const Userinfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        {/* show default avatar if user has no avatar */}
        <img src={currentUser.avatar || "./avatar.png"}></img>
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png"></img>
        <img src="./video.png"></img>
        <img src="./edit.png"></img>
      </div>
    </div>
  );
};

export default Userinfo;
