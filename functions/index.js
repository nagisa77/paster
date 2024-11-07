/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const multer = require("multer");
const cors = require("cors")({
  origin: [
    "http://localhost:8080",
    "http://localhost:8081",
    "http://chenjiating.com",
    "http://www.chenjiating.com",
  ],
});
const fetch = require("node-fetch");
const FormData = require("form-data");

const upload = multer(); // 用于文件上传

exports.proxyToPasteCNet = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.headers["content-type"].includes("multipart/form-data")) {
      // 文件上传处理
      // 搞不定，先用cors
    } else if (req.headers["content-type"].includes("application/x-www-form-urlencoded")) {
      // 文本内容处理
      const textContent = req.rawBody.toString("utf-8"); // 直接读取文本内容
      if (!textContent) {
        logger.error("No text content in the request");
        return res.status(400).send("No text content in the request");
      }

      try {
        const pasteResponse = await fetch("https://paste.c-net.org", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: textContent,
        });

        const responseBody = await pasteResponse.text();
        res.status(pasteResponse.status).send(responseBody);
      } catch (error) {
        logger.error("Error uploading text content to Paste CNet:", error);
        res.status(500).send("Error uploading text content");
      }
    } else {
      logger.error("Unsupported content type:", req.headers["content-type"]);
      res.status(400).send("Unsupported content type");
    }
  });
});