// "use client";

// export default function AddressForm({ value, onChange, errors = {} }) {
//   const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });

//   const Field = ({ label, name, type = "text", span = 1, ...rest }) => (
//     <div className={span === 2 ? "sm:col-span-2" : ""}>
//       <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
//       <input
//         type={type}
//         value={value[name] || ""}
//         onChange={set(name)}
//         className={`h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
//           errors[name] ? "border-red-400" : "border-gray-300"
//         }`}
//         {...rest}
//       />
//       {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
//     </div>
//   );

//   return (
//     <div className="grid gap-4 sm:grid-cols-2">
//       <Field label="Full name" name="name" autoComplete="name" />
//       <Field label="Mobile number" name="phone" type="tel" autoComplete="tel" />
//       <Field label="Pincode" name="pincode" inputMode="numeric" />
//       <Field label="City" name="city" />
//       <Field label="State" name="state" />
//       <Field label="Landmark (optional)" name="landmark" />
//       <div className="sm:col-span-2">
//         <label className="mb-1 block text-xs font-medium text-gray-600">Address</label>
//         <textarea
//           rows={3}
//           value={value.address || ""}
//           onChange={set("address")}
//           className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
//             errors.address ? "border-red-400" : "border-gray-300"
//           }`}
//         />
//         {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
//       </div>
//     </div>
//   );
// }

"use client";

function Field({ label, name, value, onChange, errors, type = "text", span = 1, ...rest }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value[name] || ""}
        onChange={onChange(name)}
        className={`h-11 w-full rounded-lg border px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
          errors[name] ? "border-red-400" : "border-gray-300"
        }`}
        {...rest}
      />
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  );
}

export default function AddressForm({ value, onChange, errors = {} }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Full name" name="name" value={value} onChange={set} errors={errors} autoComplete="name" />
      <Field label="Mobile number" name="phone" value={value} onChange={set} errors={errors} type="tel" autoComplete="tel" />
      <Field label="Pincode" name="pincode" value={value} onChange={set} errors={errors} inputMode="numeric" />
      <Field label="City" name="city" value={value} onChange={set} errors={errors} />
      <Field label="State" name="state" value={value} onChange={set} errors={errors} />
      <Field label="Landmark (optional)" name="landmark" value={value} onChange={set} errors={errors} />
      <div className="sm:col-span-2">
        <label className="mb-1 block text-xs font-medium text-gray-600">Address</label>
        <textarea
          rows={3}
          value={value.address || ""}
          onChange={set("address")}
          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
            errors.address ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
      </div>
    </div>
  );
}
