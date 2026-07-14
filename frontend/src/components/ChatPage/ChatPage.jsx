import react,{ useState ,useEffect} from "react"
import './ChatPage.css'
import SideBar from "../SideBar/SideBar"
import Main from "../Main/Main"
import NavBar from "../NavBar/NavBar";
import ChatGraph from "../ChatGraph/ChatGraph";
import { getChats } from "../../services/api.js";

const ChatPage = ({user,onLogout}) => {
   const [chats,setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages,setMessages] = useState([])
  const [graphMode,setGraphMode] = useState(false);
  const [selectedPairIndex,setSelectedPairIndex] = useState(null);

  async function loadChats(){
    const userChats = await getChats();
    setChats(userChats);
  };

  useEffect(() => {
    loadChats();

  }, []);

function handleCardClick(
    pairIndex
) {
    setGraphMode(false);
    setSelectedPairIndex(
        pairIndex
    );
}

  return (
    <>
     <SideBar user={user} onLogout={onLogout} chats = {chats} setMessages={setMessages}
     currentChatId = {currentChatId} setCurrentChatId = {setCurrentChatId}/>
     <div className="nav-main-section">
       <NavBar setGraphMode={setGraphMode}/>
       {graphMode?<ChatGraph messages = {messages} handleCardClick={handleCardClick}
       />:<Main currentChatId = {currentChatId} setCurrentChatId = {setCurrentChatId}
       loadChats={loadChats} messages={messages} setMessages={setMessages}
       setGraphMode = {setGraphMode} selectedPairIndex={selectedPairIndex}
       user={user}/>}
     </div>
           </>
  )
}

export default ChatPage