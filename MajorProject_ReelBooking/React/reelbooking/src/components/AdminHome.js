import React from "react";
import { Link } from "react-router-dom";
import ViewUser from "./ViewUser"
import TokenDecoder from "./TokenDecoder";
import LogoutComponent from "./LogOut";
class AdminDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
       
        <div className="row mt-4" >
          <div className="col-md-3">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                <div className="card-body-icon">
                  <i className="fa fa-users"></i>
                </div>
                <h5 className="card-title">Users</h5>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to="/viewuser" className="text-white">
                  View Details <i className="fa fa-angle-right"></i>
                </Link>
                
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                <div className="card-body-icon">
                  <i className="fa fa-users"></i>
                </div>
                <h5 className="card-title">Theater Manager</h5>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to="/viewmanager" className="text-white">
                  View Details <i className="fa fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                <div className="card-body-icon">
                  <i className="fa fa-users"></i>
                </div>
                <h5 className="card-title">Theater Manager Approvals</h5>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to="/approvemanager" className="text-white">
                  View Details <i className="fa fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-danger text-white mb-4">
              <div className="card-body">
                <div className="card-body-icon">
                  <i className="fa fa-users"></i>
                </div>
                <h5 className="card-title">Users Bookings</h5>
              </div>
              <div className="card-footer d-flex align-items-center justify-content-between">
                <Link to="/viewAllbookings" className="text-white">
                  View Details <i className="fa fa-angle-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <TokenDecoder/>
      {/* <LogoutComponent/> */}
      </>
    );
  }
}

export default AdminDashboardPage;
