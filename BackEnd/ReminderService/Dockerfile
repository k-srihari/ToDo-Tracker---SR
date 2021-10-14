FROM openjdk:18-ea-11-slim
WORKDIR /reminder/lib
ENV MONGO_DATABASE=tasksdb
ENV MONGO_URI=mongodb://localhost:27017/tasksdb
ADD ./target/ReminderService-0.0.1-SNAPSHOT.jar /reminder/lib/ReminderService-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","ReminderService-0.0.1-SNAPSHOT.jar"]