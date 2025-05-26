import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "../../contexts/ThemeContext";

const columns = [
  { field: "humidity", headerName: "Umidade", flex: 1 },
  { field: "timestamp", headerName: "Data/Hora", flex: 1.5 },
];

export default function Table({ rows }) {
  const { isDarkMode } = useTheme();
  const themeClass = isDarkMode ? "dark-mode" : "light-mode";

  return (
    <div className={themeClass} style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
          borderRadius: 2,
          fontFamily: "inherit",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid var(--bg-tertiary)",
            color: "var(--text-primary)",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-secondary)",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "var(--bg-secondary) !important",
            color: "var(--text-secondary) !important",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-columnHeaderTitleContainer": {
            color: "var(--text-secondary) !important",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "var(--bg-tertiary) !important",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
          },
          "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiSelect-select": {
            color: "var(--text-primary)",
          },
          "& .MuiCheckbox-root svg": {
            fill: "var(--text-primary)",
          },
        }}
      />
    </div>
  );
}