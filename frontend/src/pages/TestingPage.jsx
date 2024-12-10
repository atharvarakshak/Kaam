
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
const schema = z.object({
  rank: z.number().positive("Rank must be a positive number"),
  mark: z.number().positive("Mark must be a positive number"),
  wind: z.number(),
  competitor: z.string().min(1, "Competitor name is required"),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth must be in YYYY-MM-DD format"),
  nationality: z.string().length(3, "Nationality must be a 3-letter code"),
  pos: z.number().nullable(),
  venue: z.string().min(1, "Venue is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of Birth must be in YYYY-MM-DD format"),
  // nationality: z.string().length(3, "Nationality must be a 3-letter code"),
  resultsScore: z.number().nullable(),
  age: z.number().int().positive("Age must be a positive integer"),
  gender: z.enum(["Male", "Female"], "Gender must be Male or Female"),
  sprintDistance: z.number().positive("Sprint Distance must be positive"),
  previousYearsMark: z.number().nullable(),
  peakAcceleration: z.number().nullable(),
  reactionTime: z.number().nullable(),
  heartRateDuringPerformance: z.number().nullable(),
  heartRateVariability: z.number().nullable(),
  lactateThreshold: z.number().nullable(),
  drugConsumption: z.enum(["Yes", "No"], "Drug Consumption must be Yes or No"),
});

function PerformanceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formFields = [
    { name: "rank", label: "Rank", type: "number" },
    { name: "mark", label: "Mark", type: "number" },
    { name: "wind", label: "Wind", type: "number" },
    { name: "competitor", label: "Competitor", type: "text" },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "nationality", label: "Nationality (3-letter code)", type: "text" },
    { name: "pos", label: "Position", type: "number" },
    { name: "venue", label: "Venue", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "resultsScore", label: "Results Score", type: "number" },
    { name: "age", label: "Age", type: "number" },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female"],
    },
    { name: "sprintDistance", label: "Sprint Distance", type: "number" },
    {
      name: "previousYearsMark",
      label: "Previous Year's Mark",
      type: "number",
    },
    { name: "peakAcceleration", label: "Peak Acceleration", type: "number" },
    { name: "reactionTime", label: "Reaction Time", type: "number" },
    { name: "heartRateDuringPerformance", label: "Heart Rate", type: "number" },
    {
      name: "heartRateVariability",
      label: "Heart Rate Variability",
      type: "number",
    },
    { name: "lactateThreshold", label: "Lactate Threshold", type: "number" },
    {
      name: "drugConsumption",
      label: "Drug Consumption",
      type: "select",
      options: ["Yes", "No"],
    },
  ];

  const onSubmit = async (data) => {
    // Map form data to the required API format
    setIsLoading(true);
    const payload = {
      features: [
        data.rank,
        data.mark,
        data.wind,
        data.pos,
        data.resultsScore,
        data.age,
        data.gender === "Male" ? 1 : 0,
        data.sprintDistance,
        data.previousYearsMark,
        data.peakAcceleration,
        data.reactionTime,
        data.heartRateDuringPerformance,
        data.heartRateVariability,
        data.lactateThreshold,
        data.drugConsumption === "Yes" ? 1 : 0,
      ],
    };
    console.log(payload);

    try {
      const response = await fetch(
        "https://antidopingtest.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("API Response:", result.prediction);
      if (result.prediction == 1) {
        setApiResponse("Doped");
      } else {
        setApiResponse("Not Doped");
      }
      setIsLoading(false);
      console.log(apiResponse);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send data to the API. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-grow bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
            <div className="bg-blue-600 p-6 text-center">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Athlete Performance Form
              </h1>
              <p className="mt-2 text-blue-100">
                Comprehensive Performance Tracking
              </p>
            </div>

            <div className="p-8 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map((field) => (
                    <div key={field.name} className="group">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors"
                      >
                        {field.label}
                      </label>
                      {field.type === "select" ? (
                        <select
                          id={field.name}
                          {...register(field.name)}
                          className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 ease-in-out focus:ring-2 focus:outline-none
                            ${
                              errors[field.name]
                                ? "border-red-400 focus:ring-red-200 bg-red-50"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-400"
                            }`}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.name}
                          type={field.type}
                          {...register(field.name, {
                            valueAsNumber: field.type === "number",
                            required:
                              field.name !== "pos" &&
                              field.name !== "resultsScore" &&
                              field.name !== "previousYearsMark" &&
                              field.name !== "peakAcceleration" &&
                              field.name !== "reactionTime" &&
                              field.name !== "heartRateDuringPerformance" &&
                              field.name !== "heartRateVariability" &&
                              field.name !== "lactateThreshold",
                          })}
                          className={`w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-300 ease-in-out focus:ring-2 focus:outline-none
                            ${
                              errors[field.name]
                                ? "border-red-400 focus:ring-red-200 bg-red-50"
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-blue-400"
                            }`}
                        />
                      )}
                      {errors[field.name] && (
                        <div className="mt-2 flex items-center text-red-600 text-sm space-x-2 animate-pulse">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{errors[field.name]?.message}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3.5 rounded-lg 
                      font-semibold text-lg tracking-wide uppercase 
                      hover:bg-blue-700 
                      focus:outline-none focus:ring-4 focus:ring-blue-300 
                      transition-all duration-300 ease-in-out 
                      transform hover:-translate-y-1 hover:scale-[1.02] 
                      shadow-lg hover:shadow-xl"
                  >
                    {!isLoading ? (
                      <p>Submit Performance Data</p>
                    ) : (
                      <p className="animate-pulse">...</p>
                    )}
                  </button>
                </div>
              </form>
              {apiResponse && (
                <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Prediction Result:
                  </h2>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceForm;
