export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("site");

  eleventyConfig.addPassthroughCopy({ "src/public": "/" });
  eleventyConfig.addPassthroughCopy({ "LICENSE.txt": "LICENSE.txt" });
  eleventyConfig.addPassthroughCopy({ "MIT-LICENSE.txt": "MIT-LICENSE.txt" });

  eleventyConfig.addCollection("shark_posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/shark/**/*.{html,md}");
  });

  eleventyConfig.addCollection("blogposts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/**/*.{html,md}");
  });

  eleventyConfig.addFilter("utcDate", (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  });

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}
