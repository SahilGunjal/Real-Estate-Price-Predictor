import React, { useState } from "react";
import locationsData from "../columns.json";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    total_sqft: "",
    location: "",
    bedrooms: "",
    baths: "",
    estimatedPrice: null,
  });

  console.log(locationsData["data_columns"]);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      location: formData.location,
      total_sqft: parseFloat(formData.total_sqft),
      bhk: parseInt(formData.bedrooms),
      bath: parseInt(formData.baths),
    };

    console.log(requestData);

    // use this for specific port : http://127.0.0.1:5000/predict_home_price"
    try {
      const response = await fetch("/api/predict_home_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log(response);
        const result = await response.json();
        setFormData({
          ...formData,
          estimatedPrice: result.estimated_price,
        });
        console.log(result.estimatedPrice);
      } else {
        console.error("Error predicting home price");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-500 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">
          Estimate your next Property Price in Banglore
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Total Square Feet
            </label>
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full"
              placeholder="Enter total sqft"
              name="total_sqft"
              onChange={handleInputChange}
              value={formData.total_sqft}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select the Location
            </label>
            <select
              className="border-2 border-gray-300 p-2 w-full"
              name="location"
              onChange={handleInputChange}
              value={formData.location}>
              <option value="" disabled>
                Select a location
              </option>
              {/* Add your options for the dropdown */}
              {locationsData["data_columns"].slice(3).map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Total Bedrooms
            </label>
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full"
              placeholder="Enter number of bedrooms"
              name="bedrooms"
              onChange={handleInputChange}
              value={formData.bedrooms}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Total Bathrooms
            </label>
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full"
              placeholder="Enter number of baths"
              name="baths"
              onChange={handleInputChange}
              value={formData.baths}
            />
          </div>

          {formData.estimatedPrice !== null && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Estimated Price
              </label>
              <input
                type="text"
                className="border-2 border-gray-300 p-2 w-full"
                value={`Rs ${formData.estimatedPrice * 100000}`}
                readOnly
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
