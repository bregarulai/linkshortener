import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <SignUp
        appearance={{
          elements: {
            root: "w-full max-w-md",
            card: "shadow-none",
            headerTitle: "text-2xl font-bold text-foreground",
            headerSubtitle: "text-muted-foreground",
            formFieldLabel: "text-foreground font-medium",
            formFieldInput: "bg-background border-border",
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            footer: "hidden",
            identifierInput: "bg-background border-border",
            formResource: "bg-background border-border",
          },
        }}
      />
    </div>
  );
}
