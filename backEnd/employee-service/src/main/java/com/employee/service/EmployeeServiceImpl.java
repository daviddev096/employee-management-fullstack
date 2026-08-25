package com.employee.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.employee.entity.EmployeeEntity;
import com.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService{
	
	private final EmployeeRepository employeeRepository;

	@Override
	public List<EmployeeEntity> getAllEmployee() {
		return (List<EmployeeEntity>) employeeRepository.findAll();
	}

	@Override
	public EmployeeEntity getEmployeeById(Long employeeId) {
		return employeeRepository.findById(employeeId).get();
	}

	@Override
	public EmployeeEntity addEmployee(EmployeeEntity employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public EmployeeEntity updateEmployee(EmployeeEntity employee) {
		return employeeRepository.save(employee);
	}

	@Override
	public String deleteEmployee(EmployeeEntity employee) {
		employeeRepository.delete(employee);
		return "Employee is Deleted Successfully for employeeId:"+employee.getEmployeeIdLong();
	}
	

}
