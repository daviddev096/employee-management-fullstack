import './App.css';
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender 
} from '@tanstack/react-table';

function App() {
  const [employee, setEmployee] = useState([]);
  const [employeeData, setEmployeeData] = useState({ name: "", manager: "", salary: "" });
  const [showCancel, setShowCancel] = useState(false);

  const columns = useMemo(
    () => [
      { header: "EmployeeId", accessorKey: "employeeIdLong" },
      { header: "Name", accessorKey: "name" },
      { header: "Manager", accessorKey: "manager" },
      { header: "Salary", accessorKey: "salary" },
    ],
    []
  );

  const table = useReactTable({
    data: employee,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getAllEmployee = () => {
    axios.get("http://localhost:8080/employee").then((res) => {
      console.log(res.data);
      setEmployee(res.data);
    });
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
    setShowCancel(true);
  };

  const clearAll = () => {
    setEmployeeData({ name: "", manager: "", salary: "" });
    setShowCancel(false);
    getAllEmployee();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/employee", employeeData).then((res) => {
      console.log(res.data);
    });
    clearAll();
  };

  return (
    <>
      <div className='main-container'>
        <h3>Full Stack Application using React JS, Spring Boot & PostgreSQL</h3>

        <div className='add-panel'>
          <div className='addpaneldiv'>
            <label htmlFor="name">Nome</label> <br />
            <input 
              className='addpanelinput' 
              type="text" 
              name="name" 
              id="name" 
              value={employeeData.name}
              onChange={handleChange}
            />
          </div>
          <div className='addpaneldiv'>
            <label htmlFor="manager">Gerente</label> <br />
            <input 
              className='addpanelinput' 
              type="text" 
              name="manager" 
              id="manager" 
              value={employeeData.manager}
              onChange={handleChange}
            />
          </div>
          <div className='addpaneldiv'>
            <label htmlFor="salario">Salário</label> <br />
            <input 
              className='addpanelinput' 
              type="text" 
              name="salary" 
              id="salario" 
              value={employeeData.salary}
              onChange={handleChange}
            />
          </div>
          <button className='addBtn' onClick={handleSubmit}>Adicionar</button>
          <button className='cancelBtn' disabled={!showCancel} onClick={clearAll}>Cancelar</button>
        </div>

        <input 
          className='searchinput' 
          type="search" 
          name='inputsearch' 
          id='inputsearch' 
          placeholder='Buscar Funcionário' 
        />
      </div>

      <table className='table'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;