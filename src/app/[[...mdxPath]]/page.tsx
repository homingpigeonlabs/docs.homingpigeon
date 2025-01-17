/* eslint-disable react-hooks/rules-of-hooks -- false positive, useMDXComponents are not react hooks */
import { generateStaticParamsFor, importPage } from "nextra/pages";

import { useMDXComponents } from "@/mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

type Props = {
  params: Promise<{ mdxPath: string[] }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = useMDXComponents().wrapper;

export default async function Page(props: Props) {
  const params = await props.params;
  const { default: MDXContent, toc, metadata } = await importPage(params.mdxPath);
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
