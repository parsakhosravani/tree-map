import React from "react";
import Treemap from "../components/Treemap";

const treemapData = {
  name: "Company Overview",
  children: [
    {
      name: "Product Development",
      children: [
        {
          name: "Software",
          children: [
            { name: "Web Apps", value: 30 },
            { name: "Mobile Apps", value: 25 },
            { name: "Desktop Apps", value: 20 },
            { name: "Cloud Services", value: 35 },
          ],
        },
        {
          name: "Hardware",
          children: [
            { name: "Processors", value: 40 },
            { name: "Memory Chips", value: 30 },
            { name: "Sensors", value: 20 },
            { name: "Display Panels", value: 25 },
          ],
        },
      ],
    },
    {
      name: "Sales & Marketing",
      children: [
        {
          name: "Digital Marketing",
          children: [
            { name: "Social Media", value: 15 },
            { name: "SEO", value: 10 },
            { name: "Content Marketing", value: 12 },
            { name: "Email Campaigns", value: 8 },
          ],
        },
        {
          name: "Traditional Marketing",
          children: [
            { name: "TV Ads", value: 20 },
            { name: "Print Media", value: 10 },
            { name: "Radio", value: 5 },
            { name: "Outdoor", value: 8 },
          ],
        },
        { name: "Direct Sales", value: 50 },
      ],
    },
    {
      name: "Customer Support",
      children: [
        { name: "Phone Support", value: 30 },
        { name: "Email Support", value: 25 },
        { name: "Live Chat", value: 20 },
        { name: "Self-Service Portal", value: 15 },
      ],
    },
    {
      name: "Human Resources",
      children: [
        { name: "Recruitment", value: 20 },
        { name: "Training", value: 15 },
        { name: "Employee Relations", value: 10 },
        { name: "Payroll", value: 12 },
      ],
    },
    {
      name: "Finance",
      children: [
        { name: "Accounting", value: 25 },
        { name: "Budgeting", value: 20 },
        { name: "Investment", value: 30 },
        { name: "Auditing", value: 15 },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Treemap data={treemapData} width={800} height={600} />
    </main>
  );
}
