import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import rootReducer from '../reducers/index';
import App from '../components/pages/App';
import Home from '../components/pages/home_page/Home';

afterEach(cleanup);
const div = document.createElement('div');
const store = createStore(rootReducer);
const reduxRendering = component => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

test('landing page rendering or navigation', () => {
  const { getByTestId } = reduxRendering(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div,
  );

  expect(getByTestId('check-app-route').textContent).toBe('Categories');
});

test('landing page rendering or navigation', () => {
  const { getByTestId } = reduxRendering(
    <MemoryRouter>
      <Home />
    </MemoryRouter>, div,
  );

  expect(getByTestId('check-home-route').textContent).toBe('Categories');
});

export default reduxRendering;
