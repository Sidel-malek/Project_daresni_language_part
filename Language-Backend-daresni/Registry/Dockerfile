FROM openjdk:17-jdk-alpine
COPY target/Registry*.jar Registry.jar
ENTRYPOINT ["java", "-jar" , "/Registry"]
EXPOSE 8888