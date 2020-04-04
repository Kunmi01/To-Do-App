import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../src/App';

describe('<App />', () => {
  const wrapper = mount(<App />);

  it('renders', () => {
    expect(wrapper.find(App).exists()).toBe(true);
  });

  it('matches snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
