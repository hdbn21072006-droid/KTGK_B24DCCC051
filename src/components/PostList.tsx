import React, { useState } from 'react';
import { Post } from '../types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onDelete: (id: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  const [filter, setFilter] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="post-list-page">
      <div className="list-header">
        <h2>Tổng số bài viết: {filteredPosts.length}</h2>
        <input
          type="text"
          placeholder="Lọc theo tiêu đề bài viết..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      <div className="post-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default PostList;