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
  const category = params.category.replace(/%20/g, " ");

  const searchParams = useSearchParams();
  const subCategory = searchParams.get("subCategory");
  console.log(category);
  console.log(subCategory);
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
