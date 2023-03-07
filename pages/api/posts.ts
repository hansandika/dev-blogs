import fs from 'fs';
import matter from 'gray-matter';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import path from 'path';

const handler : NextApiHandler= (req : NextApiRequest, res : NextApiResponse) => {
  const {method} = req

  switch(method){
    case "GET":{
      const posts = readPostInfo();
      res.status(200).json({
        'postInfo' : posts
      });
    }
    default:
      res.status(404).send('Not Found');
  }
}

const readPostInfo = () => {
  const dirPath = path.join(process.cwd(), 'posts')
  const files = fs.readdirSync(dirPath);
  const fileMap = files.map((file) => {
    const filePath = path.join(process.cwd(), `posts/${file}`)
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    });
    return matter(fileContent).data;
  })

  return fileMap;
}

export default handler;