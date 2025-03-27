import pool from "../config/db.config.js";

export default class BookService {
  static async getAllBooks() {
    const { rows: books, rowCount } = await pool.query("SELECT * FROM books");

    if (!rowCount) throw { err_status: 404, message: "Books not found" };

    return { count: rowCount, books: books };
  }

  static async getBookById(id) {
    const { rows: book, rowCount } = await pool.query(
      "SELECT * FROM books WHERE id = $1",
      [id]
    );

    if (!rowCount) throw { err_status: 404, message: "Book not found" };

    return { book: book[0] };
  }

  static async addNewBook({ title, author, description, year }) {
    const { rows: newBook, rowCount } = await pool.query(
      "INSERT INTO books(title, author, description, year) VALUES($1, $2, $3, $4) RETURNING *",
      [title, author, description, year]
    );

    if (!rowCount) throw { err_status: 500, message: "INTERNAL SERVER ERROR" };

    return { newbook: newBook[0] };
  }

  static async updateBook(id, { title, author, description, year }) {
    const { rows: updatedBook, rowCount } = await pool.query(
      "UPDATE books SET title=$1, author=$2, description=$3, year=$4 WHERE id=$5 RETURNING *",
      [title, author, description, year, id]
    );

    if (!rowCount) throw { err_status: 404, message: "Book not found" };

    return { book: updatedBook[0] };
  }

  static async deleteBook(id) {
    const { rowCount } = await pool.query("DELETE FROM books WHERE id=$1", [
      id,
    ]);
    if (!rowCount) throw { err_status: 404, message: "Book not found" };

    return { message: "Book was successfully deleted!" };
  }

  static async loanBook(book_id, user_id, return_date) {
    const { rowCount } = await pool.query("SELECT * FROM books WHERE id = $1", [
      book_id,
    ]);
    if (!rowCount) throw { err_status: 404, message: "Book not found" };

    const { rows: bookLoan } = await pool.query(
      "INSERT INTO book_loans(book_id, user_id, return_date) VALUES($1, $2, NOW() + INTERVAL '1 day' * $3) RETURNING *",
      [book_id, user_id, return_date]
    );

    return { book_loan: bookLoan[0] };
  }

  static async viewAllLoans() {
    const { rows: loans } = await pool.query(
      "SELECT b.title, u.username, bl.return_date from books b JOIN book_loans bl ON b.id = bl.book_id JOIN users u ON u.id = bl.user_id"
    );

    return { loans: loans };
  }
}
