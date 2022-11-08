import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { loadUser } from "./Actions/user";
import { Home } from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import NewPost from "./Components/NewPost/NewPost";
import Register from "./Components/Register/Register";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="App">
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
        />
      </Routes>
    </div>
  );
}

export default App;
