import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { UserType } from "@/types/user";
import { NameForm } from "@/components/forms/name-form"; // adjust import path

export function HostCard({ user }: { user: UserType }) {
  const { username, name, role, image, email } = user;
  const telegramId = email.split("#")[1];

  const getTelegramUrl = (username: string) => `https://t.me/${username}`;

  return (
    <Card className="border-0 bg-white/80">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
              <AvatarImage
                src={image!}
                alt="profile"
                className="object-cover"
              />
              <AvatarFallback className="text-xl font-semibold bg-blue-100 text-blue-700">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Modular Name Form */}
        <NameForm initialName={name} telegramId={telegramId} />

        <p className="text-sm text-gray-500 font-medium capitalize mt-2">
          {role}
        </p>
      </CardHeader>

      <CardContent>
        {username && (
          <div className="mt-3 text-center">
            <a
              href={getTelegramUrl(username)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Telegram Profile
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
