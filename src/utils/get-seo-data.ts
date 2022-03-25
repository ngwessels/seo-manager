import { serverCall } from "./call.js";

export const fetchSEO = (path: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (process.browser) {
        throw {
          error:
            "This function is only allowed to be called in a server environment, not in the client. If you are using NextJS this belong in getServerSideProps or getStaticProps."
        };
      }
      const { results, error } = await serverCall("/seo/get", "put", { path });
      if (!results) {
        return resolve({
          results: false,
          error: error,
          message: "No SEO data for this page found"
        });
      }
      return resolve({ results });
    } catch (err) {
      return resolve({ results: false, error: err.error });
    }
  });
};
