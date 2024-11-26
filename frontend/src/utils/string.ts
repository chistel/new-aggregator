export const stripSegmentFromUrl = (url: string, segment: string): string => {
   try {
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname.split('/').filter(Boolean);

      const updatedPath = pathSegments.filter(seg => seg !== segment).join('/');

      parsedUrl.pathname = `/${updatedPath}`;
      return parsedUrl.toString();
   } catch (error) {
      console.error("Invalid URL:", error);
      return url;
   }
};
