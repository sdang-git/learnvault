/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import LikeButton from '../src/components/collections/LikeButton';
import SaveButton from '../src/components/collections/SaveButton';
import ExpandedCollection from '../src/components/collections/ExpandedCollection';

configure({ adapter: new Adapter() });
describe('ExpandedCollection tests', () => {
  let wrapper;
  const testProps = {
    loggedInUser: '5ef3f1798a8800471b987bbe', // userId
    id: '5eee5bac1e986de551d57488', // collectionId
  };

  const testData = {
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

  const mockFetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => testData,
  }));
  global.fetch = mockFetch;

  const RenderWithRouter = ({ children }) => (
    <MemoryRouter initialEntries={[`/${testProps.id}`]}>
      <Route path="/:id">{children}</Route>
    </MemoryRouter>
  );

  beforeAll(async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <ExpandedCollection loggedInUser={testProps.loggedInUser} />
        </RenderWithRouter>,
      );
    });
  });

  it('renders correctly with title, description, and author of the collection', () => {
    expect(wrapper.find('h1').text()).toMatch(testData.title);
    expect(wrapper.find('h3').text()).toMatch(testData.description);
    expect(wrapper.find('div.creator__author').text()).toMatch(testData.author);
    // expect(wrapper).toMatchSnapshot();
  });

  it('renders each of the links in the collection', () => {
    expect(wrapper.text()).toMatch(testData.links[0]);
    expect(wrapper.text()).toMatch(testData.links[1]);
  });

  it('displays Like and Save buttons if logged in', () => {
    expect(wrapper.find('button')).toHaveLength(2);
    expect(wrapper.text()).toMatch('Like Collection');
    expect(wrapper.text()).toMatch('Save Collection');
  });

  // alternate way to actually verify the components are being rendered
  // uses package: jest-enzyme
  it('renders LikeButton and SaveButton components if logged in', () => {
    expect(wrapper).toContainReact(<LikeButton loggedInUser={testProps.loggedInUser} id={testProps.id} />);
    expect(wrapper).toContainReact(<SaveButton loggedInUser={testProps.loggedInUser} id={testProps.id} />);
  });

  it('displays message to register or login if not logged in', async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <ExpandedCollection loggedInUser={null} />
        </RenderWithRouter>,
      );
    });
    expect(wrapper.text()).toMatch('Register');
    expect(wrapper.text()).toMatch('Login');
  });
});
