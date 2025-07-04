import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Building2, Globe, ExternalLink } from "lucide-react";

import { useCompany } from "@/queries/companies/useCompany";
import { Company } from "@/types/company";

export default function CompanyCard({ telegram_id }: { telegram_id: string }) {
  const { company, isLoading, error } = useCompany(telegram_id);

  if (isLoading) return <p>Loading company info...</p>;
  if (error || !company) return <p>Failed to load company info.</p>;

  const { logo_url, website, name, email }: Company = company;

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Building2 className="w-5 h-5 text-orange-600" />
          </div>
          Company Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Company Header */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
          <Avatar className="w-16 h-16 border-2 border-white shadow-md">
            <AvatarImage
              src={logo_url}
              alt="company logo"
              className="object-cover"
            />
            <AvatarFallback className="text-sm font-bold bg-orange-100 text-orange-700">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">Real Estate Company</p>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Company Email */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">
            Company Email
          </Label>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="p-2 bg-green-100 rounded-lg">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{email}</span>
          </div>
        </div>

        {/* Company Website */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Website</Label>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Globe className="w-4 h-4 text-purple-600" />
            </div>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors"
            >
              {website.replace(/^https?:\/\//, "")}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
