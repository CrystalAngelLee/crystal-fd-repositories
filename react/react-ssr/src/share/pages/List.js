import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/actions/user.action";

function List({ user, dispatch }) {
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <div>
      List page
      <ul>
        {user.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => ({ user: state.user });

function loadData(store) {
  return store.dispatch(fetchUser());
}

export default {
  component: connect(mapStateToProps)(List),
  loadData,
};
