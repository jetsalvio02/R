"use client";

import { useState } from "react";

type PollType = "YES_NO" | "MULTIPLE_CHOICE";

type Option = {
  id: number;
  label: string;
  image_url?: string | null;
};

type Poll = {
  id: number;
  title: string;
  description?: string;
  type: PollType;
  status: "DRAFT" | "ACTIVE" | "CLOSED";
  image_url?: string | null;
  options: Option[];
};

export default function PollVotePage() {
  // mock data for UI
  const poll: Poll = {
    id: 1,
    title: "Who should be the next class president?",
    description: "Cast your vote. Results update live.",
    type: "MULTIPLE_CHOICE",
    status: "ACTIVE",
    image_url: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
    options: [
      {
        id: 1,
        label: "Candidate A",
        image_url:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
      },
      {
        id: 2,
        label: "Candidate B",
        image_url:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      },
    ],
  };

  const [selected, setSelected] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canVote = poll.status === "ACTIVE";

  const submitVote = async () => {
    if (!selected) return;
    setSubmitting(true);

    // API call later
    setTimeout(() => {
      alert("Vote submitted!");
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Poll Image */}
      {poll.image_url && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
          <img
            src={poll.image_url}
            alt="Poll"
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{poll.title}</h1>

      {/* Description */}
      {poll.description && (
        <p className="text-gray-600 mb-4">{poll.description}</p>
      )}

      {/* Status */}
      <span
        className={`inline-block mb-6 px-3 py-1 text-sm rounded-full ${
          poll.status === "ACTIVE"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {poll.status}
      </span>

      {/* OPTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {poll.type === "YES_NO" ? (
          <>
            {["Yes", "No"].map((label, idx) => (
              <button
                key={label}
                disabled={!canVote}
                onClick={() => setSelected(idx)}
                className={`py-6 rounded-xl border text-lg font-semibold transition
                  ${
                    selected === idx
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
              >
                {label}
              </button>
            ))}
          </>
        ) : (
          poll.options.map((option) => (
            <button
              key={option.id}
              disabled={!canVote}
              onClick={() => setSelected(option.id)}
              className={`rounded-xl overflow-hidden border transition
                ${
                  selected === option.id
                    ? "ring-2 ring-blue-500"
                    : "hover:shadow-md"
                }`}
            >
              {option.image_url && (
                <img
                  src={option.image_url}
                  alt={option.label}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4 text-center font-medium">{option.label}</div>
            </button>
          ))
        )}
      </div>

      {/* SUBMIT */}
      <button
        disabled={!canVote || !selected || submitting}
        onClick={submitVote}
        className="w-full md:w-auto px-8 py-4 rounded-xl text-white font-semibold
          bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Vote"}
      </button>
    </div>
  );
}
