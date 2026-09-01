package com.employee.dto.request;

public record EmployeeRequestDTO(
        String name,
        String manager,
        Integer salary) {
}
