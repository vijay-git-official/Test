
import { useReducer, useState } from "react";
import TreeView from "./TreeView";
import ContentArea from "./ContentArea";
import { initialState, fileSystemReducer } from "../../lib/fileSystem";

const FileExplorer = () => {
    const [state, dispatch] = useReducer(fileSystemReducer, initialState);
    const [newItemName, setNewItemName] = useState("");
    const [newItemType, setNewItemType] = useState("file");
    const [error, setError] = useState(null);


    const handleToggleFolder = (id) => {
        dispatch({ type: "TOGGLE_FOLDER", id });
    };

    const handleSelectItem = (item) => {
        dispatch({ type: "SELECT_ITEM", item });
    };

    const handleCreateItem = () => {
        if (!state.selectedItem || state.selectedItem.type !== "folder") {
            setError("Please select folder to create a new item");
            return;
        }

        if (newItemName.trim() === "") {
            setError("Please enter a name for the new item");
            return;
        }

        const newItem = {
            id: Date.now().toString(),
            name: newItemName.trim(),
            type: newItemType,
            content: newItemType === "file" ? "" : undefined,
            children: newItemType === "folder" ? [] : undefined,
        };

        dispatch({ type: "CREATE_ITEM", parentId: state.selectedItem.id, item: newItem });
        setNewItemName("");
        setError(null);
    };

    const handleRename = (id, newName) => {
        dispatch({ type: "RENAME_ITEM", id, newName });
    };

    const handleDelete = (id) => {
        dispatch({ type: "DELETE_ITEM", id });
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 border-r p-4 overflow-auto">
                <h2 className="text-xl font-semibold mb-4">File Explorer</h2>
                <TreeView
                    items={state.items}
                    expandedFolders={state.expandedFolders}
                    selectedItem={state.selectedItem}
                    onToggleFolder={handleToggleFolder}
                    onSelectItem={handleSelectItem}
                />
                <div className="mt-4">
                    <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="New item name"
                        className="border rounded px-2 py-1 w-full mb-2"
                    />
                    <div className="flex items-center mb-2">
                        <label className="mr-2">
                            <input
                                type="radio"
                                value="file"
                                checked={newItemType === "file"}
                                onChange={() => setNewItemType("file")}
                                className="mr-1"
                            />
                            File
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="folder"
                                checked={newItemType === "folder"}
                                onChange={() => setNewItemType("folder")}
                                className="mr-1"
                            />
                            Folder
                        </label>
                    </div>
                    <button onClick={handleCreateItem} className="bg-green-500 text-white px-2 py-1 rounded w-full">
                        Create New Item
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
            <div className="w-2/3 overflow-auto">
                <ContentArea selectedItem={state.selectedItem} onRename={handleRename} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default FileExplorer;
