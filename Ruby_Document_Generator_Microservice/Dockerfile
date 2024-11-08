FROM ruby:2.7.8

# Set the working directory inside the container
WORKDIR /code

# Copy the Gemfile and Gemfile.lock before other files
COPY Gemfile Gemfile.lock ./

# Install dependencies
RUN bundle install

# Copy the rest of the application code
COPY . .

# Expose port 4567 to the outside world
EXPOSE 4567

# Define the command to run your app
CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "4567"]

# docker build -t pdf-service .
# docker tag pdf-service shashwenth/pdf-service:latest
# docker push shashwenth/pdf-service:latest