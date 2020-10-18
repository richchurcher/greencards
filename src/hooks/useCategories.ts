import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { Category } from "../store/category";

let categoryCache: Category[];

export const getCategories = () => {
  if (!categoryCache) {
    throw Error("Category cache is not populated.");
  }

  return categoryCache;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(config.categoryApiUrl);
        setCategories(data.trivia_categories);
        categoryCache = data.trivia_categories;
      } catch (e) {
        setError(Error(e.message));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, error, loading };
};
