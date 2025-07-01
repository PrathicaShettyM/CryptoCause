import React, { useState } from 'react';
import { cloudinaryCloudName, cloudinaryPresetName } from '../constants/index';

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  className,
  isImageUpload,
  setImageUrl
}) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryPresetName); // from env
    console.log("Uploading to Cloudinary with:", cloudinaryCloudName, cloudinaryPresetName);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}

      {isImageUpload ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-white"
          />
          {uploading && <p className="text-sm text-gray-400">Uploading...</p>}
          {value && (
            <img
              src={value}
              alt="Uploaded"
              className="mt-3 w-[200px] h-[120px] object-cover rounded-md"
            />
          )}
        </div>
      ) : isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
};

export default FormField;
