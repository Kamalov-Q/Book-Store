import { Router } from "express";
import upload from "../lib/imageUpload.js";
import { createBook, deleteBookByOwner, deleteBooks, getAllBooks, getAllBooksByAdmin, getBooksByUser, updateBook, uploadImage } from "../controllers/books.controller.js";
import { authentificateUser } from "../../middlewares/authentificate.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
const router = Router();

router.post("/upload", upload.single("imageUrl"), uploadImage);
router.post("/", authentificateUser, createBook);
router.get("/", authentificateUser, getAllBooks);
router.get("/user", authentificateUser, getBooksByUser);
router.put("/:id", authentificateUser, authorizeUser(["admin"]), updateBook);
router.get("/admin/books", authentificateUser, authorizeUser(["admin"]), getAllBooksByAdmin);
router.delete("/admin/:id", authentificateUser, authorizeUser(["admin"]), deleteBooks);
router.delete("/:id", authentificateUser, authorizeUser(["admin", "user"]), deleteBookByOwner);
export default router;
