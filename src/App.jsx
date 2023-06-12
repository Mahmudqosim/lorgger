import { BrowserRouter, Routes, Route } from "react-router-dom"
// import DashboardLayout from "./layouts/DashboardLayout"

import Login from "./views/Auth/Login"
import Register from "./views/Auth/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<DashboardLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route> */}

        {/* <Route element={<AuthLayout />}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
