export default async function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("site");

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/script");
  eleventyConfig.addPassthroughCopy("src/shark");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/elements.css");
  eleventyConfig.addPassthroughCopy("src/cursor.png");

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
