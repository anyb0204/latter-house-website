import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
      <div className="text-center">
        <h1 className="font-serif text-3xl text-forest font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Sign in to your Latter House Life account</p>
        <SignIn
          appearance={{
            elements: {
              card: "shadow-sm border border-mint/30 bg-white",
              headerTitle: "font-serif text-forest",
              formButtonPrimary: "bg-sage hover:bg-forest",
            },
          }}
        />
      </div>
    </div>
  );
}
