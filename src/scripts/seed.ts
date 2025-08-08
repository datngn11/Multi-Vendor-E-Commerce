import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import "dotenv/config";
import { fileURLToPath } from "url"; // Import fileURLToPath

import { Category } from "@/payload-types";
import { UserRoles } from "@/shared/constants";

import config from "../payload.config";

const currentFileUrl = import.meta.url;
const __filename = fileURLToPath(currentFileUrl);
const __dirname = path.dirname(__filename);

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

  // --- Seed Tenant ---
  console.log("\nSeeding Tenant...");
  const defaultTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "Default Tenant",
      slug: "default",
      stripeAccountId: "stripe-test",
      stripeDetailsSubmitted: true, // Assuming this is true for the default tenant
    },
  });
  console.log(`Created default tenant: ${defaultTenant.name}`);

  // --- Seed Categories ---
  const createdCategories: { [slug: string]: Category } = {}; // To store created category IDs for product linking
  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        color: category.color,
        name: category.name,
        slug: category.slug,
      },
    });
    createdCategories[category.slug] = parentCategory;
    console.log(`Created category: ${category.name}`);

    for (const subCategory of category.subCategories ?? []) {
      const createdSubCategory = await payload.create({
        collection: "categories",
        data: {
          color: parentCategory.color,
          name: subCategory.name,
          parent: parentCategory.id,
          slug: subCategory.slug,
        },
      });
      createdCategories[subCategory.slug] = createdSubCategory;
      console.log(`Created subCategory: ${subCategory.name}`);
    }
  }

  // --- Seed Tags ---
  console.log("\nSeeding Tags...");

  const tagNames = [
    "Beginner",
    "Advanced",
    "Digital",
    "Creative",
    "Productivity",
    "Fitness",
    "Finance",
    "Photography",
    "Design",
    "Tech",
  ];

  const createdTags: Record<string, string> = {}; // name -> id

  for (const name of tagNames) {
    try {
      const tag = await payload.create({
        collection: "tags",
        data: { name },
      });
      createdTags[name] = tag.id;
      console.log(`Created tag: ${name}`);
    } catch (err) {
      console.error(`Failed to create tag: ${name}`, err);
    }
  }

  // --- Seed Products ---
  console.log("\nSeeding Products...");

  // Example products - you can add many more!
  const products: Array<{
    categorySlug: string;
    description: string;
    imageFilename: string;
    name: string;
    price: number;
    refundPolicy: "14Days" | "30Days" | "noRefunds";
  }> = [
    {
      categorySlug: "entrepreneurship", // Link to a subCategory
      description:
        "A comprehensive guide to starting and growing your business.",
      imageFilename: "entrepreneurship-book.png",
      name: "Mastering Entrepreneurship",
      price: 49.99,
      refundPolicy: "30Days",
    },
    {
      categorySlug: "web-development",
      description: "Learn modern React from scratch with hands-on projects.",
      imageFilename: "react-course.png",
      name: "React Development Bootcamp",
      price: 199.99,
      refundPolicy: "14Days",
    },
    {
      categorySlug: "copywriting",
      description:
        "Unlock the secrets to persuasive writing for marketing and sales.",
      imageFilename: "copywriting-guide.png",
      name: "The Art of Copywriting",
      price: 35.0,
      refundPolicy: "noRefunds",
    },
    {
      categorySlug: "mindfulness",
      description: "Daily guided meditations for stress reduction and focus.",
      imageFilename: "meditation-audio.png",
      name: "Mindful Meditation Practices",
      price: 15.5,
      refundPolicy: "14Days",
    },
    {
      categorySlug: "workout-plans",
      description: "A complete workout and nutrition plan for quick results.",
      imageFilename: "fitness-plan.png",
      name: "Fitness Plan: 30 Days to a Stronger You",
      price: 29.99,
      refundPolicy: "30Days",
    },
    {
      categorySlug: "ui-ux",
      description:
        "Learn the fundamentals of user interface and user experience design.",
      imageFilename: "ui-ux-course.png",
      name: "Introduction to UI/UX Design",
      price: 75.0,
      refundPolicy: "14Days",
    },
    {
      categorySlug: "watercolor",
      description: "Everything you need to start your watercolor journey.",
      imageFilename: "watercolor-kit.png",
      name: "Beginner's Watercolor Kit",
      price: 25.0,
      refundPolicy: "noRefunds",
    },
    {
      categorySlug: "songwriting",
      description: "Master the basics of creating captivating songs.",
      imageFilename: "songwriting-guide.png",
      name: "Songwriting Essentials",
      price: 55.0,
      refundPolicy: "14Days",
    },
    {
      categorySlug: "landscape",
      description: "Take your landscape photos to the next level.",
      imageFilename: "landscape-photography.png",
      name: "Advanced Landscape Photography Techniques",
      price: 89.99,
      refundPolicy: "30Days",
    },
    {
      categorySlug: "personal-finance",
      description: "Manage your money, save, and invest wisely.",
      imageFilename: "personal-finance-ebook.png",
      name: "Personal Finance for Beginners",
      price: 20.0,
      refundPolicy: "14Days",
    },
    // --- Remaining Products (originally labeled "New Products Below") ---
    {
      categorySlug: "mobile-development",
      description:
        "Build beautiful and performant mobile apps for iOS and Android.",
      imageFilename: "flutter-course.png",
      name: "Mobile App Development with Flutter",
      price: 249.99,
      refundPolicy: "30Days",
    },
    {
      categorySlug: "non-fiction",
      description: "Develop your voice and craft compelling true stories.",
      imageFilename: "non-fiction-workshop.png",
      name: "Creative Non-Fiction Writing Workshop",
      price: 60.0,
      refundPolicy: "noRefunds",
    },
    {
      categorySlug: "productivity",
      description: "Boost your productivity and reclaim your day.",
      imageFilename: "time-management-guide.png",
      name: "Effective Time Management Strategies",
      price: 18.0,
      refundPolicy: "14Days",
    },
    {
      categorySlug: "yoga",
      description:
        "Gentle yoga flows to improve flexibility and reduce stress.",
      imageFilename: "yoga-series.png",
      name: "Yoga for Beginners: Flow Series",
      price: 22.5,
      refundPolicy: "14Days",
    },
    {
      categorySlug: "3d-modeling",
      description: "Learn the basics of 3D modeling and animation.",
      imageFilename: "blender-course.png",
      name: "Introduction to 3D Modeling with Blender",
      price: 99.0,
      refundPolicy: "30Days",
    },
    {
      categorySlug: "oil",
      description:
        "Master the art of painting breathtaking landscapes with oils.",
      imageFilename: "oil-painting-tutorial.png",
      name: "Oil Painting Techniques for Landscapes",
      price: 70.0,
      refundPolicy: "noRefunds",
    },
    {
      categorySlug: "music-production",
      description: "Produce professional-quality tracks from scratch.",
      imageFilename: "music-production-course.png",
      name: "Music Production Masterclass (Ableton Live)",
      price: 150.0,
      refundPolicy: "14Days",
    },
    {
      categorySlug: "street-photography",
      description: "Capture the candid moments of urban life.",
      imageFilename: "street-photography-guide.png",
      name: "Street Photography Essentials",
      price: 45.0,
      refundPolicy: "14Days",
    },
    {
      categorySlug: "investing",
      description: "Strategies to build a secure financial future.",
      imageFilename: "retirement-investing.png",
      name: "Investing for Retirement",
      price: 65.0,
      refundPolicy: "30Days",
    },
    {
      categorySlug: "devops",
      description: "Automate your software delivery pipeline.",
      imageFilename: "devops-jenkins.png",
      name: "DevOps Fundamentals: CI/CD with Jenkins",
      price: 120.0,
      refundPolicy: "14Days",
    },
  ];

  // Define the path to your seed images
  // Ensure this path is correct relative to where your seed.ts file is located.
  // If seed.ts is in src/scripts, and images are in src/seed/images:
  const imagesDir = path.resolve(__dirname, "./images"); // Adjusted path

  // Helper function to upload an image and return its ID
  // In a real application, you'd likely have these images pre-uploaded
  // or a more robust way to handle them. For seeding, we'll simulate.
  const uploadImage = async (filename: string) => {
    const filePath = path.join(imagesDir, filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.warn(
        `Image file not found: ${filePath}. Skipping image upload for ${filename}.`,
      );
      return null;
    }

    // This is a placeholder. In a real scenario, you would:
    // 1. Have actual image files in a directory (e.g., `src/seed/images`)
    // 2. Read the file into a buffer
    // 3. Upload it to the 'media' collection
    console.warn(
      `Simulating image upload for: ${filename}. You'll need to manually upload images or provide actual file paths for real seeding.`,
    );
    // For now, let's just return a dummy ID or null if media collection isn't crucial for your immediate test
    // If your `media` collection needs a file to be created, you'd integrate a file reading and upload here.
    // For demonstration, we'll create a dummy media entry. You might need to adjust this
    // depending on your 'media' collection's exact requirements (e.g., actual file uploads).
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const mimeType = `image/${filename.split(".").pop()}`; // Simple mimetype inference

      const mediaItem = await payload.create({
        collection: "media",
        data: {
          alt: filename.split(".")?.[0] || "", // Simple alt text from filename
          // Other fields specific to your media collection data, if any
        },
        file: {
          // This is the crucial 'file' object Payload expects
          data: fileBuffer,
          mimetype: mimeType,
          name: filename,
          size: fileBuffer.length,
        },
      });
      console.log(`Uploaded media: ${filename}`);
      return mediaItem.id;
    } catch (error) {
      console.error(`Error creating dummy media item for ${filename}:`, error);
      return null; // Return null if dummy media creation fails
    }
  };

  for (const productData of products) {
    const category = createdCategories[productData.categorySlug];
    if (!category) {
      console.warn(
        `Category with slug "${productData.categorySlug}" not found for product "${productData.name}". Skipping product.`,
      );
      continue;
    }

    let imageId = "";
    if (productData.imageFilename) {
      imageId = (await uploadImage(productData.imageFilename)) || "";
      if (!imageId) {
        console.error(
          `ERROR: Product "${productData.name}" requires an image, but upload failed. Skipping this product.`,
        );
        continue; // Skip product creation if image upload fails and image is required
      }
    }

    const assignedTagNames: string[] = [];

    if (productData.name.toLowerCase().includes("beginner")) {
      assignedTagNames.push("Beginner");
    }
    if (productData.name.toLowerCase().includes("advanced")) {
      assignedTagNames.push("Advanced");
    }
    if (
      productData.categorySlug.includes("design") ||
      productData.categorySlug.includes("ui-ux")
    ) {
      assignedTagNames.push("Design");
    }
    if (productData.categorySlug.includes("fitness")) {
      assignedTagNames.push("Fitness");
    }
    if (productData.categorySlug.includes("finance")) {
      assignedTagNames.push("Finance");
    }
    if (productData.categorySlug.includes("photography")) {
      assignedTagNames.push("Photography");
    }
    if (productData.categorySlug.includes("devops")) {
      assignedTagNames.push("Tech");
    }

    const tagIds = assignedTagNames
      .map((tagName) => createdTags[tagName] || "")
      .filter(Boolean);

    try {
      await payload.create({
        collection: "products",
        data: {
          category: category.id,
          description: productData.description,
          image: imageId, // This should now be a valid media ID
          name: productData.name,
          price: productData.price,
          refundPolicy: productData.refundPolicy,
          tags: tagIds,
          tenant: defaultTenant.id,
        },
      });
      console.log(`Created product: ${productData.name}`);
    } catch (error) {
      console.error(`Error creating product "${productData.name}":`, error);
    }
  }

  try {
    const adminUser = await payload.create({
      collection: "users",
      data: {
        email: "admin@admin.com",
        password: "admin@admin.com",
        roles: [UserRoles.SuperAdmin, UserRoles.User],
        username: "Super Admin",
      },
    });
    console.log("Admin user created, email:" + adminUser.email);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

try {
  await seed();
  console.log("\nSeeding completed successfully");
  process.exit(0);
} catch (error) {
  console.error("Error seeding:", error);
  process.exit(1);
}
