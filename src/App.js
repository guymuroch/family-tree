import React, { Component } from "react";
import SearchForm from "./searchForm";
import { observer, inject } from "mobx-react";
import "./App.css";
@inject("store")
@observer
class App extends Component {
  changeText = e => {
    this.props.store.changeFilter(e.target.value);
  };
  render() {
    return (
      <div className="App">
        <SearchForm />
      </div>
    );
  }
}

export default App;
