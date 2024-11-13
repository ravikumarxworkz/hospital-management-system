import React from 'react';

function AdminProfile() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h3>Admin Profile</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={`${process.env.PUBLIC_URL}/admin.jpg`}
                alt="Admin"
                className="img-fluid rounded-circle"
                width="150"
              />
              <h4 className="mt-3">Admin Name</h4>
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Email:</strong> admin@example.com
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> +91 9876543210
                </li>
                <li className="list-group-item">
                  <strong>Department:</strong> Administration
                </li>
              </ul>
              <button className="btn btn-primary mt-4">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
