"use client";

import { useState } from "react";

type PollType = "YES_NO" | "MULTIPLE_CHOICE";

type Option = {
  id: number;
  label: string;
  image_url?: string;
};

export default function AdminCreatePollPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<PollType>("YES_NO");
  const [pollImage, setPollImage] = useState<string | null>(null);

  const [options, setOptions] = useState<Option[]>([
    { id: 1, label: "" },
    { id: 2, label: "" },
  ]);

  /* ---------- handlers ---------- */
  const addOption = () => {
    setOptions([...options, { id: Date.now(), label: "" }]);
  };

  const updateOption = (id: number, value: string) => {
    setOptions(options.map((o) => (o.id === id ? { ...o, label: value } : o)));
  };

  const submitPoll = (activate: boolean) => {
    const payload = {
      title,
      description,
      type,
      status: activate ? "ACTIVE" : "DRAFT",
      image_url: pollImage,
      options:
        type === "YES_NO" ? [{ label: "Yes" }, { label: "No" }] : options,
    };

    console.log("SUBMIT POLL:", payload);
    alert(activate ? "Poll Activated" : "Saved as Draft");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Create New Poll</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: DETAILS */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Poll title"
            className="w-full border rounded-lg px-4 py-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description (optional)"
            className="w-full border rounded-lg px-4 py-3 min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Poll Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Poll Image (optional)
            </label>
            <input
              type="text"
              placeholder="Image URL"
              className="w-full border rounded-lg px-4 py-2"
              onChange={(e) => setPollImage(e.target.value)}
            />
            {pollImage && (
              <img
                src={pollImage}
                className="mt-3 rounded-lg aspect-video object-cover"
              />
            )}
          </div>

          {/* Poll Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Poll Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as PollType)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="YES_NO">Yes / No</option>
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            </select>
          </div>
        </div>

        {/* RIGHT: OPTIONS */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Options</h2>

          {type === "YES_NO" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg text-center">Yes</div>
              <div className="p-4 border rounded-lg text-center">No</div>
            </div>
          ) : (
            <>
              {options.map((option, idx) => (
                <div
                  key={option.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <input
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={option.label}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />

                  <input
                    type="text"
                    placeholder="Option image URL (optional)"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}

              <button
                onClick={addOption}
                className="text-blue-600 text-sm hover:underline"
              >
                + Add option
              </button>
            </>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => submitPoll(false)}
          className="px-6 py-3 rounded-lg border"
        >
          Save as Draft
        </button>
        <button
          onClick={() => submitPoll(true)}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white"
        >
          Activate Poll
        </button>
      </div>
    </div>
  );
}
