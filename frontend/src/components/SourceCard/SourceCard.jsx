import React, { useState } from "react";
import "./SourceCard.css";

const SourceCard = ({ source, citationNumber }) => {
    const [showFullChunk,setShowFullChunk] = useState(false);

    return (
        <div className="source-card">

            <div className="source-card-header">

                <span className="citation-badge">
                    {citationNumber}
                </span>

                <span className="source-label">
                    Source
                </span>

            </div>


            <div className="source-document">

                {source.originalFileName}

            </div>


            <div className="source-metadata">

                Chunk {source.chunkIndex}

            </div>


            <div className="source-evidence">


                {showFullChunk?
                <span>{source.text.slice(0,1000)}<span class='more' onClick={()=>{setShowFullChunk(false)}}>  less</span></span> :
                <span>...{source.text.slice(0,200)}...<span class='less' onClick={()=>{setShowFullChunk(true)}}>  more</span></span>}

            </div>


            <button className="source-action">

                View document →

            </button>


        </div>
    );
};


export default SourceCard;