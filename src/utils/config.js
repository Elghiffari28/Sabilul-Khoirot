// utils/config.js
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
export const InputField = ({ label, id, type = "text", ...props }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="font-medium capitalize">
      {label}
    </label>
    <input type={type} id={id} className="border p-2 rounded-md" {...props} />
  </div>
);
