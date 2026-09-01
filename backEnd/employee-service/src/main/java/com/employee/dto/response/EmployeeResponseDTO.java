package com.employee.dto.response;

public record EmployeeResponseDTO(
        Long employeeIdLong,
        String name,
        String manager,
        Integer salary
) {
}
