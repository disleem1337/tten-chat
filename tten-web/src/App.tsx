import { Route, Router } from "@solidjs/router";
import { type Component } from "solid-js";
import JoinView from "./views/join";
import ChatView from "./views/chat";

const App: Component = () => {
  return (
    <div>
      <Router>
        <Route path="/" component={JoinView} />
        <Route path="/chat" component={ChatView} />
        <Route path="/chat/:roomId" component={ChatView} />
      </Router>
    </div>
  );
};

export default App;
