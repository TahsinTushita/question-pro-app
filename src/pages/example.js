import { useQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 3;

// Fetch users
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function App() {
  const queryClient = useQueryClient();

  // 🔹 Persisted filter
  const { data: filter = "All" } = useQuery({
    queryKey: ["filter"],
    queryFn: () => "All",
    initialData: "All",
  });

  // 🔹 Persisted page
  const { data: page = 1 } = useQuery({
    queryKey: ["page"],
    queryFn: () => 1,
    initialData: 1,
  });

  const setFilter = (val) => {
    queryClient.setQueryData(["filter"], val);
    queryClient.setQueryData(["page"], 1); // reset page
  };

  const setPage = (val) => {
    queryClient.setQueryData(["page"], val);
  };

  // 🔹 Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // 🔹 Derived query: filter + pagination (persisted)
  const { data: paginatedUsers = [] } = useQuery({
    queryKey: ["usersView", filter, page],
    queryFn: () => {
      let result = users;

      // Filter
      if (filter !== "All") {
        result = result.filter((u) => u.address.city === filter);
      }

      // Pagination
      const start = (page - 1) * PAGE_SIZE;
      return result.slice(start, start + PAGE_SIZE);
    },
    enabled: users.length > 0,
    staleTime: Infinity,
  });

  // 🔹 Total pages
  const totalCount = users.filter(
    (u) => filter === "All" || u.address.city === filter,
  ).length;

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const cities = ["All", ...new Set(users.map((u) => u.address.city))];

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Users (Filter + Pagination + Persist)</h1>

      {/* 🔹 Filter */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        {cities.map((city) => (
          <option key={city}>{city}</option>
        ))}
      </select>

      {/* 🔹 Info */}
      <p style={{ marginTop: 10 }}>
        Filter: <b>{filter}</b> | Page: <b>{page}</b>
      </p>

      {/* 🔹 List */}
      <ul>
        {paginatedUsers.map((user) => (
          <li key={user.id}>
            {user.name} — {user.address.city}
          </li>
        ))}
      </ul>

      {/* 🔹 Pagination */}
      <div style={{ marginTop: 15 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
