import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider, useAuth } from "../src/.";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./styles.css"; // Custom CSS for additional styling

const oidcConfig = {
    authority: "https://usw2.auth.ac/auth/realms/skalena",
    client_id: "lucree",
    redirect_uri: "/",
};

function InitialPage() {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <nav
                className="bg-dark text-white p-3 flex-column d-flex"
                style={{ minWidth: "250px", minHeight: "100vh" }}
            >
                <div className="mb-4">
                    <img
                        src="https://lucreestatic.s3-us-east-2.amazonaws.com/dashboard/assets/img/brand/Nova-Logo-Lucree.svg"
                        width={100}
                        height={300}
                        alt="Logo"
                        className="img-fluid"
                    />
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">
                            Profile
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Top Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">

                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Notifications
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Center Content */}
                <div className="container p-4">
                    <h1>Welcome to the Dashboard</h1>
                    <p>This is the main content area where you can add features and data visualizations.</p>
                </div>
            </div>
        </div>
    );
}

function App() {
    const auth = useAuth();

    if (auth.isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (auth.error) {
        return (
            <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-danger mb-3">Oops...</h2>
                <p className="text-muted">{auth.error.message}</p>
            </div>
        );
    }

    if (auth.isAuthenticated) {
        return <InitialPage />;
    }

    return (
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
            {/* Logo */}
            <img
                src="https://lucreestatic.s3-us-east-2.amazonaws.com/dashboard/assets/img/brand/Nova-Logo-Lucree.svg"
                alt="Lucree Logo"
                className="img-fluid mb-4"
                style={{ maxWidth: "300px" }}
            />
            {/* Login Button */}
            <div className="container vh-20 d-flex flex-column justify-content-center align-items-center"><h2>Ambiente Protegido por Lucree ID</h2><p></p></div>


            <button
                className="btn btn-primary btn-lg"
                onClick={() => void auth.signinRedirect()}
            >
                Login como Cliente Lucree
            </button>
        </div>
    );
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
    <AuthProvider {...oidcConfig}>
        <App />
    </AuthProvider>
);
