import React, { useState, useEffect } from 'react';
import FriendItemToList from './FriendItemToList';

export default function FriendsContainer() {
    const [friendsList, setFriendsList] = useState([]);

    function refreshFriendsList() {
        console.log('refreshing friends list');
    }

    useEffect(() => {
        refreshFriendsList();
    }, []);
    
    return (
        <>
            <div style={{ position: 'relative', width: '100%'}}>
                <i className='icon-arrows-cw' onClick={()=>refreshFriendsList()} style={{ color: '#f6b17a', fontSize: '24px', position: 'absolute', top: '8px', right: '10px', cursor: 'pointer' }}/>
            </div>
            <div id="friends-list">
                {friendsList.map(item => {
                    <FriendItemToList key={item.id}/>
                })}
            </div>
            <div id="friends-bottom-box">
                <input type="text" placeholder="Enter name#444"></input>
                <button>Add</button>
                <div id="your-profile"></div>
            </div>
        </>
    )
  }