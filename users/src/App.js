import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props) 
    this.nameInput = React.createRef();
    this.bioInput = React.createRef();
  }
  state = {
    users: [],
    userIdofUpdate: null
  }

  componentDidMount() {
    this.fetchUsers()
  }
  fetchUsers = () => {
    fetch('http://localhost:4000/api/users', {method: "GET"}).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        throw Error("Failed!")
      }
      return response.json();
    }).then(users => {
      this.setState({users})
    }).catch((err) => {
      console.log(err)
    });
  }
  deleteUser = (e, userId) => {
    e.stopPropagation();
    fetch(`http://localhost:4000/api/users/${userId}`, {method: "DELETE"}).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        throw Error("Failed!")
      }
      return response.json();
    }).then(users => {
      this.fetchUsers()
    }).catch((err) => {
      console.log(err)
    })
  }
  submitUpdateForm = (e) => {
    e.preventDefault();
    const requestBody = {
      name: this.nameInput.current.value, 
      bio: this.bioInput.current.value
    };
    fetch(`http://localhost:4000/api/users/${this.state.userIdofUpdate}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw Error("Failed!")
      }
      this.nameInput.current.value = '';
      this.bioInput.current.value = '';
      return response.json();
    }).then(user => {
      this.fetchUsers()
    }).catch(err => {
      console.log(err)
    })
  }
  submitNewUserForm = (e) => {
    e.preventDefault();
    const requestBody = {
      name: this.nameInput.current.value, 
      bio: this.bioInput.current.value
    };
    fetch('http://localhost:4000/api/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw Error("Failed!")
      }
      this.nameInput.current.value = '';
      this.bioInput.current.value = '';
      return response.json();
    }).then(user => {
      this.fetchUsers()
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    return (
      <div className="App">
        <div>
          <h3>Click on any to update</h3>
          <ul>
            {this.state.users.map(user => <li 
                                            key={user.id} 
                                            onClick={() => {this.setState({userIdofUpdate: user.id})}}
                                          >{user.name}<button onClick={(e) => this.deleteUser(e, user.id)}>DELETE</button></li>)}
          </ul>
        </div>
          <form onSubmit={this.state.userIdofUpdate ? this.submitUpdateForm : this.submitNewUserForm} autoComplete="off">
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" placeholder="Name" required ref={this.nameInput}/>
              </div>
              <div>
                <label htmlFor="bio">Bio</label>
                <input id="bio" placeholder="Bio" required ref={this.bioInput}/>
              </div>
              <button>{this.state.userIdofUpdate ? "Update" : "Submit"}</button>
          </form>
      </div>
    );
  }
}

export default App;
