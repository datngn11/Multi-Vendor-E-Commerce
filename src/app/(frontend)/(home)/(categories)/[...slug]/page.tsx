interface IProps {
  params: Promise<{
    slug?: string[];
  }>;
}

const CategoryPage = async ({ params }: IProps) => {
  const { slug } = await params;

  const [category, subcategory, subSubCategory] = slug || [];

  return (
    <>
      <h1>Category: {category}</h1>
      {subcategory && <h2>Subcategory: {subcategory}</h2>}
      {subSubCategory && <h3>Sub-Subcategory: {subSubCategory}</h3>}
    </>
  );
};

export default CategoryPage;
