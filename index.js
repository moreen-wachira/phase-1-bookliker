document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('list');
    const showPanel = document.getElementById('show-panel');
  
    // Function to fetch and display the list of books
    function fetchAndDisplayBooks() {
      fetch('http://localhost:3000/books')
        .then((response) => response.json())
        .then((books) => {
          list.innerHTML = ''; // Clear the list
          books.forEach((book) => {
            displayBookTitle(book);
          });
        });
    }
  
    // Function to display a book title in the list
    function displayBookTitle(book) {
      const li = document.createElement('li');
      li.innerText = book.title;
      li.addEventListener('click', () => displayBookDetails(book));
      list.appendChild(li);
    }
  
    // Function to display book details and handle liking/unliking
    function displayBookDetails(book) {
      showPanel.innerHTML = ''; // Clear the details
  
      const title = document.createElement('h2');
      title.innerText = book.title;
      const image = document.createElement('img');
      image.src = book.img_url;
      const description = document.createElement('p');
      description.innerText = book.description;
  
      const likeButton = document.createElement('button');
      likeButton.innerText = 'LIKE';
      likeButton.addEventListener('click', () => toggleLike(book));
  
      const likedBy = document.createElement('ul');
      likedBy.innerHTML = 'Liked by:';
      book.users.forEach((user) => {
        const userLi = document.createElement('li');
        userLi.innerText = user.username;
        likedBy.appendChild(userLi);
      });
  
      showPanel.appendChild(title);
      showPanel.appendChild(image);
      showPanel.appendChild(description);
      showPanel.appendChild(likeButton);
      showPanel.appendChild(likedBy);
    }
  
    // Function to toggle liking/unliking a book
    function toggleLike(book) {
      const currentUser = { id: 1, username: 'pouros' };
      if (book.users.find((user) => user.id === currentUser.id)) {
        // User already liked the book, so unlike it
        book.users = book.users.filter((user) => user.id !== currentUser.id);
      } else {
        // User didn't like the book, so like it
        book.users.push(currentUser);
      }
  
      // Send a PATCH request to update the book's liked users
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users: book.users }),
      })
        .then(() => displayBookDetails(book));
    }
  
    // Initial fetch and display
    fetchAndDisplayBooks();
  });