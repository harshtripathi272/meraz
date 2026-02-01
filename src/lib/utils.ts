import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function generateICSContent(event: {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
}): string {
  const startDate = new Date(`${event.date}T${event.startTime}:00`);
  const endDate = new Date(`${event.date}T${event.endTime}:00`);
  
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Meraz 6.0//IIT Bhilai//EN
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.name} - Meraz 6.0
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.venue}, IIT Bhilai
END:VEVENT
END:VCALENDAR`;
}

export function downloadICS(event: Parameters<typeof generateICSContent>[0]) {
  const icsContent = generateICSContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${event.name.toLowerCase().replace(/\s+/g, '-')}-meraz.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
