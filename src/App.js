import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import { useDispatch } from "react-redux";
import { getHotels } from "./States/Actions/action";
import React, { useEffect } from "react";
// import Login from "./pages/Login/Login";
import Payment from "./components/Payment/Payment";
import Success from "./components/Success/Success";
import Layout from "./components/Layout/Layout";
// import Form from "./Form";

function App() {
  // const [mode, setMode] = useState([]);
  // const [error, setError] = useState(false);

  const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();
    useEffect(() => {
      const cantControlScrollRestoration =
        "scrollRestoration" in window.history;
      if (cantControlScrollRestoration) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }, [pathname]);

    return children;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotels());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/payment"
          element={
            <Layout>
              <Payment />
            </Layout>
          }
        />
        <Route
          path="/success"
          element={
            <Layout>
              <Success />
            </Layout>
          }
        />
        {/* <Route
          path="/form"
          element={
            <Form
              mode={mode}
              setMode={setMode}
              error={error}
              setError={setError}
            />
          }
        /> */}
        <Route
          path="/:dynamic"
          element={
            <Layout>
              <List />
            </Layout>
          }
        />
        <Route
          path="/hotels/:id"
          element={
            <Layout>
              <Hotel />
            </Layout>
          }
        />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
