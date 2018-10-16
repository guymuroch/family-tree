import React, { Component } from "react";
import { action, observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class AddUser extends Component {
  @observable
  userName = "";
  @observable
  userImageUrl = "";
  @action
  changeName = event => {
    this.userName = event.target.value;
  };
  @action
  changeImageUrl = event => {
    this.userImageUrl = event.target.value;
  };
  @action
  submitNewUser = () => {
    this.props.store.AddUser(this.userName, this.userImageUrl);
    this.userName = "";
    this.userImageUrl = "";
  };
  render() {
    return (
      <div>
        <div className="search-form">
          <span>user name:</span>
          <input
            onChange={event => {
              this.changeName(event);
            }}
            className="user-name"
          />
          <span>user imageUrl:</span>
          <input
            onChange={event => {
              this.changeImageUrl(event);
            }}
            className="user-image"
          />
          <button onClick={this.submitNewUser} className="searchButton">
            add
          </button>
        </div>
      </div>
    );
  }
}

export default AddUser;
