import React from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Display from '../components/Display';

function Landing() {
    let params = useParams();
    let navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div>
            <h4>Welcome {params.name} to UI courses</h4>
            <h4>Just Launched...</h4>
            <Link to="display/Angular">Angular</Link><br />
            <Link to="display/React">React</Link><br />
            <Link to="display/Express">Express</Link><br />
            <Link to="display/Vue">Vue</Link><br />
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>

            {/* Nested Routes for Display component */}
            <Routes>
                {/* Adjust the path to match the intended structure */}
                <Route path="display/:topic" element={<Display />} />
            </Routes>
        </div>
    );
}

export default Landing;
