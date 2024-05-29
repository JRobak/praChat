import { getCookie } from './getCookie.js';

export default function Conversation({ currentConversationId }) {
    return (
        <>
        {currentConversationId > 0 && <div id="conversation-container">
            { currentConversationId }
        </div>}
        </>
    )
}