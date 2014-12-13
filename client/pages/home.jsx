/**
 * @jsx React.DOM
 */
var r          = require("ramda");
var React      = require("react");
var reactstate = require("../../lib/reactstate");
var Comment    = require("../components/comment.jsx");

module.exports = React.createClass({
    mixins: [reactstate.mixin],

    getInitialState: function() {
        return { blarty: this.props.$state.blarty || "harhar!" };
    },

    render: function() {
        return (
            <div>
                <h1>{ this.state.blarty }</h1>
                <hr />
                <a href="/signup">Sign Up&#33;&#33;&#33;</a>
            </div>
        );
    }
});