import { getCookie } from './getCookie.js';

export default function InvitationItemToList({id, username, userCode, refreshFriendsList}) {
    function acceptInvitaton() {
        fetch('http://127.0.0.1:5000/accept_invitation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'user_id': id, 'session': getCookie('session') })
        })
        .then(response => response.json())        
        .then(data => { refreshFriendsList(); })
        .catch(error => { console.error('Error:', error); });
    }

    function declineInvitaton() {
        fetch('http://127.0.0.1:5000/decline_invitation', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'user_id': id, 'session': getCookie('session') })
        })
        .then(response => { response.json(); })
        .then(data => { refreshFriendsList(); })
        .catch(error => { console.error('Error:', error); });
    }
    
    return (
        <div className="FriendItem" style={{display:'flex', justifyContent:'space-between'}}>
            <span>{username}#{userCode}</span>
            <span>
                <i className="icon-ok" style={{color:'#72d765', cursor:'pointer'}} onClick={() => acceptInvitaton()}/>
                <i className="icon-cancel" style={{color:'#f05151', cursor:'pointer'}} onClick={() => declineInvitaton()}/>
            </span>
        </div>
    )
}
