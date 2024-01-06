import React, { Component } from 'react';
import UserService from '../services/UserService';
import Swal from 'sweetalert2';
import './Style.css';

class ListUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            originalUsers: [],
            selectedUsers: [],
            searchQuery: '',
        };

        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.deleteSelectedUsers = this.deleteSelectedUsers.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            if (res.data == null) {
                this.props.history.push('/add-user/_add');
            }

            const users = res.data;
            this.setState({ users, originalUsers: users });
        });
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    deleteUser(id) {
        Swal.fire({
            title: 'Apakah Anda yakin ini menghapus data yang dipilih?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            denyButtonText: 'Tidak',
            confirmButtonColor: '#3085d6',
            denyButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.deleteUser(id).then((res) => {
                    const updatedUsers = this.state.users.filter((user) => user.id !== id);

                    this.setState({
                        users: updatedUsers,
                        originalUsers: updatedUsers,
                        selectedUsers: [],
                    });
                });
            }
        });
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    handleCheckboxChange(id) {
        this.setState((prevState) => {
            const selectedUsers = [...prevState.selectedUsers];

            if (selectedUsers.includes(id)) {
                const index = selectedUsers.indexOf(id);
                selectedUsers.splice(index, 1);
            } else {
                selectedUsers.push(id);
            }

            return { selectedUsers };
        });
    }

    deleteSelectedUsers() {
        const { selectedUsers, users } = this.state;

        if (selectedUsers.length > 0) {
            // Tampilkan SweetAlert untuk konfirmasi
            Swal.fire({
                title: 'Apakah Anda yakin ingin menghapus pengguna terpilih?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ya',
                denyButtonText: 'Tidak',
                confirmButtonColor: '#d33',
                denyButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Jika pengguna memilih "Ya", lanjutkan dengan penghapusan
                    UserService.deleteUsers(selectedUsers).then((res) => {
                        const updatedUsers = users.filter((user) => !selectedUsers.includes(user.id));

                        this.setState({
                            users: updatedUsers,
                            originalUsers: updatedUsers,
                            selectedUsers: [],
                        });
                    });
                }
            });
        }
    }

    handleSearch(e) {
        e.preventDefault();
        const { searchQuery, originalUsers } = this.state;

        if (!searchQuery) {
            this.setState({ users: originalUsers });
            return;
        }

        const filteredUsers = originalUsers.filter((user) =>
            user.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.address.toLowerCase().includes(searchQuery.toLowerCase())
        );

        this.setState({ users: filteredUsers });
    }

    handleSearchInputChange(event) {
        this.setState({ searchQuery: event.target.value });
    }

    render() {
        return (
            <div className='background'>
            <div className='profile-card'>
            <div className='container'>
                <h2 className="text-center">List Data Transaksi</h2>
                <div className="row">
                    <button className="btn btn-info button" onClick={this.addUser}>
                        Tambah Data
                    </button>
                    {this.state.selectedUsers.length > 0 && (
                        <button className="btn btn-danger" onClick={this.deleteSelectedUsers}>
                            Delete
                        </button>
                    )}
                </div>
                <br />
                <div className="row">
                    <form className="input-group mb-3" onSubmit={this.handleSearch}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Cari... Description/Status/Receiver/Address"
                            aria-label="Cari"
                            aria-describedby="basic-addon2"
                            value={this.state.searchQuery}
                            onChange={this.handleSearchInputChange}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="submit"
                            >
                                Cari
                            </button>
                        </div>
                    </form>
                    <table className="table table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th></th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Receiver</th>
                                <th>Jenis Kelamin</th>
                                <th>No Telepon</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={this.state.selectedUsers.includes(user.id)}
                                            onChange={() => this.handleCheckboxChange(user.id)}
                                        />
                                    </td>
                                    <td>{user.date}</td>
                                    <td>{user.description}</td>
                                    <td className='IsiForm'>{user.amount}</td>
                                    <td className='IsiForm'>{user.status}</td>
                                    <td>{user.receiver}</td>
                                    <td className='IsiForm'>{user.jk}</td>
                                    <td className='IsiForm'>{user.no_telp}</td>
                                    <td className='IsiForm'>{user.address}</td>
                                    <td>
                                        <button onClick={() => this.editUser(user.id)} className="btn btn-info button">
                                            Update
                                        </button>
                                        <button
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => this.viewUser(user.id)}
                                            className="btn btn-info"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            </div>
        );
    }
    
}

export default ListUserComponent;
