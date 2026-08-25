# employee-management-fullstack
Sistema Full Stack de Gerenciamento de Funcionários desenvolvido com Java 25, Spring Boot, React e PostgreSQL, aplicando princípios SOLID, padrões de projeto e boas práticas de arquitetura REST.


# 👥 Employee Management System — Full Stack Application

Aplicação Full Stack completa para gerenciamento de funcionários, projetada para demonstrar a aplicação prática de **Fundamentos de Engenharia de Software**, **Princípios SOLID** e **Padrões de Arquitetura RESTful**. O projeto conta com um backend robusto em Java e Spring Boot integrado ao banco de dados PostgreSQL, preparado para integração com um frontend em React.js.

---

## 📐 Fundamentos de Engenharia & Arquitetura Aplicados

* **Princípio da Responsabilidade Única (SRP - SOLID):** Camadas estritamente separadas. A controller trata apenas do protocolo HTTP, a camada de serviço gerencia as regras de negócio e a camada de repositório isola o acesso aos dados.
* **Princípio da Inversão de Dependência (DIP - SOLID):** Injeção de dependência via construtor (gerada pelo Lombok/Spring) injetando abstrações (`EmployeeService`) em vez de implementações concretas, promovendo baixo acoplamento e facilitando testes unitários.
* **Abstração e Polimorfismo:** Uso de interfaces (`EmployeeService`) para definir os contratos das operações da aplicação, desacoplando o contrato da sua regra de execução.
* **Padrão DTO e Encapsulamento:** Mapeamento de entidades de domínio para garantir a integridade do modelo relacional e segurança na trafegabilidade dos dados.

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
* **Java 21** (Recursos modernos da linguagem e POO)
* **Spring Boot** (Spring Web, Spring Data JPA)
* **PostgreSQL** (Banco de dados relacional para persistência de dados)
* **Lombok** (Injeção de dependências e eliminação de código boilerplate)
* **Maven** (Gerenciamento de dependências e build)

### **Frontend** *(Em desenvolvimento)*
* **React.js** (Componentização e consumo das APIs REST via Axios/Fetch)

---

## 📌 Endpoints da API REST

* **`GET /employees`** — Retorna a lista completa de funcionários.
* **`GET /employees/{employeeId}`** — Busca os dados de um funcionário específico por ID.
* **`POST /employees`** — Cadastra um novo funcionário na base de dados.
* **`PATCH /employees/{employeeId}`** — Atualiza parcialmente as informações de um funcionário existente.
* **`DELETE /employees/{employeeId}`** — Remove um funcionário do sistema.

---

## 🗄️ Configuração do Banco de Dados (PostgreSQL)

Configuração de conexão no arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_db
spring.datasource.username=postgres
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
