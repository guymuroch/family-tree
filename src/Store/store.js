import { action, observable } from "mobx";
import axios from "axios";

class Store {
  @observable
  userFamily = null;
  @action
  getUser(name) {
    return axios.get(`/users/${name}`).then(this.setUser);
  }
  @action
  AddUser(userName, imageUrl) {
    axios.post("/users", {
      data: { name: userName, imageUrl: imageUrl }
    });
  }
  @action
  AddUserRelation(parentId, userName, imageUrl) {
    if (userName.length < 1) {
      alert("add name");
    } else {
      axios
        .post("/addRelation", {
          data: { parentId: parentId, name: userName, imageUrl: imageUrl }
        })
        .then(data => {
          this.getUser(data.data.u_name);
        });
    }
  }

  @action
  setUser = data => {
    console.log(data.data[0]);
    let father = data.data[0];
    if (father === undefined) {
      this.userFamily = "nagetive";
    } else {
      this.userFamily = {
        id: father.id,
        name: father.u_name,
        image: father.u_imgUrl,
        children: father.Child
      };
    }
  };

  @action
  getFamily() {
    return this.userFamily;
  }
  @observable
  getFilter() {
    return this.filter;
  }
}

const store = new Store();
window.store = store;
export default store;
