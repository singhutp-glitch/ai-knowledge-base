import React, { useEffect, useRef } from 'react'
import { assets } from '../../assets/assets'
import './ChatContainer.css'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatContainer = ({messages,selectedPairIndex,sources}) => {
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
          src={assets.gemini_icon}
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
          remarkPlugins={[remarkGfm]}
          >
  
          {message.content}
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