import React from "react";
import "./SourceCard.css";

const SourceCard = ({ source, citationNumber }) => {

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

                "...{source.text.slice(0,200)}..."

            </div>


            <button className="source-action">

                View document →

            </button>


        </div>
    );
};


export default SourceCard;