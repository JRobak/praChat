import '../Home.css'
import Chat from './Chat';
import FriendsContainer from './FriendsContainer';

export default function Home() {

    function session(){
      // localStorage.setItem("name", "test");
      // console.log(localStorage.getItem("name"));
    }

    return (
      <div id="home-container">
        <div id="chat-container">
          <Chat/>
        </div>
        <div id="friends-container">
          <FriendsContainer/>
        </div>
      </div>
    )
  }