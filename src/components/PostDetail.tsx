import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Post } from '../types';

interface PostDetailProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ posts, onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <h2>Không tìm thấy bài viết</h2>;
  }

  const handleDelete = () => {
    onDelete(post.id);
    navigate('/');
  };

  return (
    <div className="post-detail">
      <h1 className="detail-title">{post.title}</h1>
      <p className="detail-meta">
        By {post.author} on {new Date(post.createdAt).toLocaleDateString('vi-VN')}
      </p>
      <p><strong>Thể loại:</strong> {post.category}</p>
      <img src={post.thumbnailUrl} alt={post.title} className="detail-img" />
      <div className="detail-content">
        <pre className="post-content">{post.content}</pre>
      </div>

      <div className="detail-actions">
        <Link to="/" className="btn">
          Quay lại
        </Link>
        <Link to={`/posts/edit/${post.id}`} className="btn btn-edit">
          Chỉnh sửa
        </Link>
        <button onClick={handleDelete} className="btn btn-delete">
          Xóa bài viết
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
