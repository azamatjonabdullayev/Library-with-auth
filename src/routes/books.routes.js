import { Router } from "express";
import BookControllers from "../controllers/books.controller.js";
import { AuthGuard, AuthGuardAdmin } from "../middlewares/auth.middlewares.js";

const bookRoutes = Router();

bookRoutes.get("/books", AuthGuard, (req, res) => {
  BookControllers.getBooks(req, res);
});

bookRoutes.get("/book", AuthGuard, (req, res) =>
  BookControllers.getOneBook(req, res)
);

bookRoutes.post("/book", AuthGuard, AuthGuardAdmin, (req, res) =>
  BookControllers.addNewBook(req, res)
);
bookRoutes.put("/book", AuthGuard, AuthGuardAdmin, (req, res) =>
  BookControllers.updateBook(req, res)
);
bookRoutes.delete("/book", AuthGuard, AuthGuardAdmin, (req, res) =>
  BookControllers.deleteBook(req, res)
);

bookRoutes.post("/book/loan", AuthGuard, (req, res) => BookControllers.loanBook(req, res));
bookRoutes.get("/loans/all", AuthGuard, AuthGuardAdmin, (req, res) =>
  BookControllers.viewAllLoans(req, res)
);

export default bookRoutes;
