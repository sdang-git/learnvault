/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LikeButton from '../src/components/collections/LikeButton';
import SaveButton from '../src/components/collections/SaveButton';
import Collection from '../src/components/collections/Collection';

configure({ adapter: new Adapter() });

describe('Collection tests', () => {
  describe('Collection', () => {
    let wrapper;
    const props = {
      key: 544,
      id: 4354,
      title: 'Collection',
      description: 'buncha stuff',
      author: 'Veronica',
      loggedInUser: 'Sarge',
    };

    beforeAll(() => {
      wrapper = shallow(
        <Collection
          key={props.key}
          id={props.id}
          title={props.title}
          description={props.description}
          author={props.author}
          loggedInUser={props.loggedInUser}
        />,
      );
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders an h1 element that displays collection title', () => {
      expect(wrapper.find('h1').text()).toMatch(props.title);
    });

    it('renders an h3 element that displays collection description', () => {
      expect(wrapper.find('h3').text()).toMatch(props.description);
    });

    it('displays div with name of author', () => {
      expect(wrapper.find('div').first().text()).toMatch(props.author);
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
    it('displays Like and Save buttons if logged in', () => {
      expect(wrapper).toContainReact(<LikeButton loggedInUser={props.loggedInUser} id={props.id} />);
      expect(wrapper).toContainReact(<SaveButton loggedInUser={props.loggedInUser} id={props.id} />);
    });

    it('displays message to register or login if not logged in', () => {
      wrapper = shallow(
        <Collection
          key={props.key}
          id={props.id}
          title={props.title}
          description={props.description}
          author={props.author}
          loggedInUser={null}
        />,
      );
      expect(wrapper.text()).toMatch('Register');
      expect(wrapper.text()).toMatch('Login');
    });
  });
});
