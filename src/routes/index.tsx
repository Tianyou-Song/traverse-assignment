import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div
      class="w-screen h-screen flex flex-col items-center justify-center gap-4"
    >
      <h1
        class="text-6xl font-bold"
      >
        Welcome to Traverse Admin!
      </h1>
      <Link
        class="text-4xl hover:underline text-[#7970A9]"
        href="/bookings/"
      >
        View Bookings
      </Link>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Traverse Admin",
  meta: [
    {
      name: "description",
      content: "Traverse Admin Interface",
    },
  ],
};
