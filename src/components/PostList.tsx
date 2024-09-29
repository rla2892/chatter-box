import Post from "./Post"
import { ExpandedPostType } from "@/types"

export type PostListProps = {
    posts: ExpandedPostType[];
};

export default function PostList({ posts }: PostListProps) {
    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    userId={post.userId}
                    title={post.title}
                    content={post.content}
                    image={post.image}
                    createdAt={post.createdAt}
                    likes={post.likes}
                    user={post.user}
                />
            ))}
        </div>
    )
}


