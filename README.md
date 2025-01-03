# 📝 To-Do List App

A sleek, feature-rich to-do list app designed to help you organize your tasks and boost productivity. Built with modern technologies, this app ensures a seamless user experience while demonstrating a robust and scalable architecture.

---

## 🚀 Features

- **Task Management:** Add, edit, delete, and prioritize tasks effortlessly.
- **Categories:** Organize tasks with custom categories.
- **Cross-Device Sync:** Access your tasks from anywhere.
- **Subtasks:** Create some subtasks for every task.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/) for styling
- **Backend:** [Nest.js](https://nestjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/), [Prisma](https://www.prisma.io/)
- **Authentication:** JSON Web Tokens (JWT)

[//]: # (- **Deployment:** [Vercel]&#40;https://vercel.com/&#41; &#40;Frontend&#41;, [Heroku]&#40;https://www.heroku.com/&#41; &#40;Backend&#41;)

---

## 📚 What I Learned

- **Frontend:**
    - Mastered Next.js and created custom hooks.
    - Implemented responsive design with TailwindCSS.
    - Mastered TanStack Query and improved knowledge how to use it.

- **Backend:**
    - Built RESTful APIs with Nest.js.
    - Integrated secure user authentication with JWT.

- **General Development:**
    - Improved project structure for scalability and maintainability.
    - Deployed full-stack applications seamlessly with Vercel and Heroku.

---

## 📸 Demo

Check out the live demo [here](link-to-demo).  
Or clone the repo and run locally:

```bash
# Clone the repo (Backend)
git clone https://github.com/DenysJSE/to-do-list-backend

# Install dependencies
npm install

# Start the app
npm run start: dev

# Clone the repo (Frontend)
git clone https://github.com/DenysJSE/to-do-list-frontend

# Install dependencies
npm install

# Start the app
npm run dev
```

## ⚡ Getting Started

1. Clone this repository.

2. Install dependencies with `npm install`.

3. Create a `.env` file for environment variables:
```bash
PORT="7777"
CLIENT_URL = 'http://localhost:3000/'
API_DOMAIN="localhost"

DATABASE_URL="postgresql://postgres:1111@localhost:5432/to-do-list?schema=public"

JWT_SECRET="secret"

EXPIRE_DAY_REFRESH_TOKEN="60"
REFRESH_TOKEN_NAME = 'refreshToken'
```

## 🛡️ Security Features

- End-to-end encryption for sensitive user data.
- Secure authentication using hashed passwords and JWTs.
- Regularly sanitized inputs to prevent SQL injection and XSS attacks.

---

## 📌 Future Enhancements

- Add labels for create more filters for tasks.
- Implement searching tasks.
- Support integrations with popular calendar apps.

---

## 🖋️ Contributing

Contributions are welcome! Open an issue or submit a pull request.  
Please follow the contribution guidelines.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
