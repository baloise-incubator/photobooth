# Use an official Maven base image as a parent image
FROM maven:3.8-openjdk-11-slim AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project files to the container
COPY pom.xml .

# Build the Maven project
RUN mvn clean install

# Copy the entire project to the container
COPY . .

RUN apt update; apt-get update; apt-get install -y libleptonica-dev libtesseract-dev tesseract-ocr-eng tesseract-ocr-deu tesseract-ocr-fra tesseract-ocr-ita; tesseract --version; cp /usr/lib/*/libtesseract.* /app/target/;

# Build the JAR file
RUN mvn package

# Use an official Java runtime as a base image
FROM openjdk:11-jre-slim as final

# Set the working directory in the container
WORKDIR /app

ARG JAR_FILE=/app/target/*.jar

# Copy the JAR file from the builder stage to the container
COPY --from=builder ${JAR_FILE} ./app.jar

# Run the Java app
ENTRYPOINT ["java", "-jar", "app.jar"]