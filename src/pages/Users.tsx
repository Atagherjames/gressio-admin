import { useState } from 'react';
import {
  Users as UsersIcon,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  GraduationCap,
  Calendar,
  Package,
  FileText,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { User } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Avatar } from '../components/ui/Avatar';

export const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isLoading, isPlaceholderData } = useAdminUsers({
    page,
    limit: 10,
    search: search.trim() || undefined,
    role: roleFilter,
  });

  const users = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta || { total: users.length, page: 1, lastPage: 1 };


  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-[#563CF9]" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Registered Users Directory
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Browse, search, and inspect student accounts and platform administrators
          </p>
        </div>

        <div className="text-sm font-semibold text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs">
          Total Registered: <span className="text-[#563CF9] font-bold">{meta.total}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center gap-4 border-slate-200 bg-white shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, username, email, phone, or university..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#563CF9] focus:bg-white transition-all"
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#563CF9]"
          >
            <option value="ALL">All Roles</option>
            <option value="USER">Students Only</option>
            <option value="ADMIN">Administrators Only</option>
          </select>
        </div>
      </Card>

      {/* Users Data Table */}
      <Card className="p-0 overflow-hidden border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">User</th>
                <th className="py-3.5 px-6">Contact / Identifier</th>
                <th className="py-3.5 px-6">Campus / University</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Registered</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Loading registered users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No users matching the query found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* User Identity */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={user.profileImage}
                          name={user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.username}
                          size="md"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.username}
                          </p>
                          <p className="text-xs text-slate-500">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Identifier */}
                    <td className="py-4 px-6 font-mono text-xs text-slate-600">
                      <div>{user.identifier}</div>
                      {user.phoneNumber && (
                        <div className="text-slate-400 text-[11px] mt-0.5">{user.phoneNumber}</div>
                      )}
                    </td>

                    {/* University */}
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]">
                          {user.university || 'Unspecified Campus'}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-4 px-6">
                      <Badge variant={user.role === 'ADMIN' ? 'indigo' : 'slate'}>
                        {user.role}
                      </Badge>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {user.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                          <XCircle className="w-3.5 h-3.5" /> Unverified
                        </span>
                      )}
                    </td>

                    {/* Registered Date */}
                    <td className="py-4 px-6 text-xs text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setSelectedUser(user)}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50/50">
          <p className="text-xs text-slate-500">
            Showing Page <span className="font-semibold text-slate-700">{meta.page}</span> of{' '}
            <span className="font-semibold text-slate-700">{meta.lastPage}</span> ({meta.total} users)
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              icon={<ChevronLeft className="w-4 h-4" />}
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ChevronRight className="w-4 h-4" />}
              disabled={page >= meta.lastPage || isPlaceholderData || isLoading}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* User Inspection Modal */}
      {selectedUser && (
        <Modal
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          title="Student Profile Details"
          description={`Registered ID: ${selectedUser.id}`}
        >
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <Avatar
                src={selectedUser.profileImage}
                name={selectedUser.firstName ? `${selectedUser.firstName} ${selectedUser.lastName || ''}` : selectedUser.username}
                size="xl"
                shape="rounded"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-slate-900 truncate">
                    {selectedUser.firstName
                      ? `${selectedUser.firstName} ${selectedUser.lastName || ''}`
                      : selectedUser.username}
                  </h4>
                  <Badge variant={selectedUser.role === 'ADMIN' ? 'indigo' : 'slate'}>
                    {selectedUser.role}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 font-mono">@{selectedUser.username}</p>
                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {selectedUser.identifier}
                </p>
              </div>
            </div>

            {/* University & Academic */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block font-medium">University / Campus</span>
                <span className="font-semibold text-slate-800 mt-1 block">
                  {selectedUser.university || 'Not Provided'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block font-medium">Phone Number</span>
                <span className="font-semibold text-slate-800 mt-1 block font-mono">
                  {selectedUser.phoneNumber || 'Not Provided'}
                </span>
              </div>
            </div>

            {/* Activity Counts */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Posts
                </span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {selectedUser._count?.posts ?? 0}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <Package className="w-3.5 h-3.5" /> Products
                </span>
                <span className="text-lg font-bold text-[#563CF9] mt-1 block">
                  {selectedUser._count?.marketplaceProducts ?? 0}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white">
                <span className="text-xs text-slate-500 flex items-center justify-center gap-1">
                  <UsersIcon className="w-3.5 h-3.5" /> Followers
                </span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">
                  {selectedUser._count?.followers ?? 0}
                </span>
              </div>
            </div>

            {/* Timestamps */}
            <div className="text-xs text-slate-400 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Joined on{' '}
                {new Date(selectedUser.createdAt).toLocaleDateString()}
              </span>
              <span>
                Status: {selectedUser.isDeactivated ? 'Deactivated' : 'Active Account'}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
