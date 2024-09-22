import Post from './Post'
import { PostType } from '../types'

export type PostListProps = {
    posts: PostType[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
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

export default PostList
