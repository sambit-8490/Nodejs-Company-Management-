import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(

    <Router>
        <AuthProvider>
        <App/>
        </AuthProvider> 
    </Router>
)