FROM openjdk:18-ea-11-slim
WORKDIR /manager/lib
ENV MONGO_DATABASE=tasksdb
ENV MONGO_URI=mongodb://localhost:27017/tasksdb
ADD ./target/ManagerService-0.0.1-SNAPSHOT.jar /manager/lib/ManagerService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","ManagerService-0.0.1-SNAPSHOT.jar"]