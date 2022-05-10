import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Node from "./components/Node";

configure({ adapter: new Adapter() });

describe('Node', () => {
    it('should do something', () => {
        
    })
});