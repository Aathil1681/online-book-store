import React, { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

type CategoryFilterProps = {
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
};

export default function CategoryFilter({
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        if (data.success) {
          setCategories(data.categories);
        } else {
          setError("Failed to load categories");
        }
      } catch {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <button
        onClick={() => onSelectCategory(null)}
        style={{
          fontWeight: selectedCategoryId === null ? "bold" : "normal",
        }}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          style={{
            marginLeft: 8,
            fontWeight: selectedCategoryId === category.id ? "bold" : "normal",
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

// fetches categories from your /api/categories endpoint and allows the user to select one. 
// It will call a callback when a category is selected so your parent component (like the book list) can filter books accordingly.