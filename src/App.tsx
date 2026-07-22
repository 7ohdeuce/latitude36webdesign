import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Apps from './pages/Apps';
import ChatBot from './chatbot/ChatBot';
import { useRoute } from './utils/router';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);
  const route = useRoute();

  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white" style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} route={route} />
      {route === 'apps' ? <Apps /> : <Landing entranceComplete={entranceComplete} />}
      <ChatBot />
    </div>
  );
}
