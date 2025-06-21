import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './AddPost.css';

export default function AddPost() {
  const [formData, setFormData] = useState({
    image: null,
    imageFile: null,
    title: '',
    profession: '',
    content: '',
  });
  // console.log(formData)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      if (files && files.length > 0) {
        setFormData({
          ...formData,
          image: URL.createObjectURL(files[0]),
          imageFile: files[0],
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('profession', formData.profession);
      form.append('content', formData.content);
      if (formData.imageFile) {
        form.append('image', formData.imageFile);
      }

      const token = localStorage.getItem('accessToken');
      const response = await fetch("https://blogmusi.pythonanywhere.com/api/v1/posts/", {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: form
      });


      const data = await response.json();
      // console.log("Post success:", data);

      if (!response.ok) {
        throw new Error("Ошибка при добавлении поста");
      }

      // alert("Пост добавлен успешно!");
      navigate("/Home");
    } catch (err) {
      // console.error("Ошибка при добавлении поста:", err);2
      // alert("Ошибка: " + err.message);2
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="addPostContent">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Add Post</h2>
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <input type="text" name="title" placeholder="Full Name" value={formData.title} onChange=   {handleChange} required />
        <input type="text" name="profession" placeholder="Profession" value={formData.profession}    onChange={handleChange} required />
        <textarea name="content" placeholder="About you..." value={formData.content} onChange=   {handleChange} rows={4} required />
        <div className="post-btns">
          <Link to={'/Home'}>
            <button className="post-back add-button">Back</button>
          </Link>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create post"}
          </button>
        </div>
      </form>
    </div>
  );
}
