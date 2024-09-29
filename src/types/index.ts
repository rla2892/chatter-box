export type PostType = {
    id: string; // number에서 string으로 변경 (GUID 사용)
    userId: string; // 사용자 ID도 GUID로 변경할 경우 string으로 설정
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    likes: number;
};

export type ExpandedPostType = PostType & {
    user: UserType;
};

// 사용자 타입도 GUID로 변경할 경우
export type UserType = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type PostsResponse = {
    posts: ExpandedPostType[];
};
