package com.employee.service;

import java.util.List;
import com.employee.entity.EmployeeEntity;

public interface EmployeeService {

	List<EmployeeEntity> getAllEmployee();

	EmployeeEntity getEmployeeById(Long employeId);

	EmployeeEntity addEmployee(EmployeeEntity employee);

	EmployeeEntity updateEmployee(EmployeeEntity employee);

	String deleteEmployee(EmployeeEntity employee);
}
