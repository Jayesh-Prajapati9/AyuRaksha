import React, { useState } from "react";
import {
  Send,
  UploadCloud,
  Search,
  MessageSquare,
  Image,
  Activity,
  ZapIcon,
} from "lucide-react";
import axios from "axios";

const AIChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("chat");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", question: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/chat",
        { question: input },
        { headers: { "Content-Type": "application/json" } }
      );
      const botMessage = {
        sender: "ai",
        text: response.data.answer || "No response from AI.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error fetching AI response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = () => {
    console.log("Analyzing image:", selectedFile);
    // Here you would handle the image analysis
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      {/* Glass Morphism Container */}
      <div className="max-w-5xl mx-auto w-full my-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              AI Scan & Chat
            </span>
          </h1>
          <p className="text-blue-200 text-lg">
            Your intelligent health assistant
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-white/20">
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === "chat"
                  ? "text-white bg-white/10"
                  : "text-blue-200 hover:bg-white/5"
              }`}
              onClick={() => setActiveTab("chat")}
            >
              <MessageSquare className="w-5 h-5" />
              Chat
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === "scan"
                  ? "text-white bg-white/10"
                  : "text-blue-200 hover:bg-white/5"
              }`}
              onClick={() => setActiveTab("scan")}
            >
              <Image className="w-5 h-5" />
              Image Scan
            </button>
            {/* <button 
              className={`flex-1 py-4 px-6 text-center font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'insights' ? 'text-white bg-white/10' : 'text-blue-200 hover:bg-white/5'}`}
              onClick={() => setActiveTab('insights')}
            >
              <Activity className="w-5 h-5" />
              Insights
            </button> */}
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === "chat" && (
              <div className="space-y-6">
                {/* Chat Messages Area */}
                {messages?.map((input, value) => (
                    <div className="overflow-auto rounded-xl bg-white/5 p-1" key={input}>
                      {messages[value].sender === "ai" ? (
                        <div className="flex gap-3 mb-4 p-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                            AI
                          </div>
                          <div className="flex-1 bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/10 text-white">
                            {messages[value].text}
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3 flex-row-reverse mb-3 p-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold">
                            Y
                          </div>
                          <div className="flex-1 bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-3 rounded-lg backdrop-blur-sm border border-white/10 text-white">
                            {messages[value].question}
                          </div>
                        </div>
                      )}
                    </div>

                ))}

                {/* Input Area */}
                <div className="flex gap-3 items-center">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything about your health..."
                      className="w-full px-5 py-4 rounded-full outline-none bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300/50 transition-all"
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    />
                  </div>
                  <button
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 flex items-center justify-center shadow-lg hover:shadow-purple-500/30 transition-all"
                    onClick={sendMessage}
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "scan" && (
              <div className="text-center py-8">
                <div className="max-w-md mx-auto">
                  <div className="relative border-2 border-dashed border-white/30 rounded-xl p-10 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white/5 backdrop-blur-sm group mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {selectedFile ? (
                      <div className="text-white">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Image className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-medium">
                          File selected: {selectedFile.name}
                        </p>
                        <p className="text-blue-200 mt-2">
                          Click "Analyze Image" to process
                        </p>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-16 h-16 mx-auto mb-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
                        <p className="text-white font-medium text-lg mb-2">
                          Upload Medical Image
                        </p>
                        <p className="text-blue-200">
                          Drag and drop or click to browse
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>

                  {/* Analyze Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={!selectedFile}
                    className={`px-8 py-4 rounded-full font-medium text-white shadow-lg flex items-center justify-center gap-2 mx-auto
                      ${
                        selectedFile
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-600/30"
                          : "bg-gray-600/50 cursor-not-allowed"
                      } transition-all`}
                  >
                    <Search className="w-5 h-5" />
                    Analyze Image
                  </button>

                  {/* Example Results Preview (visible when an image is selected) */}
                  {selectedFile && (
                    <div className="mt-8 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                      <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2 justify-center">
                        <Activity className="w-5 h-5 text-blue-300" />
                        Results will appear here
                      </h3>
                      <div className="h-32 flex items-center justify-center">
                        <p className="text-blue-200">
                          Click "Analyze Image" to process your upload
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* {activeTab === 'insights' && (
              <div className="text-center py-12">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm mx-auto flex items-center justify-center mb-4">
                  <Activity className="w-12 h-12 text-indigo-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Health Insights</h3>
                <p className="text-blue-200 max-w-md mx-auto">
                  Start a conversation or upload medical images to receive personalized health insights and recommendations.
                </p>
              </div>
            )}
            */}
          </div>

          {/* Footer */}
          <div className="bg-black/20 p-4 text-center">
            <p className="text-blue-200 text-sm">
              Analyze images and chat with AI for personalized health insights.
            </p>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm border border-white/10">
            ✨ AI-Powered Analysis
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm border border-white/10">
            🔒 Private & Secure
          </div>
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm border border-white/10">
            🩺 Medical Image Scanning
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatApp;
