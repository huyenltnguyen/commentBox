import React from 'react';
import marked from 'marked';
import style from '../style';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      author: '',
      text: ''
    }
  }

  updateComment = (e) => {
    e.preventDefault();
    // brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }

  handleCommentUpdate = (e) => {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or text changed, set it. if not, leave null and our PUT
    //request will ignore it.
    let author = this.state.author ? this.state.author : null;
    let text = this.state.text ? this.state.text : null;
    let comment = { author, text};
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: ''
    });
  }

  deleteComment = (e) => {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('comment deleted');
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  }

  rawMarkup = () => {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div style={ style.comment }>
        <h3>{ this.props.author }</h3>
        <span dangerouslySetInnerHTML={ this.rawMarkup() }></span>
        <button style={ style.updateLink } onClick={ this.updateComment }>Update</button>
        <button style={ style.deleteLink } onClick={ this.deleteComment }>Delete</button>
        {
          this.state.toBeUpdated ? (
            <form onSubmit={ this.handleCommentUpdate }>
            <input
              type='text'
              placeholder='Update name…'
              style={ style.commentFormAuthor }
              value={ this.state.author }
              onChange= { this.handleAuthorChange } />
            <input
              type='text'
              placeholder='Update your comment…'
              style= { style.commentFormText }
              value={ this.state.text }
              onChange={ this.handleTextChange } />
            <input
              type='submit'
              style={ style.commentFormPost }
              value='Update' />
            </form>
          )
          : null
        }
      </div>
    );
  }
}

export default Comment;