import React from "react";
import { shallow } from "enzyme";
import EditBio from "./bioeditor";

import axios from "./axios";
jest.mock("./axios");

test("when bio is passed, edit is rendered", () => {
    const wrapper = shallow(<EditBio bio="I am a Walrus" />);
    expect(wrapper.contains(<p>[ Edit ]</p>).toBe(true));
});

test("When no bio is passed, Add bio is rendered", () => {
    const wrapper = shallow(<EditBio bio="undefined" />);
    expect(
        wrapper
            .contains(<p>write a short bio and describe yourself to others!</p>)
            .toBe(true)
    );
});
