import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { PostApiResponse } from '../utils/types';

export const readPostInfo = (): PostApiResponse => {
  const dirPath = path.join(process.cwd(), 'posts')
  const files = fs.readdirSync(dirPath);
  const fileMap = files.map((file) => {
    const filePath = path.join(process.cwd(), `posts/${file}`)
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    });
    return matter(fileContent).data;
  })

  return fileMap as PostApiResponse;
}