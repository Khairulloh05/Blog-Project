import './Card.css';
import { useState } from 'react';

const Card = ({ card }) => {
  const [liked, setLiked] = useState(card.is_liked || false);  // если API отдаёт liked_by_me
  const [likeCount, setLikeCount] = useState(card.likes_count || 0);

  const handleLikeClick = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`https://blogmusi.pythonanywhere.com/api/v1/posts/${card.id}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке лайка');
      }

      const data = await response.json();
      // console.log('Like API response:', data);

      setLikeCount(data.likes_count);
      setLiked(data.is_liked);

    } catch (error) {
      console.error("Ошибка при лайке:", error);
    }
  };

  return (
    <div className="card">
      <img src={card.image} alt={card.title} className="card-img" />
      <div className="card-bottom">
        <p className='card-text category'>{card.profession.length > 25 ? `${card.profession.slice(0, 25)}` : card.profession}</p>
        <h3 className='card-text card-title'>{card.title.length > 27 ? `${card.title.slice(0, 27)}` : card.title}</h3>
        <p className='card-text card-desc'> {card.content.length > 170 ? `${card.content.slice(0, 170)}...` : card.content}</p>
      </div>
      <div className="form-btns">
        {/* <button type="button" className="register-button">Contact</button> */}
        <div className="like">
          <svg
            onClick={handleLikeClick}
            className={`${liked ? 'icon' : 'icon1'}`}
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" fill="currentColor" />
          </svg>
          <p>{likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
