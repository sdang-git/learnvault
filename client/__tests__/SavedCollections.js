/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import SavedCollections from '../src/components/collections/SavedCollections';

configure({ adapter: new Adapter() });
describe('SavedCollections tests', () => {
  let wrapper;
  const testProps = {
    loggedInUser: '5ef3f1798a8800471b987bbe', // userId
  };

  const testSavedCollections = ['5eee5bac1e986de551d57488'];
  const testCollections = {
    contributors: [],
    links: ['https://www.freecodecamp.org/news/best-javascript-tutorial/', 'http://jsforcats.com/'],
    likes: ['5ef2b8c3d5973033a191aea2', '5ef3f1798a8800471b987bbe', '5ef7840ba4aca16282b26299'],
    tags: ['javascript', 'books'],
    _id: '5eee5bac1e986de551d57488',
    author: 'Nadya',
    title: 'Top Javascript Resources',
    description: 'Top javascript resources',
    hidden: false,
    category: 'javascript',
    text: 'https://www.freecodecamp.org/news/best-javascript-tutorial/, http://jsforcats.com/',
    updated: '2020-06-20T18:55:40.020Z',
    __v: 3,
  };

  const mockFetch = jest.fn((arg) => {
    // console.log('mockFetch', arg);
    if (arg === `/api/collections/savedcollections/${testProps.loggedInUser}`) {
      return Promise.resolve({
        status: 200,
        json: () => testSavedCollections,
      });
    }
    return Promise.resolve({
      status: 200,
      json: () => testCollections,
    });
  });
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
          <SavedCollections loggedInUser={testProps.loggedInUser} />
        </RenderWithRouter>,
      );
    });
  });

  it('renders correctly for specific user', () => {
    expect(wrapper.find('h1').text()).toMatch('Saved Collections');
    expect(wrapper.text()).toMatch(testCollections.title);
    // expect(wrapper.find('h1.collection__title').text()).toMatch(testCollections.title);
  });

  it('displays a Loading... message if no collections found', async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <SavedCollections loggedInUser={null} />
        </RenderWithRouter>,
      );
    });
    expect(wrapper.text()).toMatch('Loading');
  });

  it('throws an error if the fetch fails', async () => {
    const badFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
    global.fetch = badFetch;
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <SavedCollections loggedInUser={null} />
        </RenderWithRouter>,
      );
    });
  });
});
