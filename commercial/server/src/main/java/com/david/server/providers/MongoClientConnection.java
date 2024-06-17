/*
 * @file            src/main/java/com/david/server/providers/MongoClientConnection.java
 * @author          David Nguyễn <139251794+DavidNguyen67@users.noreply.github.com>
 * @createTime      2024-06-17 20:55:51
 * @lastModified    2024-06-17 20:59:23
 * Copyright ©Quân đẹp trai All rights reserved
*/

package com.david.server.providers;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoException;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class MongoClientConnection {

  @Value("${spring.data.mongodb.uri}")
  private String connectionString;

  @PostConstruct
  public void init() {
    ServerApi serverApi = ServerApi.builder()
        .version(ServerApiVersion.V1)
        .build();
    MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString(connectionString))
        .serverApi(serverApi)
        .build();
    // Create a new client and connect to the server
    try (MongoClient mongoClient = MongoClients.create(settings)) {
      try {
        // Send a ping to confirm a successful connection
        MongoDatabase database = mongoClient.getDatabase("admin");
        database.runCommand(new Document("ping", 1));
        System.out.println("Pinged your deployment. You successfully connected to MongoDB!");
      } catch (MongoException e) {
        e.printStackTrace();
      }
    }
  }
}
