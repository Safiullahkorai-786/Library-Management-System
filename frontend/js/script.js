// Base URL for the API
const apiUrl = 'http://localhost:5000/api';

// For Books Page
if (document.getElementById('book-form')) {
  const bookForm = document.getElementById('book-form');
  const bookList = document.getElementById('books');

  // Get and display books
  fetchBooks();

  // Add new book
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;

    fetch(`${apiUrl}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, genre, year })
    })
      .then(response => response.json())
      .then(data => {
        alert('Book added successfully!');
        fetchBooks();
      })
      .catch(err => console.error(err));
  });

  // Fetch books from backend and display them
  function fetchBooks() {
    fetch(`${apiUrl}/books`)
      .then(response => response.json())
      .then(data => {
        bookList.innerHTML = '';
        data.forEach(book => {
          const li = document.createElement('li');
          li.textContent = `${book.title} by ${book.author} (${book.year})`;
          bookList.appendChild(li);
        });
      });
  }
}



// For Members Page
if (document.getElementById('member-form')) {
    const memberForm = document.getElementById('member-form');
    const memberList = document.getElementById('members');
  
    // Get and display members
    fetchMembers();
  
    // Add new member
    memberForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
  
      fetch(`${apiUrl}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      })
        .then(response => response.json())
        .then(data => {
          alert('Member added successfully!');
          fetchMembers();
        })
        .catch(err => console.error(err));
    });
  
    // Fetch members from backend and display them
    function fetchMembers() {
      fetch(`${apiUrl}/members`)
        .then(response => response.json())
        .then(data => {
          memberList.innerHTML = '';
          data.forEach(member => {
            const li = document.createElement('li');
            li.innerHTML = `
              ${member.name} (${member.email}) - ${member.phone}
              <button onclick="deleteMember(${member.id})">Delete</button>
              <button onclick="updateMember(${member.id})">Update</button>
            `;
            memberList.appendChild(li);
          });
        });
    }
  
    // Delete a member
    function deleteMember(id) {
      fetch(`${apiUrl}/members/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
          alert('Member deleted successfully!');
          fetchMembers();
        })
        .catch(err => console.error(err));
    }
  
    // Update a member (implement later if needed)
    function updateMember(id) {
      // For now, just log member id
      console.log(`Update member with id: ${id}`);
    }
  }

  


  // For Borrows Page
if (document.getElementById('borrow-form')) {
    const borrowForm = document.getElementById('borrow-form');
    const borrowList = document.getElementById('borrows');
  
    // Get and display borrows
    fetchBorrows();
  
    // Add new borrow
    borrowForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const member_id = document.getElementById('member_id').value;
      const book_id = document.getElementById('book_id').value;
      const borrow_date = document.getElementById('borrow_date').value;
      const return_date = document.getElementById('return_date').value;
  
      fetch(`${apiUrl}/borrows`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_id, book_id, borrow_date, return_date })
      })
        .then(response => response.json())
        .then(data => {
          alert('Borrow entry added successfully!');
          fetchBorrows();
        })
        .catch(err => console.error(err));
    });
  
    // Fetch borrows from backend and display them
    function fetchBorrows() {
      fetch(`${apiUrl}/borrows`)
        .then(response => response.json())
        .then(data => {
          borrowList.innerHTML = '';
          data.forEach(borrow => {
            const li = document.createElement('li');
            li.innerHTML = `
              Member ID: ${borrow.member_id} - Book ID: ${borrow.book_id} 
              Borrow Date: ${borrow.borrow_date} - Return Date: ${borrow.return_date}
              <button onclick="deleteBorrow(${borrow.id})">Delete</button>
              <button onclick="updateBorrow(${borrow.id})">Update</button>
            `;
            borrowList.appendChild(li);
          });
        });
    }
  
    // Delete a borrow
    function deleteBorrow(id) {
      fetch(`${apiUrl}/borrows/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
          alert('Borrow entry deleted successfully!');
          fetchBorrows();
        })
        .catch(err => console.error(err));
    }
  
    // Update borrow entry (implement later if needed)
    function updateBorrow(id) {
      // For now, just log borrow id
      console.log(`Update borrow entry with id: ${id}`);
    }
  }
  