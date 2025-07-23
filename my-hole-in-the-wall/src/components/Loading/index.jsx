export const LoadingSection = ({ title, message }) => (
  <section className="flex flex-col items-center justify-center min-h-[60vh] bg-[#fff8f0] rounded-xl shadow p-8">
    <img src="/images/search-food.gif" alt="로딩" className="w-32 mb-4" />
    <h2 className="text-xl font-bold text-[#d97706] mb-2">{title}</h2>
    <p className="text-gray-500">{message}</p>
  </section>
);
