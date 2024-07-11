"use client";
import GlobalConsts from "~/constants/constants";
import StoresByCategory from "../StoresByCategory";
import { useParams, useSearchParams } from "next/navigation";

const Page = ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  const category = params.category;
  const searchParams = useSearchParams();
  const subCategory = searchParams.get("subCategory");

  return (
    <StoresByCategory
      category={GlobalConsts.categories.find((cat) => cat.name === category)!}
      subCategory={GlobalConsts.categories
        .find((cat) => cat.name === category)!
        .subCategories.find((subCat) => subCat.name === subCategory)}
    />
  );
};

export default Page;
