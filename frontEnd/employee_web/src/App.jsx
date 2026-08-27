import './App.css';
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender 
} from '@tanstack/react-table';

function App() {
  const [employee, setEmployee] = useState([]);
  const [employeeData, setEmployeeData] = useState({ name: "", manager: "", salary: "" });
  const [showCancel, setShowCancel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const columns = useMemo(
    () => [
      { header: "Codigo", accessorKey: "employeeIdLong" },
      { header: "Nome", accessorKey: "name" },
      { header: "Gestor", accessorKey: "manager" },
      { header: "Salario", accessorKey: "salary" },
      {
        header: "Editar", id: "edit",
        cell: props => (
          <button className='editBtn' onClick={() => handleUpdate(props.cell.row.original)}>
            Editar
          </button>
        )
      },
      {
        header: "Excluir", id: "delete",
        cell: props => (
          <button className='deleteBtn' onClick={() => handleDelete(props.cell.row.original)}>
            Excluir
          </button>
        )
      },
    ],
    []
  );

  const table = useReactTable({
    data: employee,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const name = row.original.name ?? "";
      return name.toLowerCase().includes(filterValue.toLowerCase());
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const getAllEmployee = () => {
    axios.get("http://localhost:8080/employee")
      .then((res) => {
        setEmployee(res.data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Erro ao buscar funcionários:", error);
        setErrorMessage("Não foi possível carregar a lista de funcionários.");
      });
  };

  const handleUpdate = (emp) => {
    setEmployeeData(emp);
    setIsEditing(true);
    setShowCancel(true);
    setErrorMessage("");
  };

  const handleDelete = async (emp) => {
    if (window.confirm(`Deseja excluir ${emp.name}?`)) {
      try {
        await axios.delete(`http://localhost:8080/employee/${emp.employeeIdLong}`);
        setErrorMessage("");
        getAllEmployee();
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
        setErrorMessage(`Não foi possível excluir "${emp.name}". Tente novamente.`);
      }
    }
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
    setIsEditing(false);
    getAllEmployee();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeData.name || !employeeData.manager || !employeeData.salary) {
      setErrorMessage("Preencha todos os campos antes de salvar.");
      return;
    }

    try {
      if (isEditing) {
        await axios.patch(
          `http://localhost:8080/employee/${employeeData.employeeIdLong}`,
          employeeData
        );
      } else {
        await axios.post("http://localhost:8080/employee", employeeData);
      }
      setErrorMessage("");
      clearAll();
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
      setErrorMessage(
        isEditing
          ? "Não foi possível atualizar o funcionário. Tente novamente."
          : "Não foi possível adicionar o funcionário. Tente novamente."
      );
    }
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
            <label htmlFor="salario">Salario</label> <br />
            <input 
              className='addpanelinput' 
              type="text" 
              name="salary" 
              id="salario" 
              value={employeeData.salary}
              onChange={handleChange}
            />
          </div>
          <button className='addBtn' onClick={handleSubmit}>
            {isEditing ? "Salvar" : "Adicionar"}
          </button>
          <button className='cancelBtn' disabled={!showCancel} onClick={clearAll}>Cancelar</button>
        </div>

        <input 
          className='searchinput' 
          type="search" 
          name='inputsearch' 
          id='inputsearch' 
          placeholder='Buscar Funcionário' 
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      {errorMessage && (
        <div className='error-banner'>
          {errorMessage}
        </div>
      )}

      <table className='table'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                Nenhum funcionário encontrado.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className='pagination-controls'>
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          Primeira
        </button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Próxima
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Última
        </button>
      
      </div>
    </>
  );
}

export default App;