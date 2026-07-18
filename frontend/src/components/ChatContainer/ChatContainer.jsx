import React, { useEffect, useRef } from 'react'
import { assets } from '../../assets/assets'
import './ChatContainer.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Citation from '../Citation/Citation';
import { preprocessCitations } from '../../utils/preprocessCitations.js';
import { getChunk } from '../../services/api.js';


const ChatContainer = ({messages,setSourceBar,setSourceBarSources
     ,documentSourceCache,setDocumentSourceCache
}) => {
  
 async function openCitation(ids,citations){
    console.log('ids - ',ids);
    const idSet = new Set(ids);
    const sideSources =[];
    console.log('citations - ',citations);

    const selectedSources = citations.filter(source =>
      idSet.has(source.citationNumber)
    );

    for(const source of selectedSources){
       const cache = documentSourceCache[source.chunkId];
       console.log('source id - ',source.chunkId);
       console.log('cache - ',cache);
      if(cache){
        sideSources.push(cache);
      }else{
      const chunk = await getChunk(source.chunkId);
      sideSources.push(chunk);

      setDocumentSourceCache(prev => ({
          ...prev, 
          [source.chunkId]: chunk,
      }));
      }
    }


    setSourceBarSources(sideSources)
    setSourceBar(true);
  }

  return (
    <div className="chat-container">
      
  {messages.map((message, index) => (
    <div
      key={index}
      className={`message ${message.role}`}
    >
      {message.role === "assistant" && (
        <img
          src={assets.ai_icon}
          alt=""
          className="avatar"
        />
      )}

     <div className="message-content">

  {
  message.loading
    ? message.status
    : (
  
   
<ReactMarkdown
    rehypePlugins={[rehypeRaw]}
  components={{
    citation({ node }) {

        const ids = node.properties.ids
            .split(",")
            .map(id => Number(id.trim()));

        return (
            <Citation
                ids={ids}
                onClick={() => openCitation(ids,message.citations)}
            />
        );
    }
}}
>
    {preprocessCitations(message.content)}
</ReactMarkdown>

       
      )
}
</div>
    </div>
  ))}
</div>
  )
}

export default ChatContainer