# Stage 1: Build the application
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Install libargon2 and its dependencies
RUN apt-get update && apt-get install -y libargon2-1 libjna-jni



# Copy the JAR file from the build stage
COPY --from=build /app/target/FeedBack-0.0.1-SNAPSHOT.jar .

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app/FeedBack-0.0.1-SNAPSHOT.jar"]


#Build : docker build -t my-spring-boot-app .
#docker tag my-spring-boot-app shashwenth/my-spring-boot-app:latest
#docker push shashwenth/my-spring-boot-app:latest