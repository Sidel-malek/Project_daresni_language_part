import { Button } from "@/components/ui/button";
import Link from "next/link";
import { saveCheckpoint } from "./nextServerAction";
import { redirect  } from "next/navigation";
import { upgradeStep } from "@/actions/client/language";

export default function Buttons({ slug, step, length }) {

  return (
    <div className="flex gap-3 justify-end mt-8">
      <Link href={`/languages/${slug}/${step > 0 ? step - 1 : step}`}>
        <Button variant="outline" disabled={step == 0}>
          Previous
        </Button>
      </Link>
      <form
        action={async () => {
          "use server";

          await upgradeStep(slug, step);
          let formData = new FormData();
          formData.set(
            "url",
            `/languages/${slug}/${step < length - 1 ? step + 1 : step}`
          );

          saveCheckpoint(formData);
          redirect(`/languages/${slug}/${step < length - 1 ? step + 1 : step}`);
        }}
      >
        <Button disabled={step == length - 1}>Next</Button>
      </form>
    </div>
  );
}
