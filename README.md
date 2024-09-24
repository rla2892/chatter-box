# Chatter-Box

![Chatter-Box Logo](public/logo.png)

## Introduction

**Chatter-Box** is a social media platform built with Next.js and TypeScript. It allows users to create and share posts, interact with others, and engage in real-time conversations. Leveraging modern web technologies, Chatter-Box aims to deliver a fast and responsive user experience.

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

### ESLint Configuration File (`eslint.config.js`)

The ESLint configuration uses the Flat Config system to incorporate Next.js and TypeScript-specific rules.

```javascript
// eslint.config.js
import js from '@eslint/js';
import next from 'eslint-config-next';
import typescriptParser from '@typescript-eslint/parser';

export default [
  // Base ESLint recommended settings
  js.configs.recommended,
  
  // Next.js recommended settings
  next.configs.recommended,
  
  // Next.js TypeScript settings
  next.configs.typescript,
  
  // Custom rules and parser options
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Add your custom rules here
    },
  },
];
```

### Running ESLint

To check your code for linting errors, use the provided script:

- Using npm:

  ```
  npm run lint
  ```

- Using Yarn:

  ```
  yarn lint
  ```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**: Click the "Fork" button at the top-right corner of the repository page.
2. **Create a New Branch**: Create a branch for your feature or bugfix.

    ```
    git checkout -b feature/your-feature-name
    ```

3. **Make Changes**: Commit your changes with clear and descriptive messages.

    ```
    git commit -m "Add feature: your feature description"
    ```

4. **Push to the Branch**:

    ```
    git push origin feature/your-feature-name
    ```

5. **Create a Pull Request**: Go to the repository on GitHub and create a pull request from your branch.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

