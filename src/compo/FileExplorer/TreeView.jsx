/* eslint-disable react/prop-types */

const TreeView = ({ items, expandedFolders, selectedItem, onToggleFolder, onSelectItem }) => {
    const renderItem = (item) => {
        const isExpanded = expandedFolders.has(item.id);
        const isSelected = selectedItem?.id === item.id;

        return (
            <li key={item.id} className="mb-1">
                <div
                    className={`flex items-center cursor-pointer p-1 rounded ${isSelected ? "bg-blue-100" : "hover:bg-gray-100"}`}
                    onClick={() => onSelectItem(item)}
                >
                    {item.type === "folder" && (
                        <span onClick={() => onToggleFolder(item.id)}>
                        </span>
                    )}
                    <span>{item.name}</span>
                </div>
                {item.type === "folder" && isExpanded && item.children && (
                    <ul className="ml-4">{item.children.map((child) => renderItem(child))}</ul>
                )}
            </li>
        );
    };

    return <ul className="text-sm">{items.map((item) => renderItem(item))}</ul>;
};

export default TreeView;
