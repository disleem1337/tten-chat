import { Component, createEffect, createSignal, Match, Switch } from "solid-js";
import { store, setStore } from "../store";
import { A, useNavigate, useParams, useSearchParams } from "@solidjs/router";
import { Button } from "@/components/ui/button";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/ui/text-field";
import { login, register } from "@/requests/auth";

const LoginView: Component<{ switchView: () => void }> = (props) => {
  const [username, setUsername] = createSignal("");
  const [password, setPasword] = createSignal("");

  return (
    <div class="flex items-center justify-center h-screen flex-col">
      <h2 class="text-2xl font-semibold">Login</h2>
      <div class="flex flex-col gap-4 mt-4">
        <TextField>
          <TextFieldLabel>Username</TextFieldLabel>
          <TextFieldInput
            type="text"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
          ></TextFieldInput>
        </TextField>

        <TextField>
          <TextFieldLabel>Password</TextFieldLabel>
          <TextFieldInput
            type="password"
            value={password()}
            onInput={(e) => setPasword(e.currentTarget.value)}
          ></TextFieldInput>
        </TextField>
      </div>
      <Button
        onclick={async () => {
          const response = await login(username(), password());

          if (response.success) {
            alert("Login successful");
          } else {
            alert(response.error);
          }
        }}
        class="mt-4"
      >
        Login
      </Button>
      <Button
        variant="link"
        class="mt-4 text-white"
        onclick={() => props.switchView()}
      >
        Or register
      </Button>
    </div>
  );
};

const RegisterView: Component<{ switchView: () => void }> = (props) => {
  const [username, setUsername] = createSignal("");
  const [password, setPasword] = createSignal("");

  return (
    <div class="flex items-center justify-center h-screen flex-col">
      <h2 class="text-2xl font-semibold">Register</h2>
      <div class="flex flex-col gap-4 mt-4">
        <TextField>
          <TextFieldLabel>Username</TextFieldLabel>
          <TextFieldInput
            type="text"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
          ></TextFieldInput>
        </TextField>

        <TextField>
          <TextFieldLabel>Password</TextFieldLabel>
          <TextFieldInput
            type="password"
            value={password()}
            onInput={(e) => setPasword(e.currentTarget.value)}
          ></TextFieldInput>
        </TextField>
      </div>
      <Button
        onclick={() => {
          register(username(), password());
        }}
        class="mt-4"
      >
        Register
      </Button>
      <Button
        variant="link"
        class="mt-4 text-white"
        onclick={() => props.switchView()}
      >
        Or login
      </Button>
    </div>
  );
};

const JoinView: Component = () => {
  const [routerParams, setRouterParams] = useSearchParams();

  const action = () =>
    ["login", "register"].includes(routerParams.action as string)
      ? (routerParams.action as "login" | "register")
      : "login";

  return (
    <div class="flex items-center justify-center h-screen flex-col">
      <Switch>
        <Match when={action() === "login"}>
          <LoginView
            switchView={() =>
              setRouterParams({ ...routerParams, action: "register" })
            }
          />
        </Match>
        <Match when={action() === "register"}>
          <RegisterView
            switchView={() =>
              setRouterParams({ ...routerParams, action: "login" })
            }
          />
        </Match>
      </Switch>
    </div>
  );
};

export default JoinView;
