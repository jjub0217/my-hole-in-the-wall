export const ErrorSection = ({ title, message, statusCode }) => (
  <section className="flex flex-col items-center justify-center min-h-[60vh] bg-[#fff8f0] rounded-xl shadow p-8">
    <h2 className="text-2xl font-bold mb-2 text-[#d97706]">{title}</h2>
    <span className="text-gray-500 mb-4">
      {message}
      {statusCode && (
        <span className="text-sm text-gray-400"> ({statusCode})</span>
      )}
    </span>
  </section>
);
