import useTheme from "@/stores/useTheme.ts";
import { ref } from "vue";

export const useToggleThemeViewTransition = () => {
  const transitionEvent = ref<MouseEvent | null>(null);
  const theme = useTheme();
  const isTransitioning = ref(false);

  const executeTransition = (callback: () => void) => {
    if (isTransitioning.value) return;

    if (!document.startViewTransition) {
      isTransitioning.value = false;
      return callback();
    }

    isTransitioning.value = true;
    const event = transitionEvent.value as MouseEvent;
    if (!event) return;

    const { clientX: x, clientY: y } = event;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );

    const transition = document.startViewTransition(() => callback());

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      const isDark = theme.getTheme === "dark";
      document.documentElement.animate(
        {
          clipPath: isDark ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 900,
          easing: "ease-in",
          pseudoElement: isDark
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        },
      );
      console.log(isDark);
    });
    transition.finished.finally(() => {
      isTransitioning.value = false;
    });
  };

  return {
    transitionEvent,
    executeTransition,
  };
};
