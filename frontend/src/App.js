import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './screens/landing/Landing';
import Login from './screens/login/Login';
import Lobby from './screens/lobby/Lobby';
import WaitingRoom from './screens/waiting_room/WaitingRoom';
import RoleAssignment from './screens/role_assignment/RoleAssignment';
import Game from './screens/game/Game';
import GameEnd from './screens/game_end/GameEnd';
import NotFound from './screens/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:codigo/waiting" element={<WaitingRoom />} />
        <Route path="/game/:codigo/role" element={<RoleAssignment />} />
        <Route path="/game/:codigo/play" element={<Game />} />
        <Route path="/game/:codigo/end" element={<GameEnd />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;