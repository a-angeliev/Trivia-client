import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RiddleCatalogue from "./components/RiddleCatalogue/RiddleCatalogue";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from './components/Logout/Logout'
import Register from './components/Register/Register'
import CreateEvent from "./components/CreateEvent/CreateEvent";

import { RiddleProvider } from "./context/riddleContext";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import style from "./App.module.css";
import { AuthProvider } from "./context/authContext";
// import style from './app.css'

function App() {
    return (
        <>
            <AuthProvider>
                <Header />
                <main>
                    <RiddleProvider>
                        <Routes>

                            <Route path="/" element={<Home />} />
                            <Route path="/riddles/:riddleId/event" element={<CreateEvent/>}/>
                            <Route
                                path="/riddles"
                                element={<RiddleCatalogue />}
                            />
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/logout' element={<Logout/>}/>
                            <Route path='/register' element={<Register/>}/>
                        </Routes>
                    </RiddleProvider>
                </main>
                <Footer />
            </AuthProvider>
            {/* <Routes>
            <Route path="/" element={<></>} />
            </Routes> */}
        </>
    );
}

export default App;
