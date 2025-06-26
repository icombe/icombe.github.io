import React from "react";
// TODO: Use real email address and prevent spam/authenticate submissions
export default function ContactForm() {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <p className="mb-4 text-lg">
        You can reach me directly at{" "}
        <a
          href="mailto:your@email.com"
          className="text-blue-600 underline"
        >
          your@email.com
        </a>
      </p>
      <p className="text-gray-500">I look forward to hearing from you!</p>
    </div>
  );
}
