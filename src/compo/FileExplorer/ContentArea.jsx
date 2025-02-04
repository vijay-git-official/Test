/* eslint-disable react/prop-types */
import  { useState } from "react";

const ContentArea = ({ selectedItem, onRename, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  const handleRename = () => {
    if (selectedItem && editedName.trim() !== "") {
      onRename(selectedItem.id, editedName.trim());
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      onDelete(selectedItem.id);
    }
  };

  if (!selectedItem) {
    return <div className="p-4">Select a file or folder to view its contents.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleRename}
            onKeyPress={(e) => e.key === "Enter" && handleRename()}
            className="border rounded px-2 py-1"
            autoFocus
          />
        ) : (
          <h2 className="text-xl font-semibold">{selectedItem.name}</h2>
        )}
        <div>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditedName(selectedItem.name);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm"
          >
            Rename
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded text-sm">
            Delete
          </button>
        </div>
      </div>
      {selectedItem.type === "file" && <pre className="bg-gray-100 p-4 rounded">{selectedItem.content}</pre>}
      {selectedItem.type === "folder" && <p>This is a folder containing {selectedItem.children?.length || 0} items.</p>}
    </div>
  );
};

export default ContentArea;
