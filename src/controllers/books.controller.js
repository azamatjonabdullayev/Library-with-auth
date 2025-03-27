import BookService from "../services/books.service.js";

export default class BookControllers {
  static async getBooks(req, res) {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json({
        success: true,
        ...books,
      });
    } catch (error) {
      res
        .status(error.err_status || 500)
        .json({ message: error.message || "INTERNAL SERVER ERROR" });
    }
  }

  static async getOneBook(req, res) {
    try {
      const book = await BookService.getBookById(req.headers["x-book-id"]);
      res.status(200).json({
        success: true,
        ...book,
      });
    } catch (error) {
      res
        .status(error.err_status || 500)
        .json(error.message || "INTERNAL SERVER ERROR");
    }
  }

  static async addNewBook(req, res) {
    try {
      const newBook = await BookService.addNewBook(req.body);
      res.status(201).json({
        success: true,
        ...newBook,
      });
    } catch (error) {
      res.status(error.err_status || 500).json({
        message: error.message || "INTERNAL SERVER ERROR",
      });
    }
  }

  static async updateBook(req, res) {
    try {
      const updatedBook = await BookService.updateBook(
        req.headers["x-book-id"],
        req.body
      );
      res.status(200).json({
        success: true,
        ...updatedBook,
      });
    } catch (error) {
      res.status(error.err_status || 500).json({
        message: error.message || "INTERNAL SERVER ERROR",
      });
    }
  }

  static async deleteBook(req, res) {
    try {
      const deletedBook = await BookService.deleteBook(
        req.headers["x-book-id"]
      );
      res.status(200).json({
        success: true,
        ...deletedBook,
      });
    } catch (error) {
      res
        .status(error.err_status || 500)
        .json(error.message || "INTERNAL SERVER ERROR");
    }
  }

  static async loanBook(req, res) {
    try {
      const bookLoan = await BookService.loanBook(
        req.headers["x-book-id"],
        req.user.id,
        req.body.return_date
      );
      res.status(200).json({
        success: true,
        ...bookLoan,
      });
    } catch (error) {
      res
        .status(error.err_status || 500)
        .json(error.message || "INTERNAL SERVER ERROR");
    }
  }

  static async viewAllLoans(req, res) {
    try {
      const loans = await BookService.viewAllLoans();
      res.status(200).json({
        success: true,
        ...loans,
      });
    } catch (error) {
      res
        .status(error.err_status || 500)
        .json(error.message || "INTERNAL SERVER ERROR");
    }
  }
}
