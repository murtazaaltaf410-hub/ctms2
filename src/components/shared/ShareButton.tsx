"use client";

import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface ShareButtonProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, url, className }: ShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleShare}
      className={className}
      aria-label="Share product"
    >
      <Share2 className="w-5 h-5" />
    </button>
  );
}
