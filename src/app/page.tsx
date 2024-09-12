import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { api } from "~/trpc/server";
import { EditorUI } from "~/app/_components/editor-ui";

export const dynamic = "force-dynamic";

export default async function ScratchpadPage({}: {}) {
  const user = await currentUser();
  if (!user) notFound();

  const scratchpad = await api.scratchpad.getOne({
    userId: user.id,
  });

  void api.scratchpad.getOne.prefetch({
    userId: user.id,
  });

  if (!scratchpad) notFound();

  return (
    <>
      <section className="items-between flex w-full flex-1 flex-row justify-between gap-2">
        <EditorUI scratchpad={scratchpad} userId={user.id} />
      </section>
    </>
  );
}
