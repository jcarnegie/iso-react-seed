/**
 * Mixin + tools for marshalling react component state between server and client.
 */

var react = require("react");

module.exports = {

    mixin: {

        /**
         *
         */
        contextTypes: {
            reqId: react.PropTypes.string,
            state: react.PropTypes.object,
            params: react.PropTypes.object,
            query: react.PropTypes.object
        },

        getInitialState: function() {
            this.props.$state = this.context.state;
            return {};
        }
    }
};