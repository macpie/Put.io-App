import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as EventsActions from '../actions/Events';
import Events from '../components/Events';

const mapStateToProps = (state) => {
    return {
        events: state.events
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        eventsActions: bindActionCreators(EventsActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
