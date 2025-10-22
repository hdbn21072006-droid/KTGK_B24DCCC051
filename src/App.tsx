import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Post } from './types';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import './index.css';

// Dữ liệu khởi tạo (5-6 bài viết)
const initialPosts: Post[] = [
  {
    id: '1',
    title: 'Tìm hiểu về React Hooks',
    author: 'Tác giả A',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=React+Hooks',
    content: 'Nội dung đầy đủ của bài viết về React Hooks. '.repeat(10),
    category: 'Công nghệ',
    createdAt: new Date('2025-10-20T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Khám phá 5 địa điểm du lịch Đà Nẵng',
    author: 'Tác giả B',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Du+Lich+Da+Nang',
    content: 'Đà Nẵng là một thành phố tuyệt vời... '.repeat(10),
    category: 'Du lịch',
    createdAt: new Date('2025-10-18T14:30:00Z').toISOString(),
  },
    {
    id: '3',
    title: 'Cách làm món Phở Bò gia truyền',
    author: 'Tác giả C',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Pho+Bo',
    content: 'Phở bò là món ăn truyền thống... '.repeat(10),
    category: 'Ẩm thực',
    createdAt: new Date('2025-10-15T08:00:00Z').toISOString(),
  },
  {
    id: '4',
    title: 'Làm việc hiệu quả tại nhà',
    author: 'Tác giả A',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=Work+From+Home',
    content: 'Xu hướng làm việc tại nhà (remote work)... '.repeat(10),
    category: 'Đời sống',
    createdAt: new Date('2025-10-12T11:00:00Z').toISOString(),
  },
  {
    id: '5',
    title: 'TypeScript cho người mới bắt đầu',
    author: 'Tác giả D',
    thumbnailUrl: 'https://via.placeholder.com/300x200?text=TypeScript',
    content: 'TypeScript là một superset của JavaScript... '.repeat(10),
    category: 'Công nghệ',
    createdAt: new Date('2025-10-10T16:00:00Z').toISOString(),
  },
];

function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // Hàm Xóa bài viết
  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  // Hàm xử lý cả việc tạo mới và cập nhật bài viết
  const handleSavePost = (postData: Post | Omit<Post, 'id' | 'createdAt'>) => {
    // Dùng type guard để kiểm tra xem đây là update hay create
    if ('id' in postData) {
      // --- Chế độ UPDATE ---
      const updatedPost = postData as Post;
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      alert('Cập nhật thành công!');
    } else {
      // --- Chế độ CREATE ---
      const newPost: Post = {
        ...postData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      setPosts([newPost, ...posts]);
      alert('Đăng bài thành công!');
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<PostList posts={posts} onDelete={handleDelete} />}
          />
          <Route
            path="/create"
            element={<PostForm onSubmit={handleSavePost} />}
          />
          <Route
            path="/posts/:id"
            element={<PostDetail posts={posts} onDelete={handleDelete} />}
          />
          <Route
            path="/posts/edit/:id"
            element={<PostForm posts={posts} onSubmit={handleSavePost} />}
          />
          <Route path="/posts" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

