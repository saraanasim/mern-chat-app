import { LoginForm } from "@/ui/login-form";


export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-md m-auto h-fit flex flex-col gap-8">
        <p className="text-5xl text-center text-green-500">
          Saraan's Chat App
        </p>
        <p className="text-xl text-center underline">
          Demo of MERN, Next js, Typescript, Sockets, Server Actions, Form Actions
        </p>
        <LoginForm />
      </div>
    </main>
  );
}