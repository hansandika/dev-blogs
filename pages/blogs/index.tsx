import { InferGetStaticPropsType, NextPage } from 'next';
import BlogCard from '../../components/BlogCard';
import { readPostInfo } from '../../lib/helper';
import { PostApiResponse } from '../../utils/types';


export const getStaticProps = async () => {
  // const res = await fetch("http://localhost:3000/api/posts");
  // const { postInfo }: PostApiResponse = await res.json();
  const postInfo: PostApiResponse = readPostInfo()

  return {
    props: {
      posts: postInfo
    }
  }
}


type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blogs: NextPage<Props> = ({ posts }) => {

  return <div className='max-w-3xl p-5 mx-auto space-y-5'>
    {posts.length > 0 && posts.map((post) => {
      return <BlogCard key={post.slug} title={post.title} description={post.meta} slug={post.slug} />
    })}
  </div>;
};

export default Blogs;