FROM adoptopenjdk/openjdk11:ubi
RUN mkdir -p /opt/app
COPY target/*.jar /opt/app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/opt/app/app.jar"]