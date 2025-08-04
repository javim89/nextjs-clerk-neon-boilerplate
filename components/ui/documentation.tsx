"use client";

import { CheckCircle, Copy, ExternalLink } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ children, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4">
      {filename && (
        <div className="bg-gray-100 border border-gray-200 rounded-t-lg px-4 py-2 text-sm font-mono text-gray-600 border-b-0">
          {filename}
        </div>
      )}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        {!filename && (
          <div className="absolute top-3 right-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-gray-100 font-mono">{children}</code>
        </pre>
        {filename && (
          <div className="absolute top-3 right-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Step({ number, title, children, icon }: StepProps) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="text-gray-600 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

interface CalloutProps {
  type: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800", 
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800"
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️", 
    success: "✅",
    error: "❌"
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[type]} my-4`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{icons[type]}</span>
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function LinkButton({ href, children, external = true }: LinkButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
    >
      {children}
      {external && <ExternalLink className="h-4 w-4" />}
    </a>
  );
}