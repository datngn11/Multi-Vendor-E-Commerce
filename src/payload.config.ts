// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Category } from "./collections/Category";
import { Media } from "./collections/Media";
import { Product } from "./collections/Product";
import { Tag } from "./collections/Tag";
import { Tenant } from "./collections/Tenant";
import { User } from "./collections/User";
import { env } from "./configs/env";
import { Config } from "./payload-types";
import { isSuperAdmin } from "./shared/utils/auth";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: User.slug,
  },
  collections: [User, Media, Category, Product, Tag, Tenant],
  cookiePrefix: "velels",
  db: mongooseAdapter({
    url: env.MONGODB_URI,
  }),
  editor: lexicalEditor(),
  plugins: [
    payloadCloudPlugin(),
    multiTenantPlugin<Config>({
      collections: {
        products: {},
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
  ],
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
