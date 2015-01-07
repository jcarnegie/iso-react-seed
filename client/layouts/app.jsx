/**
 * @jsx React.DOM
 */
var React    = require("react");
var isoreact = require("isoreact");

module.exports = React.createClass({
    mixins: [isoreact.mixin],

    childContextTypes: {
        reqId: React.PropTypes.string,
        state: React.PropTypes.object,
        params: React.PropTypes.object,
        query: React.PropTypes.object
    },

    getChildContext: function() {
        return this.props.context;
    },

    render: function() {
        return (
            <div>
                <header>&#63; App</header>
                { this.props.body() }
                <footer>Copyright (c) &#63; Co.</footer>
            </div>
        );
    }
});