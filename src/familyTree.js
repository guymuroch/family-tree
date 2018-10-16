import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import Children from "./Children";
import { action, observable } from "mobx";

@inject("store")
@observer
class FamilyTree extends Component {
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
    let parentId = this.props.store.userFamily.id;
    this.props.store.AddUserRelation(parentId, this.name, this.imageUrl);
    this.openAddWindow();
    this.name = "";
    this.imageUrl = "";
  };
  render() {
    let father = this.props.store.userFamily;
    return (
      <div>
        <div className="father">
          <h1>{father.name}</h1>
          <div
            onClick={this.openAddWindow}
            className="father-img"
            style={{ backgroundImage: `url(${father.image})` }}
          />
          {this.openWindow ? (
            <div className="new-user-window">
              <div
                className="user-Image"
                style={{ backgroundImage: `url(${father.image})` }}
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
        <div className="child-wrapper">
          {father.children
            ? father.children.map(child => {
                console.log(child);
                return (
                  <Children length={father.children.length} data={child} />
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default FamilyTree;
