'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import quotes from "@/data/quotes.json";

export default function QuoteForm() {
    const [topic, setTopic] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setIsLoading(true);
        // Add a small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        const found = quotes
            .filter(q => q.topic.toLowerCase() === topic.toLowerCase())
            .slice(0, 3)
            .map(q => q.text);
        setResults(found.length ? found : ["No quotes found for this topic. Try 'success', 'life', or 'motivation'!"]);
        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Search Card */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <Input
                            placeholder="Enter a topic (e.g., success, life, motivation)"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="pl-10 h-14 text-lg border-2 border-purple-200 focus:border-purple-500 rounded-xl"
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
                        disabled={isLoading || !topic.trim()}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                                Finding Quotes...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Get Inspiring Quotes
                            </div>
                        )}
                    </Button>
                </form>

                {/* Topic Suggestions */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Popular topics:</span>
                    {['success', 'life', 'motivation', 'dreams', 'happiness', 'courage'].map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => setTopic(suggestion)}
                            className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors capitalize"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {results.length > 0 && (
                <div className="space-y-4 animate-fade-in">
                    {results.map((quote, i) => (
                        <div
                            key={i}
                            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <blockquote className="text-lg text-gray-700 dark:text-gray-200 italic leading-relaxed">
                                        "{quote}"
                                    </blockquote>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                                #{topic.toLowerCase()}
                                            </span>
                                        </div>
                                        <button className="text-gray-400 hover:text-purple-600 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
