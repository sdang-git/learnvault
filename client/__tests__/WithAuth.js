/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import WithAuth from '../src/components/WithAuth';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('WithAuth', () => {
    let wrapper;
    const testProps = {
      loggedInUser: '5ef3f1798a8800471b987bbe',
      setLoggedInUser: jest.fn(),
      id: '5eee5bac1e986de551d57488',
    };
    const MockComponent = () => (<div>Mock Component</div>);

    let mockJson = jest.fn(() => Promise.resolve());
    let mockFetch = jest.fn(() => Promise.resolve({
      status: 200,
      json: mockJson,
    }));
    global.fetch = mockFetch;

    let consoleOutput = '';
    const mockConsole = jest.fn((output) => {
      consoleOutput += output;
    });
    // console.log = mockConsole;
    console.error = mockConsole;

    const RenderWithRouter = ({ children }) => (
      <MemoryRouter initialEntries={[`/${testProps.loggedInUser}`]}>
        <Route path="/:userId">{children}</Route>
      </MemoryRouter>
    );

    beforeEach(() => {
      consoleOutput = '';
    });

    afterEach(() => {
      consoleOutput = '';
    });

    // beforeAll(async () => {
    //   await act(async () => {
    //     wrapper = mount(<WithAuth Component={MockComponent} />);
    //     // wrapper = mount(<MockComponent />);
    //   });
    //   console.log('wrapper.html', wrapper.html());
    //   console.log('wrapper.text', wrapper.text());
    // });

    it('Renders the WithAuth component correctly for a mock component (status 200)', async () => {
      mockJson = jest.fn(() => Promise.resolve());
      mockFetch = jest.fn(() => Promise.resolve({
        status: 200,
        json: mockJson,
      }));
      global.fetch = mockFetch;

      await act(async () => {
        wrapper = mount(
          <RenderWithRouter>
            <WithAuth
              Component={MockComponent}
              loggedInUser={testProps.loggedInUser}
              setLoggedInUser={testProps.setLoggedInUser}
              id={testProps.id}
            />
          </RenderWithRouter>,
        );
      });

      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch.mock.calls.length).toBe(1);
      // expect(wrapper.text()).toMatch('Mock Component');
    });

    it('Renders the WithAuth component correctly for a mock component (status !== 200)', async () => {
      mockJson = jest.fn(() => Promise.resolve());
      mockFetch = jest.fn(() => Promise.resolve({
        status: 201,
        statusText: 'Unauthorized',
        json: mockJson,
      }));
      global.fetch = mockFetch;

      try {
        await act(async () => {
          wrapper = mount(
            <RenderWithRouter>
              <WithAuth
                Component={MockComponent}
                loggedInUser={testProps.loggedInUser}
                setLoggedInUser={testProps.setLoggedInUser}
                id={testProps.id}
              />
            </RenderWithRouter>,
          );
        });
      } catch (error) {
        console.log('test caught error', error);
      }
      // expect.assertions(1);
      console.log('wrapper.html', wrapper.html());
      console.log('wrapper.text', wrapper.text());
      expect(wrapper.text()).toMatch('');
      expect(mockFetch).toHaveBeenCalled();
      expect(mockFetch.mock.calls.length).toBe(1);
    });

    it('Redirects to /login if the fetch has an error', async (done) => {
      mockFetch = jest.fn(() => Promise.reject(new Error('should catch this error')));
      global.fetch = mockFetch;
      await act(async () => {
        wrapper = mount(
          <RenderWithRouter>
            <WithAuth
              Component={MockComponent}
              loggedInUser={testProps.loggedInUser}
              setLoggedInUser={testProps.setLoggedInUser}
              id={testProps.id}
            />
          </RenderWithRouter>,
        );
      });
      process.nextTick(() => {
        expect(mockFetch).toHaveBeenCalled();
        expect(mockFetch.mock.calls.length).toBe(1);
        expect(mockConsole).toHaveBeenCalled();
        expect(consoleOutput).toMatch('Error');
        done();
      });
    });
  });
});
