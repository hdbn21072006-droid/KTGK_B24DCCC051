import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '../types';

interface PostFormProps {
  posts?: Post[];
  onSubmit: (data: Omit<Post, 'id' | 'createdAt'> | Post) => void;
}

type FormErrors = {
  title?: string;
  author?: string;
  content?: string;
};

const PostForm: React.FC<PostFormProps> = ({ posts, onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Công nghệ' | 'Du lịch' | 'Ẩm thực' | 'Đời sống' | 'Khác'>('Công nghệ');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isEditMode && posts) {
      const postToEdit = posts.find((p) => p.id === id);
      if (postToEdit) {
        setTitle(postToEdit.title);
        setAuthor(postToEdit.author);
        setThumbnailUrl(postToEdit.thumbnailUrl);
        setContent(postToEdit.content);
        setCategory(postToEdit.category);
      }
    }
  }, [id, isEditMode, posts]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (title.length < 10) {
      newErrors.title = 'Tiêu đề phải có ít nhất 10 ký tự';
    }
    if (author.length < 3) {
      newErrors.author = 'Tác giả phải có ít nhất 3 ký tự';
    }
    if (content.length < 50) {
      newErrors.content = 'Nội dung phải có ít nhất 50 ký tự';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const postData = { title, author, thumbnailUrl, content, category };

    if (isEditMode) {
      const postToEdit = posts!.find((p) => p.id === id)!;
      onSubmit({ ...postToEdit, ...postData });
      navigate(`/posts/${id}`);
    } else {
      onSubmit(postData);
      navigate('/');
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/posts/${id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2>{isEditMode ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h2>

      <div className="form-group">
        <label>Tiêu đề</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label>Tác giả</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        {errors.author && <span className="error">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label>URL Ảnh thumbnail</label>
        <input
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Thể loại</label>
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value as
                | 'Công nghệ'
                | 'Du lịch'
                | 'Ẩm thực'
                | 'Đời sống'
                | 'Khác'
            )
          }
        >
          <option value="Công nghệ">Công nghệ</option>
          <option value="Du lịch">Du lịch</option>
          <option value="Ẩm thực">Ẩm thực</option>
          <option value="Đời sống">Đời sống</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div className="form-group">
        <label>Nội dung</label>
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {errors.content && <span className="error">{errors.content}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-submit">
          {isEditMode ? 'Cập nhật' : 'Đăng bài'}
        </button>
        <button type="button" onClick={handleCancel} className="btn btn-cancel">
          Hủy
        </button>
      </div>
    </form>
  );
};

export default PostForm;
