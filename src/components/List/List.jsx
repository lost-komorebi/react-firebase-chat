import "./List.css"
import Userinfo from "./UserInfo/UserInfo"
import ChatList from "./ChatList/ChatList"
const List = ()=>{
    return <div className="list">
        <Userinfo/>
        <ChatList/>
    </div>
}

export default List