import React from 'react'
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import './ChatGraph.css'
import MessageNode from "./MessageNode";
import { Position,MarkerType } from "reactflow";

const nodeTypes = {
    message: MessageNode,
};

const ChatGraph = ({messages,handleCardClick}) => {

    const pairs = [];

    for(let i = 0; i < messages.length; i += 2){

        pairs.push({
            startMessageIndex: i,
            user:messages[i],
            assistant:messages[i + 1]
        });
    }

    const nodes = [
    {
        id: "start",

        type: "message",

        position: {
            x: 0,
            y: 100,
        },
       

        data: {
            start: true,
        },
    },
    ...pairs.map((pair, index) => ({
    id: (index+1).toString(),

    type: "message",

    position: {
        x: 0,
        y: (index+1) * 350,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    data: {
       startMessageIndex:pair.startMessageIndex,
        handleCardClick,
        user:pair.user?.content,

        assistant:pair.assistant?.content,

    },
    }))];
 
   const edges = [];

// Start -> First conversation node
if (pairs.length > 0) {
    console.log("Make first edge");
    edges.push({
        id: "start-edge",
        source: "start",
        target: "1",
    });
}

// Remaining conversation edges
for (let i = 1; i < pairs.length; i++) {
    edges.push({
        id: `e${i}`,
        source: i.toString(),
        target: (i + 1).toString(),
    });
}

  return (
    <ReactFlow
    nodes={nodes}
    edges={edges}
    nodeTypes={nodeTypes}
    fitView
    defaultEdgeOptions={{
    type: "smoothstep",

    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 40,
        height: 40,
    },
}}
/>
  )
}

export default ChatGraph