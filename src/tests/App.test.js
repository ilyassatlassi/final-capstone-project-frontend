import MyReservations from "../components/MyReservations";
import { Provider } from "react-redux";
import store from '../redux/store';
import renderer from "react-test-renderer"

test("First snapshot test", ()=> {
    const component = renderer.create(
        <Provider store={store}>
             <MyReservations />
        </Provider>
    );
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})



