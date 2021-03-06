import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import SearchBar from '../components/search/SearchBar';
import rootReducer from '../reducers/index';

afterEach(cleanup);
const div = document.createElement('div');
const store = createStore(rootReducer);

const reduxRendering = component => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

describe('test the search component', () => {
  const { getByTestId } = reduxRendering(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>, div,
  );
  const input = getByTestId('search-bar-input');

  it('checks input value', () => {
    expect(input.value).toBe('');
  });

  it('checks input value', () => {
    input.value = 'Chicken';
    expect(input.value).toBe('Chicken');
  });

  it('checks input focus element', () => {
    input.focus();
    expect(input).toHaveFocus();
  });

  it('checks input on blur', () => {
    input.blur();
    expect(input).not.toHaveFocus();
  });
});
