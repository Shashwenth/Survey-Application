Survey Application
This is a full-stack survey application built using Spring Boot (Java) for the backend, React and Tailwind CSS for the frontend, and Ruby for generating downloadable responses in PDF format. The application is hosted on Render.com and uses Neon DB for database management. Check it out at https://taupe-toffee-5512eb.netlify.app/

Features
User Authentication: Users can sign up, log in, and reset their passwords.
Survey Creation: Admin users can create surveys, add questions, and set start and end times for surveys.
Survey Participation: Users can answer survey questions, and submit responses which are stored in the database.
Survey Status Management: Surveys can be marked as "active", "not started", or "concluded".
Response Download: Responses can be downloaded as a PDF file using Ruby.
Dynamic Surveys: Surveys can be fetched dynamically based on their status (active, concluded, or upcoming).
Tech Stack
Backend:
Spring Boot - Framework for building the REST API.
Spring Data JPA - For database interaction using repositories.
Java - Programming language for backend logic.
Password Encoding - Secure password handling with Spring Security.
Frontend:
React - Framework for building the user interface.
Tailwind CSS - Utility-first CSS framework for styling the frontend.
Database:
Neon DB - Managed PostgreSQL database for storing survey and user data.
PDF Generation:
Ruby - Used to generate PDF files from survey responses.
