import express from "express";
import {
    handleRedirectShortId,
    handlePostURL,
    handleGetURL
} from "../controller/url.js";

const router = express.Router();

router.get("/", handleGetURL);

router.post("/", handlePostURL);

router.get("/:shortId", handleRedirectShortId)

export default router;