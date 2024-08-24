import Flip from "gsap/Flip";
import { Accessor, createEffect, createSignal, on, Setter } from "solid-js";

export const createDismotionLayout = (options:{
  signals?: Accessor<any>[]
} = {}): [
  Setter<HTMLElement | null>,
  () => void
] => {
  const [state, setState] = createSignal<Flip.FlipState | null>();
  const [ref, setRef] = createSignal<HTMLElement | null>(null);

  createEffect(on([
    ref,
    ...(options.signals ?? [])
  ], () => {
    if(!state()) return;

    queueMicrotask(() => Flip.from(state()!, {
      targets: [ref()!, ...ref()!.children]
    }))
  }));

  const save = () => {
    if(!ref()){
      throw new Error("Cannot save state when ref is not set");
    }

    setState(Flip.getState([
      ref()!, ...ref()!.children
    ]))
  }

  return [setRef, save];
};
