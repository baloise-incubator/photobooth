# Use an official Maven base image as a parent image
FROM maven:3.8-openjdk-11-slim

# Build the Maven project
RUN mvn clean install

# Build the JAR file
RUN mvn package

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

CMD ["java", "-jar", "/app.jar"]