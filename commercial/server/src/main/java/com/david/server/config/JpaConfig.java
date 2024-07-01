/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 19:10:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-07-01 23:09:09
 * @FilePath       : JpaConfig.java
 * @CopyRight      : Con chù chù 🥴🥴
 **/

package com.david.server.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import jakarta.persistence.EntityManagerFactory;

/**
 * Lớp cấu hình JPA này dùng để khắc phục lỗi
 * "Spring Data JPA - Consider defining a bean named 'entityManagerFactory' in
 * your configuration".
 * Nó định nghĩa các bean cần thiết cho JPA và quản lý giao dịch.
 */
@Configuration
@EnableTransactionManagement
public class JpaConfig {
  private final DataSource dataSource;

  public JpaConfig(DataSource dataSource) {
    this.dataSource = dataSource;
  }

  @Bean
  public EntityManagerFactory entityManagerFactory() {
    HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
    vendorAdapter.setGenerateDdl(true);

    LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
    factory.setJpaVendorAdapter(vendorAdapter);
    factory.setPackagesToScan("com.david.server.database.model", "com.david.server.controller",
        "com.david.server.database.service", "com.david.server.database.repository");
    factory.setDataSource(dataSource);
    factory.afterPropertiesSet();

    return factory.getObject();
  }

  @Bean
  public PlatformTransactionManager transactionManager() {
    JpaTransactionManager transactionManager = new JpaTransactionManager();
    transactionManager.setEntityManagerFactory(entityManagerFactory());
    return transactionManager;
  }

}