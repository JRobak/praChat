import { useState } from 'react'

export default function FriendItemToList({id, username, userCode}) {
    const [codeActive, setCodeActive] = useState(false);
    
    return (
        <div className="FriendItem" onMouseEnter={() => setCodeActive(true)} onMouseLeave={() => setCodeActive(false)}>
            {username}{codeActive && <span style={{opacity:"0.8"}}>#{userCode}</span>}
        </div>
    )
  }