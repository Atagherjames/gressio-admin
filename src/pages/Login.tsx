import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { authApi } from '../api/auth.api';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Please enter your administrator email or username'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setErrorMessage(null);
    try {
      const response = await authApi.login(values);

      if (response.user.role !== 'ADMIN') {
        setErrorMessage('Access Denied: This portal requires verified Administrator credentials.');
        toast.error('Unauthorized access');
        return;
      }

      setAuth(response.accessToken, response.user);
      toast.success(`Welcome back, ${response.user.firstName || response.user.username}`);
      navigate('/users');
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Authentication failed. Please check your credentials and ensure the backend is reachable.';
      setErrorMessage(typeof msg === 'string' ? msg : JSON.stringify(msg));
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] flex flex-col justify-center items-center p-6 selection:bg-[#563CF9] selection:text-white">
      {/* Container */}
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/logo.png"
            alt="Gressio Logo"
            className="w-16 h-16 object-contain rounded-2xl shadow-md mb-4"
          />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">

            Gressio Admin Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to access platform management & moderation
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-semibold text-rose-800">Access Alert</p>
                <p className="text-xs text-rose-600 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Administrator Identifier / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="Email or username"
                  {...register('identifier')}
                  className="w-full rounded-xl bg-white border border-slate-200 pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#563CF9] focus:border-[#563CF9] transition-all"
                />
              </div>
              {errors.identifier && (
                <p className="text-xs font-medium text-rose-600 mt-1.5">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full rounded-xl bg-white border border-slate-200 pl-10 pr-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#563CF9] focus:border-[#563CF9] transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-rose-600 mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={isSubmitting}
              className="w-full bg-[#563CF9] hover:bg-[#482FE0] text-white shadow-sm shadow-[#563CF9]/25"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Security Footer Notice */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>Protected administrative gateway for Gressio Platform Operations.</p>
        </div>
      </div>
    </div>
  );
};
