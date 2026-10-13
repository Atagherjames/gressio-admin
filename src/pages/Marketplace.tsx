import { useState } from 'react';
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Package,
  Layers,
  Store,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { useAdminProducts, useProductApprovalMutation } from '../hooks/useMarketplaceAdmin';
import { MarketplaceProduct } from '../types';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Avatar } from '../components/ui/Avatar';

export const Marketplace = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'published' | 'all'>('pending');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);

  const { data, isLoading, isPlaceholderData } = useAdminProducts({
    page,
    limit: 9,
    status: activeTab,
    search: search.trim() || undefined,
  });

  const approvalMutation = useProductApprovalMutation();

  const products = Array.isArray(data?.data) ? data.data : [];
  const meta = data?.meta || { total: products.length, page: 1, lastPage: 1, pendingCount: 0, publishedCount: 0 };


  const handleApproval = (id: string, isPublished: boolean) => {
    approvalMutation.mutate(
      { id, isPublished },
      {
        onSuccess: (updated) => {
          if (selectedProduct?.id === id) {
            setSelectedProduct(updated);
          }
        },
      }
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#563CF9]" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Marketplace Moderation Board
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review and approve products uploaded by student sellers before they appear in the Gressio mobile app
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 shadow-xs">
            <Clock className="w-4 h-4 text-amber-600" />
            Pending Review: <span className="text-amber-900 font-bold">{meta.pendingCount}</span>
          </div>
          <div className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Live Products: <span className="text-emerald-900 font-bold">{meta.publishedCount}</span>
          </div>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center p-1 bg-slate-200/60 rounded-2xl w-full sm:w-auto border border-slate-200/60 overflow-x-auto shrink-0 max-w-full">

          <button
            onClick={() => {
              setActiveTab('pending');
              setPage(1);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pending'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Pending Approvals</span>
            {meta.pendingCount > 0 && (
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {meta.pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('published');
              setPage(1);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'published'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Live & Approved</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('all');
              setPage(1);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>All Products</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search products by title..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#563CF9]"
          />
        </div>
      </div>

      {/* Product Cards Grid */}
      {isLoading ? (
        <Card className="py-20 text-center text-slate-400 border-slate-200 bg-white shadow-xs">
          <p className="text-sm">Loading products for moderation...</p>
        </Card>
      ) : products.length === 0 ? (
        <Card className="py-20 text-center space-y-3 border-slate-200 bg-white shadow-xs">
          <Store className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-800">
            {activeTab === 'pending'
              ? 'No products pending approval'
              : 'No products found'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {activeTab === 'pending'
              ? 'All seller submissions have been reviewed. New submissions from student sellers will appear here.'
              : 'Try searching with different terms.'}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isPending = !product.isPublished;
            return (
              <Card
                key={product.id}
                className="p-0 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow border-slate-200 bg-white shadow-xs"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1">
                        <Package className="w-8 h-8" />
                        <span className="text-xs">No media uploaded</span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant={isPending ? 'amber' : 'emerald'}>
                        {isPending ? 'Pending Review' : 'Live on App'}
                      </Badge>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {product.type}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-base text-slate-900 line-clamp-1">
                        {product.title}
                      </h4>
                      <span className="text-[#563CF9] font-extrabold text-base shrink-0">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2">
                      {product.description || 'No detailed description provided.'}
                    </p>

                    {/* Seller Information */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={product.seller?.profileImage}
                          name={product.seller?.firstName ? `${product.seller.firstName} ${product.seller.lastName || ''}` : product.seller?.username}
                          size="xs"
                        />
                        <span className="font-semibold text-slate-700 truncate max-w-[120px]">
                          @{product.seller?.username || 'Unknown'}
                        </span>
                      </div>

                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <Package className="w-3.5 h-3.5" /> Qty: {product.qty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-slate-50/75 border-t border-slate-100 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    icon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => setSelectedProduct(product)}
                  >
                    Inspect
                  </Button>

                  {isPending ? (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 bg-[#563CF9] hover:bg-[#482FE0] text-white shadow-xs"
                      icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      isLoading={approvalMutation.isPending}
                      onClick={() => handleApproval(product.id, true)}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-rose-600 hover:bg-rose-50 border-rose-200"
                      icon={<XCircle className="w-3.5 h-3.5" />}
                      isLoading={approvalMutation.isPending}
                      onClick={() => handleApproval(product.id, false)}
                    >
                      Unlist
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination Footer */}
      {meta.total > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Page <span className="font-semibold text-slate-700">{meta.page}</span> of{' '}
            <span className="font-semibold text-slate-700">{meta.lastPage}</span> ({meta.total} products)
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
      )}

      {/* Product Detail & Moderation Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title="Product Inspection & Approval"
          description={`Product ID: ${selectedProduct.id}`}
          maxWidth="xl"
        >
          <div className="space-y-6">
            {/* Images */}
            {selectedProduct.images && selectedProduct.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden max-h-64">
                {selectedProduct.images.map((imgUrl, idx) => (
                  <div key={idx} className="h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={imgUrl}
                      alt={`Product image ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Title & Price */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={selectedProduct.isPublished ? 'emerald' : 'amber'}>
                    {selectedProduct.isPublished ? 'Live on App' : 'Pending Review'}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">
                    Type: {selectedProduct.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{selectedProduct.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#563CF9] block">
                  ₦{selectedProduct.price.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Available Quantity: {selectedProduct.qty}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Description
              </span>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {selectedProduct.description || 'No description provided by the seller.'}
              </p>
            </div>

            {/* Seller Card */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <Avatar
                  src={selectedProduct.seller?.profileImage}
                  name={selectedProduct.seller?.firstName ? `${selectedProduct.seller.firstName} ${selectedProduct.seller.lastName || ''}` : selectedProduct.seller?.username}
                  size="md"
                />
                <div>
                  <p className="font-semibold text-sm text-slate-900">
                    {selectedProduct.seller?.firstName
                      ? `${selectedProduct.seller.firstName} ${selectedProduct.seller.lastName || ''}`
                      : selectedProduct.seller?.username}
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    @{selectedProduct.seller?.username} • {selectedProduct.seller?.identifier}
                  </p>
                </div>
              </div>

              {selectedProduct.seller?.university && (
                <div className="text-right text-xs text-slate-500">
                  <span className="block font-semibold text-slate-700">Campus</span>
                  <span>{selectedProduct.seller.university}</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                size="md"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </Button>

              {!selectedProduct.isPublished ? (
                <Button
                  variant="primary"
                  size="md"
                  className="bg-[#563CF9] hover:bg-[#482FE0] text-white"
                  icon={<CheckCircle2 className="w-4 h-4" />}
                  isLoading={approvalMutation.isPending}
                  onClick={() => handleApproval(selectedProduct.id, true)}
                >
                  Approve & Publish to Mobile App
                </Button>
              ) : (
                <Button
                  variant="danger"
                  size="md"
                  icon={<XCircle className="w-4 h-4" />}
                  isLoading={approvalMutation.isPending}
                  onClick={() => handleApproval(selectedProduct.id, false)}
                >
                  Unlist Product
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
