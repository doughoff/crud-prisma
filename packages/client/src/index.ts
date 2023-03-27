import { statusEnum } from '@crud/db';
import axios from 'axios';
import apiClient from './apiClient';

const serverUrl = 'http://localhost:3000/crud/example/findMany';

(async () => {
  // create 2 users
  const user1 = await apiClient.user.create({
    data: {
      name: 'Alice',
    },
  });

  console.log('user1', user1);

  const user2 = await apiClient.user.create({
    data: {
      name: 'Bob',
    },
  });

  console.log('user2', user2);

  // create 2 authors
  const author1 = await apiClient.author.create({
    data: {
      name: 'Author 1',
    },
  });

  console.log('author1', author1);

  const author2 = await apiClient.author.create({
    data: {
      name: 'Author 2',
    },
  });

  console.log('author2', author2);

  // create 2 tags
  const tag1 = await apiClient.tag.create({
    data: {
      name: 'tag1',
    },
  });

  console.log('tag1', tag1);

  const tag2 = await apiClient.tag.create({
    data: {
      name: 'tag2',
    },
  });

  console.log('tag2', tag2);

  // create posts
  const post1 = await apiClient.post.create({
    data: {
      title: 'Post 1',
      authorId: author1.id,
      PostTags: {
        createMany: {
          data: [{ tagId: tag1.id }, { tagId: tag2.id }],
        },
      },
      Comment: {
        createMany: {
          data: [
            { text: 'Comment 1', userId: user2.id },
            { text: 'Comment 2', userId: user1.id },
          ],
        },
      },
    },
  });

  console.log('post1', post1);

  const post2 = await apiClient.post.create({
    data: {
      title: 'Post 2',
      authorId: author2.id,
      PostTags: {
        createMany: {
          data: [{ tagId: tag1.id }],
        },
      },
      Comment: {
        createMany: {
          data: [
            { text: 'Comment 3', userId: user1.id },
            { text: 'Comment 4', userId: user2.id },
          ],
        },
      },
    },
  });

  console.log('post2', post2);

  // fetch users
  const users = await apiClient.user.findMany({
    include: {
      Comment: {
        include: {
          post: {
            select: {
              title: true,
              author: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  //fetch authors
  const authors = await apiClient.author.findMany({
    include: {
      posts: {
        include: {
          Comment: {
            include: {
              User: true,
            },
          },
        },
      },
    },
  });

  console.log('Received users:', users);
  console.log('Received authors:', authors);
})();
