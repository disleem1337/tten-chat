import { Component, createSignal, For, Show } from "solid-js";
import { store } from "../store";
import { useNavigate, useParams } from "@solidjs/router";
import erayimBG from "../assets/erayimBG.jpg";
import { Button } from "@/components/ui/button";
import { TextField, TextFieldInput } from "@/components/ui/text-field";

interface Message {
  username: string;
  message: {
    content: string;
    images: string[];
  };
}

const SideBar: Component = () => {
  const routerParams = useParams();
  const navigate = useNavigate();

  const roomId = () => routerParams.roomId || "general";
  const [chanels, setChanels] = createSignal<string[]>(["general"]);

  return (
    <div class="w-full h-full flex flex-col items-center py-4">
      <Button size="lg">Join channel</Button>
      <div class="flex flex-col gap-4 mt-4">
        <For each={chanels()}>
          {(item) => {
            const isActive = () => item === roomId();
            return (
              <Button
                onclick={() => navigate(`/chat/${item}`)}
                variant="ghost"
                size="sm"
                class={`"w-full flex gap-2 py-4" ${
                  isActive() ? "bg-primary/50" : ""
                }`}
              >
                <p class="font-bold">#{item}</p>
              </Button>
            );
          }}
        </For>
      </div>
    </div>
  );
};

const ConservationBar: Component = () => {
  const routerParams = useParams();

  const roomId = () => routerParams.roomId || "general";

  return (
    <div class="w-full h-full flex flex-col bg-primary/50">
      <div class="h-12 flex items-center p-2 bg-gray-500/50">
        <p class="font-semibold">#{roomId()}</p>
      </div>
      <div class="flex-1 bg-neutral-800"></div>
      <div class="flex">
        <TextField class="flex-1">
          <TextFieldInput
            type="text"
            class="border-0 outline-none ring-0 focus-visible:ring-0"
          />
        </TextField>
        <Button>Send</Button>
      </div>
    </div>
  );
};

const ChatView: Component = () => {
  const routerParams = useParams();

  const roomId = () => routerParams.roomId || "general";

  return (
    <div class="flex justify-center h-screen p-2">
      <div class="flex-1 max-w-screen-xl flex rounded-md overflow-hidden">
        <div class="w-48 border bg-primary/10">
          <SideBar />
        </div>
        <div class="flex-1 border">
          <ConservationBar />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
