import { SignupForm } from "@/ui/signup-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8 flex flex-col gap-6">
        <p className="text-5xl text-center text-green-500 font-bold">
          Saraan's Chat App
        </p>
        <p className="text-xl text-center text-gray-700">
          Demo of MERN, Next.js, TypeScript, Sockets, Server Actions, Form Actions
        </p>
        <SignupForm />
      </div>
    </main>
  );
}
