import Post from './Post'
import { PostType } from '../types'

export type PostListProps = {
    posts: PostType[];
};

export default function PostList({ posts }: PostListProps) {
    return (
        <div>
            {posts.map((post: PostType) => (
                <Post
                    key={post.id}
                    id={post.id}
                    userId={post.userId}
                    title={post.title}
                    content={post.content}
                    image={post.image}
                    createdAt={post.createdAt}
                    likes={post.likes}
                />
            ))}
        </div>
    )
}


