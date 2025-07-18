import { getPayload } from "payload";

import config from "../payload.config";

import "dotenv/config";

export const categories = [
  { name: "All", slug: "all" },

  {
    color: "#FFB347",
    name: "Business & Money",
    slug: "business-money",
    subCategories: [
      { name: "Accounting", slug: "accounting" },
      {
        name: "Entrepreneurship",
        slug: "entrepreneurship",
      },
      { name: "Gigs & Side Projects", slug: "gigs-and-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-and-leadership" },
      {
        name: "Marketing & Sales",
        slug: "marketing-sales",
      },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    color: "#7EC8E3",
    name: "Software Development",
    slug: "software-development",
    subCategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    color: "#D8B5FF",
    name: "Writing & Publishing",
    slug: "writing-publishing",
    subCategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    color: "#01d696",
    name: "Other",
    slug: "other",
  },
  {
    color: "#FFE066",
    name: "Education",
    slug: "education",
    subCategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    color: "#96E6B3",
    name: "Self Improvement",
    slug: "self-improvement",
    subCategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    color: "#FF9AA2",
    name: "Fitness & Health",
    slug: "fitness-health",
    subCategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    color: "#B5B9FF",
    name: "Design",
    slug: "design",
    subCategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    color: "#FFCAB0",
    name: "Drawing & Painting",
    slug: "drawing-painting",
    subCategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    color: "#FFD700",
    name: "Music",
    slug: "music",
    subCategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    color: "#FF6B6B",
    name: "Photography",
    slug: "photography",
    subCategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({
    config,
  });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        color: category.color,
        name: category.name,
        slug: category.slug,
      },
    });
    console.log(`Created category: ${category.name}`);

    for (const subCategory of category.subCategories ?? []) {
      await payload.create({
        collection: "categories",
        data: {
          color: parentCategory.color,
          name: subCategory.name,
          parent: parentCategory.id,
          slug: subCategory.slug,
        },
      });
      console.log(`Created subCategory: ${subCategory.name}`);
    }
  }

  try {
    const adminUser = await payload.create({
      collection: "users",
      data: {
        email: "admin@admin.com",
        password: "admin@admin.com",
        username: "admin",
      },
    });
    console.log("Admin user created, email:" + adminUser.email);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

try {
  await seed();
  console.log("Seeding completed successfully");
  process.exit(0);
} catch (error) {
  console.error("Error seeding:", error);
  process.exit(1);
}
