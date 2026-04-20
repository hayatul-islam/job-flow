import api from "../axios";

export const getMyApplications = async () => {
  const res = await api.get("/applications/my");
  return res.data;
};

export const applyToJob = async ({
  jobId,
  cvFile,
}: {
  jobId: string;
  cvFile: File;
}) => {
  if (!cvFile) throw new Error("Please upload your CV");

  const formData = new FormData();
  formData.append("cv", cvFile);

  const res = await api.post(`/applications/${jobId}`, formData);
  return res.data;
};
