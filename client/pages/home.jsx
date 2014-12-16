/**
 * @jsx React.DOM
 */
var r          = require("ramda");
var React      = require("react");
var api        = require("../lib/apiclient");
var reactstate = require("../lib/reactstate");
var Comment    = require("../components/comment.jsx");

module.exports = React.createClass({
    mixins: [reactstate.mixin],

    getInitialState: function() {
        return {
            posts: this.props.$state.posts || [],
        };
    },

    componentDidMount: function() {
        if (this.state.posts.length === 0) {
            api.getPosts().then(function(posts) {
                if (this.isMounted()) {
                    this.setState({ posts: posts });
                }
            }.bind(this));
        }
    },

    render: function() {
        var posts = r.map(function(post) {
            var id = r.get("id", post);
            var title = r.get("title", post);

            return (
                <li key={ id }>
                    <p><a href={ "/post/" + id }>{ title }</a></p>
                </li>
            );
        }, this.state.posts);

        var contents = null;

        if (this.state.posts.length > 0) {
            return (
                <div>
                    <h1>Posts</h1>
                    <hr />
                    <ul>{ posts }</ul>
                </div>
            );
        } else {
            return ( <div className="loader" /> );
        }
    }
});