import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "../ui/checkbox";
import PaginationPage from "./PaginationPage";
import { fetchCategories, submitSelectedCategories } from "@/lib/action";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const IntrestCard = ({ userId,token }) => {

  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const limit = 6;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories(currentPage, limit, token);
        setCategories(data.categories);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };
    loadCategories();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSubmit = async () => {
    try {
      console.log(selectedCategories);
      await submitSelectedCategories({ selectedCategories ,userId, token});
    } catch (error) {
      console.error("Error submitting selected categories:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="md:text-2xl flex justify-center items-center">
            Please mark your interests!
          </CardTitle>
          <CardDescription className="md:text-md flex justify-center items-center">
            We will keep you notified
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="mb-8">
          <div className="mt-2 px-2">
            <h1 className="font-bold">My Saved Interests!</h1>
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center space-x-2 mt-2"
              >
                <Checkbox
                  id={category._id}
                  checked={selectedCategories.includes(category._id)}
                  onCheckedChange={() => handleCheckboxChange(category._id)}
                />
                <label htmlFor={category._id} className="text-sm font-medium">
                  {category.name}
                </label>
              </div>
            ))}
            {selectedCategories.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
                onClick={handleSubmit}
              >
                <FaArrowRight />
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <PaginationPage
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default IntrestCard;
