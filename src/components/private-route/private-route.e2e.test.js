import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PrivateRoute} from './private-route.jsx';
import {MemoryRouter} from 'react-router';
import {AuthorizationStatus, AppRoute} from '../../const';

Enzyme.configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;
const props = {
  path: `/privatepath`,
};

describe(`Should Private Route works correctly`, () => {
  it(`Private Route should render component with authenticated user`, () => {
    const wrapper = Enzyme.mount(
        <MemoryRouter initialEntries = {[props.path]}>
          <PrivateRoute
            exact
            authorizationStatus = {AuthorizationStatus.AUTH}
            path = {props.path}
            render = {() => {
              return (
                <MockComponent />
              );
            }}
          >
          </PrivateRoute>
        </MemoryRouter>
    );

    expect(wrapper.exists(MockComponent)).toBe(true);
  });

  it(`Private Route should redirect to Login screen if user is not authenticated`, () => {
    const wrapper = Enzyme.mount(
        <MemoryRouter initialEntries = {[props.path]}>
          <PrivateRoute
            exact
            authorizationStatus = {AuthorizationStatus.NO_AUTH}
            path = {props.path}
            render = {() => {
              return (
                <MockComponent />
              );
            }}
          >
          </PrivateRoute>
        </MemoryRouter>
    );
    const history = wrapper.find(`Router`).prop(`history`);
    expect(history.location.pathname).toBe(`${AppRoute.LOGIN}`);
  });
});
