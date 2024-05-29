import React, { useState, useEffect } from 'react';
import FriendItemToList from './FriendItemToList';
import InvitationItemToList from './InvitationItemToList';
import { getCookie } from './getCookie.js';

export default function FriendsContainer() {
    const [friendsList, setFriendsList] = useState([]);
    const [invitationsList, setInvitationsList] = useState([]);
    const [inputValue, setInputValue] = useState([]);
    const [inputMessage, setInputMessage] = useState('Enter name#444');

    function refreshFriendsList() {
        // console.log('refreshing friends list');
        fetch('http://127.0.0.1:5000/get_every_friend?session=' + getCookie('session'), {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            setFriendsList(data.friends);
        })

        fetch('http://127.0.0.1:5000/get_every_invitations?session=' + getCookie('session'), {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            setInvitationsList(data.invitations);
        })
    }

    function invite() {
        fetch('http://127.0.0.1:5000/invite_friend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'user_input': inputValue, 'session': getCookie('session')}),
        })
        .then(response => response.json())
        .then(data => {
            setInputValue(''),
            setInputMessage(data.message)
        })
        .catch(error => { console.error('Error adding entry:', error); });
    }

    useEffect(() => {
        refreshFriendsList();
    }, []);
    
    return (
        <>
            <div id="friends-list-top-box">
                <span color='#f6b17a'>Friend List</span>
                <i className='icon-arrows-cw' onClick={() => refreshFriendsList()} style={{ cursor: 'pointer' }}/>
            </div>
            <div id="friends-list"> 
                {invitationsList.map(item => (
                    <InvitationItemToList key={item.id} id={item.id} username={item.username} userCode={item.userCode} refreshFriendsList={refreshFriendsList} />
                ))}               
                {friendsList.map(item => (
                    <FriendItemToList key={item.id} id={item.id} username={item.username} userCode={item.userCode}/>
                ))}   
            </div>
            <div id="friends-bottom-box">
                <input type="text" placeholder={inputMessage} value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
                <button onClick={invite}>Add</button>
                <div id="your-profile"></div>                
            </div>
        </>
    )
  }