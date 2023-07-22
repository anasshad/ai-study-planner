"use client";
import React, { useState } from "react";
import { FaPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { StudyPlanObject } from "@/types";
import Table from "../components/Table";

const buttonClass =
  "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2";

export default function Home() {
  const [fields, setFields] = useState<string[]>([""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<StudyPlanObject[]>([]);
  const [days, setDays] = useState<string>("1");

  const handleField = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let newFields = [...fields];
    newFields[index] = e.target.value;
    setFields(newFields);
    console.log(fields);
  };

  const handleAddField = () => {
    setFields([...fields, ""]);
  };

  const fetchStudyPlan = async () => {
    setLoading(true);
    const topics = fields.join(" ");
    const data = {
      topics,
      days,
    };
    try {
      const response = await fetch("/api/palm", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      setPlan(JSON.parse(await response.json()));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = (index: number) => {
    let f = [...fields];
    f.splice(index, 1);
    setFields(f);
  };

  console.log(plan);
  console.log(days);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl font-bold">AI Study Planner</h1>
      <h2 className="text-xs text-gray-600  mb-5">
        Create a study plan by using Google PaLM AI
      </h2>
      <div className="w-full md:w-1/2 flex flex-col gap-3 ">
        {fields.map((field, index) => {
          return (
            <div key={index} className="w-full flex items-center">
              <input
                className={
                  (fields.length > 1 ? "w-5/6" : "w-full") +
                  " bg-white border-red-100 p-2 rounded-md border-2"
                }
                type="text"
                key={index}
                placeholder="Add topic"
                value={field}
                onChange={(e) => handleField(e, index)}
              />

              {fields.length > 1 && (
                <button className="w-1/6" onClick={() => handleDelete(index)}>
                  <FaRegTrashAlt className="mx-auto" />
                </button>
              )}
            </div>
          );
        })}
        <button
          className={buttonClass}
          onClick={handleAddField}
          disabled={loading}
        >
          <FaPlusSquare className="mx-auto" />
        </button>
        <label className="flex flex-row justify-between">
          Select Days to Study
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="p-2"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </label>
        <button className={buttonClass} onClick={fetchStudyPlan}>
          {loading ? (
            <Image
              className="mx-auto"
              src="/loading.svg"
              width={20}
              height={20}
              alt="loading"
            />
          ) : (
            "Create Study Plan"
          )}
        </button>
        {plan!.length > 0 && <Table plan={plan} />}
      </div>
    </main>
  );
}
