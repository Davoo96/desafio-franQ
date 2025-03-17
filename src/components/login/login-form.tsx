"use client";

import Button from "@/components/forms/button";
import Input from "@/components/forms/input";
import ErrorMessage from "@/components/helper/form-message";
import Spinner from "@/components/loading/spinner";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";

function FormButton({ isRegistering }: { isRegistering: boolean }) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled={pending}>
          <Spinner />
        </Button>
      ) : (
        <Button
          type="submit"
          className="cursor-pointer border-2 border-gray-300 rounded-lg py-2 px-4 mb-6 mt-3 w-full"
        >
          {isRegistering ? "Cadastrar" : "Entrar"}
        </Button>
      )}
    </>
  );
}

export default function LoginForm({
  isRegistering = false,
}: {
  isRegistering?: boolean;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );

    if (isRegistering) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = users.some(
        (user: { username: string }) => user.username === username
      );

      if (userExists) {
        setIsError(true);
        return setMessage("Usuário já existe");
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        setIsError(false);
        setMessage("Cadastro realizado com sucesso!");
      }
    }

    if (user && !isRegistering) {
      setIsError(false);
      setMessage("Login realizado com sucesso!");
      document.cookie = `session=${JSON.stringify({
        username,
        loggedInAt: new Date().getTime(),
      })}; path=/; max-age=${30 * 60}`;
      window.location.href = "/";
    } else if (!isRegistering) {
      setIsError(true);
      setMessage("Usuário ou senha inválidos");
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
          onBlur={() => setMessage("")}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="senha"
          type="password"
          name="password"
          placeholder="senha"
          value={password}
          onBlur={() => setMessage("")}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ErrorMessage message={message} isError={isError} />
        <FormButton isRegistering={isRegistering} />
      </form>
      <div>
        {!isRegistering && (
          <>
            <h2>Cadastre-se</h2>
            <p>Ainda não possui conta? Cadastre-se no site.</p>
          </>
        )}
        <Link
          href={isRegistering ? "login" : "cadastro"}
          className="cursor-pointer underline mb-6 mt-3 w-full"
        >
          {isRegistering ? "Voltar para Login" : "Cadastro"}
        </Link>
      </div>
    </>
  );
}
