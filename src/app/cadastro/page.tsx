import LoginForm from "@/components/login/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro | Finanças",
  description: "Cadastre sua conta",
};

export default function LoginPage() {
  return (
    <section className="grid justify-center items-center">
      <h1 className="text-center mb-4 text-5xl font-bold">Cadastro</h1>
      <LoginForm isRegistering />
    </section>
  );
}
