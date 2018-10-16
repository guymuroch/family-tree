import React, { Component } from "react";
import { action, observable } from "mobx";
import { observer, inject } from "mobx-react";
import "./App.css";

@inject("store")
@observer
class Children extends Component {
  @observable
  openWindow = false;
  @observable
  imageUrl = "";
  @observable
  name = "";
  @action
  openAddWindow = () => {
    this.openWindow = !this.openWindow;
  };
  @action
  getUserName = event => {
    this.name = event.target.value;
  };
  @action
  getUserImageUrl = event => {
    this.imageUrl = event.target.value;
  };
  @action
  addNewUser = () => {
    let parentId = this.props.data.id;
    this.props.store.AddUserRelation(parentId, this.name, this.imageUrl);
    this.openAddWindow();
    this.name = "";
    this.imageUrl = "";
  };
  render() {
    const data = this.props.data;
    const length = 100 / this.props.length;
    return (
      <div style={{ width: `${length}%` }} className="child">
        <h2>{data.u_name}</h2>
        <div
          onClick={this.openAddWindow}
          className="child-img"
          style={{ backgroundImage: `url(${data.u_imgUrl})` }}
        />
        {this.openWindow ? (
          <div className="new-user-window">
            <div
              className="user-Image"
              style={{ backgroundImage: `url(${data.u_imgUrl})` }}
            />
            <span onClick={this.openAddWindow}>
              &#215;
              <h5>add New user</h5>
            </span>
            <input
              onChange={this.getUserName}
              placeholder="add new user name"
            />
            <input
              onChange={this.getUserImageUrl}
              placeholder="add image url"
            />
            <button onClick={this.addNewUser}>add</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Children;
