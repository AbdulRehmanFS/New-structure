import ContentForm from "./contentForm";
import Loader from "component/loader";
import useGetContent from "hooks/manageContent/useGetContent";
import { contenttype } from "util/constant";

export default function TermsPolices() {
  const {contentData, screenLoader, loading, handleSubmit} = useGetContent(contenttype?.termPolicy);

  if (screenLoader) return <Loader />;
  return <ContentForm handleSubmit={handleSubmit} preContent={contentData} loading={loading} />;
}
