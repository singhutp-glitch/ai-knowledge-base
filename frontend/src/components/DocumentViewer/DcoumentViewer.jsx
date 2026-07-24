import React from 'react'
import './DocumentViewer.css'

const DocumentViewer = ({setViewerOpen,startDocumentResize,documentViewerWidth}) => {

  return (
     <>
        <div
            className="document-resize-handle"
            onMouseDown={startDocumentResize}
        />

        <aside
            className="document-viewer"
            style={{
                width:`${documentViewerWidth}px`
            }}
        >

        <div className="document-viewer-header">

            <div>
                <h2>Document Viewer</h2>
            </div>

            <button
                className="close-document-viewer"
                onClick={() => setViewerOpen(false)}
            >
                ✕
            </button>

        </div>

        <div className="document-viewer-content">

            Document Viewer

        </div>

    </aside>
     </>
  )
}

export default DocumentViewer