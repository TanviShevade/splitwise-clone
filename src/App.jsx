import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

import CreateGroup from "./CreateGroup";
import GroupPage from "./GroupPage";
import UpdateGroupPage from "./UpdateGroupPage"; // ✅ ADD THIS

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
      <Route path="/create-group" element={<CreateGroup user={user} />} />
      <Route path="/group" element={<GroupPage />} />
      
      {/* ✅ ADD EXPENSE PAGE */}
      <Route path="/add-expense" element={<UpdateGroupPage />} />
    </Routes>
  );
}

export default App;
