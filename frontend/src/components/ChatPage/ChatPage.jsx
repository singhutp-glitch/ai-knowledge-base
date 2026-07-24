import react,{ useState ,useEffect} from "react"
import './ChatPage.css'
import SideBar from "../SideBar/SideBar"
import Main from "../Main/Main"
import NavBar from "../NavBar/NavBar";
import SourceBar from "../SourceBar/SourceBar.jsx";
import { getChats } from "../../services/api.js";

const ChatPage = ({user,onLogout}) => {
   const [chats,setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages,setMessages] = useState([])
  const [sourceBar,setSourceBar] = useState(false);
  const [sourceBarSources,setSourceBarSources] = useState(null);
  const [documentSourceCache, setDocumentSourceCache] = useState({});
  const [sourceBarWidth, setSourceBarWidth] = useState(25 * 16);

  async function loadChats(){
    const userChats = await getChats();
    setChats(userChats);
  };

  useEffect(() => {
    loadChats();

  }, []);

function handleSourceResize(e) {

    const newWidth = window.innerWidth - e.clientX;

    if(newWidth > 300 && newWidth < 700){
        setSourceBarWidth(newWidth);
    }

}

function startResize(){

    document.addEventListener(
        "mousemove",
        handleSourceResize
    );

    document.addEventListener(
        "mouseup",
        stopResize
    );

}


function stopResize(){

    document.removeEventListener(
        "mousemove",
        handleSourceResize
    );

    document.removeEventListener(
        "mouseup",
        stopResize
    );

}

  return (
    <>
     <SideBar user={user} onLogout={onLogout} chats = {chats} setMessages={setMessages}
     currentChatId = {currentChatId} setCurrentChatId = {setCurrentChatId}/>
     <div className="workspace">
  <NavBar />

  <div className="workspace-content">
    <div className="main-content">
      <Main
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        loadChats={loadChats}
        messages={messages}
        setMessages={setMessages}
        user={user}
        setSourceBar={setSourceBar}
        setSourceBarSources={setSourceBarSources}
        documentSourceCache={documentSourceCache}
        setDocumentSourceCache={setDocumentSourceCache}
      />
    </div>

   {sourceBar && (<SourceBar startResize={startResize} sourceBarWidth={sourceBarWidth}
    sourceBarSources={sourceBarSources} setSourceBar={setSourceBar} />)}
  </div>
</div>
           </>
  )
}

export default ChatPage