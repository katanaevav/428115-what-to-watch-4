import * as React from "react";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";
import {Router} from "react-router-dom";
import history from "../../history";
import {emptyFunction} from "../../utils";


it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <Router history = {history}>
        <SignIn
          onSubmit = {emptyFunction}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
