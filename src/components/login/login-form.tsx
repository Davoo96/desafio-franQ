"use client";

import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/error-message";
import { FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";

function FormButton({ isRegistering }: { isRegistering: boolean }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>Enviando...</Button>
      ) : (
        <Button>{isRegistering ? "Cadastrar" : "Entrar"}</Button>
      )}
    </>
  );
}

export default function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );

    if (user) {
      document.cookie = `session=${JSON.stringify({
        username,
        loggedInAt: new Date().getTime(),
      })}; path=/; max-age=${30 * 60}`;
      window.location.href = "/";
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          label="usuário"
          type="text"
          name="username"
          placeholder="usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="senha"
          type="password"
          name="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ErrorMessage error={error} />
        <FormButton isRegistering={isRegistering} />
      </form>
      <div>
        <h2>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Button
          className="button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Voltar para Login" : "Cadastro"}
        </Button>
      </div>
    </>
  );
}
