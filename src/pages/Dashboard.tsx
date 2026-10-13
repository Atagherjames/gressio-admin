import { Link } from 'react-router-dom';
import {
  Users,
  ShoppingBag,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Package,
} from 'lucide-react';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { useAdminProducts } from '../hooks/useMarketplaceAdmin';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';

export const Dashboard = () => {
  const { data: usersData, isLoading: loadingUsers } = useAdminUsers({ page: 1, limit: 5 });
  const { data: productsData, isLoading: loadingProducts } = useAdminProducts({ page: 1, limit: 5 });

  const usersList = Array.isArray(usersData?.data) ? usersData.data : [];
  const totalUsers = usersData?.meta?.total ?? usersList.length;
  const studentCount = usersData?.meta?.studentCount ?? usersList.filter(u => u.role === 'USER').length;
  const adminCount = usersData?.meta?.adminCount ?? usersList.filter(u => u.role === 'ADMIN').length;

  const productsList = Array.isArray(productsData?.data) ? productsData.data : [];
  const pendingApprovals = productsData?.meta?.pendingCount ?? productsList.filter(p => !p.isPublished).length;
  const liveProducts = productsData?.meta?.publishedCount ?? productsList.filter(p => p.isPublished).length;


  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            System Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time status of student accounts, marketplace listings, and platform operations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/marketplace">
            <Button
              variant="outline"
              size="sm"
              icon={<ShoppingBag className="w-4 h-4 text-[#563CF9]" />}
            >
              Marketplace Moderation ({pendingApprovals})
            </Button>
          </Link>
          <Link to="/users">
            <Button
              variant="primary"
              size="sm"
              className="bg-[#563CF9] hover:bg-[#482FE0] text-white shadow-xs"
              icon={<Users className="w-4 h-4" />}
            >
              Registered Users Directory
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <Card className="flex items-start justify-between border-slate-200 bg-white shadow-xs">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Registered Accounts
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">
              {loadingUsers ? '...' : totalUsers}
            </h3>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-600">
              <span className="font-semibold text-[#563CF9]">{studentCount} Students</span>
              <span>•</span>
              <span className="font-medium text-slate-500">{adminCount} Administrators</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] border border-[#C5C6FF]/40 flex items-center justify-center text-[#563CF9]">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        {/* Pending Product Approvals */}
        <Card className="flex items-start justify-between border-amber-200 bg-amber-50/30 shadow-xs">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Pending Approvals
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">
              {loadingProducts ? '...' : pendingApprovals}
            </h3>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-amber-700 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Awaiting admin review</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700">
            <Package className="w-6 h-6" />
          </div>
        </Card>

        {/* Live Marketplace Items */}
        <Card className="flex items-start justify-between border-slate-200 bg-white shadow-xs">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Marketplace Items
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-2">
              {loadingProducts ? '...' : liveProducts}
            </h3>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Published in mobile app</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Grid: Recent Users Preview & Quick Moderation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registered Users */}
        <Card className="space-y-4 border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#563CF9]" />
              <h3 className="font-bold text-base text-slate-900">Recently Registered Students</h3>
            </div>
            <Link
              to="/users"
              className="text-xs font-semibold text-[#563CF9] hover:text-[#482FE0] flex items-center gap-1"
            >
              See all <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {loadingUsers ? (
              <p className="py-6 text-center text-sm text-slate-400">Loading student directory...</p>
            ) : usersList.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400">No users registered yet.</p>
            ) : (
              usersList.slice(0, 5).map((user) => (
                <div key={user.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={user.profileImage}
                      name={user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.username}
                      size="sm"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.username}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {user.identifier}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge variant={user.role === 'ADMIN' ? 'indigo' : 'emerald'}>
                      {user.role}
                    </Badge>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {user.university || 'Unspecified Campus'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Action: Pending Products to Approve */}
        <Card className="space-y-4 border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-base text-slate-900">Products Awaiting Approval</h3>
            </div>
            <Link
              to="/marketplace"
              className="text-xs font-semibold text-[#563CF9] hover:text-[#482FE0] flex items-center gap-1"
            >
              Open Board <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {loadingProducts ? (
              <p className="py-6 text-center text-sm text-slate-400">Loading marketplace queue...</p>
            ) : productsList.filter((p) => !p.isPublished).length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-800">Queue is Clear</p>
                <p className="text-xs text-slate-400">All submitted products have been reviewed.</p>
              </div>
            ) : (
              productsList
                .filter((p) => !p.isPublished)
                .slice(0, 4)
                .map((product) => (

                  <div key={product.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                          {product.title}
                        </p>
                        <p className="text-xs text-[#563CF9] font-bold">
                          ₦{product.price.toLocaleString()} • Seller: @{product.seller?.username}
                        </p>
                      </div>
                    </div>

                    <Link to="/marketplace">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </Link>
                  </div>
                ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
