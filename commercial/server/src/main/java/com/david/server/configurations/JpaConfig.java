/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-22 19:10:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-23 18:06:09
 * @CopyRight      : Con chù chù 🥴🥴
**/

package com.david.server.configurations;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import jakarta.persistence.EntityManagerFactory;

/**
 * Lớp cấu hình JPA này dùng để khắc phục lỗi
 * "Spring Data JPA - Consider defining a bean named 'entityManagerFactory' in
 * your configuration".
 * Nó định nghĩa các bean cần thiết cho JPA và quản lý giao dịch.
 */
@Configuration
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
    factory.setPackagesToScan("com.david.server.database.models.*");
    factory.setDataSource(dataSource);
    factory.afterPropertiesSet();

    return factory.getObject();
  }

  @Bean
  public PlatformTransactionManager transactionManager() {
    JpaTransactionManager txManager = new JpaTransactionManager();
    txManager.setEntityManagerFactory(entityManagerFactory());
    return txManager;
  }
}