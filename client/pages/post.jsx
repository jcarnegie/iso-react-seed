/**
 * @jsx React.DOM
 */
var api        = require("../../lib/api");
var React      = require("react");
var reactstate = require("../../lib/reactstate");

module.exports = React.createClass({

    mixins: [reactstate.mixin],

    getInitialState: function() {
        if (this.props.$state.post) {
            state = {
                post: this.props.$state.post,
                waiting: false
            }
        } else {
            state = {
                post: null,
                waiting: true
            }
        }
        return state;
    },

    componentDidMount: function () {
        if ( !this.state.post ) {
            var id = this.context.params.id;
            api.getPost(id, function(err, post) {
                if (!err && this.isMounted()) {
                    this.setState({
                        post: post,
                        waiting: false
                    });
                }
            }.bind(this));
        }  
    },

    render: function() {
        var body;

        if (this.state.waiting || !this.state.post) {
            body = ( <div className="loader" /> );
        } else {
            body = (
                <div>
                    <h1>{ this.state.post.title }</h1>
                    <p>{ this.state.post.body }</p>
                </div>
            );
        }

        return ( <div>{ body }</div> );
    }
});