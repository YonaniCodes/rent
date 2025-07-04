import Link from "next/link";
import { ReactNode } from "react";
import { Home } from "lucide-react"; // You can replace with UploadCloud or Building2
import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
};

const Header = ({ children }: Props) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              HabeshaHome
            </span>
          </div>
          <div className="flex items-center space-x-4">{children}</div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
