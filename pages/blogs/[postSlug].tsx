import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

type Props = InferGetStaticPropsType<typeof getStaticProps>

const SinglePage: NextPage<Props> = ({ post }) => {
  const { title, content } = post;
  return <div className='max-w-3xl mx-auto'>
    <h1 className='py-5 text-2xl font-semibold'>{title}</h1>
    <div className="pb-20 prose">
      <MDXRemote {...content} />
    </div>
  </div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  // reading paths
  const dirPath = path.join(process.cwd(), 'posts')
  const files = fs.readdirSync(dirPath);
  const paths = files.map((file) => {
    const filePath = path.join(process.cwd(), `posts/${file}`)
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    });

    return { params: { postSlug: matter(fileContent).data.slug } }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  }
}

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { params } = context
    const { postSlug } = params as IStaticProps;
    const filePath = path.join(process.cwd(), `posts/${postSlug}.md`)
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    });
    const source: any = await serialize(fileContent, { parseFrontmatter: true })

    return {
      props: {
        post: {
          content: source,
          title: source.frontmatter.title,
        }
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default SinglePage;