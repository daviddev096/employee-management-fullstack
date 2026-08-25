package com.employee.repository;

import org.springframework.data.repository.CrudRepository;
import com.employee.entity.EmployeeEntity;

public interface EmployeeRepository extends CrudRepository<EmployeeEntity, Long> {

}
