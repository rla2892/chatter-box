# Chatter-Box

![Chatter-Box Logo](public/logo.png)

## Introduction

**Chatter-Box** is a social media platform built with Next.js and TypeScript. It allows users to create and share posts, interact with others, and engage in real-time conversations. Leveraging modern web technologies, Chatter-Box aims to deliver a fast and responsive user experience.

## ToDo List
<!--
 0. url 에 state 저장 - useSearchParam - next/navigation
 0. prisma 써보기
    
 1. Profile Page
    - [v] Edit Profile
    - [ ] Profile Picture Upload
    - [ ] Display Posts
    - [ ] Display Followers/Following
    - [ ] Follow/Unfollow Button
    - [ ] Display User's Posts
    - [ ] Display User's Followers/Following
    - [ ] Follow/Unfollow Button
    - [ ] Display User's Posts
    - [ ] Display User's Followers/Following
    - [ ] Follow/Unfollow Button
2. Post Creation
    - [v] Create Post
    - [ ] Add Text, Images, Videos
    - [ ] Post to Feed
    - [ ] Like/Unlike Post
    - [ ] Comment on Post
    - [ ] Reply to Comment
3. Feed
    - [ ] Display Real-Time Feed
    - [ ] Like/Unlike Post
    - [ ] Comment on Post
    - [ ] Reply to Comment
    - [ ] Follow/Unfollow User
    - [ ] Real-Time Notifications
4. Messaging
    - [ ] 1:1 Chat
    - [ ] Group Chat
    - [ ] Real-Time Messaging
5. Search & Tags
    - [ ] Search for Users
    - [ ] Search for Hashtags
    - [ ] Search for Keywords
    - [ ] Discover Content
-->


## Key Features

- **User Profile Management**: Create and edit profiles, upload profile pictures.
- **Post Creation & Feed**: Create posts with text, images, and videos; view real-time feeds.
- **Follow System**: Follow and unfollow other users to see their activities in your feed.
- **Real-Time Notifications**: Receive real-time notifications for new followers, comments, likes, and more.
- **Comments & Replies**: Comment on posts and reply to other comments.
- **Messaging**: 1:1 and group chat functionalities for direct communication.
<!-- - **Search & Tags**: Search for users, hashtags, and keywords to discover content. -->
<!-- - **Admin Tools**: Monitor content and manage inappropriate posts or comments. -->

## Technology Stack

- **Frontend & Backend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [json-server](https://github.com/typicode/json-server) (temporary database)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

## Installation and Setup

### 1. Clone the Repository

Clone the repository to your local machine and navigate to the project directory.

### 2. Install Dependencies

Install the necessary dependencies using your preferred package manager.

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project and add the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
DATABASE_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

**Note**: The `.env.local` file contains sensitive information and should not be committed to version control. Ensure it's listed in your `.gitignore` file.

### 4. Set Up Tailwind CSS

Chatter-Box uses Tailwind CSS for styling. To set it up:

1. **Install Tailwind CSS and its dependencies**:

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

2. **Configure `tailwind.config.js`**:

    ```javascript
    // tailwind.config.js
    module.exports = {
      content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```

3. **Add Tailwind directives to your global CSS**:

    Open `styles/globals.css` and add the following:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

### 5. Set Up the Temporary Database

Chatter-Box uses `json-server` as a temporary database to simulate a REST API. To set it up:

1. **Create a `db.json` File**:

    Create a `db.json` file in the root of your project with the following initial data structure:

    ```json
    {
      "users": [],
      "posts": [],
      "comments": [],
      "messages": []
    }
    ```

2. **Add a Script to `package.json`**:

    Add the following script to your `package.json` to run `json-server`:

    ```json
    {
      "scripts": {
        "json-server": "json-server --watch db.json --port 4000"
      }
    }
    ```

3. **Start `json-server` Alongside Next.js**:

    Ensure that both the Next.js development server and `json-server` are running to have a fully functional development environment.

### 6. Run the Development Server

Start both the Next.js development server and the `json-server` to see the application in action.

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Available Scripts

The project includes several scripts to facilitate development and maintenance:

- `dev`: Starts the Next.js development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality and errors.
- `json-server`: Starts the temporary JSON server.

Ensure that both the Next.js server and `json-server` are running to have a fully functional development environment.

## ESLint Configuration

Chatter-Box uses ESLint to maintain code quality and consistency.


### Running ESLint

To check your code for linting errors, use the provided script:

- Using npm:

  ```
  npm run lint
  ```

## License

This project is licensed under the [Apache License 2.0](LICENSE).

