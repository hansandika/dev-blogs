import Link from 'next/link';
import { FC } from 'react';

interface Props {
  title: string;
  description: string;
  slug: string;
}

const BlogCard: FC<Props> = ({ title, description, slug }): JSX.Element => {
  return <Link href={`/blogs/${slug}`} className="block">
    <div className='p-2 bg-green-100 rounded'>
      <h1 className='text-3xl font-semibold text-gray-900'>{title}</h1>
      <p className='text-gray-500'>{description}</p>
    </div>
  </Link>;
};

export default BlogCard;