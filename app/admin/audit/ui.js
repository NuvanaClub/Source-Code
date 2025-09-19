"use client";

import { useState, useEffect } from "react";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function AuditLogsUI() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterAction, setFilterAction] = useState("");

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50"
      });
      if (filterAction) params.append("action", filterAction);

      const response = await fetch(`/api/audit?${params}`);
      const data = await response.json();
      
      setAuditLogs(data.auditLogs);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [page, filterAction]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionColor = (action) => {
    switch (action) {
      case "legality_gate_enabled":
        return "bg-green-600";
      case "legality_gate_disabled":
        return "bg-red-600";
      case "user_login":
        return "bg-blue-600";
      case "user_logout":
        return "bg-gray-600";
      default:
        return "bg-purple-600";
    }
  };

  return (
    <div className="grid gap-6">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-4">🔍 Audit Logs</h1>
        <p className="text-green-200 mb-6">
          Monitor user actions and system events for compliance and security.
        </p>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="label block mb-2">Filter by Action</label>
            <select
              value={filterAction}
              onChange={(e) => {
                setFilterAction(e.target.value);
                setPage(1);
              }}
              className="input"
            >
              <option value="">All Actions</option>
              <option value="legality_gate_enabled">Legality Gate Enabled</option>
              <option value="legality_gate_disabled">Legality Gate Disabled</option>
              <option value="user_login">User Login</option>
              <option value="user_logout">User Logout</option>
              <option value="strain_created">Strain Created</option>
              <option value="grow_created">Grow Log Created</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={fetchAuditLogs}
              className="btn"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-700/30">
                <th className="text-left py-3 px-4 text-green-300">User</th>
                <th className="text-left py-3 px-4 text-green-300">Action</th>
                <th className="text-left py-3 px-4 text-green-300">Details</th>
                <th className="text-left py-3 px-4 text-green-300">IP Address</th>
                <th className="text-left py-3 px-4 text-green-300">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8">
                    <SkeletonLoader type="card" count={5} />
                  </td>
                </tr>
              ) : auditLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-green-400">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-green-700/20 hover:bg-green-900/10">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-green-200">
                          {log.user?.name || "Unknown"}
                        </div>
                        <div className="text-sm text-green-400">
                          {log.user?.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${getActionColor(log.action)}`}>
                        {log.action.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-green-200 max-w-xs truncate">
                        {log.details || "—"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-green-400 font-mono">
                        {log.ipAddress || "—"}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-green-400">
                        {formatDate(log.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="btn text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    page === i + 1
                      ? 'bg-green-600 text-white'
                      : 'bg-green-900/30 text-green-300 hover:bg-green-800/50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="btn text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
