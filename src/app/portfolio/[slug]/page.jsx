import Page, { generateMetadata, generateStaticParams } from '@/app/project/[slug]/page';

export const revalidate = 10; // 10s fast cache for fresh updates matching /project/[slug]
export { generateMetadata, generateStaticParams };
export default Page;

