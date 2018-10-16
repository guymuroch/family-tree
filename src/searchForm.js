import React, { Component } from "react";
import Search from "./SearchUser";
import "./App.css";

import { action, observable } from "mobx";
import { observer, inject } from "mobx-react";
import AddUser from "./AddUser";

@observer
class SearchForm extends Component {
  @observable
  SearchOrAdd = true;
  @observable
  button = "Add";

  @action
  userChoice = () => {
    if (this.SearchOrAdd) {
      this.SearchOrAdd = !this.SearchOrAdd;
      this.button = "Search";
    } else {
      this.SearchOrAdd = !this.SearchOrAdd;
      this.button = "Add";
    }
  };
  showData = () => {
    if (this.SearchOrAdd) {
      return <Search />;
    } else {
      return <AddUser />;
    }
  };

  render() {
    console.log(this.SearchOrAdd);
    return (
      <div>
        <a className="user-choice" onClick={this.userChoice} herf="#">
          {this.button}
        </a>
        <this.showData />
      </div>
    );
  }
}

export default SearchForm;
