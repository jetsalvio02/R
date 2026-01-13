"use client";

import { useState } from "react";
import AuthModal from "../components/Auth_Modal";

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
  // MOCK DATA
  const poll: Poll = {
    id: 1,
    title: "Who should be the next class president?",
    description: "Choose wisely. Results update in real time.",
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
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // SIMULATED AUTH
  const isLoggedIn = false; // replace later

  const openVoteFlow = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowVoteModal(true);
  };

  const submitVote = () => {
    setSubmitting(true);
    setTimeout(() => {
      alert("Vote submitted!");
      setSubmitting(false);
      setShowVoteModal(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===================== NAVBAR ===================== */}
      <nav className="sticky top-0 z-40 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* LEFT */}
          <div className="font-bold text-lg text-indigo-600">LiveVote</div>

          {/* RIGHT */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-4 py-2 text-sm font-semibold rounded-lg
              bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Login
          </button>
        </div>
      </nav>

      {/* ===================== CONTENT ===================== */}
      <div className="px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* BANNER (FULL IMAGE) */}
            {poll.image_url && (
              <div className="relative w-full bg-black">
                <img
                  src={poll.image_url}
                  alt="Poll banner"
                  className="w-full h-auto object-contain max-h-[420px] mx-auto"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h1 className="text-xl md:text-2xl font-bold">
                    {poll.title}
                  </h1>
                  <p className="text-sm opacity-90">{poll.description}</p>
                </div>
              </div>
            )}

            {/* BODY */}
            <div className="p-6 space-y-6">
              {/* STATUS */}
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  ACTIVE
                </span>
                <span className="text-xs text-gray-500">
                  Secure • One vote only
                </span>
              </div>

              {/* OPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {poll.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelected(option.id)}
                    className={`rounded-xl border overflow-hidden transition-all
                      ${
                        selected === option.id
                          ? "ring-2 ring-indigo-500"
                          : "hover:shadow-lg"
                      }`}
                  >
                    <div className="bg-gray-100 p-4">
                      <img
                        src={option.image_url!}
                        alt={option.label}
                        className="w-full h-auto max-h-56 object-contain mx-auto"
                      />
                    </div>
                    <div className="p-4 font-semibold text-center">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="mt-6">
            <button
              disabled={!selected}
              onClick={openVoteFlow}
              className="w-full py-4 rounded-xl font-semibold text-white
                bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              Submit Vote
            </button>
          </div>
        </div>
      </div>

      {/* ===================== VOTE MODAL ===================== */}
      {showVoteModal && (
        <Modal onClose={() => setShowVoteModal(false)}>
          <h2 className="text-lg font-bold mb-4">Confirm Your Vote</h2>
          <p className="mb-6">
            You are about to vote for{" "}
            <strong>
              {poll.options.find((o) => o.id === selected)?.label}
            </strong>
            .
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowVoteModal(false)}
              className="flex-1 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={submitVote}
              className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
            >
              {submitting ? "Submitting..." : "Confirm Vote"}
            </button>
          </div>
        </Modal>
      )}

      {/* ===================== LOGIN MODAL ===================== */}
      {showLoginModal && <AuthModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}

/* ===================== MODAL ===================== */
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
