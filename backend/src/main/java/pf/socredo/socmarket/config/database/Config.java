package pf.socredo.socmarket.config.database;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.zaxxer.hikari.HikariDataSource;

@Configuration
@PropertySource("classpath:application.yml")
public class Config {

    @Autowired
    private Environment env;

    @Bean
    public HikariDataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName(env.getRequiredProperty("spring.datasource.driver-class-name"));
        dataSource.setJdbcUrl(env.getRequiredProperty("spring.datasource.url"));
        dataSource.setUsername(env.getRequiredProperty("spring.datasource.username"));
        dataSource.setPassword(env.getRequiredProperty("spring.datasource.password"));
        dataSource.setMaximumPoolSize(Integer.parseInt(env.getRequiredProperty("spring.datasource.hikari.maximum-pool-size")));
        dataSource.setIdleTimeout(Long.parseLong(env.getRequiredProperty("spring.datasource.hikari.idle-timeout")));
        dataSource.setPoolName(env.getRequiredProperty("spring.datasource.hikari.pool-name"));
        dataSource.setMaxLifetime(Long.parseLong(env.getRequiredProperty("spring.datasource.hikari.max-lifetime")));
        dataSource.setConnectionTimeout(Long.parseLong(env.getRequiredProperty("spring.datasource.hikari.connection-timeout")));
        dataSource.setValidationTimeout(Long.parseLong(env.getRequiredProperty("spring.datasource.hikari.validation-timeout")));
        dataSource.setInitializationFailTimeout(Long.parseLong(env.getRequiredProperty("spring.datasource.hikari.initialization-fail-timeout")));
        dataSource.setIsolateInternalQueries(Boolean.parseBoolean(env.getRequiredProperty("spring.datasource.hikari.isolate-internal-queries")));
        dataSource.setAllowPoolSuspension(Boolean.parseBoolean(env.getRequiredProperty("spring.datasource.hikari.allow-pool-suspension")));

        if (dataSource.getJdbcUrl() == null || dataSource.getUsername() == null || dataSource.getPassword() == null) {
            throw new IllegalArgumentException("DataSource configuration is incomplete");
        }

        return dataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        DataSource dataSource = dataSource();

        if (dataSource == null) {
            throw new IllegalArgumentException("DataSource cannot be null");
        }
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("pf.socredo.socmarket.entity");
        factory.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Properties props = jpaProperties();
        if (props == null) {
            throw new IllegalArgumentException("JPA Properties cannot be null");
        }
        factory.setJpaProperties(props);
        return factory;
    }

    @Bean
    public PlatformTransactionManager transactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());
        return transactionManager;
    }

    private Properties jpaProperties() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", env.getRequiredProperty("spring.jpa.properties.hibernate.dialect"));
        properties.setProperty("hibernate.hbm2ddl.auto", env.getRequiredProperty("spring.jpa.properties.hibernate.ddl-auto"));
        properties.setProperty("hibernate.show-sql", env.getProperty("spring.jpa.properties.show-sql", "false"));

        if (properties.getProperty("hibernate.dialect") == null) {
            throw new IllegalArgumentException("JPA properties configuration is incomplete");
        }

        return properties;
    }
        @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Applique à toutes les routes API
                        .allowedOrigins("http://localhost:3000") // Autorise Next.js
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*") // Accepte tous les headers
                        .allowCredentials(true); // Permet les cookies (si nécessaire)
            }
        };
    }
}

