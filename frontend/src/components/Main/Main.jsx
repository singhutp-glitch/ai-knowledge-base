import React, { useEffect, useRef } from 'react'
import './Main.css'
import {assets} from '../../assets/assets.js'
import { useState } from 'react'
import { streamMessage } from '../../services/api.js'
import { createNewChatId } from '../../services/api.js'
import { uploadDocument } from '../../services/ragApi.js'
import { sendRetrievalQuery } from '../../services/ragApi.js'
import ChatContainer from '../ChatContainer/ChatContainer.jsx'
import Greet from './Greet.jsx'


const Main = ({currentChatId,setCurrentChatId,loadChats,messages,setMessages
    ,user,setSourceBar, setSourceBarSources,documentSourceCache, setDocumentSourceCache}) => {
    const [prompt,setPrompt] = useState('');
    const [documentSearch,setDocumentSearch] = useState(false);
    const bottomRef = useRef(null);
    const [showMenu,setShowMenu] = useState(false);
    const [selectedFile,setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [retrievelMode,setRetrievelMode] = useState(false);

    function handleUploadClick() {
        fileInputRef.current.click();
    };
    async function handleUpload() {

    if (!selectedFile) return;
            let chatId = currentChatId;
        if (chatId === null) {

            chatId = await createNewChatId(selectedFile.name);
            loadChats();

            setCurrentChatId(chatId);
        }

    try {

        const uploadResponse = await uploadDocument(selectedFile,chatId);

        setSelectedFile(null);

        fileInputRef.current.value = "";
        console.log(uploadResponse);

    } catch (err) {

        console.error(err);

    }

}

    function handleFileChange(event) {

    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    setShowMenu(false);

}

    async function sendModelPrompt({currentPrompt}){
         setMessages(prev => [
        ...prev,
        {
            role: "user",
            content: currentPrompt,
        },
        {
            role: "assistant",
            content: "",
            loading: true,
            citations:[],
            status:'Thinking...',
        },
    ]);

        bottomRef.current?.scrollIntoView({
        behavior: "smooth",
    });
    try {

        let chatId = currentChatId;

        if (chatId === null) {

            chatId =
                await createNewChatId(
                    currentPrompt
                );
            loadChats();

            setCurrentChatId(chatId);
        }
        let accumulated = "";

        await streamMessage(
            chatId,
            documentSearch,
            currentPrompt,
            chunk => {

                accumulated += chunk;

                setMessages(prev => {

                    const updated = [...prev];

                    updated[
                        updated.length - 1
                    ] = {
                        ...updated[
                            updated.length - 1
                        ],
                        content: accumulated,
                        loading: false,
                    };

                //     bottomRef.current?.scrollIntoView({
                //     behavior: "auto",
                //     block: "end",
                // });
                    return updated;
                });
            },
            documentSources => {
                const newChunks = Object.values(documentSources).reduce((acc, chunk) => {
                        acc[chunk.id] = chunk;
                        return acc;
                    }, {});
                    console.log("newChunks - ",newChunks);

                    setDocumentSourceCache(prev => ({
                        ...prev,
                        ...newChunks
                    }));
                const newCitations = Object.entries(documentSources).map(([citationNumber, chunk]) => ({
                    citationNumber: Number(citationNumber),
                    chunkId: chunk.id
                }));

                    console.log("newCitations - ",newCitations);


                setMessages(prev => {

                    console.log('document sources - ',documentSources);
                    const updated = [...prev];

                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        citations:newCitations,
                        loading:true
                    };

                    return updated;
                });
            
            },
            status => {
                setMessages(prev => {

                    const updated = [...prev];

                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        status
                    };

                    return updated;
                });
            
            },
            error=> {
                accumulated += error;
                setMessages(prev => {

                    const updated = [...prev];

                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content:accumulated,
                        loading:false

                    };

                    return updated;
                });
            
            }
        );
        

    } catch (error) {
        console.error(error);
    }
    }
    async function sendRetrievelQuery({retrievalQuery}){
         setMessages(prev => [
        ...prev,
        {
            role: "user",
            content: retrievalQuery,
        },
        {
            role: "assistant",
            content: "",
            documentSources:[],
            loading: true,
            status:'Retrieving...',
        },
    ]);

        bottomRef.current?.scrollIntoView({
        behavior: "smooth",
    });
    try {

        let chatId = currentChatId;

        if (chatId === null) {

            chatId =
                await createNewChatId(
                    retrievalQuery
                );
            loadChats();

            setCurrentChatId(chatId);
        };
        const response = await sendRetrievalQuery(chatId,retrievalQuery);
        const textResponse = response.chunkResults.map((chunkResult,index)=>{
            return `
Result - ${index+1}
${chunkResult.text}
            `
        })
        const textResults = textResponse.join("");
        console.log('response - ',response.chunkResults);
  
        setMessages(prev => {

                    const updated = [...prev];

                    updated[
                        updated.length - 1
                    ] = {
                        ...updated[
                            updated.length - 1
                        ],
                        content: textResults,
                        loading: false
                    };
                  
                //     bottomRef.current?.scrollIntoView({
                //     behavior: "auto",
                //     block: "end",
                // });
                    return updated;
                });
            

    } catch (error) {
        console.error(error);
    }
    }


    const handleSend = async () => {
    await handleUpload();
    if (!prompt.trim()) return;
    const userQuery = prompt;
    setPrompt("");
    if(retrievelMode){
        sendRetrievelQuery({retrievalQuery:userQuery});
    }
    else{
        sendModelPrompt({currentPrompt:userQuery});
    }
};

  return <div className="main">

    <div className="main-content-area">
        <div className="main-container">
            {messages.length === 0 ? (
                <Greet user={user} />
            ) : (
                <ChatContainer
                    messages={messages}
                    setSourceBar={setSourceBar}
                    setSourceBarSources={setSourceBarSources}
                    documentSourceCache={documentSourceCache}
                    setDocumentSourceCache={setDocumentSourceCache}
                />
            )}
        </div>

        <div ref={bottomRef}></div>
    </div>

    <div className="composer">
       
            <div className="main-bottom">
                {
                        showMenu && (
                            <div className="attachmentMenu">
                                 <button onClick={()=>{setRetrievelMode(prev=>!prev)}} >
                                    Retrievel Mode - {`${retrievelMode}`}
                                </button>
                                <button onClick={handleUploadClick} >
                                    Upload File
                                </button>
                            </div>
                        )
                    }
                    {selectedFile && (
                        <div>
                            📄 {selectedFile.name}
                        </div>
                    )}
                {!retrievelMode && (<>
                 <label className='document-search-box'>
                    Document Search
                    <input type="checkbox" checked={documentSearch} 
                    onChange={(e) =>setDocumentSearch(e.target.checked)}/>
                </label>
                </>)}
                <div className="search-box">
                    <div >
                        <img onClick={()=>{setShowMenu(!showMenu)}} src={assets.plus_icon} alt="" />
                    </div>
                  
                    <input onChange={(e)=>{setPrompt(e.target.value)}} onKeyDown={(e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    }}type="text" placeholder={retrievelMode?'Retrievel query':'Enter prompt'} value={prompt}/>
                    <div>
                        <img onClick={handleSend} src={assets.send_icon} alt="" />
                    </div>
                </div>
            </div>
    </div>

    <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleFileChange}
    />

</div>
    }
export default Main