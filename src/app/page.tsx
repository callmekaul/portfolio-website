import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";

export default function Home() {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Ray container */}
        <div className="absolute top-0 left-0 w-full h-full flex">
          {/* Individual rays with different speeds */}
          <div className="w-[40%] h-[60%] bg-gradient-to-t from-green-500 via-blue-500 to-purple-500 opacity-50 blur-2xl mx-10 animate-auroraFlowToFro15s"></div>
          <div className="w-[40%] h-[70%] bg-gradient-to-t from-purple-400 via-pink-400 to-yellow-300 opacity-50 blur-3xl mx-10 animate-auroraFlowToFro18s"></div>
          <div className="w-[40%] h-[80%] bg-gradient-to-t from-blue-500 via-green-400 to-teal-500 opacity-50 blur-2xl mx-10 animate-auroraFlowToFro20s"></div>
          <div className="w-[40%] h-[50%] bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 opacity-50 blur-3xl mx-10 animate-auroraFlowToFro12s"></div>
          <div className="w-[40%] h-[60%] bg-gradient-to-t from-green-400 via-cyan-400 to-blue-500 opacity-50 blur-3xl mx-10 animate-auroraFlowToFro25s"></div>
          <div className="w-[40%] h-[40%] bg-gradient-to-t from-purple-500 via-pink-500 to-yellow-400 opacity-50 blur-3xl mx-10 animate-auroraFlowToFro17s"></div>
          <div className="w-[40%] h-[50%] bg-gradient-to-t from-blue-400 via-teal-400 to-green-500 opacity-50 blur-2xl mx-10 animate-auroraFlowToFro22s"></div>
        </div>
      </div>
      <Header/>
      <HeroSection/>
    </div>
  );
}
