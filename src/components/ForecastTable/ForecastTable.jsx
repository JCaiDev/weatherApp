import React from "react";
import { useTable } from "react-table";
import { formatDate } from "../../utils/format.jsx";
import "./ForecastTable.css";

const ForecastTable = ({ forecastData }) => {
  const formatForecastDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    return formatDate(dateString);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => formatForecastDate(value),
      },
      {
        Header: "Temp (°C)",
        accessor: "temp",
        Cell: ({ value }) => `${Math.round(value)} °C`,
      },
      {
        Header: "Min Temp (°C)",
        accessor: "minTemp",
        Cell: ({ value }) => `${Math.round(value)} °C`,
      },
      {
        Header: "Max Temp (°C)",
        accessor: "maxTemp",
        Cell: ({ value }) => `${Math.round(value)} °C`,
      },
      {
        Header: "Wind Speed",
        accessor: "windSpeed",
        Cell: ({ value }) => `${Math.round(value)} m/s`,
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );
  const data = React.useMemo(
    () => (Array.isArray(forecastData) ? forecastData : []),
    [forecastData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={`headerGroup-${index}`}
          >
            {headerGroup.headers.map((column, columnIndex) => (
              <th {...column.getHeaderProps()} key={`header-${columnIndex}`}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
              {row.cells.map((cell, cellIndex) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={`cell-${rowIndex}-${cellIndex}`}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ForecastTable;
