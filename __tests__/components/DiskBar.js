import React from 'react';
import {
    mount
} from 'enzyme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Chip from 'material-ui/Chip';
import DiskBar from '../../src/components/Header/DiskBar';

describe('DiskBar component suite', function() {

    it('should have id="DiskBar"', function() {
        const wrapper = mount(<MuiThemeProvider><DiskBar /></MuiThemeProvider>);

        expect(wrapper.find('#DiskBar').is('#DiskBar')).toBe(true);
    });

    it('should have id="DiskBar"', function() {
        const wrapper = mount(<MuiThemeProvider><DiskBar disk={{used: 10, size: 100}} /></MuiThemeProvider>);

        expect(wrapper.find('#DiskBar').is('#DiskBar')).toBe(true);
    });

    it('should have an `<Chip />` element', () => {
        const wrapper = mount(<MuiThemeProvider><DiskBar disk={{used: 10, size: 100}} /></MuiThemeProvider>);

        expect(wrapper.find(Chip)).toHaveLength(1);
    });

    it('should have text === "10 %"', () => {
        const wrapper = mount(<MuiThemeProvider><DiskBar disk={{used: 10, size: 100}} /></MuiThemeProvider>);

        expect(wrapper.find('span').text()).toEqual("10 %");
    });

    it('should be empty div#DiskBar', function() {
        const wrapper = mount(<MuiThemeProvider><DiskBar /></MuiThemeProvider>);

        expect(wrapper.html()).toEqual("<div id=\"DiskBar\"></div>");
    });

});
