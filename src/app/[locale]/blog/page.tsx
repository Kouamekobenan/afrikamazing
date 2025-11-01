import BlogPage from "../../components/features/Blog";
import { getBlogData } from "../../data/blogPosts";
import { useTranslation } from "../../i18n";
import { LocaleCode } from "../../lib/global.type";
interface BlogPageWrapperProps {
  params: Promise<{ locale: LocaleCode }>;
}
export default async function BlogPageWrapper({
  params,
}: BlogPageWrapperProps) {
  const { locale } = await params;
  const { i18n } = await useTranslation(locale, "common");
  const translations = i18n.getResourceBundle(locale, "common");

  const { posts, categories } = getBlogData(locale);

  return (
    <div>
      <BlogPage
        blogPosts={posts}
        categories={categories}
        locale={locale}
        translations={{
          backToBlog: translations?.blog?.backToBlog ?? "Retour au blog",
          readArticle: translations?.blog?.readArticle ?? "Lire l'article",
          readTime: translations?.blog?.readTime ?? "de lecture",
          video: translations?.video,
          noArticles:
            translations?.blog?.noArticles ??
            "Aucun article dans cette catégorie.",
        }}
      />
    </div>
  );
}
