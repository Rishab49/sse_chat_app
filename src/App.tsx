import { Route } from "wouter";
import JoinPage from "./pages/JoinPage";
import ChatPage from "./pages/ChatPage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import Error from "./pages/404";

function App() {
  return (
    <>
      <Header />
      <Route path="/create-account">
        <CreatePage />
      </Route>
      <Route path="/">
        <LoginPage />
      </Route>
      <Route path="/join/:userID/:name">
        {(params) => (
          <JoinPage userID={params.userID} name={params.name}></JoinPage>
        )}
      </Route>
      <Route path="/chat">
        <ChatPage></ChatPage>
      </Route>
      <Route path="/404/:type">
        {(params) => <Error type={params.type}></Error>}
      </Route>
    </>
  );
}

export default App;
