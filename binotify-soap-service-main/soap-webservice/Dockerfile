FROM amazoncorretto:11-alpine-jdk
COPY target/soap-webservice-1.0-SNAPSHOT-jar-with-dependencies.jar app.jar
EXPOSE 2434
CMD ["java", "-jar", "--illegal-access=warn", "app.jar"]