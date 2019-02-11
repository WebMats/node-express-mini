import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    users: [],
    userIdofUpdate: null
  }

  componentDidMount() {
    this.fetchUsers()
  }
  fetchUsers = () => {
    fetch('http://localhost:4000/api/users', {method: "GET"}).then((result) => {
      if (result.status !== 200 && result.status !== 201) {
        throw Error("Failed!")
      }
      return result.json();
    }).then(users => {
      this.setState({users})
    }).catch((err) => {
      console.log(err)
    });
  }
  deleteUser = (userId) => {
    fetch(`http://localhost:4000/api/users/${userId}`, {method: "DELETE"}).then((result) => {
      if (result.status !== 200 && result.status !== 201) {
        throw Error("Failed!")
      }
      return result.json();
    }).then(users => {
      this.fetchUsers()
    }).catch((err) => {
      console.log(err)
    })
  }
  submitUpdateForm = () => {

  }
  submitNewUserForm = () => {

  }


  render() {
    return (
      <div className="App">
        <ul>
          {this.state.users.map(user => <li key={user.id}>{user.name}<button onClick={this.deleteUser.bind(this, user.id)}>DELETE</button></li>)}
        </ul>
        <form onSubmit={this.state.userIdofUpdate ? this.submitUpdateForm : this.submitNewUserForm}>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="bio">Bio</label>
              <input id="bio" placeholder="Bio" />
            </div>
            <button>{this.state.userIdofUpdate ? "Update" : "Submit"}</button>
        </form>
      </div>
    );
  }
}

export default App;
