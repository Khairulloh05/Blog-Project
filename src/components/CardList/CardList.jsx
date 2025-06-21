import { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './CardList.css';

const CardList = ({ searchTerm }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      // console.log("Токен перед отправкой:", token);
      const response = await fetch("https://blogmusi.pythonanywhere.com/api/v1/posts/", {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      // console.log(response);
      const data = await response.json();
      // Проверка на ошибку токена:
      if (data.detail === "Invalid token.") {
        console.error("❌ Токен недействителен. Возможно, пользователь не вошёл.");
        return; // Прерываем выполнение
      }
      // console.log("POSTS:", data);
      setPosts(data); // только если токен валиден
      } catch (err) {
        // console.error("Ошибка загрузки постов:", err);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    post.profession.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <div className="card-list">
        {Array.isArray(filteredPosts) && filteredPosts.map(post => (
          <Card key={post.id} card={post} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
