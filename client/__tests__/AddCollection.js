/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
// import AddCollection from '../src/components/collections/AddCollection';

configure({ adapter: new Adapter() });
describe('AddCollection tests', () => {
  let wrapper;
  const testProps = {
    loggedInUser: '5ef3f1798a8800471b987bbe', // userId
  };

  const testData = [{}];
  const mockFetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => testData,
  }));
  global.fetch = mockFetch;

  const RenderWithRouter = ({ children }) => (
    <MemoryRouter initialEntries={['/']}>
      <Route path="/">{children}</Route>
    </MemoryRouter>
  );

  beforeAll(async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          {/* <AddCollection loggedInUser={testProps.loggedInUser} /> */}
        </RenderWithRouter>,
      );
    });
  });

  it('displays a form with input fields for Title, Description', () => {
    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('displays a form with at least one input field for Links', () => {
    expect(wrapper.find('input.links')).toHaveLength(1);
  });

  it('displays a button with the label Add', () => {
    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('button').text()).toMatch('Add Collection');
  });

  it('invokes the click handler for the Add button', () => {
    expect(mockFetch).toHaveBeenCalled(true);
  });
});
