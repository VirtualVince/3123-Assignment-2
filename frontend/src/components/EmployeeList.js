import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { employeeAPI } from '../services/api';
import './Employee.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchDepartment, setSearchDepartment] = useState('');
    const [searchPosition, setSearchPosition] = useState('');

    const navigate = useNavigate();
    const { logout, user } = useAuth();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await employeeAPI.getAll();
            setEmployees(response.data.data);
            setFilteredEmployees(response.data.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch employees');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchDepartment && !searchPosition) {
            setFilteredEmployees(employees);
            return;
        }

        try {
            const params = {};
            if (searchDepartment) params.department = searchDepartment;
            if (searchPosition) params.position = searchPosition;

            const response = await employeeAPI.search(params);
            setFilteredEmployees(response.data.data);
        } catch (err) {
            setError('Search failed');
            console.error(err);
        }
    };

    const handleClearSearch = () => {
        setSearchDepartment('');
        setSearchPosition('');
        setFilteredEmployees(employees);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await employeeAPI.delete(id);
                fetchEmployees();
            } catch (err) {
                setError('Failed to delete employee');
                console.error(err);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="loading">Loading employees...</div>;
    }

    return (
        <div className="employee-container">
            <div className="header">
                <div className="header-left">
                    <h1>Employee Management System</h1>
                    <p className="welcome-text">Welcome, {user?.username}!</p>
                </div>
                <button onClick={handleLogout} className="btn-logout">
                    Logout
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="actions-bar">
                <button
                    onClick={() => navigate('/employees/add')}
                    className="btn-primary"
                >
                    + Add Employee
                </button>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by Department"
                        value={searchDepartment}
                        onChange={(e) => setSearchDepartment(e.target.value)}
                        className="search-input"
                    />
                    <input
                        type="text"
                        placeholder="Search by Position"
                        value={searchPosition}
                        onChange={(e) => setSearchPosition(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={handleSearch} className="btn-search">
                        Search
                    </button>
                    <button onClick={handleClearSearch} className="btn-secondary">
                        Clear
                    </button>
                </div>
            </div>

            {filteredEmployees.length === 0 ? (
                <div className="no-data">
                    <p>No employees found</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Date of Joining</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee) => (
                                <tr key={employee._id}>
                                    <td>
                                        {employee.profile_picture ? (
                                            <img
                                                src={`http://localhost:5000/${employee.profile_picture}`}
                                                alt={employee.first_name}
                                                className="profile-pic"
                                            />
                                        ) : (
                                            <div className="profile-placeholder">
                                                {employee.first_name[0]}{employee.last_name[0]}
                                            </div>
                                        )}
                                    </td>
                                    <td>{employee.first_name} {employee.last_name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.department}</td>
                                    <td>${employee.salary.toLocaleString()}</td>
                                    <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => navigate(`/employees/view/${employee._id}`)}
                                                className="btn-view"
                                                title="View"
                                            >
                                                👁️
                                            </button>
                                            <button
                                                onClick={() => navigate(`/employees/edit/${employee._id}`)}
                                                className="btn-edit"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(employee._id)}
                                                className="btn-delete"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;