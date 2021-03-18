# VDISProjektas 
<img src="dis-ui/src/img/logo.png" width="100" height="40" />
Vaikų darželio informacines sistemos projekto repositorija

***
### Description
Kindergarten Registration Management System is a system that has been developed as final project at Akademija.IT, Vilnius.  
This system is developed in order to help managing the registration to kindergartens process.   
The project language lithuanian.  
The project is for learning purpose.  

### Technology Stack
Component         | Technology
---               | ---
Frontend          | React 16+ 
Backend           | Spring Boot 2.1+, Java 11+
Security          | Spring Security, JWT
Database          | H2 Database
Server            | TomcatApache 9.+
Persistence       | JPA 
API Documentation | Swagger-UI
Testing           | JUnit, TestNG, Selenium

## Getting Started

### Prerequisites
-  Clone the repo `git clone https://github.com/Pauliiuuss/VDISProjektas.git`
-  To run application from war file:
```
mvn clean install org.codehaus.cargo:cargo-maven2-plugin:1.7.7:run -Dcargo.maven.containerId=tomcat9x -Dcargo.servlet.port=8080 -Dcargo.maven.containerUrl=https://repo1.maven.org/maven2/org/apache/tomcat/tomcat/9.0.40/tomcat-9.0.40.zip
```
- To make a war file (dis-app.war) in /target directory and deploy it to Tomcat server run `mvn clean install package` 

### Backend
- Go to your project folder from your terminal
- cd dis-app
- Run: `mvn spring-boot:run`

### Frontend
- Go to your project folder from your terminal
- cd dis-ui
- Run: `npm install` or `yarn install`
- /services/LINK.js change const LINK = process.env.PUBLIC_URL to const LINK = 'http://localhost:8080'
- After install, run: `npm run start` or `yarn start`
- It will open your browser(http://localhost:3000)

### Database 
- http://localhost:8080/console
```
  datasource.url=jdbc:h2:file://tmp/VDISDB000015.db
  username: sa
  password:
```

### Swagger UI
- http://localhost:8080/swagger-ui/

***
Copyright © 2021, PullStackTeam
