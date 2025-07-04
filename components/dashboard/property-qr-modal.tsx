"use client";

import QRCode from "react-qr-code";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Share2,
  MessageCircle as Telegram,
  X,
  Download,
} from "lucide-react";

import React, { useRef } from "react";
import { toPng } from "html-to-image";

export default function PropertyQRModal({
  children,
  propertyId,
}: {
  children: React.ReactNode;
  propertyId: number;
}) {
  const qrRef = useRef<HTMLDivElement>(null);
  const propertyUrl = `${process.env.NEXT_PUBLIC_URL}/homes/${propertyId}`;

  const handleDownload = async () => {
    console.log("downloading");
    if (!qrRef.current) return;
    const dataUrl = await toPng(qrRef.current);
    const link = document.createElement("a");
    link.download = `property-${propertyId}-qr.png`;
    link.href = dataUrl;
    link.click();
    console.log("downloaded");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this property!",
          text: "Scan or click to view the listing.",
          url: propertyUrl,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Property #{propertyId}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div ref={qrRef} className="bg-white p-4 rounded shadow-md">
            <QRCode value={propertyUrl} size={180} />
          </div>

          <div className="flex flex-col items-center gap-2 w-full">
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
            <Button
              onClick={handleNativeShare}
              variant="outline"
              className="w-full"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share via Device
            </Button>
          </div>

          <div className="w-full border-t pt-4 mt-4 text-sm text-muted-foreground text-center">
            Or share with:
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                propertyUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost">
                <Telegram className="h-5 w-5 mr-1" /> Telegram
              </Button>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                propertyUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost">
                <Facebook className="h-5 w-5 mr-1" /> Facebook
              </Button>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                propertyUrl
              )}&text=Check+out+this+property!`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost">
                <X className="h-5 w-5 mr-1" /> Twitter
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
