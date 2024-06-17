/*
 * @file            src/main/java/com/david/server/ServerApplication.java
 * @author          David Nguyễn <139251794+DavidNguyen67@users.noreply.github.com>
 * @createTime      2024-06-17 20:55:51
 * @lastModified    2024-06-17 20:59:55
 * Copyright ©Quân đẹp trai All rights reserved
*/

package com.david.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
