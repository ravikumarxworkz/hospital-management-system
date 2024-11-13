import React from 'react';

function PatientProfile() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-info text-white text-center">
          <h3>Patient Profile</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={`${process.env.PUBLIC_URL}/patient.jpg`}
                alt="Patient"
                className="img-fluid rounded-circle"
                width="150"
              />
              <h4 className="mt-3">Jane Doe</h4>
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Health ID:</strong> H12345678
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> patient@example.com
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> +91 7654321098
                </li>
              </ul>
              <button className="btn btn-info mt-4">View Medical History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
