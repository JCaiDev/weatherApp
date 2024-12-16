import React from "react";
import { useTable } from "react-table";
import "./ForecastTable.css";

const ForecastTable = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const dateOptions = {
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(
      date
    );
    return formattedDate.replace(",", "");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => formatDate(value),
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
    // (Array.isArray(forecastData) || []).map((forecast, index) => ({
    //   date: forecast.date || "n/a",
    //   temp: forecast.temp ?? "n/a",
    //   minTemp: forecast.minTemp ?? "n/a",
    //   maxTemp: forecast.maxTemp ?? "n/a",
    //   windSpeed: forecast.windSpeed ?? "n/a",
    //   description: forecast.description ?? "n/a",
    //   rowIndex: index,
    // })),
    [forecastData]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} key={cell.column.id}>
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
