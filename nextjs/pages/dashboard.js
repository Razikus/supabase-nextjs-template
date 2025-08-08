export default function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Rights Holder Dashboard</h1>
      <p>Here you can search creators and manage streams.</p>
      <a href="/creator" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go to Creator Dashboard
      </a>
    </div>
  );
}
