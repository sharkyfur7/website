export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("site");

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/script");
  eleventyConfig.addPassthroughCopy("src/shark");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  eleventyConfig.addCollection("shark_posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/shark/**/*.{html,md}");
  });

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
