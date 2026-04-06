import React from 'react'
import { MoveLeft } from 'lucide-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const CreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    title: "",
    description: ""
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // ✅ handle change + clear error
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // error clear
    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  // ✅ client validation
  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // client validation check
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        formData
      );

      setFormData({
        title: "",
        description: ""
      });

      setErrors({});
      toast.success(res.data.message || "Note created successfully");
      navigate("/");
    } catch (error) {
      const res = error.response;
      // ✅ server validation error
      if (res?.status === 400 && res.data?.errors) {
        setErrors(res.data.errors);
      } else {
        toast.error(res?.data?.message || "Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-7xl mx-auto p-8 min-h-screen'>
      <div className='bg-gray-800 rounded-md py-8 px-4 mb-8'>
        <a href="/">
          <MoveLeft className='w-4 h-4 inline mr-2 font-bold' />
          Back to Notes
        </a>

        <div className="card card-border bg-base-100 w-full mt-8">
          <div className="card-body">
            <h2 className="card-title">Create Note</h2>

            <form className="w-full max-w-md mt-4" onSubmit={handleSubmit}>

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label><br />

                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" className={`input input-bordered w-full px-4 py-2 mt-2 focus:ring-1 focus:ring-blue-500 focus:outline-none ${errors.title ? "input-error" : ""}`}/>
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text mt-5">Description</span>
                </label><br />

                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" className={`textarea textarea-bordered w-full px-4 py-2 mt-2 focus:ring-1 focus:ring-blue-500 focus:outline-none ${errors.description ? "input-error" : ""}`}rows="4"/>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Button */}
              <button type="submit" className={`btn btn-primary w-full mt-4 ${loading ? "opacity-70" : ""}`} disabled={loading}>    
                {loading ? "Creating..." : "Create Note"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage