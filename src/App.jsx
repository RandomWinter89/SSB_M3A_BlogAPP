import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import NavigationBar from "./components/NavigationBar";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/login" element={<AuthPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="*" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;