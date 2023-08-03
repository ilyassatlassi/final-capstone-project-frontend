import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import MyReservations from '../components/MyReservations';
import store from '../redux/store';

test('First snapshot test', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MyReservations />
    </Provider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
