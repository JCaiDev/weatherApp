import React from "react";
import { useTable } from "react-table";

const ForecastTable = ({ forecastData }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Temp (°C)",
        accessor: "temp",
      },
      {
        Header: "Min Temp (°C)",
        accessor: "minTemp",
      },
      {
        Header: "Max Temp (°C)",
        accessor: "maxTemp",
      },
      {
        Header: "Wind Speed (m/s)",
        accessor: "windSpeed",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );
  const data = React.useMemo(
    () =>
      forecastData.map((forecast) => ({
        date: forecast.date,
        temp: forecast.temp,
        minTemp: forecast.minTemp,
        maxTemp: forecast.maxTemp,
        windSpeed: forecast.windSpeed,
        description: forecast.description,
      })),
    [forecastData]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ForecastTable;
