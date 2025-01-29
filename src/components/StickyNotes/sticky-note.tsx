export function StickyNote() {
  return (
    <>
      <div className="relative transform rotate-6">
        <div className="bg-yellow-100 p-6 rounded shadow-lg max-w-[200px]">
          <p className="font-handwriting text-gray-700 text-sm leading-relaxed">
            Check <span className="bg-highlight">John Doe</span>'s work permit,
            its expiring in a week. I suggest you check in with him soon!
          </p>
        </div>
        <div className="absolute -top-2 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2" />
      </div>
      <div className="relative transform rotate-6 -top-8 left-6">
        <div className="bg-blue-100 p-6 rounded shadow-lg max-w-[200px]">
          <p className="font-handwriting text-gray-700 text-sm leading-relaxed">
            The Canadian labour law has been updated. Make sure to update the {" "}
            <span className="bg-highlight">Jane Doe</span>'s contract.
          </p>
        </div>
        <div className="absolute -top-2 left-1/2 w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2" />
      </div>
    </>
  );
}
