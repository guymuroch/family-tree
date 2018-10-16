import React, { Component } from "react";
import FamilyTree from "./familyTree";
import { action, observable } from "mobx";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class Search extends Component {
  @observable
  userClick = false;

  @observable
  filter = "";
  @observable
  userMessage = "";
  @action
  changeMessage = word => {
    this.userMessage = word;
  };
  @action
  changeFilter(word) {
    this.filter = word;
  }
  changeText = e => {
    this.changeFilter(e.target.value);
  };
  getUsers = () => {
    this.props.store.getUser(this.filter).then(() => {
      if (this.props.store.userFamily === "nagetive") {
        this.changeMessage("doesn't exist");
      } else {
        this.changeMessage("");
      }
    });
  };
  @action
  changeClick() {
    this.userClick = !this.userClick;
  }
  change = () => {
    this.props.change();
  };

  render() {
    return (
      <div>
        <div className="search-form">
          <span style={{ color: "red" }}>
            {this.userMessage || "user name"}
          </span>
          <input
            className="search-input"
            onChange={event => {
              this.changeText(event);
            }}
          />
          <button className="searchButton" onClick={this.getUsers}>
            search
          </button>
        </div>

        {this.props.store.userFamily ? <FamilyTree /> : null}
      </div>
    );
  }
}

export default Search;
