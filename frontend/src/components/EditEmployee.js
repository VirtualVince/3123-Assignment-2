import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { employeeAPI } from '../services/api';
import './Employee.css';

const EditEmployee = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
        profile_picture: null
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [apiError, setApiError] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const fetchEmployee = async () => {
        try {
            setFetchLoading(true);
            const response = await employeeAPI.getById(id);
            const employee = response.data.data;

            setFormData({
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                position: employee.position,
                salary: employee.salary,
                date_of_joining: employee.date_of_joining.split('T')[0],
                department: employee.department,
                profile_picture: null
            });

            if (employee.profile_picture) {
                setCurrentImage(`http://localhost:5000/${employee.profile_picture}`);
            }
        } catch (error) {
            setApiError('Failed to fetch employee details');
        } finally {
            setFetchLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profile_picture: file
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) {
            newErrors.first_name = 'First name is required';
        }

        if (!formData.last_name.trim()) {
            newErrors.last_name = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.position.trim()) {
            newErrors.position = 'Position is required';
        }

        if (!formData.department.trim()) {
            newErrors.department = 'Department is required';
        }

        if (!formData.salary) {
            newErrors.salary = 'Salary is required';
        } else if (isNaN(formData.salary) || Number(formData.salary) < 0) {
            newErrors.salary = 'Salary must be a positive number';
        }

        if (!formData.date_of_joining) {
            newErrors.date_of_joining = 'Date of joining is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validate()) return;

        setLoading(true);
        try {
            await employeeAPI.update(id, formData);
            navigate('/employees');
        } catch (error) {
            setApiError(
                error.response?.data?.message || 'Failed to update employee. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return <div className="loading">Loading employee details...</div>;
    }

    return (
        <div className="employee-container">
            <div className="form-header">
                <h2>Edit Employee</h2>
                <button onClick={() => navigate('/employees')} className="btn-secondary">
                    Back to List
                </button>
            </div>

            {apiError && <div className="error-message">{apiError}</div>}

            <div className="employee-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name *</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className={errors.first_name ? 'error' : ''}
                            />
                            {errors.first_name && <span className="error-text">{errors.first_name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="last_name">Last Name *</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className={errors.last_name ? 'error' : ''}
                            />
                            {errors.last_name && <span className="error-text">{errors.last_name}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="position">Position *</label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className={errors.position ? 'error' : ''}
                            />
                            {errors.position && <span className="error-text">{errors.position}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="department">Department *</label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className={errors.department ? 'error' : ''}
                            />
                            {errors.department && <span className="error-text">{errors.department}</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="salary">Salary *</label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className={errors.salary ? 'error' : ''}
                            />
                            {errors.salary && <span className="error-text">{errors.salary}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="date_of_joining">Date of Joining *</label>
                            <input
                                type="date"
                                id="date_of_joining"
                                name="date_of_joining"
                                value={formData.date_of_joining}
                                onChange={handleChange}
                                className={errors.date_of_joining ? 'error' : ''}
                            />
                            {errors.date_of_joining && <span className="error-text">{errors.date_of_joining}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="profile_picture">Profile Picture</label>
                        {currentImage && !previewImage && (
                            <div className="image-preview">
                                <p>Current Image:</p>
                                <img src={currentImage} alt="Current" />
                            </div>
                        )}
                        <input
                            type="file"
                            id="profile_picture"
                            name="profile_picture"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {previewImage && (
                            <div className="image-preview">
                                <p>New Image:</p>
                                <img src={previewImage} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Updating Employee...' : 'Update Employee'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/employees')}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;