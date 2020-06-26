/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AllCollections from '../src/components/collections/AllCollections';

configure({ adapter: new Adapter() });
describe('AllCollections tests', () => {
  let wrapper;
  const props = {
    loggedInUser: '5ef3f1798a8800471b987bbe',
  };

  jest.mock('react-router-dom', () => ({
    useParams: jest.fn().mockReturnValue({ userId: '123' }),
  }));

  mount(
    <MemoryRouter initialEntries={['/1231']}>
      <Route exact path="/:userId" component={AllCollections} />
    </MemoryRouter>,
  );

  // const testData = [{
  //   contributors: [], links: ['https://www.freecodecamp.org/news/best-javascript-tutorial/', 'http://jsforcats.com/', 'https://javascript.info/', 'https://eloquentjavascript.net/', 'https://www.youtube.com/watch?v=Bv_5Zv5c-Ts', 'http://youmightnotneedjquery.com/'], likes: ['5ef2b8c3d5973033a191aea2'], tags: ['javascript', 'books'], _id: '5eee5bac1e986de551d57488', author: 'Nadya', title: 'Top Javascript Resources', description: 'Top javascript resources', hidden: false, category: 'javascript', text: 'https://www.freecodecamp.org/news/best-javascript-tutorial/, http://jsforcats.com/, https://javascript.info/, https://eloquentjavascript.net/, https://www.youtube.com/watch?v=Bv_5Zv5c-Ts, http://youmightnotneedjquery.com/', updated: '2020-06-20T18:55:40.020Z', __v: 1,
  // }];

  beforeAll(() => {
    wrapper = shallow(<AllCollections loggedInUser={props.loggedInUser} />);
  });

  console.log('wrapper', wrapper);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
