const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const Document = require("./Document");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Connect to MongoDB (test-docs)
mongoose.connect("mongodb://localhost/test-docs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Fetch all documents
app.get("/documents", async (req, res) => {
  const docs = await Document.find({}, "_id name");
  res.json(docs);
});

// Create a new document
app.post("/documents", async (req, res) => {
  const { id, name } = req.body;
  if (!id) return res.status(400).send("Missing document ID");

  await Document.create({ _id: id, name, data: "" });
  res.status(201).send("Document created");
});

// Delete a document
app.delete("/documents/:id", async (req, res) => {
  const { id } = req.params;
  await Document.findByIdAndDelete(id);
  res.status(200).send("Document deleted");
});

// Start Express API server on port 3002
app.listen(3002, () => console.log("API Server running on port 3002"));

// Socket.IO Server for Real-time Collaboration (Port 3001)
const io = require("socket.io")(3001, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

// Helper function to find or create a document
async function findOrCreateDocument(id) {
  if (!id) return null;
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, name: "Untitled", data: "" });
}
