import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import './Employee.css';

const ViewEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const fetchEmployee = async () => {
        try {
            setLoading(true);
            const response = await employeeAPI.getById(id);
            setEmployee(response.data.data);
        } catch (err) {
            setError('Failed to fetch employee details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading employee details...</div>;
    }

    if (error) {
        return (
            <div className="employee-container">
                <div className="error-message">{error}</div>
                <button onClick={() => navigate('/employees')} className="btn-secondary">
                    Back to List
                </button>
            </div>
        );
    }

    if (!employee) {
        return (
            <div className="employee-container">
                <div className="error-message">Employee not found</div>
                <button onClick={() => navigate('/employees')} className="btn-secondary">
                    Back to List
                </button>
            </div>
        );
    }

    return (
        <div className="employee-container">
            <div className="form-header">
                <h2>Employee Details</h2>
                <div>
                    <button
                        onClick={() => navigate(`/employees/edit/${id}`)}
                        className="btn-primary"
                        style={{ marginRight: '10px' }}
                    >
                        Edit
                    </button>
                    <button onClick={() => navigate('/employees')} className="btn-secondary">
                        Back to List
                    </button>
                </div>
            </div>

            <div className="employee-detail-card">
                <div className="detail-header">
                    {employee.profile_picture ? (
                        <img
                            src={`http://localhost:5000/${employee.profile_picture}`}
                            alt={employee.first_name}
                            className="detail-profile-pic"
                        />
                    ) : (
                        <div className="detail-profile-placeholder">
                            {employee.first_name[0]}{employee.last_name[0]}
                        </div>
                    )}
                    <div className="detail-header-info">
                        <h3>{employee.first_name} {employee.last_name}</h3>
                        <p className="detail-position">{employee.position}</p>
                    </div>
                </div>

                <div className="detail-grid">
                    <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{employee.email}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Department:</span>
                        <span className="detail-value">{employee.department}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Position:</span>
                        <span className="detail-value">{employee.position}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Salary:</span>
                        <span className="detail-value">${employee.salary.toLocaleString()}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Date of Joining:</span>
                        <span className="detail-value">
                            {new Date(employee.date_of_joining).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Employee ID:</span>
                        <span className="detail-value">{employee._id}</span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Created At:</span>
                        <span className="detail-value">
                            {new Date(employee.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>

                    <div className="detail-item">
                        <span className="detail-label">Last Updated:</span>
                        <span className="detail-value">
                            {new Date(employee.updated_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployee;