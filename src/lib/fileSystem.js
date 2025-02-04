export const initialFileSystem = [
    {
      id: "1",
      name: "Root",
      type: "folder",
      children: [
        {
          id: "2",
          name: "Documents",
          type: "folder",
          children: [
            { id: "3", name: "document1.txt", type: "file", content: "This is document 1" },
            { id: "4", name: "document2.txt", type: "file", content: "This is document 2" },
          ],
        },
        {
          id: "5",
          name: "Images",
          type: "folder",
          children: [
            { id: "6", name: "image1.jpg", type: "file", content: "Image 1 content" },
            { id: "7", name: "image2.png", type: "file", content: "Image 2 content" },
          ],
        },
        { id: "8", name: "notes.txt", type: "file", content: "Some notes" },
      ],
    },
  ];
  
  export const initialState = {
    items: initialFileSystem,
    selectedItem: null,
    expandedFolders: new Set(["1"]), // Root folder is expanded by default
  };
  
  const findItemById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };
  
  const deleteItemById = (items, id) => {
    return items.filter((item) => {
      if (item.id === id) return false;
      if (item.children) {
        item.children = deleteItemById(item.children, id);
      }
      return true;
    });
  };
  
  export const fileSystemReducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_FOLDER":
        return {
          ...state,
          expandedFolders: state.expandedFolders.has(action.id)
            ? new Set([...state.expandedFolders].filter((folderId) => folderId !== action.id))
            : new Set(state.expandedFolders).add(action.id),
        };
      case "SELECT_ITEM":
        return { ...state, selectedItem: action.item };
      case "CREATE_ITEM":
        // eslint-disable-next-line no-case-declarations
        const parentItem = findItemById(state.items, action.parentId);
        if (parentItem && parentItem.type === "folder") {
          parentItem.children = [...(parentItem.children || []), action.item];
        }
        return { ...state };
      case "RENAME_ITEM":
        // eslint-disable-next-line no-case-declarations
        const itemToRename = findItemById(state.items, action.id);
        if (itemToRename) {
          itemToRename.name = action.newName;
        }
        return { ...state };
      case "DELETE_ITEM":
        return { ...state, items: deleteItemById(state.items, action.id) };
      default:
        return state;
    }
  };
  