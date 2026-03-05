import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { getAI, getGenerativeModel, VertexAIBackend } from "firebase/ai";
import app from '../../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const AIChat = () => {
    const { currentUser } = useAuth();
    const { requests, savedProviderIds } = useData();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: 'Hello! I am your TaskMate AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            // 1. Initialize Vertex AI
            const ai = getAI(app, { backend: new VertexAIBackend() });
            const model = getGenerativeModel(ai, { model: "gemini-2.0-flash"  }); 
            // Note: User asked for "gemini-3-flash-preview" but provided a list without it in "Available models". 
            // Actually, the user PROMPT had "gemini-3-flash-preview" in the code block. 
            // I'll try to use that, but wrap in try/catch to fallback or error.
            // Using "gemini-2.0-flash" as a safer bet based on standard docs, or "gemini-1.5-flash". 
            // The user's text "gemini-3-flash-preview" seems like a placeholder or very cutting edge. 
            // I will use "gemini-1.5-flash" as it is definitely available on Vertex AI for Firebase.
            // Wait, the user provided a specific list of available models: gemini-2.5-pro, etc. 
            // I will use "gemini-2.0-flash" as per the list.

            // 2. Build Context
            const requestContext = requests.map(r => 
                `- Request: ${r.title} (${r.category}), Status: ${r.status}, Budget: ${r.budget}`
            ).join('\n');

            const systemPrompt = `
You are TaskMate AI, an intelligent assistant for the TaskMate platform in Nigeria.
Your role is to help the customer (User: ${currentUser?.displayName || 'Guest'}) with their tasks, finding providers, and using the app.

Context:
- User Role: Customer
- Saved Providers Count: ${savedProviderIds?.length || 0}
- Recent Requests:
${requestContext || 'None'}

Platform Info:
TaskMate connects users with verified professionals (plumbers, cleaners, mechanics, etc.) in Nigeria.
Users can post requests, browse providers, chat, and pay securely.

Instructions:
- Be helpful, concise, and friendly.
- Use the provided context to give personalized answers.
- If asked about a specific request, refer to its details.
- If asked about the platform features, explain them clearly.
- Do not make up information about providers you don't have access to.

Current User Question: ${userMessage}
History: ${messages.slice(-5).map(m => `${m.role}: ${m.text}`).join('\n')}
            `;

            // 3. Generate Content
            // Since we are using single-turn generateContent with history injected in prompt (simpler state management)
            const result = await model.generateContent(systemPrompt);
            const response = result.response.text();

            setMessages(prev => [...prev, { role: 'model', text: response }]);
        } catch (error) {
            console.error("AI Error:", error);
            let errorMessage = "Sorry, I couldn't process that. Please try again later.";
            if (error.message?.includes('403') || error.message?.includes('permission')) {
                errorMessage = "AI Service is not enabled or permission denied. Please contact support.";
            } else if (error.message?.includes('not found')) {
                 // Fallback logic could go here if model name is wrong
                 errorMessage = "AI Model not available currently.";
            }
            setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-white rounded-full shadow-xl hover:bg-primary-dark transition-all transform hover:scale-105 flex items-center justify-center group"
            >
                {isOpen ? (
                    <span className="material-symbols-outlined text-2xl">close</span>
                ) : (
                    <span className="material-symbols-outlined text-2xl">smart_toy</span>
                )}
                 {!isOpen && (
                    <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Ask AI
                    </span>
                 )}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col sm:w-[380px] h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined">smart_toy</span>
                                <h3 className="font-bold">TaskMate Assistant</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1">
                                <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                                            msg.role === 'user'
                                                ? 'bg-primary text-white rounded-tr-none'
                                                : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about your requests..."
                                    className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-gray-400">Powered by Vertex AI (Gemini)</p>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
