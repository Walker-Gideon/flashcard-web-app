import React from "react";

export default function RichTextDisplay({ content, className = "" }) {
  // Function to safely render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
}
