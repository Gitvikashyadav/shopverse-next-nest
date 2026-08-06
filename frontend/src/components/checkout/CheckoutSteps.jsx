export default function CheckoutSteps({ current = 1 }) {
  const steps = ["Address", "Order Summary", "Payment"];
  return (
    <ol className="mb-6 flex items-center gap-2 text-sm">
      {steps.map((s, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                done ? "bg-green-600 text-white"
                : active ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-500"
              }`}
            >
              {done ? "✓" : n}
            </span>
            <span className={active ? "font-semibold text-gray-900" : "text-gray-500"}>{s}</span>
            {n < steps.length && <span className="mx-2 h-px w-8 bg-gray-300" />}
          </li>
        );
      })}
    </ol>
  );
}
