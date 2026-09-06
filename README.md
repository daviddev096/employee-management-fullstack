# 👥 Employee Management System — Full Stack Application

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React.js-Frontend-61DAFB?logo=react&logoColor=black)
![Maven](https://img.shields.io/badge/Maven-Build-C71A36?logo=apachemaven&logoColor=white)
![Lombok](https://img.shields.io/badge/Lombok-Boilerplate--Free-red)

Sistema Full Stack de Gerenciamento de Funcionários desenvolvido com **Java**, **Spring Boot**, **React** e **PostgreSQL**, aplicando princípios **SOLID**, padrões de projeto e boas práticas de arquitetura REST.

Aplicação Full Stack completa para gerenciamento de funcionários, projetada para demonstrar a aplicação prática de **Fundamentos de Engenharia de Software**, **Princípios SOLID** e **Padrões de Arquitetura RESTful**. O projeto conta com um backend robusto em Java e Spring Boot integrado ao banco de dados PostgreSQL, integrado a um frontend em React.js.

---

## 📐 Fundamentos de Engenharia & Arquitetura Aplicados

* **Princípio da Responsabilidade Única (SRP - SOLID):** Camadas estritamente separadas. A controller trata apenas do protocolo HTTP, a camada de serviço gerencia as regras de negócio e a camada de repositório isola o acesso aos dados.
* **Princípio da Inversão de Dependência (DIP - SOLID):** Injeção de dependência via construtor (gerada pelo Lombok/Spring) injetando abstrações (`EmployeeService`) em vez de implementações concretas, promovendo baixo acoplamento e facilitando testes unitários.
* **Abstração e Polimorfismo:** Uso de interfaces (`EmployeeService`) para definir os contratos das operações da aplicação, desacoplando o contrato da sua regra de execução — o Controller só chama a interface, nunca a implementação diretamente.
* **Padrão DTO e Encapsulamento:** Mapeamento de entidades de domínio para garantir a integridade do modelo relacional e segurança na trafegabilidade dos dados.
* **Clean Code:** Nomenclatura clara, métodos curtos e responsabilidades bem definidas em todas as camadas.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Java 21** (Recursos modernos da linguagem e POO)
* **Spring Boot** (Spring Web, Spring Data JPA)
* **PostgreSQL** (Banco de dados relacional para persistência de dados)
* **Lombok** (Injeção de dependências e eliminação de código boilerplate)
* **Maven** (Gerenciamento de dependências e build)

### Frontend
* **React.js** (Componentização e consumo das APIs REST via Axios/Fetch)
* **Vite** (Build tool e servidor de desenvolvimento)

---

## 📌 Endpoints da API REST

| Método | Rota                        | Descrição                                          |
|--------|------------------------------|-----------------------------------------------------|
| GET    | `/employees`                 | Retorna a lista completa de funcionários            |
| GET    | `/employees/{employeeId}`    | Busca os dados de um funcionário específico por ID  |
| POST   | `/employees`                 | Cadastra um novo funcionário na base de dados       |
| PATCH  | `/employees/{employeeId}`    | Atualiza parcialmente as informações de um funcionário existente |
| DELETE | `/employees/{employeeId}`    | Remove um funcionário do sistema                    |

### Exemplo de requisição (POST)

```json
{
  "name": "Maria Silva",
  "manager": "Sara Bianca",
  "salary": 5000.00
}
```

---

## 🗄️ Configuração do Banco de Dados (PostgreSQL)

Configuração de conexão no arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
spring.datasource.username=postgres
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

---

## 🔧 Como instalar e rodar o projeto

### Pré-requisitos
- Java 21 ou superior instalado
- Maven instalado (ou use o `mvnw` incluso no projeto)
- Node.js e npm instalados
- PostgreSQL instalado e rodando
- Git

### Backend (Spring Boot)

1. Clone o repositório:
```bash
git clone https://github.com/daviddev096/employee-management-fullstack.git
cd employee_web
```

2. Configure o `application.properties` com os dados do seu banco PostgreSQL (veja seção acima).

3. Compile o projeto:
```bash
./mvnw clean install
```

4. Execute a aplicação:
```bash
./mvnw spring-boot:run
```

5. A API estará disponível em:
```
http://localhost:8080
```

### Frontend (React + Vite)

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
npm run dev
```

4. O frontend estará disponível em:
```
http://localhost:5173
```
(ou `http://localhost:5174`, caso a porta 5173 já esteja em uso)

---

## 🧠 Aprendizados do projeto

- Uso de `ResponseEntity` para controle explícito de status HTTP (200, 201, 204, 404, etc.)
- Separação de responsabilidades entre Controller e Service
- Boas práticas REST
- Configuração e uso do PostgreSQL como banco de dados relacional
- Maior desafio do projeto: a integração entre frontend e backend, principalmente o mapeamento das rotas

---

Feito com 💻 e ☕ por David Alves.
