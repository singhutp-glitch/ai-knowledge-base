import react,{ useState ,useEffect} from "react"
import './ChatPage.css'
import SideBar from "../SideBar/SideBar"
import Main from "../Main/Main"
import NavBar from "../NavBar/NavBar";
import { getChats } from "../../services/api.js";

const ChatPage = ({user,onLogout}) => {
   const [chats,setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages,setMessages] = useState([])
  const [sourceBar,setSourceBar] = useState(false);
  const [sourceBarSources,setSourceBarSources] = useState(null);
  const [documentSourceCache, setDocumentSourceCache] = useState({});

  async function loadChats(){
    const userChats = await getChats();
    setChats(userChats);
  };

  useEffect(() => {
    loadChats();

  }, []);

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

   {sourceBar && (
    <aside className="source-bar">

        <div className="source-bar-header">

            <div>
                <h2>Sources</h2>
                <p>
                    {sourceBarSources.length} supporting passage
                    {sourceBarSources.length !== 1 ? "s" : ""}
                </p>
            </div>

            <button
                className="close-source-bar"
                onClick={() => setSourceBar(false)}
            >
                ✕
            </button>

        </div>

        <div className="source-bar-content">

            <div className="document-sources">

                {sourceBarSources.map((source, index) => (

                    <div
                        key={source.id ?? index}
                        className="document-source"
                    >

                        <div>
                            Source {index + 1}
                        </div>

                        <div>
                            {source.document.originalFileName}
                        </div>

                        <div>
                            {source.text.slice(0, 200)}...
                        </div>

                    </div>

                ))}

            </div>

        </div>

    </aside>
)}
  </div>
</div>
           </>
  )
}

export default ChatPage