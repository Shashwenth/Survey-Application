# Stage 1: Build the React app
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

# Stage 2: Serve the React app with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]


# Build : docker build -t my-react-app .

#RUn : docker run -p 3000:3000 my-react-app
