import React from "react";
import { StudyPlanObject } from "@/types";

const Table = ({ plan }: { plan: StudyPlanObject[] }) => {
  console.log(plan);
  return (
    <div className="relative overflow-x-auto bg-gradient-to-b from-gray-200 to-white p-3 shadow-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th>Day</th>
            <th>Topics</th>
            <th>Subtopics</th>
            <th>Hours to Study</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((p, index) => (
            <tr
              className={
                index !== plan.length - 1 ? "border-y-2 border-gray-300" : ""
              }
              key={index}
            >
              <td>{p.day}</td>
              <td>
                <ul>
                  {Array.isArray(p.topics) ? (
                    p.topics.map((topic) => <li key={topic}>{topic}</li>)
                  ) : (
                    <li>{p.topics}</li>
                  )}
                </ul>
              </td>
              <td>
                <ul>
                  {p.subtopics.map((subtopic) => (
                    <li key={subtopic}>{subtopic}</li>
                  ))}
                </ul>
              </td>
              <td>{p.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
