import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { Form, Head } from '@inertiajs/react';
import { Lock, User } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status }: LoginProps) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-100 px-4 dark:bg-slate-900">
            <Head title="Login" />

            {/* Login Card */}
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-800">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                        Selamat Datang
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Masuk untuk mengelola stok dan pesanan.
                    </p>
                </div>

                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="space-y-5"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Email Input */}
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                                >
                                    Email atau Username
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="admin@motoparts.com"
                                        className="block w-full rounded-lg border-slate-300 bg-slate-50 py-2.5 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-800"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Input */}
                            <div>
                                <Label
                                    htmlFor="password"
                                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="block w-full rounded-lg border-slate-300 bg-slate-50 py-2.5 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-800"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 dark:border-slate-600"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-slate-600 dark:text-slate-400"
                                    >
                                        Ingat saya
                                    </Label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Masuk ke Dashboard
                            </Button>
                        </>
                    )}
                </Form>

                {/* Footer */}
                <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-700/50">
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                        © 2026 Gudang Sparepart Admin Panel.
                    </p>
                </div>
            </div>
        </div>
    );
}
