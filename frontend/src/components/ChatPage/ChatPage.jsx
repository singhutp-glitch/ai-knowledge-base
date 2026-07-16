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
  const [sourceBar,setSourceBar] = useState(false);
  const [sourceBarSources,setSourceBarSources] = useState(null);

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
       <div className="main-source-section">
         {graphMode?<ChatGraph messages = {messages} handleCardClick={handleCardClick}
         />:<Main currentChatId = {currentChatId} setCurrentChatId = {setCurrentChatId}
         loadChats={loadChats} messages={messages} setMessages={setMessages}
         setGraphMode = {setGraphMode} selectedPairIndex={selectedPairIndex}
         user={user} setSourceBar={setSourceBar} setSourceBarSources={setSourceBarSources}/>}
         {sourceBar&&<div className="source-bar">
          <div className="document-sources">
            {sourceBarSources.map((source)=><div key={source.sourceId}  className="document-source">
            
                <div>source:{source.sourceId}</div>
                <div>document file:{source.originalFileName}</div>
                <div>text:{source.text.slice(0,200)}</div>
            </div>
            )}
          </div>
          </div>}
       </div>
     </div>
           </>
  )
}

export default ChatPage