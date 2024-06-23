# Workspace README

## Mô tả Workspace
Workspace này bao gồm hai dự án chính: một là ứng dụng frontend sử dụng Next.js và hai là ứng dụng backend sử dụng Spring Boot Java. Mỗi dự án được tổ chức trong thư mục riêng biệt để dễ dàng quản lý và phát triển.

## Cấu trúc dự án Next.js

### Thư mục `frontend`

```
my-nextjs-app/
|-- public/
|   |-- images/
|   |-- favicon.ico
|-- src/
|   |-- components/
|   |   |-- Header.tsx
|   |   |-- Footer.tsx
|   |   |-- Button.tsx
|   |-- hooks/
|   |   |-- useAuth.ts
|   |-- pages/
|   |   |-- api/
|   |   |   |-- hello.ts
|   |   |-- _app.tsx
|   |   |-- _document.tsx
|   |   |-- index.tsx
|   |   |-- about.tsx
|   |-- styles/
|   |   |-- globals.css
|   |   |-- Home.module.css
|   |-- types/
|   |   |-- index.ts
|   |-- utils/
|   |   |-- api.ts
|   |   |-- validation.ts
|   |-- context/
|   |   |-- AuthContext.tsx
|   |-- services/
|   |   |-- authService.ts
|   |-- lib/
|       |-- db.ts
|-- .gitignore
|-- next-env.d.ts
|-- tsconfig.json
|-- package.json
|-- README.md
```


### Cấu trúc dự án Spring Boot Java

#### Thư mục `backend`

```
my-spring-boot-app/
|-- src/
|   |-- main/
|   |   |-- java/
|   |   |   |-- com/
|   |   |   |   |-- myapp/
|   |   |   |   |   |-- MySpringBootApp.java
|   |   |   |   |   |-- config/
|   |   |   |   |   |   |-- KeycloakConfig.java
|   |   |   |   |   |-- controller/
|   |   |   |   |   |   |-- UserController.java
|   |   |   |   |   |-- dto/
|   |   |   |   |   |   |-- UserDto.java
|   |   |   |   |   |-- entity/
|   |   |   |   |   |   |-- User.java
|   |   |   |   |   |-- exception/
|   |   |   |   |   |   |-- CustomExceptionHandler.java
|   |   |   |   |   |-- repository/
|   |   |   |   |   |   |-- UserRepository.java
|   |   |   |   |   |-- service/
|   |   |   |   |   |   |-- UserService.java
|   |   |   |   |-- util/
|   |   |       |   |   |-- KeycloakUtil.java
|   |   |-- resources/
|   |       |-- static/
|   |       |-- templates/
|   |       |-- application.properties
|-- src/
|   |-- test/
|       |-- java/
|           |-- com/
|               |-- myapp/
|                   |-- MySpringBootAppTests.java
|-- .gitignore
|-- pom.xml
|-- README.md
```


## Hướng dẫn cài đặt và chạy dự án

### Frontend (Next.js)

1. **Cài đặt Node.js và npm:**
   - Đảm bảo bạn đã cài đặt Node.js và npm trên máy tính của mình.

2. **Cài đặt các dependencies:**
   - Chạy lệnh sau để cài đặt các dependencies:

     ```
     npm install
     ```

3. **Chạy ứng dụng:**
   - Sau khi cài đặt xong, chạy lệnh sau để khởi động ứng dụng Next.js:

     ```
     npm run dev
     ```

   - Mở trình duyệt và truy cập vào `http://localhost:3000` để xem ứng dụng của bạn.

### Backend (Spring Boot Java)

1. **Cài đặt Java Development Kit (JDK):**
   - Đảm bảo JDK đã được cài đặt và biến môi trường JAVA_HOME đã được thiết lập.

2. **Cài đặt Maven:**
   - Đảm bảo bạn đã cài đặt Maven trên máy tính của mình.

3. **Cài đặt các dependencies:**
   - Chạy lệnh sau để cài đặt các dependencies và biên dịch dự án:

     ```
     mvn clean install
     ```

4. **Chạy ứng dụng:**
   - Sau khi cài đặt xong, chạy lệnh sau để khởi động ứng dụng Spring Boot:

     ```
     mvn spring-boot:run
     ```

   - Ứng dụng sẽ được khởi động trên cổng mặc định `8080`.

## Hướng dẫn sử dụng

- Frontend (Next.js): Mô tả cách sử dụng các trang và thành phần trong ứng dụng Next.js của bạn.
- Backend (Spring Boot Java): Hướng dẫn cách sử dụng các API và endpoints được cung cấp bởi ứng dụng Spring Boot.

