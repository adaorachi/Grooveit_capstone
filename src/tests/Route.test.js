import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import rootReducer from '../reducers/index';
import App from '../components/pages/App';
import Navbar from '../components/layouts/nav_bar/Navbar';

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

  expect(getByTestId('Discover-link').textContent).toBe('Discover');
});

test('landing page rendering or navigation', () => {
  const { getByTestId } = reduxRendering(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>, div,
  );

  expect(getByTestId('Recommended-link').textContent).toBe('Recommended');
});

export default reduxRendering;
