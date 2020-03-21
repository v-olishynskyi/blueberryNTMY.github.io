export default function getLS() {
  const ls = JSON.parse(localStorage.getItem("tasks"));

  return ls ? ls : [];
}
