import ContentForm from "./contentForm";
import { contenttype } from "util/constant";
import Loader from "component/loader";
import useGetContent from "hooks/manageContent/useGetContent";

export default function PrivacyPolicy() {
  const {contentData, screenLoader, loading, handleSubmit} = useGetContent(
    contenttype?.privacyPolicy
  );

  if (screenLoader) return <Loader />;
  return <ContentForm handleSubmit={handleSubmit} preContent={contentData} loading={loading} />;
}
