import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const shortDesc = post.content.substring(0, 100) + '...';
  const formattedDate = new Date(post.createdAt).toLocaleDateString('vi-VN');

  return (
    <div className="post-card">
      <img src={post.thumbnailUrl} alt={post.title} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-meta">
          By {post.author} on {formattedDate}
        </p>
        <p className="card-desc">{shortDesc}</p>
        <div className="card-actions">
          <Link to={`/posts/${post.id}`} className="btn btn-read-more">
            Đọc thêm
          </Link>
          <button onClick={() => onDelete(post.id)} className="btn btn-delete">
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
