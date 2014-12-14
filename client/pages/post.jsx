/**
 * @jsx React.DOM
 */
var api        = require("../lib/api");
var React      = require("react");
var reactstate = require("../lib/reactstate");

module.exports = React.createClass({

    mixins: [reactstate.mixin],

    getInitialState: function() {
        return { post: this.props.$state.post };
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
        var contents;

        if (!this.state.post) {
            contents = ( <div className="loader" /> );
        } else {
            contents = (
                <div>
                    <h1>{ this.state.post.title }</h1>
                    <p>{ this.state.post.body }</p>
                </div>
            );
        }

        return (
            <div>
                <a href="/">&lt;&lt; All Posts</a>
                { contents }
            </div>
        );
    }
});