import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="text-center">
        <h1 className="text-3xl text-forest mb-2" style={{ fontWeight: 200, letterSpacing: "-0.01em" }}>Welcome Back</h1>
        <p className="text-gray-700 mb-8 text-sm tracking-wide">Sign in to your Latter House Life account</p>
        <SignIn
          appearance={{
            elements: {
              card: "shadow-sm border border-gray-200 bg-white",
              headerTitle: "text-forest",
              formButtonPrimary: "bg-forest hover:bg-sage",
              formFieldInput: "border-gray-300 text-gray-900",
              formFieldLabel: "text-gray-800 font-medium",
              identityPreviewText: "text-gray-800",
              formResendCodeLink: "text-forest",
              footerActionLink: "text-forest font-medium",
            },
          }}
        />
      </div>
    </div>
  );
}
