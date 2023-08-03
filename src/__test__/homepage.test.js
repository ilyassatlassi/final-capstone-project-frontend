import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from '../pages/HomePage';
import store from '../redux/store';

describe('Components testing', () => {
  test('home component', () => {
    const tree = render(<Provider store={store}><BrowserRouter><Routes><Route path="/" element={<HomePage />} /></Routes></BrowserRouter></Provider>);
    expect(tree).toMatchSnapshot();
  });
});
