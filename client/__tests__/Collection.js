/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import LikeButton from '../src/components/collections/LikeButton';
import SaveButton from '../src/components/collections/SaveButton';
import Collection from '../src/components/collections/Collection';

configure({ adapter: new Adapter() });

describe('Collection tests', () => {
  describe('Collection', () => {
    let wrapper;
    const testProps = {
      key: 'testKey',
      id: '5eee5bac1e986de551d57488',
      title: 'Collection',
      description: 'buncha stuff',
      author: 'Veronica',
      loggedInUser: 'Sarge',
      likes: ['5ef2b8c3d5973033a191aea2', '5ef3f1798a8800471b987bbe', '5ef7840ba4aca16282b26299'],
    };

    // explicitly setting key value here to mitigate random key generation
    // causing errors with snapshot tests
    // see discussion:
    // https://github.com/ReactTraining/react-router/issues/5579#issuecomment-333401692
    const RenderWithRouter = ({ children }) => (
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Route path="/">{children}</Route>
      </MemoryRouter>
    );

    beforeAll(async () => {
      await act(async () => {
        wrapper = mount(
          <RenderWithRouter>
            <Collection
              key={testProps.key}
              id={testProps.id}
              title={testProps.title}
              description={testProps.description}
              author={testProps.author}
              loggedInUser={testProps.loggedInUser}
              likes={testProps.likes}
            />
          </RenderWithRouter>,
        );
      });
      console.log('wrapper.html', wrapper.html());
      console.log('wrapper.text', wrapper.text());
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders an h1 element that displays collection title', () => {
      expect(wrapper.find('h1').text()).toMatch(testProps.title);
    });

    it('renders an h3 element that displays collection description', () => {
      expect(wrapper.find('h3').text()).toMatch(testProps.description);
    });

    it('displays div with name of author', () => {
      expect(wrapper.find('div').first().text()).toMatch(testProps.author);
    });

    it('displays a Link with view the collection', () => {
      expect(wrapper.find('Link').text()).toMatch('View Collection');
    });

    it('displays Like and Save buttons if logged in', () => {
      expect(wrapper.find('LikeButton')).toHaveLength(1);
      expect(wrapper.find('SaveButton')).toHaveLength(1);
    });

    // alternate way to actually verify the components are being rendered
    // uses package: jest-enzyme
    it('renders the LikeButton and SaveButton components if logged in', () => {
      expect(wrapper).toContainReact(<LikeButton loggedInUser={testProps.loggedInUser} likes={testProps.likes} id={testProps.id} />);
      expect(wrapper).toContainReact(<SaveButton loggedInUser={testProps.loggedInUser} id={testProps.id} />);
    });

    it('displays message to register or login if not logged in', () => {
      wrapper = shallow(
        <Collection
          key={testProps.key}
          id={testProps.id}
          title={testProps.title}
          description={testProps.description}
          author={testProps.author}
          loggedInUser={null}
          likes={testProps.likes}
        />,
      );
      expect(wrapper.text()).toMatch('Register');
      expect(wrapper.text()).toMatch('Login');
    });
  });
});
