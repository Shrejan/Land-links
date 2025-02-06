// SellPage.jsx
import React, { useState } from "react";
import "./Sell.css";
import axios from "axios";

const SellPage = () => {
  const [formData, setFormData] = useState({
    mainLocation: "",
    exactLocation: "",
    price: "",
    description: "",
    images: [],
    mapLocation: "",
    name: "",
    contact1: "",
    contact2: "",
    user_id: "",
    
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...formData.images, ...files];
      const newPreviews = [
        ...imagePreviews,
        ...files.map((file) => URL.createObjectURL(file)),
      ];

      setFormData({ ...formData, images: newImages });
      setImagePreviews(newPreviews);
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://land-links-backend.vercel.app/api/data",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Data submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      // Handle error
    }
  };

  return (
    <div className="sell-container">
      <h1 className="form-title">Create New Listing</h1>
      <form onSubmit={handleSubmit} className="sell-form">
        {/* Personal Details Section */}
        <div className="section-title">Personal Details</div>
        <div className="form-group">
          <label className="lable">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Primary Contact Number</label>
            <input
              type="tel"
              name="contact1"
              value={formData.contact1}
              onChange={handleInputChange}
              placeholder="Enter primary number"
              required
            />
          </div>
          <div className="form-group">
            <label>Secondary Contact Number</label>
            <input
              type="tel"
              name="contact2"
              value={formData.contact2}
              onChange={handleInputChange}
              placeholder="Enter secondary number"
            />
          </div>
        </div>

        {/* Property Details Section */}
        <div className="section-title">Property Details</div>
        <div className="form-group">
          <label>Main Location</label>
          <select
            name="mainLocation"
            value={formData.mainLocation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Area</option>
            <option value="Downtown">Downtown</option>
            <option value="Suburb">Suburb</option>
            <option value="Rural">Rural</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>

        <div className="form-group">
          <label>Exact Location</label>
          <input
            type="text"
            name="exactLocation"
            value={formData.exactLocation}
            onChange={handleInputChange}
            placeholder="Enter exact address"
            required
          />
        </div>

        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter detailed description"
            rows="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Photos (Multiple allowed)</label>
          <div className="image-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
              id="imageInput"
              multiple
            />
            <label htmlFor="imageInput" className="upload-btn">
              Choose Files
            </label>
            <div className="image-previews">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview-container">
                  <img src={preview} alt="Preview" className="image-preview" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Google Map Location</label>
          <input
            type="text"
            name="mapLocation"
            value={formData.mapLocation}
            onChange={handleInputChange}
            placeholder="Paste Google Maps URL"
            required
          />
          {formData.mapLocation && (
            <div className="map-container">
              <iframe
                title="location-map"
                src={formData.mapLocation}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Publish Listing
        </button>
      </form>
    </div>
  );
};

export default SellPage;
