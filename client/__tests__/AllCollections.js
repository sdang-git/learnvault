/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import AllCollections from '../src/components/collections/AllCollections';

configure({ adapter: new Adapter() });
describe('AllCollections tests', () => {
  let wrapper;
  const testProps = {
    userCollections: false,
    loggedInUser: '5ef3f1798a8800471b987bbe', // userId
  };

  const testData = [{
    contributors: [],
    links: ['https://www.freecodecamp.org/news/best-javascript-tutorial/', 'http://jsforcats.com/'],
    likes: ['5ef2b8c3d5973033a191aea2'],
    tags: ['javascript', 'books'],
    _id: '5eee5bac1e986de551d57488',
    author: 'Nadya',
    title: 'Top Javascript Resources',
    description: 'Top javascript resources',
    hidden: false,
    category: 'javascript',
    text: 'https://www.freecodecamp.org/news/best-javascript-tutorial/, http://jsforcats.com/',
    updated: '2020-06-20T18:55:40.020Z',
    __v: 1,
  }];

  const mockFetch = jest.fn(() => Promise.resolve({
    status: 200,
    json: () => testData,
  }));
  global.fetch = mockFetch;

  // beforeAll(async () => {
  // await act(async () => {
  //   wrapper = mount(
  //     <MemoryRouter initialEntries={['/5ef3f1798a8800471b987bbe']}>
  //       <Route path="/:userId" component={AllCollections} />
  //     </MemoryRouter>,
  //   );
  // });

  // wrapper = mount(
  //   <MemoryRouter initialEntries={['/5ef3f1798a8800471b987bbe']}>
  //     <Route path="/:userId" component={AllCollections} />
  //   </MemoryRouter>,
  // );
  // wrapper = shallow(
  //   <MemoryRouter initialEntries={['/5ef3f1798a8800471b987bbe']}>
  //     <Route path="/:userId" component={AllCollections} />
  //   </MemoryRouter>,
  // );
  // });

  const RenderWithRouter = ({ children }) => (
    <MemoryRouter initialEntries={[`/${testProps.loggedInUser}`]}>
      <Route path="/:userId">{children}</Route>
    </MemoryRouter>
  );

  // the async await ops below are used to mitigate this warning:
  // Warning: An update to AllCollections inside a test was not wrapped in act(...)
  // https://reactjs.org/docs/test-utils.html#act
  // https://stackoverflow.com/questions/55047535/testing-react-components-that-fetches-data-using-hooks
  beforeAll(async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <AllCollections userCollections={testProps.userCollections} loggedInUser={testProps.loggedInUser} />
        </RenderWithRouter>,
      );
    });
  });

  it('renders correctly for All Collections', () => {
    // console.log('wrapper.html', wrapper.html());
    // console.log('wrapper.text', wrapper.text());
    // expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('h1').text()).toEqual('All Collections');
  });

  it('renders correctly for specific User Collection', async () => {
    await act(async () => {
      wrapper = mount(
        <RenderWithRouter>
          <AllCollections userCollections={!testProps.userCollections} loggedInUser={testProps.loggedInUser} />
        </RenderWithRouter>,
      );
    });
    expect(wrapper.find('h1').text()).toEqual(`${testProps.loggedInUser}'s Collections`);
  });
});
