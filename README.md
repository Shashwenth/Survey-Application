# Survey-Application
This Full Stack Appliction is a Culmination of all my learning and Experiences put into developing an Web application to generate Questionnaire, Survey, Feedback forms. The major stacks used in this application are
Spring Boot, React, Flask, Open AI, Ruby. 

I am attaching the instructions to run the docker files ( Currently in Deployment Branch)
1. Spring Application:
    -> Build : $>docker build -t my-spring-boot-app .
    -> Run: $>docker run -p 8080:8080 my-spring-boot-app
3. React Application:
    -> Build: $>docker build -t my-react-app .
    -> Run : $>docker run -p 3000:3000 my-react-app  
5. Ruby Application:
    -> Build: $>docker build -t pdf-service .
    -> Run : $> docker run -p 4567:4567 pdf-service
