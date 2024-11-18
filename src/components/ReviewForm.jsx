import { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ sellerId, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = { title, body, rating, username: user.username, sellerId };
    try {
      const response = await axios.post(`localhost:3002/:userId/reviews`, reviewData);
      onSubmit(response.data);
      setTitle('');
      setBody('');
      setRating(1);
      setMessage('Review submitted successfully!');
    } catch (err) {
      setMessage('Error submitting review. Please try again.');
      console.error('Error submitting review:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
