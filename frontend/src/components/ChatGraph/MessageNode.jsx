import { Handle, Position } from "reactflow";

function MessageNode({ data }) {

      if (data.start) {
        return (
            
            <div className="start-node">
                <Handle
                type="target"
                position={Position.Top}
            />
                Start
            <Handle
                type="source"
                position={Position.Bottom}
            />

            </div>
        );
    }

    return (
        <div className="message-card" onClick={() =>
                data.handleCardClick(
                    data.startMessageIndex
                )
            }>

            <Handle
                type="target"
                position={Position.Top}
            />

            <div className="user-section">
                <strong>
                    User
                </strong>

                <p>
                    {data.user.slice(0,100)}
                </p>
            </div>

            <div className="assistant-section">
                <strong>
                    Gemini
                </strong>

                <p>
                    {data.assistant.slice(0,100)}
                </p>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
            />

        </div>
    );
}

export default MessageNode;