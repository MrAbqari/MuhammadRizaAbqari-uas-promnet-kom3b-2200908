import React, { Component } from "react";
import UserService from "../services/UserService";
import './Style.css';

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  getJenisKelaminText() {
    const jenisKelaminMapping = {
      'L': 'Laki-Laki',
      'P': 'Perempuan',
      // tambahkan pemetaan lain jika diperlukan
    };
  
    return jenisKelaminMapping[this.state.user.jk] || this.state.user.jk;
  }

  getStatusText() {
    const StatusMapping = {
      'debit': 'Debit',
      'kredit': 'Kredit',
      // tambahkan pemetaan lain jika diperlukan
    };
  
    return StatusMapping[this.state.user.status] || this.state.user.status;
  }
  
  render() {
    return (
      <div className="profile-card">
        <div className="container">
        <h3 className="text-center" style={{ marginBottom: '10px' }}>View User Details</h3>
          <table className="table table-bordered table-striped table-sm">
            <tbody>
              <tr>
              <td>Date</td>
                <td>{this.state.user.date}</td>
              </tr>
              <tr>
              <td>Description</td>
                <td>{this.state.user.description}</td>
              </tr>
              <tr>
              <td>Amount</td>
                <td>{this.state.user.amount}</td>
              </tr>
              <tr>
              <td>Status</td>
                <td>{this.getStatusText()}</td>
              </tr>
              <tr>
              <td>Receiver</td>
                <td>{this.state.user.receiver}</td>
              </tr>
              <tr>
              <td>Jenis Kelamin</td>
                <td>{this.getJenisKelaminText()}</td>
              </tr>
              <tr>
                <td>Nomor Telepon</td>
                <td>{this.state.user.no_telp}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{this.state.user.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
