export interface Post 
{
  id: string;
  title: string;
  author: string;
  thumbnailUrl: string;
  content: string;
  category: 'Công nghệ' | 'Du lịch' | 'Ẩm thực' | 'Đời sống' | 'Khác';
  createdAt: string;
}