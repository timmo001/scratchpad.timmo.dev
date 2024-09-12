import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { api } from "~/trpc/server";
import { EditorUI } from "~/app/_components/editor-ui";

export const dynamic = "force-dynamic";

export default async function ScratchpadPage({}: {}) {
  const user = await currentUser();
  if (!user) notFound();

  let scratchpad = await api.scratchpad.getOne({
    userId: user.id,
  });

  if (!scratchpad) {
    await api.scratchpad.create({
      userId: user.id,
    });

    scratchpad = await api.scratchpad.getOne({
      userId: user.id,
    });

    if (!scratchpad) notFound();
  }

  return (
    <section className="flex w-full flex-1 flex-col">
      <EditorUI scratchpad={scratchpad} userId={user.id} />
    </section>
  );
}
