import { archivePage } from "@/lib/notion";
import { useRouter } from "next/router";

export default function ArchiveButton({ pageId }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const archivePost = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await archivePage(pageId);
    refreshData();
  };

  return <button onClick={archivePost}>X</button>;
}
