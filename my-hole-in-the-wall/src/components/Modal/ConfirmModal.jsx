const ConfirmModal = ({
  isOpen,
  message,
  handleConfirmDelete,
  handleCancelDelete,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/80">
      <div className="bg-white rounded-xl shadow-lg p-8 min-w-[300px] flex flex-col items-center">
        <p className="mb-6 text-lg text-center">{message}</p>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-[#d97706] text-white rounded-lg font-bold hover:bg-[#b45309] transition"
            onClick={handleConfirmDelete}
          >
            네
          </button>
          <button
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition"
            onClick={handleCancelDelete}
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
