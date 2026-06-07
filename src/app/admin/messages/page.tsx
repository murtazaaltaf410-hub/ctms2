"use client";

import { useEffect, useState } from "react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setMessages(data))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-heading text-3xl text-chocolate dark:text-cream mb-2">Messages</h1>
      <p className="text-brown/60 mb-8">Contact form submissions</p>

      {messages.length === 0 ? (
        <div className="bg-white dark:bg-chocolate/50 rounded-2xl p-12 text-center border border-beige/50">
          <p className="text-brown/60">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-white dark:bg-chocolate/50 rounded-2xl p-6 border ${
                msg.read ? "border-beige/50" : "border-gold/50"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium text-chocolate dark:text-cream">{msg.name}</p>
                  <p className="text-sm text-brown/60">{msg.email} {msg.phone && `· ${msg.phone}`}</p>
                </div>
                <span className="text-xs text-brown/50">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="font-medium text-gold text-sm mb-2">{msg.subject}</p>
              <p className="text-brown/70 dark:text-beige/70">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
