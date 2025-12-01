import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import ViewEmployee from './components/ViewEmployee';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        <Route path="/employees" element={
                            <PrivateRoute>
                                <EmployeeList />
                            </PrivateRoute>
                        } />

                        <Route path="/employees/add" element={
                            <PrivateRoute>
                                <AddEmployee />
                            </PrivateRoute>
                        } />

                        <Route path="/employees/edit/:id" element={
                            <PrivateRoute>
                                <EditEmployee />
                            </PrivateRoute>
                        } />

                        <Route path="/employees/view/:id" element={
                            <PrivateRoute>
                                <ViewEmployee />
                            </PrivateRoute>
                        } />

                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;