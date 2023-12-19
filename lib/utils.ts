import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadFile(fileUrl: string):void {
  // Create a link element
  var link = document.createElement('a');

  // Set the href attribute to the specified file URL
  link.href = fileUrl;

  // Set the download attribute with a suggested filename
  link.download = 'downloaded_file';

  link.target = "_blank";

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click event to start the download
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
}

export function getAbsoluteURL(path: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}