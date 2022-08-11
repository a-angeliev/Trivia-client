import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RiddleCatalogue from "./components/RiddleCatalogue/RiddleCatalogue";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AdminAddRiddles from "./components/AdminPanel/AdminRiddles/AdminAddRiddles/AdminAddRiddles";
import AdminRiddleDetails from "./components/AdminPanel/AdminRiddles/AdminRiddleDetails/AdminRiddleDetails";

import { RiddleProvider } from "./context/riddleContext";
import { Routes, Route } from "react-router-dom";
import style from "./App.module.css";
import { AuthProvider } from "./context/authContext";

// import style from './app.css'

function App() {
    return (
        <>
            <AuthProvider>
                <RiddleProvider>
                    <main>
                        <section className={style.customer}>
                            <Header />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/riddles/:riddleId/event"
                                    element={<CreateEvent />}
                                />
                                <Route
                                    path="/riddles"
                                    element={<RiddleCatalogue />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route
                                    path="/register"
                                    element={<Register />}
                                />
                                <Route
                                    path="/admin-panel"
                                    element={<AdminPanel />}
                                >
                                    <Route
                                        path="/admin-panel/details/:riddleId"
                                        element={<AdminRiddleDetails/>}
                                    />
                                    <Route
                                        path="/admin-panel/item"
                                        element={<AdminAddRiddles/>}
                                    />
                                    
                                </Route>
                            </Routes>
                            <Footer />
                        </section>
                    </main>
                </RiddleProvider>
            </AuthProvider>
        </>
    );
}

export default App;
