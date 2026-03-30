import { FloatingShape } from "./components/FloatingShape";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { EmailVerificationPage } from "./pages/EmailVerificationPage";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

// Protect Routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

// Redirect authenticated users to homepage
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />;
  return children;
};

export const App = () => {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-linear-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center relative overflow-hidden px-4 sm:px-0">
        {/* Floating Shapes */}
        <FloatingShape
          color="bg-white/5"
          size="w-48 h-48 sm:w-64 sm:h-64"
          top="-10%"
          left="5%"
          delay={1}
        />
        <FloatingShape
          color="bg-white/5"
          size="w-32 h-32 sm:w-48 sm:h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-white/5"
          size="w-24 h-24 sm:w-32 sm:h-32"
          top="70%"
          left="5%"
          delay={3}
        />

        {/* Routes */}
        <div className="relative z-10 w-full max-w-lg">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <RedirectAuthenticatedUser>
                  <SignUpPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectAuthenticatedUser>
                  <LoginPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/verify-email"
              element={
                <RedirectAuthenticatedUser>
                  <EmailVerificationPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <RedirectAuthenticatedUser>
                  <ForgotPasswordPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                <RedirectAuthenticatedUser>
                  <ResetPasswordPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
