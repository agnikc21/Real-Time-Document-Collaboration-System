import { useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { useHistory } from "react-router-dom";

const SERVER_URL = `http://${window.location.hostname}:3002`;

function DocManage({ currentUser }) {
  const [documents, setDocuments] = useState([]);
  const [newDocName, setNewDocName] = useState("");
  const history = useHistory();

  const fetchDocuments = () => {
    fetch(`${SERVER_URL}/documents`, {
      headers: { "User-Email": currentUser.email },
    })
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((error) => console.error("Error fetching documents:", error));
  };

  useEffect(fetchDocuments, [currentUser.email]);

  const createDocument = async () => {
    if (!newDocName.trim()) return;
    const docId = uuidV4();

    try {
      const response = await fetch(`${SERVER_URL}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: docId,
          name: newDocName,
          owner: currentUser.email,
          allowedUsers: [],
        }),
      });

      if (response.ok) {
        setNewDocName("");
        fetchDocuments();
        history.push(`/documents/${docId}`);
      } else {
        console.error("Error creating document:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteDocument = async (id) => {
    try {
      const response = await fetch(`${SERVER_URL}/documents/${id}`, {
        method: "DELETE",
        headers: { "User-Email": currentUser.email },
      });

      if (response.ok) {
        fetchDocuments();
      } else {
        console.error("Error deleting document:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openDocument = (id) => {
    history.push(`/documents/${id}`);
  };

  return (
    <div>
      <h1>Manage Documents</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            <span onClick={() => openDocument(doc._id)} style={{ cursor: "pointer", color: "blue" }}>
              {doc.name}
            </span>
            <span>&nbsp;&nbsp;&nbsp;</span>
            {doc.owner === currentUser.email && (
              <button onClick={() => deleteDocument(doc._id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newDocName}
        onChange={(e) => setNewDocName(e.target.value)}
        placeholder="Enter document name"
      />
      <button onClick={createDocument}>Create</button>
    </div>
  );
}

export default DocManage;
