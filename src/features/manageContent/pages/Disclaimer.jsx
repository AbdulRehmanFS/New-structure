import ContentForm from "../components/ContentForm";
import Loader from "@components/Loader";
import useGetContent from "../hooks/useGetContent";
import { contenttype } from "@utils/constant";

export default function Disclaimer() {
  const { contentData, screenLoader, loading, handleSubmit } = useGetContent(
    contenttype?.disclaimer
  );

  if (screenLoader) return <Loader loading={screenLoader} fullscreen={false} />;
  return (
    <ContentForm
      handleSubmit={handleSubmit}
      preContent={contentData}
      loading={loading}
    />
  );
}

