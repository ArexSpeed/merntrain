import {ChatEngine} from 'react-chat-engine'
import './App.css';
import ChatFeed from './components/ChatFeed'
import LoginForm from './components/LoginForm';

const projectID = "e178f79b-0554-4d88-b050-7a84b0470424"
function App() {
  if (!localStorage.getItem('username')) return <LoginForm />;
  return (
    <ChatEngine 
      height='100vh'
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/>}
    />
   
  );
}

export default App;
