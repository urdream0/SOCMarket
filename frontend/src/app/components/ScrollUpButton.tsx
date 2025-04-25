"use client"
export default function ScrollUpButton() {
  return (
    <button
      type="button"
      className="fixed bottom-5 right-5 bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full border border-gray-300 shadow-md"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}