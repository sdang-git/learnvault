/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route, Link } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import Nav from '../src/components/Nav';

configure({ adapter: new Adapter() });
describe('Nav tests', () => {
  let wrapper;
  const mockSetLoggedInUser = jest.fn();
  const mockSetTimerId = jest.fn();
  const testProps = {
    loggedInUser: '5ef3f1798a8800471b987bbe',
    setLoggedInUser: mockSetLoggedInUser,
    timerId: '',
    setTimerId: mockSetTimerId,
  };

  const RenderWithRouter = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>
      <Route path="/">{children}</Route>
    </MemoryRouter>
  );

  beforeAll(async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <Nav
            loggedInUser={testProps.loggedInUser}
            setLoggedInUser={testProps.setLoggedInUser}
            timerId={testProps.timerId}
            setTimerId={testProps.setTimerId}
          />
        </RenderWithRouter>,
      );
    });
  });

  it('Renders the Nav component correctly (user has logged in)', () => {
    expect(wrapper.text()).toMatch('Home');
    expect(wrapper.text()).toMatch('Add Collection');
    expect(wrapper.text()).toMatch('Saved Collections');
    expect(wrapper.text()).toMatch('Logout');
  });

  it('All of the Nav links have the proper routes', () => {
    expect(wrapper.find('#nav-home').at(0).text()).toMatch('Home');
    expect(wrapper.find(Link).at(0).props().to).toBe('/');
    expect(wrapper.find('#nav-addcollection').at(0).text()).toMatch('Add Collection');
    expect(wrapper.find(Link).at(1).props().to).toBe('/addcollection');
    expect(wrapper.find('#nav-savedcollections').at(0).text()).toMatch('Saved Collections');
    expect(wrapper.find(Link).at(2).props().to).toBe('/savedcollections');
  });

  it('Renders a <button> with the label "Logout"', () => {
    expect(wrapper.find('button').text()).toMatch('Logout');
  });

  it('Invokes the click handler for the Logout button (postive test)', () => {
    const mockFetch = jest.fn(() => Promise.resolve({
      status: 200,
      json: () => ({ attempt: 'success' }),
    }));
    global.fetch = mockFetch;
    wrapper.find('button').props().onClick({ key: 'Enter' });
    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockSetLoggedInUser).toHaveBeenCalled();
    expect(mockSetTimerId).toHaveBeenCalled();
  });

  it('Invokes the click handler for the Logout button (negative test)', () => {
    const mockFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
    global.fetch = mockFetch;
    wrapper.find('button').props().onClick({ key: 'Enter' });
    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch.mock.calls.length).toBe(1);
  });

  it('Renders the Nav component correctly (no user logged in)', async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <Nav
            loggedInUser={null}
            setLoggedInUser={testProps.setLoggedInUser}
            timerId={testProps.timerId}
            setTimerId={testProps.setTimerId}
          />
        </RenderWithRouter>,
      );
    });
    expect(wrapper.text()).toMatch('Home');
    expect(wrapper.text()).toMatch('Login');
    expect(wrapper.text()).toMatch('Register');
  });
});
