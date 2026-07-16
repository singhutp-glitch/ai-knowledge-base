import React, { useEffect, useRef } from 'react'
import { assets } from '../../assets/assets'
import './ChatContainer.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Citation from '../Citation/Citation';
import { preprocessCitations } from '../../utils/preprocessCitations.js';


const ChatContainer = ({messages,selectedPairIndex,setSourceBar,setSourceBarSources}) => {
  const pairRefs = useRef([]);
  useEffect(() => {

    if(
        selectedPairIndex === null
    ) return;

    // pairRefs.current[
    //     selectedPairIndex
    // ]?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    // });

}, [selectedPairIndex]);

  function openCitation(ids,documentSources){
    console.log('citation - ',ids);
    const sources =[];
    ids.forEach((id)=>{
      documentSources[id-1].sourceId = id;
      sources.push(documentSources[id-1])});
    setSourceBarSources(sources)
    setSourceBar(prev => !prev);
  }

  return (
    <div className="chat-container">
      
  {messages.map((message, index) => (
    <div
      key={index}
       ref={(element)=>{pairRefs.current[index] = element;}}
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

 {message.role === "assistant" &&
 message.sources?.length > 0 && (
  <div className="sources-container">
    <div>Sources:</div>
    {message.sources.map((source) => (
      <div key={source.url}>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {source.title}
        </a>
      </div>
    ))}
  </div>
)}

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
                onClick={() => openCitation(ids,message.documentSources)}
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