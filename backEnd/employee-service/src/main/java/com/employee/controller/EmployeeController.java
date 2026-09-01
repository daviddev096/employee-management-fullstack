package com.employee.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.employee.dto.request.EmployeeRequestDTO;
import com.employee.dto.response.EmployeeResponseDTO;
import com.employee.entity.EmployeeEntity;
import com.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/employee")
@RequiredArgsConstructor
@Tag(name = "Funcionarios", description = "Gerenciador de Funcionarios")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    @Operation(summary = "Listar funcionários", description = "Retorna a lista de todos os funcionários cadastrados no banco de dados.")
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployee() {
        List<EmployeeResponseDTO> response = employeeService.getAllEmployee()
                .stream()
                .map(this::toResponseDTO)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{employeeId}")
    @Operation(summary = "Buscar funcionário por ID", description = "Retorna os dados de um funcionário específico a partir do seu identificador.")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable("employeeId") Long employeeId) {
        return ResponseEntity.ok(toResponseDTO(employeeService.getEmployeeById(employeeId)));
    }

    @PostMapping
    @Operation(summary = "Cadastrar funcionário", description = "Cadastra um novo funcionário que ainda não está cadastrado no banco de dados.")
    public ResponseEntity<EmployeeResponseDTO> createEmployee(@RequestBody EmployeeRequestDTO request) {
        EmployeeEntity toSave = EmployeeEntity.builder()
                .name(request.name())
                .manager(request.manager())
                .salary(request.salary())
                .build();

        EmployeeEntity saved = employeeService.addEmployee(toSave);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponseDTO(saved));
    }

    @PatchMapping("/{employeeId}")
    @Operation(summary = "Atualizar funcionário", description = "Atualiza os dados (gestor, nome e salário) de um funcionário existente a partir do seu identificador.")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(@RequestBody EmployeeRequestDTO request, @PathVariable("employeeId") Long employeeId) {
        EmployeeEntity empObj = employeeService.getEmployeeById(employeeId);
        empObj.setManager(request.manager());
        empObj.setName(request.name());
        empObj.setSalary(request.salary());

        return ResponseEntity.ok(toResponseDTO(employeeService.updateEmployee(empObj)));
    }

    @DeleteMapping("/{employeeId}")
    @Operation(summary = "Remover funcionário", description = "Remove um funcionário existente do banco de dados a partir do seu identificador.")
    public ResponseEntity<String> deleteEmployee(@PathVariable("employeeId") Long employeeId) {
        EmployeeEntity empObj = employeeService.getEmployeeById(employeeId);
        String deleteMsg = employeeService.deleteEmployee(empObj);
        return ResponseEntity.ok(deleteMsg);
    }

    private EmployeeResponseDTO toResponseDTO(EmployeeEntity entity) {
        return new EmployeeResponseDTO(
                entity.getEmployeeIdLong(),
                entity.getName(),
                entity.getManager(),
                entity.getSalary()
        );
    }
}