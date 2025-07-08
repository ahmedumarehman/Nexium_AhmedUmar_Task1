import QuoteForm from "@/components/QuoteForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.1) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-6">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Quote Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover powerful motivational quotes tailored to your interests.
            <br />
            <span className="text-purple-600 dark:text-purple-400 font-medium">Find inspiration that speaks to your soul.</span>
          </p>
        </div>

        {/* Quote Form */}
        <QuoteForm />

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ✨ Powered by inspiration • Made with ❤️
          </p>
        </div>
      </div>
    </main>
  );
}
