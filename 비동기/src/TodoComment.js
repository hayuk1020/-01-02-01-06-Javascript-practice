export default function TodoComments({ $target, initialState }) {
    const $element = document.createElement('div');
    $target.appendChild($element);
  
    this.state = initialState;
  
    this.setState = (nextState) => {
      this.state = nextState;
      this.render();
    };
  
    this.render = () => {
      const { selectedTodo, comments } = this.state;
  
      if (selectedTodo) {
        $element.innerHTML = `
          <h2>Comments for '${selectedTodo.text}'</h2>
          <ul>
            ${comments
              .map(({ id, content }) => `<li>${content} <button data-comment-id=${id}>x</button></li>`)
              .join('')}
          </ul>
          <form>
            <input type="text" name="comment" placeholder="Write a comment" />
            <button type="submit">Add</button>
          </form>
        `;
  
        const $form = $element.querySelector('form');
        const $input = $element.querySelector('input[name=comment]');
  
        $form.addEventListener('submit', (e) => {
          e.preventDefault();
          const content = $input.value;
          if (content) {
            const newComment = {
              todo_id: selectedTodo.id,
              content,
            };
            addComment(newComment);
            $input.value = '';
          }
        });
  
        const $buttons = $element.querySelectorAll('button[data-comment-id]');
        $buttons.forEach(($button) => {
          $button.addEventListener('click', () => {
            const commentId = $button.dataset.commentId;
            deleteComment(commentId);
          });
        });
      } else {
        $element.innerHTML = '<p>Please select a todo to see comments</p>';
      }
    };
  
    const addComment = (comment) => {
      request(
        `https://kdt.roto.codes/comments`,
        (newComment) => {
          const newComments = [...this.state.comments, newComment];
          this.setState({
            ...this.state,
            comments: newComments,
          });
        },
        (error) => {
          console.error(error);
        },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
        }
      );
    };
  
    const deleteComment = (id) => {
      request(
        `https://kdt.roto.codes/comments/${id}`,
        () => {
          const newComments = this.state.comments.filter((comment) => comment.id !== id);
          this.setState({
            ...this.state,
            comments: newComments,
          });
        },
        (error) => {
          console.error(error);
        },
        {
          method: 'DELETE',
        }
      );
    };
  }