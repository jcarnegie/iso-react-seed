/**
 * @jsx React.DOM
 */
var r          = require("ramda");
var React      = require("react");
var api        = require("../../lib/api");
var reactstate = require("../../lib/reactstate");
var Comment    = require("../components/comment.jsx");

module.exports = React.createClass({
    mixins: [reactstate.mixin],

    getInitialState: function() {
        console.log(this.props.$state);
        return {
            posts: this.props.$state.posts || [],
            waiting: true
        };
    },

    componentDidMount: function() {
        if (!this.state.posts) {
            api.getPosts(function(err, posts) {
                console.log(arguments);
                if (this.isMounted()) {
                    this.setState({
                        posts: posts,
                        waiting: false
                    });
                }
            }.bind(this));
        } else {
            this.setState({ waiting: false });
        }
    },

    render: function() {
        var posts = r.map(function(post) {
            var id = r.get("id", post);
            var title = r.get("title", post);

            return (
                <li>
                    <p><a href={ "/post/" + id }>{ title }</a></p>
                </li>
            );
        }, this.state.posts);

        return (
            <div>
                <h1>Posts</h1>
                <hr />
                <ul>{ posts }</ul>
            </div>
        );
    }
});