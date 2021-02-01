import {ChatEngine} from 'react-chat-engine'
import './App.css';
import ChatFeed from './components/ChatFeed'

function App() {
  return (
    <ChatEngine 
      height='100vh'
      projectID="e178f79b-0554-4d88-b050-7a84b0470424"
      userName="tommy"
      userSecret="tommy098"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
    />
   
  );
}

export default App;
