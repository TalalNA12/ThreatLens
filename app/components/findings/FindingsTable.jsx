import Card from "../UI/Card";
import Table from "../UI/Table";
import SeverityBadge from "../UI/SeverityBadge";

export default function FindingsTable({ findings }) {
  const columns = [
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "severity", label: "Severity" },
    { key: "date", label: "Date" },
  ];

  const rows = findings.map((f) => ({
    title: f.title,
    category: f.category,
    severity: <SeverityBadge severity={f.severity} />,
    date: f.date,
  }));

  return (
    <Card>
      <Table columns={columns} rows={rows} />
    </Card>
  );
}
