package com.employee.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.employee.entity.EmployeeEntity;
import com.employee.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/employee")
    public ResponseEntity<List<EmployeeEntity>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployee());
    }

    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<EmployeeEntity> getEmployeeById(@PathVariable("employeeId") Long employeeId) {
        return ResponseEntity.ok(employeeService.getEmployeeById(employeeId));
    }

    @PostMapping("/employees")
    public ResponseEntity<EmployeeEntity> createEmployee(@RequestBody EmployeeEntity employee) {
        return ResponseEntity.ok(employeeService.addEmployee(employee));
    }

    @PatchMapping("/employees/{employeeId}")
    public ResponseEntity<EmployeeEntity> updateEmployee(@RequestBody EmployeeEntity employee,@PathVariable("employeeId") Long employeeId) {
        EmployeeEntity empObj = employeeService.getEmployeeById(employeeId);
        if(empObj != null) {
            empObj.setManager(employee.getManager());
            empObj.setName(employee.getName());
            empObj.setSalary(employee.getSalary());
        }
        return ResponseEntity.ok(employeeService.updateEmployee(empObj));
    }

    @DeleteMapping("/employees/{employeeId}")
    public ResponseEntity<String> updateEmployee(@PathVariable("employeeId") Long employeeId) {

        EmployeeEntity empObj = employeeService.getEmployeeById(employeeId);
        String deleteMsg = null;
        if(empObj != null) {
            deleteMsg = employeeService.deleteEmployee(empObj);
        }
        return ResponseEntity.ok(deleteMsg);
    }
    
}