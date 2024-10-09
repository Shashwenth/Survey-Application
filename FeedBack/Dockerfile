# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk
# Install libargon2 and its dependencies
RUN apt-get update && apt-get install -y libargon2-1 libjna-jni

# Expose port 8080
EXPOSE 8080

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "/app.jar"]


#Build : docker build -t my-spring-boot-app .
#Run : docker run -p 8080:8080 my-spring-boot-app