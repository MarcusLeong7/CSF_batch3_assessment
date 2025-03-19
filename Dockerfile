# Build Angular
FROM node:23 AS ng-build

WORKDIR /src

# Install angular cli
RUN npm i -g @angular/cli

COPY news-client/public public
COPY news-client/src src
# copy all json files
COPY client/*.json .

# Clean Install node_modules then build angular
RUN npm ci
RUN ng build

# Build Spring Boot Java
FROM openjdk:23-jdk AS j-build

WORKDIR /src

COPY news-server/.mvn .mvn
COPY news-server/src src
COPY news-server/mvnw .
COPY news-server/pom.xml .

# Copy angular files over to static directory
COPY --from=ng-build /src/dist/news-client/browser/* src/main/resources/static
# Run and compile
RUN chmod a+x mvnw && ./mvnw package -Dmaven.test.skip=true

# Copy the JAR file over to the final container
FROM openjdk:23-jdk

WORKDIR /app
COPY --from=j-build /src/target/news-server-0.0.1-SNAPSHOT.jar app.jar

ENV SERVER_PORT=8080
#MongoDB
ENV SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/boardgames
# Digital Ocean
ENV S3_KEY_ACCESS="" S3_KEY_SECRET="" S3_BUCKET_ENDPOINT="" S3_BUCKET_REGION=""

EXPOSE ${PORT}

SHELL ["/bin/sh","-c"]
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar