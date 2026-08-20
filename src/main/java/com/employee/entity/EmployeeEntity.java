package com.employee.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "employee", schema = "emp")
public class EmployeeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "employeeid")
	private Long employeeIdLong;
	@Column(name = "name")
	private String name;
	@Column(name = "manager")
	private String manager;
	@Column(name = "salary")
	private Integer salary;

}
