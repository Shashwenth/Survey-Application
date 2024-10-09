# Survey-Application
This Full Stack Appliction is a Web application to generate Questionnaire, Survey, Feedback forms. The major stacks used in this application are
Spring Boot, React, Flask, Open AI, Ruby. 

I am attaching the instructions to run the docker files ( Currently in Deployment Branch)
1. Spring Application:
    =>  Go into Survey-Application\FeedBack 
    -> Build : docker build -t my-spring-boot-app .
    -> Run: docker run -p 8080:8080 my-spring-boot-app
3. React Application:
    => Go into: Survey-Application\survey-app>
    -> Build: docker build -t my-react-app .
    -> Run : docker run -p 3000:3000 my-react-app  
5. Ruby Application:
    => Go into: Survey-Application\Ruby_Document_Generator_Microservice>
    -> Build: docker build -t pdf-service .
    -> Run : docker run -p 4567:4567 pdf-service
