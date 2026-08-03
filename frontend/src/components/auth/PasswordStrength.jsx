"use client";

const RULES = [
  { label: "8+ characters", test: (v) => v.length >= 8 },
  { label: "Uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "Number", test: (v) => /\d/.test(v) },
  { label: "Symbol", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const LEVELS = [
  { label: "Too weak", bar: "bg-red-500", text: "text-red-600" },
  { label: "Weak", bar: "bg-orange-500", text: "text-orange-600" },
  { label: "Fair", bar: "bg-yellow-500", text: "text-yellow-600" },
  { label: "Good", bar: "bg-lime-500", text: "text-lime-600" },
  { label: "Strong", bar: "bg-emerald-600", text: "text-emerald-700" },
];

export function scorePassword(value) {
  return RULES.reduce((n, r) => n + (r.test(value) ? 1 : 0), 0);
}

export default function PasswordStrength({ value }) {
  const score = scorePassword(value);
  const level = LEVELS[score];

  if (!value) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i < score ? level.bar : "bg-neutral-200"
              }`}
            />
          ))}
        </div>
        <span className={`text-[11px] font-medium ${level.text}`}>
          {level.label}
        </span>
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {RULES.map((r) => {
          const ok = r.test(value);
          return (
            <li
              key={r.label}
              className={`flex items-center gap-1.5 text-[11px] ${
                ok ? "text-emerald-700" : "text-neutral-400"
              }`}
            >
              <svg
                className="h-3 w-3 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {ok ? (
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                ) : (
                  <circle cx="10" cy="10" r="3.5" />
                )}
              </svg>
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
